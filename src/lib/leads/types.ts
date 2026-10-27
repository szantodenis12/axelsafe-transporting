/**
 * Lead domain types + repository contract. No runtime dependencies.
 */
import type { CarrierFormValues, LeadStatus, LeadType, QuoteFormValues, Utm } from "./schema";

/* ───────────────────────── Entities ───────────────────────── */

export type QuoteDetails = Omit<QuoteFormValues, "companyName" | "contactPerson" | "email" | "phone" | "consent">;
export type CarrierDetails = Omit<CarrierFormValues, "companyName" | "contactPerson" | "email" | "phone" | "consent">;

type LeadCommon = {
  id: string;
  /** Server-generated UUID returned to the browser (used as analytics event_id). */
  requestId: string;
  status: LeadStatus;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  consentAt: string;
  source?: string;
  utm?: Utm;
  locale?: string;
  ipHash?: string;
  userAgent?: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
};

export type QuoteLead = LeadCommon & { type: "quote"; details: QuoteDetails };
export type CarrierLead = LeadCommon & { type: "carrier"; details: CarrierDetails };
export type Lead = QuoteLead | CarrierLead;

export type LeadEventKind = "created" | "status_changed" | "note" | "assigned";

export type LeadEvent = {
  id: string;
  leadId: string;
  kind: LeadEventKind;
  fromStatus?: LeadStatus;
  toStatus?: LeadStatus;
  note?: string;
  author: string;
  createdAt: string;
};

/* ───────────────────────── Inputs ───────────────────────── */

export type NewLeadMeta = {
  requestId: string;
  source?: string;
  utm?: Utm;
  locale?: string;
  ipHash?: string;
  userAgent?: string;
};

export type NewLead =
  | ({ type: "quote"; values: QuoteFormValues } & NewLeadMeta)
  | ({ type: "carrier"; values: CarrierFormValues } & NewLeadMeta);

export type LeadFilters = {
  type?: LeadType;
  status?: LeadStatus;
  /** Case-insensitive match on company, contact person, email. */
  q?: string;
  limit?: number;
};

export type LeadStats = {
  total: number;
  byType: Record<LeadType, { total: number; byStatus: Partial<Record<LeadStatus, number>> }>;
};

export type LeadWithEvents = { lead: Lead; events: LeadEvent[] };

/* ───────────────────────── Repository contract ───────────────────────── */

export interface LeadRepository {
  readonly driver: "supabase" | "local";
  create(input: NewLead): Promise<Lead>;
  list(filters?: LeadFilters): Promise<Lead[]>;
  get(id: string): Promise<LeadWithEvents | null>;
  updateStatus(id: string, status: LeadStatus, author: string, note?: string): Promise<Lead>;
  addNote(id: string, note: string, author: string): Promise<LeadEvent>;
  assign(id: string, assignee: string | null, author: string): Promise<Lead>;
  stats(): Promise<LeadStats>;
}

/* ───────────────────────── Errors ───────────────────────── */

export class LeadsNotConfiguredError extends Error {
  readonly code = "not_configured" as const;
  constructor(message = "Lead store is not configured") {
    super(message);
    this.name = "LeadsNotConfiguredError";
  }
}

export class LeadNotFoundError extends Error {
  readonly code = "not_found" as const;
  constructor(id: string) {
    super(`Lead not found: ${id}`);
    this.name = "LeadNotFoundError";
  }
}

export class InvalidStatusError extends Error {
  readonly code = "invalid_status" as const;
  constructor(type: LeadType, status: string) {
    super(`Status "${status}" is not allowed for ${type} leads`);
    this.name = "InvalidStatusError";
  }
}

/** Split validated form values into common columns + type-specific details. */
export function splitLeadValues(input: NewLead): {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  details: QuoteDetails | CarrierDetails;
} {
  // `consent` is validated (must be true) and recorded as consentAt — not stored as a field.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { companyName, contactPerson, email, phone, consent, ...details } = input.values;
  return { companyName, contactPerson, email, phone, details };
}

export function emptyStats(): LeadStats {
  return {
    total: 0,
    byType: {
      quote: { total: 0, byStatus: {} },
      carrier: { total: 0, byStatus: {} },
    },
  };
}

export function accumulateStats(rows: { type: LeadType; status: LeadStatus }[]): LeadStats {
  const stats = emptyStats();
  for (const { type, status } of rows) {
    stats.total += 1;
    const bucket = stats.byType[type];
    bucket.total += 1;
    bucket.byStatus[status] = (bucket.byStatus[status] ?? 0) + 1;
  }
  return stats;
}
