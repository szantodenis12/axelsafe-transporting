/**
 * Local file drivers — DEVELOPMENT ONLY.
 * Leads persist to `.data/leads.json`, CRM users to `.data/users.json` in the project root.
 * Refuses to run in production: serverless disks are ephemeral and files are not shared between instances.
 *
 * Mirrors the Supabase driver rule for rule (status rules come from `planStatusChange`).
 */
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { phoneKey, type CarrierCheckKey } from "../schema";
import {
  LeadNotFoundError,
  accumulateStats,
  filterCarriers,
  matchesDuplicate,
  planStatusChange,
  type Actor,
  type AdminUser,
  type AdminUserWithHash,
  type AnafSnapshot,
  type CarrierFilters,
  type CarrierLead,
  type Economics,
  type Lead,
  type LeadEvent,
  type LeadFilters,
  type LeadRepository,
  type LeadStats,
  type LeadWithEvents,
  type NewAdminUser,
  type NewLead,
  type StatusChange,
  type UserRepository,
} from "../types";
import { CHECK_LABEL_RO, describeEconomics, describeFollowUp, LOST_REASON_LABEL } from "../labels";

type Store = { version: 2; leads: Lead[]; events: LeadEvent[] };
type UserStore = { version: 1; users: AdminUserWithHash[] };

const MAX_ALL = 5000;

function assertDev() {
  if (process.env.NODE_ENV === "production") {
    throw new Error("Local file store is not allowed in production (ephemeral disk). Configure Supabase.");
  }
}

/** Serialised JSON file with atomic writes. */
class JsonFile<T> {
  /** Serialises read-modify-write cycles within this process. */
  private queue: Promise<unknown> = Promise.resolve();
  constructor(
    private readonly file: string,
    private readonly empty: () => T,
    private readonly normalise: (raw: unknown) => T,
  ) {}

  async read(): Promise<T> {
    try {
      return this.normalise(JSON.parse(await readFile(this.file, "utf8")));
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === "ENOENT") return this.empty();
      throw err;
    }
  }

  private async write(data: T) {
    await mkdir(path.dirname(this.file), { recursive: true });
    const tmp = `${this.file}.${process.pid}.tmp`;
    await writeFile(tmp, JSON.stringify(data, null, 2), "utf8");
    await rename(tmp, this.file);
  }

  mutate<R>(fn: (data: T) => R | Promise<R>): Promise<R> {
    const run = this.queue.then(async () => {
      const data = await this.read();
      const result = await fn(data);
      await this.write(data);
      return result;
    });
    this.queue = run.catch(() => undefined);
    return run;
  }
}

/** v1 rows (before 0002) lack the CRM columns — fill the defaults the migration would apply. */
function normaliseLead(raw: Lead): Lead {
  return { ...raw, sourceChannel: raw.sourceChannel ?? "site", checks: raw.checks ?? {} };
}

const dataDir = () => path.join(process.cwd(), ".data");

/* ───────────────────────── Leads ───────────────────────── */

export class LocalFileLeadRepository implements LeadRepository {
  readonly driver = "local" as const;
  private readonly store: JsonFile<Store>;

  constructor(file = path.join(dataDir(), "leads.json")) {
    assertDev();
    this.store = new JsonFile<Store>(
      file,
      () => ({ version: 2, leads: [], events: [] }),
      (raw) => {
        const p = raw as Partial<Store>;
        return { version: 2, leads: (p.leads ?? []).map(normaliseLead), events: p.events ?? [] };
      },
    );
  }

  private static findLead(store: Store, id: string): Lead {
    const lead = store.leads.find((l) => l.id === id);
    if (!lead) throw new LeadNotFoundError(id);
    return lead;
  }

  private static pushEvent(store: Store, e: Omit<LeadEvent, "id" | "createdAt" | "author" | "authorId">, actor: Actor): LeadEvent {
    const event: LeadEvent = { ...e, author: actor.name, authorId: actor.id ?? undefined, id: randomUUID(), createdAt: new Date().toISOString() };
    store.events.push(event);
    return event;
  }

  private static touch(lead: Lead) {
    lead.updatedAt = new Date().toISOString();
  }

