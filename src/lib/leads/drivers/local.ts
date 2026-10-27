/**
 * Local file driver — DEVELOPMENT ONLY.
 * Persists to `.data/leads.json` in the project root. Refuses to run in production:
 * serverless disks are ephemeral and the file is not shared between instances.
 */
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { isStatusAllowed, type LeadStatus } from "../schema";
import {
  accumulateStats,
  InvalidStatusError,
  LeadNotFoundError,
  splitLeadValues,
  type Lead,
  type LeadEvent,
  type LeadFilters,
  type LeadRepository,
  type LeadStats,
  type LeadWithEvents,
  type NewLead,
} from "../types";

type Store = { version: 1; leads: Lead[]; events: LeadEvent[] };

const EMPTY: Store = { version: 1, leads: [], events: [] };

export class LocalFileLeadRepository implements LeadRepository {
  readonly driver = "local" as const;
  private readonly file: string;
  /** Serialises read-modify-write cycles within this process. */
  private queue: Promise<unknown> = Promise.resolve();

  constructor(file = path.join(process.cwd(), ".data", "leads.json")) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("LocalFileLeadRepository is not allowed in production (ephemeral disk). Configure Supabase.");
    }
    this.file = file;
  }

  private async read(): Promise<Store> {
    try {
      const raw = await readFile(this.file, "utf8");
      const parsed = JSON.parse(raw) as Partial<Store>;
      return { version: 1, leads: parsed.leads ?? [], events: parsed.events ?? [] };
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code === "ENOENT") return structuredClone(EMPTY);
      throw err;
    }
  }

  private async write(store: Store) {
    await mkdir(path.dirname(this.file), { recursive: true });
    const tmp = `${this.file}.${process.pid}.tmp`;
    await writeFile(tmp, JSON.stringify(store, null, 2), "utf8");
    await rename(tmp, this.file);
  }

  private mutate<T>(fn: (store: Store) => T | Promise<T>): Promise<T> {
    const run = this.queue.then(async () => {
      const store = await this.read();
      const result = await fn(store);
      await this.write(store);
      return result;
    });
    this.queue = run.catch(() => undefined);
    return run;
  }

  private static findLead(store: Store, id: string): Lead {
    const lead = store.leads.find((l) => l.id === id);
    if (!lead) throw new LeadNotFoundError(id);
    return lead;
  }

  private static pushEvent(store: Store, e: Omit<LeadEvent, "id" | "createdAt">): LeadEvent {
    const event: LeadEvent = { ...e, id: randomUUID(), createdAt: new Date().toISOString() };
    store.events.push(event);
    return event;
  }

  async create(input: NewLead): Promise<Lead> {
    return this.mutate((store) => {
      const now = new Date().toISOString();
      const { companyName, contactPerson, email, phone, details } = splitLeadValues(input);
      const common = {
        id: randomUUID(),
        requestId: input.requestId,
        status: "new" as const,
        companyName,
        contactPerson,
        email,
        phone,
        consentAt: now,
        source: input.source,
        utm: input.utm,
        locale: input.locale,
        ipHash: input.ipHash,
        userAgent: input.userAgent,
        createdAt: now,
        updatedAt: now,
      };
      const lead = (input.type === "quote"
        ? { ...common, type: "quote", details }
        : { ...common, type: "carrier", details }) as Lead;
      store.leads.push(lead);
      LocalFileLeadRepository.pushEvent(store, { leadId: lead.id, kind: "created", toStatus: "new", author: "system" });
      return lead;
    });
  }

  async list(filters: LeadFilters = {}): Promise<Lead[]> {
    const store = await this.read();
    const q = filters.q?.trim().toLowerCase();
    return store.leads
      .filter((l) => !filters.type || l.type === filters.type)
      .filter((l) => !filters.status || l.status === filters.status)
      .filter(
        (l) =>
          !q ||
          l.companyName.toLowerCase().includes(q) ||
          l.contactPerson.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q),
      )
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, Math.min(Math.max(filters.limit ?? 200, 1), 500));
  }

  async get(id: string): Promise<LeadWithEvents | null> {
    const store = await this.read();
    const lead = store.leads.find((l) => l.id === id);
    if (!lead) return null;
    const events = store.events.filter((e) => e.leadId === id).sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    return { lead, events };
  }

  async updateStatus(id: string, status: LeadStatus, author: string, note?: string): Promise<Lead> {
    return this.mutate((store) => {
      const lead = LocalFileLeadRepository.findLead(store, id);
      if (!isStatusAllowed(lead.type, status)) throw new InvalidStatusError(lead.type, status);
      if (lead.status === status) return lead;
      const from = lead.status;
      lead.status = status;
      lead.updatedAt = new Date().toISOString();
      LocalFileLeadRepository.pushEvent(store, {
        leadId: id,
        kind: "status_changed",
        fromStatus: from,
        toStatus: status,
        note: note?.trim() || undefined,
        author,
      });
      return lead;
    });
  }

  async addNote(id: string, note: string, author: string): Promise<LeadEvent> {
    return this.mutate((store) => {
      LocalFileLeadRepository.findLead(store, id);
      return LocalFileLeadRepository.pushEvent(store, { leadId: id, kind: "note", note: note.trim(), author });
    });
  }

  async assign(id: string, assignee: string | null, author: string): Promise<Lead> {
    return this.mutate((store) => {
      const lead = LocalFileLeadRepository.findLead(store, id);
      const next = assignee?.trim() || undefined;
      if (lead.assignedTo === next) return lead;
      lead.assignedTo = next;
      lead.updatedAt = new Date().toISOString();
      LocalFileLeadRepository.pushEvent(store, {
        leadId: id,
        kind: "assigned",
        note: next ? `Assigned to ${next}` : "Unassigned",
        author,
      });
      return lead;
    });
  }

  async stats(): Promise<LeadStats> {
    const store = await this.read();
    return accumulateStats(store.leads);
  }
}
