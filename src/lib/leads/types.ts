/**
 * Lead domain types + repository contract. No runtime dependencies besides ./schema.
 */
import {
  isStatusAllowed,
  normalizeVat,
  phoneKey,
  type CallbackFormValues,
  type CallbackTime,
  type CarrierCheckKey,
  type CarrierFormValues,
  type Currency,
  type LeadStatus,
  type LeadType,
  type LostReason,
  type ManualLeadValues,
  type QuickQuoteFormValues,
  type QuoteFormValues,
  type SourceChannel,
  type UserRole,
  type Utm,
  type VehicleType,
} from "./schema";

/* ───────────────────────── Entities ───────────────────────── */

export type QuoteDetails = {
  /** "quick" = Cerere rapidă (route only). Missing = full form (legacy rows). */
  mode?: "full" | "quick";
  pickupLocation: string;
  deliveryLocation: string;
  cargoDescription?: string;
  weight?: string;
  pickupDate?: string;
  deliveryDate?: string;
  additional?: string;
};

export type CarrierDetails = {
  country?: string;
  fleetSize?: string;
  /** Array since v2; legacy rows hold a free-text string. Read through `vehicleList()`. */
  vehicleTypes: VehicleType[] | string;
  cmrInsurance?: "yes" | "no";
  licenceNumber?: string;
  regions?: string;
  message?: string;
};

export type CallbackDetails = {
  preferredTime: CallbackTime;
  note?: string;
};

/** Who did something in the CRM. `id` is null for the shared-password fallback login / system. */
export type Actor = { id: string | null; name: string };

export type CheckMark = { at: string; by: string; byId?: string };
export type CarrierChecks = Partial<Record<CarrierCheckKey, CheckMark>>;

/** Snapshot of the ANAF public VAT web service answer (v9), stored on the lead. */
export type AnafSnapshot = {
  cui: string;
  name: string;
  address: string;
  regCom?: string;
  caen?: string;
  registrationStatus?: string;
  registeredAt?: string;
  vatPayer: boolean;
  vatSince?: string;
  inactive: boolean;
  inactiveSince?: string;
  deregisteredAt?: string;
  /** Derived from the registration status text (ANAF v9 has no dedicated insolvency field). */
  insolvencyFlag: boolean;
  eInvoice?: boolean;
  checkedAt: string;
  checkedBy: string;
};