  async create(input: NewLead): Promise<Lead> {
    return this.store.mutate((store) => {
      const now = new Date().toISOString();
      const owner = input.createdBy?.id ? input.createdBy : undefined;
      const lead = {
        id: randomUUID(),
        requestId: input.requestId,
        type: input.type,
        status: "new",
        companyName: input.companyName,
        contactPerson: input.contactPerson,
        email: input.email,
        phone: input.phone,
        vatNumber: input.vatNumber,
        details: input.details,
        consentAt: input.consentAt,
        sourceChannel: input.sourceChannel,
        source: input.source,
        utm: input.utm,
        locale: input.locale,
        ipHash: input.ipHash,
        userAgent: input.userAgent,
        assignedUserId: owner?.id ?? undefined,
        assignedTo: owner?.name,
        createdById: input.createdBy?.id ?? undefined,
        checks: {},
        createdAt: now,
        updatedAt: now,
      } as Lead;
      store.leads.push(lead);
      LocalFileLeadRepository.pushEvent(
        store,
        { leadId: lead.id, kind: "created", toStatus: "new", note: input.createdBy ? "Adăugat manual în CRM" : undefined },
        input.createdBy ?? { id: null, name: "system" },
      );
      return lead;
    });
  }

  async list(filters: LeadFilters = {}): Promise<Lead[]> {
    const store = await this.store.read();
    const q = filters.q?.trim().toLowerCase();
    const qDigits = q ? phoneKey(q) : undefined;
    return store.leads
      .filter((l) => !filters.type || l.type === filters.type)
      .filter((l) => !filters.status || l.status === filters.status)
      .filter((l) => !filters.channel || l.sourceChannel === filters.channel)
      .filter((l) => {
        if (filters.owner === "mine") return Boolean(filters.userId) && l.assignedUserId === filters.userId;
        if (filters.owner === "unassigned") return !l.assignedUserId;
        return true;
      })
      .filter(
        (l) =>
          !q ||
          (l.companyName ?? "").toLowerCase().includes(q) ||
          l.contactPerson.toLowerCase().includes(q) ||
          (l.email ?? "").toLowerCase().includes(q) ||
          (l.vatNumber ?? "").toLowerCase().includes(q) ||
          Boolean(qDigits && phoneKey(l.phone)?.includes(qDigits)),
      )
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, Math.min(Math.max(filters.limit ?? 200, 1), 500));
  }

  async all(): Promise<Lead[]> {
    const store = await this.store.read();
    return [...store.leads].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, MAX_ALL);
  }

  async get(id: string): Promise<LeadWithEvents | null> {
    const store = await this.store.read();
    const lead = store.leads.find((l) => l.id === id);
    if (!lead) return null;
    const events = store.events.filter((e) => e.leadId === id).sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    return { lead, events };
  }

  async updateStatus(id: string, change: StatusChange, actor: Actor): Promise<Lead> {
    return this.store.mutate((store) => {
      const lead = LocalFileLeadRepository.findLead(store, id);
      const now = new Date().toISOString();
      const patch = planStatusChange(lead, change, now);
      if (!patch) return lead;
      const from = lead.status;
      Object.assign(lead, patch);
      LocalFileLeadRepository.touch(lead);
      const reason = patch.lostReason ? `Motiv: ${LOST_REASON_LABEL[patch.lostReason]}${patch.lostNote ? ` · ${patch.lostNote}` : ""}` : undefined;
      LocalFileLeadRepository.pushEvent(
        store,
        { leadId: id, kind: "status_changed", fromStatus: from, toStatus: change.status, note: [reason, change.note?.trim()].filter(Boolean).join("\n") || undefined },
        actor,
      );
      return lead;
    });
  }

  async addNote(id: string, note: string, actor: Actor): Promise<LeadEvent> {
    return this.store.mutate((store) => {
      const lead = LocalFileLeadRepository.findLead(store, id);
      if (!lead.firstResponseAt) {
        lead.firstResponseAt = new Date().toISOString();
        LocalFileLeadRepository.touch(lead);
      }
      return LocalFileLeadRepository.pushEvent(store, { leadId: id, kind: "note", note: note.trim() }, actor);
    });
  }

  async assign(id: string, assignee: Actor | null, actor: Actor): Promise<Lead> {
    return this.store.mutate((store) => {
      const lead = LocalFileLeadRepository.findLead(store, id);
      const nextId = assignee?.id ?? undefined;
      if (lead.assignedUserId === nextId && (nextId || !lead.assignedTo)) return lead;
      lead.assignedUserId = nextId;
      lead.assignedTo = nextId ? assignee!.name : undefined;
      LocalFileLeadRepository.touch(lead);
      const note = !nextId ? "Nealocat" : nextId === actor.id ? `Preluat de ${assignee!.name}` : `Alocat lui ${assignee!.name}`;
      LocalFileLeadRepository.pushEvent(store, { leadId: id, kind: "assigned", note }, actor);
      return lead;
    });
  }

  async setFollowUp(id: string, at: string | null, note: string | null, actor: Actor): Promise<Lead> {
    return this.store.mutate((store) => {
      const lead = LocalFileLeadRepository.findLead(store, id);
      lead.nextActionAt = at ?? undefined;
      lead.nextActionNote = at ? note?.trim() || undefined : undefined;
      LocalFileLeadRepository.touch(lead);
      LocalFileLeadRepository.pushEvent(store, { leadId: id, kind: "follow_up", note: describeFollowUp(lead.nextActionAt, lead.nextActionNote) }, actor);
      return lead;
    });
  }

  async setEconomics(id: string, economics: Economics, actor: Actor): Promise<Lead> {
    return this.store.mutate((store) => {
      const lead = LocalFileLeadRepository.findLead(store, id);
      lead.offeredPrice = economics.offeredPrice;
      lead.carrierCost = economics.carrierCost;
      lead.currency = economics.currency;
      LocalFileLeadRepository.touch(lead);
      LocalFileLeadRepository.pushEvent(store, { leadId: id, kind: "economics", note: describeEconomics(economics) }, actor);
      return lead;
    });
  }

  async setCheck(id: string, key: CarrierCheckKey, checked: boolean, actor: Actor): Promise<Lead> {
    return this.store.mutate((store) => {
      const lead = LocalFileLeadRepository.findLead(store, id);
      const checks = { ...lead.checks };
      if (Boolean(checks[key]) === checked) return lead;
      if (checked) checks[key] = { at: new Date().toISOString(), by: actor.name, byId: actor.id ?? undefined };
      else delete checks[key];
      lead.checks = checks;
      LocalFileLeadRepository.touch(lead);
      LocalFileLeadRepository.pushEvent(store, { leadId: id, kind: "verification", note: `${checked ? "Bifat" : "Debifat"}: ${CHECK_LABEL_RO[key]}` }, actor);
      return lead;
    });
  }

  async saveAnaf(id: string, snapshot: AnafSnapshot, actor: Actor): Promise<Lead> {
    return this.store.mutate((store) => {
      const lead = LocalFileLeadRepository.findLead(store, id);
      lead.anaf = snapshot;
      LocalFileLeadRepository.touch(lead);
      LocalFileLeadRepository.pushEvent(store, { leadId: id, kind: "anaf_lookup", note: `ANAF: ${snapshot.name} (CUI ${snapshot.cui})` }, actor);
      return lead;
    });
  }

  async duplicates(lead: Lead): Promise<Lead[]> {
    const store = await this.store.read();
    return store.leads
      .filter((l) => matchesDuplicate(lead, l))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, 20);
  }

  async carriers(filters: CarrierFilters = {}): Promise<CarrierLead[]> {
    const store = await this.store.read();
    return filterCarriers(
      store.leads.filter((l): l is CarrierLead => l.type === "carrier" && l.status === "approved"),
      filters,
    );
  }

  async stats(): Promise<LeadStats> {
    return accumulateStats((await this.store.read()).leads);
  }
}

