/**
 * Supabase driver — SERVER ONLY. Uses the service-role key, which bypasses RLS.
 * Never import this from a client component and never expose the key with NEXT_PUBLIC_.
 */
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { isStatusAllowed, type LeadStatus, type LeadType, type Utm } from "../schema";
import {
  accumulateStats,
  InvalidStatusError,
  LeadNotFoundError,
  splitLeadValues,
  type Lead,
  type LeadEvent,
  type LeadEventKind,
  type LeadFilters,
  type LeadRepository,
  type LeadStats,
  type LeadWithEvents,
  type NewLead,
} from "../types";

if (typeof window !== "undefined") {
  throw new Error("leads/drivers/supabase must never be bundled for the browser");
}

type LeadRow = {
  id: string;
  request_id: string;
  type: LeadType;
  status: LeadStatus;
  company_name: string;
  contact_person: string;
  email: string;
  phone: string;
  details: Record<string, unknown>;
  consent_at: string;
  source: string | null;
  utm: Utm | null;
  locale: string | null;
  ip_hash: string | null;
  user_agent: string | null;
  assigned_to: string | null;
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
  created_at: string;
};

const LEAD_COLUMNS =
  "id,request_id,type,status,company_name,contact_person,email,phone,details,consent_at,source,utm,locale,ip_hash,user_agent,assigned_to,created_at,updated_at";

function rowToLead(r: LeadRow): Lead {
  const common = {
    id: r.id,
    requestId: r.request_id,
    status: r.status,
    companyName: r.company_name,
    contactPerson: r.contact_person,
    email: r.email,
    phone: r.phone,
    consentAt: r.consent_at,
    source: r.source ?? undefined,
    utm: r.utm ?? undefined,
    locale: r.locale ?? undefined,
    ipHash: r.ip_hash ?? undefined,
    userAgent: r.user_agent ?? undefined,
    assignedTo: r.assigned_to ?? undefined,
    createdAt: r.created_at,
    updatedAt: r.updated_at,
  };
  // `details` is validated by zod on write; trusted on read.
  return (r.type === "quote"
    ? { ...common, type: "quote", details: r.details }
    : { ...common, type: "carrier", details: r.details }) as Lead;
}

function rowToEvent(r: EventRow): LeadEvent {
  return {
    id: r.id,
    leadId: r.lead_id,
    kind: r.kind,
    fromStatus: r.from_status ?? undefined,
    toStatus: r.to_status ?? undefined,
    note: r.note ?? undefined,
    author: r.author,
    createdAt: r.created_at,
  };
}

/** PostgREST `or=` filter: strip characters that would break the grammar. */
const sanitizeQuery = (q: string) => q.replace(/[,()%*\\]/g, " ").replace(/\s+/g, " ").trim().slice(0, 80);

export class SupabaseLeadRepository implements LeadRepository {
  readonly driver = "supabase" as const;
  private readonly db: SupabaseClient;

  constructor(url: string, serviceRoleKey: string) {
    this.db = createClient(url, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
      global: { headers: { "x-application-name": "axelsafe-site" } },
    });
  }

  private async fetchLead(id: string): Promise<Lead> {
    const { data, error } = await this.db.from("leads").select(LEAD_COLUMNS).eq("id", id).maybeSingle<LeadRow>();
    if (error) throw error;
    if (!data) throw new LeadNotFoundError(id);
    return rowToLead(data);
  }

  private async insertEvent(e: Omit<EventRow, "id" | "created_at">): Promise<LeadEvent> {
    const { data, error } = await this.db.from("lead_events").insert(e).select("*").single<EventRow>();
    if (error) throw error;
    return rowToEvent(data);
  }

  async create(input: NewLead): Promise<Lead> {
    const { companyName, contactPerson, email, phone, details } = splitLeadValues(input);
    const { data, error } = await this.db
      .from("leads")
      .insert({
        request_id: input.requestId,
        type: input.type,
        status: "new",
        company_name: companyName,
        contact_person: contactPerson,
        email,
        phone,
        details,
        source: input.source ?? null,
        utm: input.utm ?? null,
        locale: input.locale ?? null,
        ip_hash: input.ipHash ?? null,
        user_agent: input.userAgent ?? null,
      })
      .select(LEAD_COLUMNS)
      .single<LeadRow>();
    if (error) throw error;
    await this.insertEvent({ lead_id: data.id, kind: "created", from_status: null, to_status: "new", note: null, author: "system" });
    return rowToLead(data);
  }

  async list(filters: LeadFilters = {}): Promise<Lead[]> {
    let query = this.db.from("leads").select(LEAD_COLUMNS).order("created_at", { ascending: false });
    if (filters.type) query = query.eq("type", filters.type);
    if (filters.status) query = query.eq("status", filters.status);
    const q = filters.q ? sanitizeQuery(filters.q) : "";
    if (q) query = query.or(`company_name.ilike.*${q}*,contact_person.ilike.*${q}*,email.ilike.*${q}*`);
    query = query.limit(Math.min(Math.max(filters.limit ?? 200, 1), 500));
    const { data, error } = await query.returns<LeadRow[]>();
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

  async updateStatus(id: string, status: LeadStatus, author: string, note?: string): Promise<Lead> {
    const current = await this.fetchLead(id);
    if (!isStatusAllowed(current.type, status)) throw new InvalidStatusError(current.type, status);
    if (current.status === status) return current;
    const { data, error } = await this.db
      .from("leads")
      .update({ status })
      .eq("id", id)
      .select(LEAD_COLUMNS)
      .single<LeadRow>();
    if (error) throw error;
    // Two statements, no transaction — acceptable for v1. Roadmap: move to a Postgres RPC.
    await this.insertEvent({
      lead_id: id,
      kind: "status_changed",
      from_status: current.status,
      to_status: status,
      note: note?.trim() || null,
      author,
    });
    return rowToLead(data);
  }

  async addNote(id: string, note: string, author: string): Promise<LeadEvent> {
    await this.fetchLead(id);
    return this.insertEvent({ lead_id: id, kind: "note", from_status: null, to_status: null, note: note.trim(), author });
  }

  async assign(id: string, assignee: string | null, author: string): Promise<Lead> {
    const current = await this.fetchLead(id);
    const next = assignee?.trim() || null;
    if ((current.assignedTo ?? null) === next) return current;
    const { data, error } = await this.db
      .from("leads")
      .update({ assigned_to: next })
      .eq("id", id)
      .select(LEAD_COLUMNS)
      .single<LeadRow>();
    if (error) throw error;
    await this.insertEvent({
      lead_id: id,
      kind: "assigned",
      from_status: null,
      to_status: null,
      note: next ? `Assigned to ${next}` : "Unassigned",
      author,
    });
    return rowToLead(data);
  }

  async stats(): Promise<LeadStats> {
    // v1: aggregate in JS (fine up to tens of thousands of rows). Roadmap: SQL view / RPC.
    const { data, error } = await this.db.from("leads").select("type,status").returns<{ type: LeadType; status: LeadStatus }[]>();
    if (error) throw error;
    return accumulateStats(data ?? []);
  }
}