type LeadCommon = {
  id: string;
  /** Server-generated UUID returned to the browser (used as analytics event_id). */
  requestId: string;
  status: LeadStatus;
  companyName?: string;
  contactPerson: string;
  email?: string;
  phone?: string;
  /** CUI / VAT number (carriers, optional for others). Normalised, upper case. */
  vatNumber?: string;
  /** null for leads entered manually from a phone call / e-mail etc. */
  consentAt?: string;
  sourceChannel: SourceChannel;
  source?: string;
  utm?: Utm;
  locale?: string;
  ipHash?: string;
  userAgent?: string;
  /** admin_users.id of the owner. */
  assignedUserId?: string;
  /** Owner display name (denormalised; legacy v1 rows only have this). */
  assignedTo?: string;
  createdById?: string;
  firstResponseAt?: string;
  nextActionAt?: string;
  nextActionNote?: string;
  offeredPrice?: number;
  carrierCost?: number;
  currency?: Currency;
  lostReason?: LostReason;
  lostNote?: string;
  checks: CarrierChecks;
  anaf?: AnafSnapshot;
  approvedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type QuoteLead = LeadCommon & { type: "quote"; details: QuoteDetails };
export type CarrierLead = LeadCommon & { type: "carrier"; details: CarrierDetails };
export type CallbackLead = LeadCommon & { type: "callback"; details: CallbackDetails };
export type Lead = QuoteLead | CarrierLead | CallbackLead;

export const LEAD_EVENT_KINDS = [
  "created",
  "status_changed",
  "note",
  "assigned",
  "follow_up",
  "economics",
  "verification",
  "anaf_lookup",
] as const;
export type LeadEventKind = (typeof LEAD_EVENT_KINDS)[number];

export type LeadEvent = {
  id: string;
  leadId: string;
  kind: LeadEventKind;
  fromStatus?: LeadStatus;
  toStatus?: LeadStatus;
  note?: string;
  author: string;
  authorId?: string;
  createdAt: string;
};

/* ───────────────────────── Inputs ───────────────────────── */

export type NewLead = {
  type: LeadType;
  requestId: string;
  companyName?: string;
  contactPerson: string;
  email?: string;
  phone?: string;
  vatNumber?: string;
  details: QuoteDetails | CarrierDetails | CallbackDetails;
  /** Set for website submissions (consent checkbox); undefined for manual entries. */
  consentAt?: string;
  sourceChannel: SourceChannel;
  source?: string;
  utm?: Utm;
  locale?: string;
  ipHash?: string;
  userAgent?: string;
  /** Manual entries: the dispatcher who typed it in (becomes owner + event author). */
  createdBy?: Actor;
};

export type WebMeta = Pick<NewLead, "requestId" | "source" | "utm" | "locale" | "ipHash" | "userAgent">;

/** Website form values → NewLead. */
export function leadFromWebForm(
  input:
    | { form: "quote"; values: QuoteFormValues }
    | { form: "quote_quick"; values: QuickQuoteFormValues }
    | { form: "carrier"; values: CarrierFormValues }
    | { form: "callback"; values: CallbackFormValues },
  meta: WebMeta,
): NewLead {
  const base = { ...meta, sourceChannel: "site" as const, consentAt: new Date().toISOString() };
  switch (input.form) {
    case "quote": {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { companyName, contactPerson, email, phone, consent, ...details } = input.values;
      return { ...base, type: "quote", companyName, contactPerson, email: email.toLowerCase(), phone, details: { mode: "full", ...details } };
    }
    case "quote_quick": {
      const v = input.values;
      return {
        ...base,
        type: "quote",
        contactPerson: v.contactPerson,
        phone: v.phone,
        details: { mode: "quick", pickupLocation: v.pickupLocation, deliveryLocation: v.deliveryLocation, additional: v.note },
      };
    }
    case "carrier": {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { companyName, contactPerson, email, phone, vatNumber, consent, ...details } = input.values;
      return { ...base, type: "carrier", companyName, contactPerson, email: email.toLowerCase(), phone, vatNumber, details };
    }
    case "callback": {
      const v = input.values;
      return { ...base, type: "callback", contactPerson: v.contactPerson, phone: v.phone, details: { preferredTime: v.preferredTime } };
    }
  }
}

/** Admin "Lead nou" values → NewLead. */
export function leadFromManual(v: ManualLeadValues, requestId: string, createdBy: Actor): NewLead {
  const common = {
    requestId,
    contactPerson: v.contactPerson,
    companyName: v.companyName,
    email: v.email?.toLowerCase(),
    phone: v.phone,
    vatNumber: v.vatNumber ? normalizeVat(v.vatNumber) : undefined,
    sourceChannel: v.sourceChannel,
    createdBy,
  };
  if (v.type === "quote") {
    return {
      ...common,
      type: "quote",
      details: {
        mode: "full",
        pickupLocation: v.pickupLocation ?? "",
        deliveryLocation: v.deliveryLocation ?? "",
        cargoDescription: v.cargoDescription,
        additional: v.notes,
      },
    };
  }
  if (v.type === "carrier") {
    return {
      ...common,
      type: "carrier",
      details: { country: v.country, vehicleTypes: v.vehicleTypes, regions: v.regions, message: v.notes },
    };
  }
  return { ...common, type: "callback", details: { preferredTime: v.preferredTime ?? "any", note: v.notes } };
}

export type OwnerFilter = "all" | "mine" | "unassigned";

export type LeadFilters = {
  type?: LeadType;
  status?: LeadStatus;
  channel?: SourceChannel;
  owner?: OwnerFilter;
  /** Required for owner = "mine". */
  userId?: string | null;
  /** Case-insensitive match on company, contact person, email, phone, CUI. */
  q?: string;
  limit?: number;
};

export type CarrierFilters = { vehicle?: VehicleType; q?: string };

export type StatusChange = {
  status: LeadStatus;
  note?: string;
  lostReason?: LostReason;
  lostNote?: string;
};

export type Economics = { offeredPrice?: number; carrierCost?: number; currency?: Currency };

export type LeadWithEvents = { lead: Lead; events: LeadEvent[] };

/** Counts per type and status (nav badges + filter chips). Cheap: only `type` + `status` are read. */
export type LeadStats = {
  total: number;
  byType: Record<LeadType, { total: number; byStatus: Partial<Record<LeadStatus, number>> }>;
};

export function accumulateStats(rows: { type: LeadType; status: LeadStatus }[]): LeadStats {
  const stats: LeadStats = {
    total: 0,
    byType: { quote: { total: 0, byStatus: {} }, carrier: { total: 0, byStatus: {} }, callback: { total: 0, byStatus: {} } },
  };
  for (const { type, status } of rows) {
    const bucket = stats.byType[type];
    if (!bucket) continue;
    stats.total += 1;
    bucket.total += 1;
    bucket.byStatus[status] = (bucket.byStatus[status] ?? 0) + 1;
  }
  return stats;
}

/* ───────────────────────── Repository contract ───────────────────────── */

export interface LeadRepository {
  readonly driver: "supabase" | "local";
  create(input: NewLead): Promise<Lead>;
  list(filters?: LeadFilters): Promise<Lead[]>;
  /** Every lead (newest first, capped): dashboard metrics are computed from this. */
  all(): Promise<Lead[]>;
  get(id: string): Promise<LeadWithEvents | null>;
  updateStatus(id: string, change: StatusChange, actor: Actor): Promise<Lead>;
  addNote(id: string, note: string, actor: Actor): Promise<LeadEvent>;
  /** `assignee` null = unassign. */
  assign(id: string, assignee: Actor | null, actor: Actor): Promise<Lead>;
  setFollowUp(id: string, at: string | null, note: string | null, actor: Actor): Promise<Lead>;
  setEconomics(id: string, economics: Economics, actor: Actor): Promise<Lead>;
  setCheck(id: string, key: CarrierCheckKey, checked: boolean, actor: Actor): Promise<Lead>;
  saveAnaf(id: string, snapshot: AnafSnapshot, actor: Actor): Promise<Lead>;
  /** Other leads with the same e-mail, phone (last 9 digits) or CUI. */
  duplicates(lead: Lead): Promise<Lead[]>;
  /** Approved carriers, filtered by vehicle type + free text (company, country, regions). */
  carriers(filters?: CarrierFilters): Promise<CarrierLead[]>;
  /** Counts per type/status over every lead (incl. spam). */
  stats(): Promise<LeadStats>;
}

/* ───────────────────────── Users ───────────────────────── */

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  active: boolean;
  createdAt: string;
  lastLoginAt?: string;
};

