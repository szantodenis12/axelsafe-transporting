/**
 * Supabase drivers — SERVER ONLY. Use the service-role key, which bypasses RLS.
 * Never import this from a client component and never expose the key with NEXT_PUBLIC_.
 *
 * Requires migrations 0001 + 0002. Mirrors the local driver rule for rule.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  phoneKey,
  type CarrierCheckKey,
  type Currency,
  type LeadStatus,
  type LeadType,
  type LostReason,
  type SourceChannel,
  type UserRole,
  type Utm,
} from "../schema";
import {
  accumulateStats,
  filterCarriers,
  LeadNotFoundError,
  matchesDuplicate,
  planStatusChange,
  vatDigits,
  type Actor,
  type AdminUser,
  type AdminUserWithHash,
  type AnafSnapshot,
  type CarrierChecks,
  type CarrierFilters,
  type CarrierLead,
  type Economics,
  type Lead,
  type LeadEvent,
  type LeadEventKind,
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

if (typeof window !== "undefined") {
  throw new Error("leads/drivers/supabase must never be bundled for the browser");
}

export function supabaseClient(url: string, serviceRoleKey: string): SupabaseClient {
  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: { headers: { "x-application-name": "axelsafe-site" } },
  });
}

type LeadRow = {
  id: string;
  request_id: string;
  type: LeadType;
  status: LeadStatus;
  company_name: string | null;
  contact_person: string;
  email: string | null;
  phone: string | null;
  vat_number: string | null;
  details: Record<string, unknown>;
  consent_at: string | null;
  source_channel: SourceChannel;
  source: string | null;
  utm: Utm | null;
  locale: string | null;
  ip_hash: string | null;
  user_agent: string | null;
  assigned_to: string | null;
  assigned_user_id: string | null;
  created_by: string | null;
  first_response_at: string | null;
  next_action_at: string | null;
  next_action_note: string | null;
  offered_price: number | string | null;
  carrier_cost: number | string | null;
  currency: Currency | null;
  lost_reason: LostReason | null;
  lost_note: string | null;
  carrier_checks: CarrierChecks | null;
  anaf: AnafSnapshot | null;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
};

type EventRow = {
  id: string;
  lead_id: string;
  kind: LeadEventKind;
  from_status: LeadStatus | null;
  to_status: LeadStatus | null;
  note: string | null;
  author: string;
  author_id: string | null;
  created_at: string;
};

const LEAD_COLUMNS = [
  "id,request_id,type,status,company_name,contact_person,email,phone,vat_number,details,consent_at,source_channel",
  "source,utm,locale,ip_hash,user_agent,assigned_to,assigned_user_id,created_by,first_response_at,next_action_at",
  "next_action_note,offered_price,carrier_cost,currency,lost_reason,lost_note,carrier_checks,anaf,approved_at,created_at,updated_at",
].join(",");

const num = (v: number | string | null) => (v === null || v === undefined ? undefined : Number(v));
const opt = <T>(v: T | null) => v ?? undefined;

function rowToLead(r: LeadRow): Lead {
  const common = {
    id: r.id,
    requestId: r.request_id,
    status: r.status,
    companyName: opt(r.company_name),
    contactPerson: r.contact_person,
    email: opt(r.email),
    phone: opt(r.phone),
    vatNumber: opt(r.vat_number),
    consentAt: opt(r.consent_at),
    sourceChannel: r.source_channel ?? "site",
    source: opt(r.source),
    utm: opt(r.utm),
    locale: opt(r.locale),
    ipHash: opt(r.ip_hash),
    userAgent: opt(r.user_agent),
    assignedTo: opt(r.assigned_to),
    assignedUserId: opt(r.assigned_user_id),
    createdById: opt(r.created_by),
    firstResponseAt: opt(r.first_response_at),
    nextActionAt: opt(r.next_action_at),
    nextActionNote: opt(r.next_action_note),
    offeredPrice: num(r.offered_price),
    carrierCost: num(r.carrier_cost),
    currency: opt(r.currency),
    lostReason: opt(r.lost_reason),
    lostNote: opt(r.lost_note),
    checks: r.carrier_checks ?? {},
    anaf: opt(r.anaf),
    approvedAt: opt(r.approved_at),
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
  // `details` is validated by zod on write; trusted on read.
  return { ...common, type: r.type, details: r.details } as Lead;
}

function rowToEvent(r: EventRow): LeadEvent {
  return {
    id: r.id,
    leadId: r.lead_id,
    kind: r.kind,
    fromStatus: opt(r.from_status),
    toStatus: opt(r.to_status),
    note: opt(r.note),
    author: r.author,
    authorId: opt(r.author_id),
    createdAt: r.created_at,
  };
}

/** PostgREST `or=` filter: strip characters that would break the grammar. */
const sanitizeQuery = (q: string) => q.replace(/[,()%*\\"]/g, " ").replace(/\s+/g, " ").trim().slice(0, 80);
/** Escape LIKE wildcards for an exact case-insensitive match. */
const likeExact = (v: string) => v.replace(/[\\%_]/g, (c) => `\\${c}`);

const MAX_ALL = 5000;

export class SupabaseLeadRepository implements LeadRepository {
  readonly driver = "supabase" as const;

  constructor(private readonly db: SupabaseClient) {}

  private async fetchLead(id: string): Promise<Lead> {
    const { data, error } = await this.db.from("leads").select(LEAD_COLUMNS).eq("id", id).maybeSingle<LeadRow>();
    if (error) throw error;
    if (!data) throw new LeadNotFoundError(id);
    return rowToLead(data);
  }

  private async patch(id: string, values: Record<string, unknown>): Promise<Lead> {
    const { data, error } = await this.db.from("leads").update(values).eq("id", id).select(LEAD_COLUMNS).single<LeadRow>();
    if (error) throw error;
    return rowToLead(data);
  }

  private async insertEvent(
    e: { lead_id: string; kind: LeadEventKind; from_status?: LeadStatus | null; to_status?: LeadStatus | null; note?: string | null },
    actor: Actor,
  ): Promise<LeadEvent> {
    const { data, error } = await this.db
      .from("lead_events")
      .insert({ from_status: null, to_status: null, note: null, ...e, author: actor.name.slice(0, 80), author_id: actor.id })
      .select("*")
      .single<EventRow>();
    if (error) throw error;
    return rowToEvent(data);
  }

  async create(input: NewLead): Promise<Lead> {
    const owner = input.createdBy?.id ? input.createdBy : undefined;
    const { data, error } = await this.db
      .from("leads")
      .insert({
        request_id: input.requestId,
        type: input.type,
        status: "new",
        company_name: input.companyName ?? null,
        contact_person: input.contactPerson,
        email: input.email ?? null,
        phone: input.phone ?? null,
        vat_number: input.vatNumber ?? null,
        details: input.details,
        consent_at: input.consentAt ?? null,
        source_channel: input.sourceChannel,
        source: input.source ?? null,
        utm: input.utm ?? null,
        locale: input.locale ?? null,
        ip_hash: input.ipHash ?? null,
        user_agent: input.userAgent ?? null,
        assigned_user_id: owner?.id ?? null,
        assigned_to: owner?.name.slice(0, 80) ?? null,
        created_by: input.createdBy?.id ?? null,
      })
      .select(LEAD_COLUMNS)
      .single<LeadRow>();
    if (error) throw error;
    await this.insertEvent(
      { lead_id: data.id, kind: "created", to_status: "new", note: input.createdBy ? "Adăugat manual în CRM" : null },
      input.createdBy ?? { id: null, name: "system" },
    );
    return rowToLead(data);
  }

  async list(filters: LeadFilters = {}): Promise<Lead[]> {
    let query = this.db.from("leads").select(LEAD_COLUMNS).order("created_at", { ascending: false });
    if (filters.type) query = query.eq("type", filters.type);
    if (filters.status) query = query.eq("status", filters.status);
    if (filters.channel) query = query.eq("source_channel", filters.channel);
    if (filters.owner === "mine") {
      if (!filters.userId) return [];
      query = query.eq("assigned_user_id", filters.userId);
    } else if (filters.owner === "unassigned") {
      query = query.is("assigned_user_id", null);
    }
    const q = filters.q ? sanitizeQuery(filters.q) : "";
    if (q) {
      const ors = [`company_name.ilike.*${q}*`, `contact_person.ilike.*${q}*`, `email.ilike.*${q}*`, `vat_number.ilike.*${q}*`];
      const digits = phoneKey(q);
      if (digits) ors.push(`phone_key.ilike.*${digits}*`);
      query = query.or(ors.join(","));
    }
    query = query.limit(Math.min(Math.max(filters.limit ?? 200, 1), 500));
    const { data, error } = await query.returns<LeadRow[]>();
    if (error) throw error;
    return (data ?? []).map(rowToLead);
  }

  async all(): Promise<Lead[]> {
    // Aggregated in JS — fine for a few thousand leads. Roadmap: SQL view / RPC.
    const { data, error } = await this.db
      .from("leads")
      .select(LEAD_COLUMNS)
      .order("created_at", { ascending: false })
      .limit(MAX_ALL)
      .returns<LeadRow[]>();
    if (error) throw error;
    return (data ?? []).map(rowToLead);
  }

  async get(id: string): Promise<LeadWithEvents | null> {
    const { data, error } = await this.db.from("leads").select(LEAD_COLUMNS).eq("id", id).maybeSingle<LeadRow>();
    if (error) throw error;
    if (!data) return null;
    const ev = await this.db
      .from("lead_events")
      .select("*")
      .eq("lead_id", id)
      .order("created_at", { ascending: true })
      .returns<EventRow[]>();
    if (ev.error) throw ev.error;
    return { lead: rowToLead(data), events: (ev.data ?? []).map(rowToEvent) };
  }

  async updateStatus(id: string, change: StatusChange, actor: Actor): Promise<Lead> {
    const current = await this.fetchLead(id);
    const plan = planStatusChange(current, change, new Date().toISOString());
    if (!plan) return current;
    // Two statements, no transaction — acceptable at this volume. Roadmap: Postgres RPC.
    const lead = await this.patch(id, {
      status: plan.status,
      first_response_at: plan.firstResponseAt ?? null,
      lost_reason: plan.lostReason ?? null,
      lost_note: plan.lostNote ?? null,
      approved_at: plan.approvedAt ?? null,
    });
    const reason = plan.lostReason ? `Motiv: ${LOST_REASON_LABEL[plan.lostReason]}${plan.lostNote ? ` · ${plan.lostNote}` : ""}` : undefined;
    await this.insertEvent(
      {
        lead_id: id,
        kind: "status_changed",
        from_status: current.status,
        to_status: change.status,
        note: [reason, change.note?.trim()].filter(Boolean).join("\n") || null,
      },
      actor,
    );
    return lead;
  }

  async addNote(id: string, note: string, actor: Actor): Promise<LeadEvent> {
    const current = await this.fetchLead(id);
    if (!current.firstResponseAt) {
      // Conditional update: only the first note sets it, even under concurrency.
      const { error } = await this.db
        .from("leads")
        .update({ first_response_at: new Date().toISOString() })
        .eq("id", id)
        .is("first_response_at", null);
      if (error) throw error;
    }
    return this.insertEvent({ lead_id: id, kind: "note", note: note.trim() }, actor);
  }

  async assign(id: string, assignee: Actor | null, actor: Actor): Promise<Lead> {
    const current = await this.fetchLead(id);
    const nextId = assignee?.id ?? null;
    if ((current.assignedUserId ?? null) === nextId && (nextId || !current.assignedTo)) return current;
    const lead = await this.patch(id, { assigned_user_id: nextId, assigned_to: nextId ? assignee!.name.slice(0, 80) : null });
    const note = !nextId ? "Nealocat" : nextId === actor.id ? `Preluat de ${assignee!.name}` : `Alocat lui ${assignee!.name}`;
    await this.insertEvent({ lead_id: id, kind: "assigned", note }, actor);
    return lead;
  }

  async setFollowUp(id: string, at: string | null, note: string | null, actor: Actor): Promise<Lead> {
    await this.fetchLead(id);
    const cleanNote = at ? note?.trim() || null : null;
    const lead = await this.patch(id, { next_action_at: at, next_action_note: cleanNote });
    await this.insertEvent({ lead_id: id, kind: "follow_up", note: describeFollowUp(at ?? undefined, cleanNote ?? undefined) }, actor);
    return lead;
  }

  async setEconomics(id: string, economics: Economics, actor: Actor): Promise<Lead> {
    await this.fetchLead(id);
    const lead = await this.patch(id, {
      offered_price: economics.offeredPrice ?? null,
      carrier_cost: economics.carrierCost ?? null,
      currency: economics.currency ?? null,
    });
    await this.insertEvent({ lead_id: id, kind: "economics", note: describeEconomics(economics) }, actor);
    return lead;
  }

  async setCheck(id: string, key: CarrierCheckKey, checked: boolean, actor: Actor): Promise<Lead> {
    const current = await this.fetchLead(id);
    if (Boolean(current.checks[key]) === checked) return current;
    const checks: CarrierChecks = { ...current.checks };
    if (checked) checks[key] = { at: new Date().toISOString(), by: actor.name, byId: actor.id ?? undefined };
    else delete checks[key];
    const lead = await this.patch(id, { carrier_checks: checks });
    await this.insertEvent({ lead_id: id, kind: "verification", note: `${checked ? "Bifat" : "Debifat"}: ${CHECK_LABEL_RO[key]}` }, actor);
    return lead;
  }

  async saveAnaf(id: string, snapshot: AnafSnapshot, actor: Actor): Promise<Lead> {
    await this.fetchLead(id);
    const lead = await this.patch(id, { anaf: snapshot });
    await this.insertEvent({ lead_id: id, kind: "anaf_lookup", note: `ANAF: ${snapshot.name} (CUI ${snapshot.cui})` }, actor);
    return lead;
  }

  async duplicates(lead: Lead): Promise<Lead[]> {
    const queries = [];
    if (lead.email) queries.push(this.db.from("leads").select(LEAD_COLUMNS).ilike("email", likeExact(lead.email)).limit(20));
    const pk = phoneKey(lead.phone);
    if (pk) queries.push(this.db.from("leads").select(LEAD_COLUMNS).eq("phone_key", pk).limit(20));
    if (lead.vatNumber) {
      const d = vatDigits(lead.vatNumber);
      queries.push(this.db.from("leads").select(LEAD_COLUMNS).in("vat_number", [d, `RO${d}`]).limit(20));
    }
    if (!queries.length) return [];
    const results = await Promise.all(queries.map((q) => q.returns<LeadRow[]>()));
    const seen = new Map<string, Lead>();
    for (const r of results) {
      if (r.error) throw r.error;
      for (const row of r.data ?? []) {
        const l = rowToLead(row);
        if (matchesDuplicate(lead, l)) seen.set(l.id, l);
      }
    }
    return [...seen.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 20);
  }

  async carriers(filters: CarrierFilters = {}): Promise<CarrierLead[]> {
    const { data, error } = await this.db
      .from("leads")
      .select(LEAD_COLUMNS)
      .eq("type", "carrier")
      .eq("status", "approved")
      .limit(2000)
      .returns<LeadRow[]>();
    if (error) throw error;
    return filterCarriers((data ?? []).map(rowToLead) as CarrierLead[], filters);
  }

  async stats(): Promise<LeadStats> {
    // Two narrow columns only; aggregated in JS (fine up to tens of thousands of rows).
    const { data, error } = await this.db.from("leads").select("type,status").returns<{ type: LeadType; status: LeadStatus }[]>();
    if (error) throw error;
    return accumulateStats(data ?? []);
  }
}

/* ───────────────────────── Users ───────────────────────── */

type UserRow = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  password_hash: string;
  active: boolean;
  created_at: string;
  last_login_at: string | null;
};

const USER_PUBLIC = "id,name,email,role,active,created_at,last_login_at";

const rowToUser = (r: Omit<UserRow, "password_hash">): AdminUser => ({
  id: r.id,
  name: r.name,
  email: r.email,
  role: r.role,
  active: r.active,
  createdAt: r.created_at,
  lastLoginAt: r.last_login_at ?? undefined,
});

export class SupabaseUserRepository implements UserRepository {
  readonly driver = "supabase" as const;

  constructor(private readonly db: SupabaseClient) {}

  async countActive() {
    const { count, error } = await this.db.from("admin_users").select("id", { count: "exact", head: true }).eq("active", true);
    if (error) throw error;
    return count ?? 0;
  }

  async list() {
    const { data, error } = await this.db.from("admin_users").select(USER_PUBLIC).order("name").returns<UserRow[]>();
    if (error) throw error;
    return (data ?? []).map(rowToUser);
  }

  async getById(id: string) {
    if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
    const { data, error } = await this.db.from("admin_users").select(USER_PUBLIC).eq("id", id).maybeSingle<UserRow>();
    if (error) throw error;
    return data ? rowToUser(data) : null;
  }

  async getByEmailWithHash(email: string): Promise<AdminUserWithHash | null> {
    const { data, error } = await this.db
      .from("admin_users")
      .select(`${USER_PUBLIC},password_hash`)
      .eq("email", email.trim().toLowerCase())
      .maybeSingle<UserRow>();
    if (error) throw error;
    return data ? { ...rowToUser(data), passwordHash: data.password_hash } : null;
  }

  async upsert(input: NewAdminUser) {
    const { data, error } = await this.db
      .from("admin_users")
      .upsert(
        {
          name: input.name,
          email: input.email.trim().toLowerCase(),
          role: input.role,
          password_hash: input.passwordHash,
          active: input.active ?? true,
        },
        { onConflict: "email" },
      )
      .select(USER_PUBLIC)
      .single<UserRow>();
    if (error) throw error;
    return rowToUser(data);
  }

  async touchLogin(id: string) {
    const { error } = await this.db.from("admin_users").update({ last_login_at: new Date().toISOString() }).eq("id", id);
    if (error) throw error;
  }
}