/* ───────────────────────── Users ───────────────────────── */

const publicUser = ({ passwordHash: _h, ...u }: AdminUserWithHash): AdminUser => u; // eslint-disable-line @typescript-eslint/no-unused-vars

export class LocalFileUserRepository implements UserRepository {
  readonly driver = "local" as const;
  private readonly store: JsonFile<UserStore>;

  constructor(file = path.join(dataDir(), "users.json")) {
    assertDev();
    this.store = new JsonFile<UserStore>(
      file,
      () => ({ version: 1, users: [] }),
      (raw) => ({ version: 1, users: (raw as Partial<UserStore>).users ?? [] }),
    );
  }

  async countActive() {
    return (await this.store.read()).users.filter((u) => u.active).length;
  }

  async list() {
    return (await this.store.read()).users.map(publicUser).sort((a, b) => a.name.localeCompare(b.name, "ro"));
  }

  async getById(id: string) {
    const u = (await this.store.read()).users.find((x) => x.id === id);
    return u ? publicUser(u) : null;
  }

  async getByEmailWithHash(email: string) {
    const e = email.trim().toLowerCase();
    return (await this.store.read()).users.find((x) => x.email === e) ?? null;
  }

  async upsert(input: NewAdminUser) {
    return this.store.mutate((store) => {
      const email = input.email.trim().toLowerCase();
      const existing = store.users.find((u) => u.email === email);
      if (existing) {
        Object.assign(existing, { name: input.name, role: input.role, passwordHash: input.passwordHash, active: input.active ?? true });
        return publicUser(existing);
      }
      const user: AdminUserWithHash = {
        id: randomUUID(),
        name: input.name,
        email,
        role: input.role,
        active: input.active ?? true,
        passwordHash: input.passwordHash,
        createdAt: new Date().toISOString(),
      };
      store.users.push(user);
      return publicUser(user);
    });
  }

  async touchLogin(id: string) {
    await this.store.mutate((store) => {
      const u = store.users.find((x) => x.id === id);
      if (u) u.lastLoginAt = new Date().toISOString();
    });
  }
}