export type AdminUserWithHash = AdminUser & { passwordHash: string };

export type NewAdminUser = { name: string; email: string; role: UserRole; passwordHash: string; active?: boolean };

export interface UserRepository {
  readonly driver: "supabase" | "local";
  countActive(): Promise<number>;
  list(): Promise<AdminUser[]>;
  getById(id: string): Promise<AdminUser | null>;
  getByEmailWithHash(email: string): Promise<AdminUserWithHash | null>;
  /** Insert, or update name/role/hash/active when the e-mail already exists. */
  upsert(input: NewAdminUser): Promise<AdminUser>;
  touchLogin(id: string): Promise<void>;
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

/** Business rule violations (lost without reason, approve without checklist, …). Message is Romanian, shown in the CRM. */
export class LeadRuleError extends Error {
  readonly code = "rule" as const;
  constructor(message: string) {
    super(message);
    this.name = "LeadRuleError";
  }
}

/* ───────────────────────── Shared rules (both drivers) ───────────────────────── */

export const allChecksDone = (checks: CarrierChecks | undefined) =>
  (["license", "cmr", "vehicleDocs", "companyActive"] as const).every((k) => Boolean(checks?.[k]));

/**
 * Validates a status change and returns the column patch to apply. Throws InvalidStatusError /
 * LeadRuleError. Returns null when nothing changes.
 */
export function planStatusChange(lead: Lead, change: StatusChange, nowIso: string) {
  if (!isStatusAllowed(lead.type, change.status)) throw new InvalidStatusError(lead.type, change.status);
  if (lead.status === change.status) return null;
  if (change.status === "lost") {
    if (!change.lostReason) throw new LeadRuleError("Alegeți motivul pentru care lead-ul a fost pierdut.");
    if (change.lostReason === "other" && !change.lostNote?.trim()) throw new LeadRuleError("Pentru „Altul”, scrieți motivul.");
  }
  if (change.status === "approved" && lead.type === "carrier" && !allChecksDone(lead.checks)) {
    throw new LeadRuleError("Transportatorul poate fi aprobat doar după ce toate cele 4 verificări sunt bifate.");
  }
  return {
    status: change.status,
    firstResponseAt: lead.firstResponseAt ?? (lead.status === "new" ? nowIso : undefined),
    lostReason: change.status === "lost" ? change.lostReason : undefined,
    lostNote: change.status === "lost" ? change.lostNote?.trim() || undefined : undefined,
    approvedAt: change.status === "approved" ? nowIso : lead.approvedAt,
  };
}

/** Vehicle types of a carrier lead (array in v2, free text in v1 rows). */
export function vehicleList(details: CarrierDetails): string[] {
  return Array.isArray(details.vehicleTypes) ? details.vehicleTypes : details.vehicleTypes ? [details.vehicleTypes] : [];
}

export function matchesDuplicate(a: Lead, b: Lead): boolean {
  if (a.id === b.id) return false;
  if (a.email && b.email && a.email.toLowerCase() === b.email.toLowerCase()) return true;
  const pa = phoneKey(a.phone);
  if (pa && pa === phoneKey(b.phone)) return true;
  if (a.vatNumber && b.vatNumber && vatDigits(a.vatNumber) === vatDigits(b.vatNumber)) return true;
  return false;
}

/** "RO12345678" and "12345678" are the same Romanian CUI. */
export const vatDigits = (vat: string) => normalizeVat(vat).replace(/^RO/, "");

/** Display title for a lead: company, else the person. */
export const leadTitle = (lead: Pick<Lead, "companyName" | "contactPerson">) => lead.companyName || lead.contactPerson;

/** Shared by both drivers: vehicle + free-text filter over approved carriers. */
export function filterCarriers(rows: CarrierLead[], { vehicle, q }: CarrierFilters): CarrierLead[] {
  const needle = q?.trim().toLowerCase();
  return rows
    .filter((c) => !vehicle || vehicleList(c.details).includes(vehicle))
    .filter((c) => {
      if (!needle) return true;
      const hay = [c.companyName, c.contactPerson, c.details.country, c.details.regions, c.details.message, c.vatNumber]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return needle.split(/\s+/).every((w) => hay.includes(w));
    })
    .sort((a, b) => (a.companyName ?? a.contactPerson).localeCompare(b.companyName ?? b.contactPerson, "ro"));
}

