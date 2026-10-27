/**
 * Lead schemas — shared by the browser (client-side validation) and the server
 * (API + repository). Keep this file free of server-only imports.
 *
 * Error messages are short CODES ("required", "email", "consent", "too_long",
 * "invalid"); the UI maps them to the approved copy in `en.forms.errors`.
 */
import { z } from "zod";

/* ───────────────────────── Types & statuses ───────────────────────── */

export const LEAD_TYPES = ["quote", "carrier"] as const;
export type LeadType = (typeof LEAD_TYPES)[number];

/** Pipeline per lead type, in display order. "spam" is allowed for both. */
export const QUOTE_STATUSES = ["new", "reviewing", "quoted", "won", "lost", "spam"] as const;
export const CARRIER_STATUSES = ["new", "reviewing", "approved", "rejected", "spam"] as const;
export const LEAD_STATUSES = ["new", "reviewing", "quoted", "won", "lost", "approved", "rejected", "spam"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const statusesFor = (type: LeadType): readonly LeadStatus[] =>
  type === "quote" ? QUOTE_STATUSES : CARRIER_STATUSES;

export const isLeadType = (v: unknown): v is LeadType => (LEAD_TYPES as readonly string[]).includes(String(v));
export const isLeadStatus = (v: unknown): v is LeadStatus => (LEAD_STATUSES as readonly string[]).includes(String(v));
export const isStatusAllowed = (type: LeadType, status: LeadStatus) => statusesFor(type).includes(status);

/** Terminal / closed statuses — used for dashboard grouping only. */
export const CLOSED_STATUSES: readonly LeadStatus[] = ["won", "lost", "approved", "rejected", "spam"];

/* ───────────────────────── Field primitives ───────────────────────── */

const required = (max: number) => z.string().trim().min(1, "required").max(max, "too_long");

/** Optional free text: "" / undefined → undefined. */
const optional = (max: number) =>
  z
    .string()
    .trim()
    .max(max, "too_long")
    .optional()
    .transform((v) => (v ? v : undefined));

const email = z.string().trim().min(1, "required").max(254, "too_long").pipe(z.email("email"));

const phone = z
  .string()
  .trim()
  .min(1, "required")
  .max(40, "too_long")
  .regex(/^[+()0-9\s.\-/]{6,40}$/, "invalid");

/** HTML date input value (YYYY-MM-DD) or empty. */
const isoDate = z
  .string()
  .trim()
  .max(10, "invalid")
  .regex(/^(\d{4}-\d{2}-\d{2})?$/, "invalid")
  .optional()
  .transform((v) => (v ? v : undefined));

const consent = z.literal(true, "consent");

/* ───────────────────────── Form schemas ───────────────────────── */

export const quoteFormSchema = z.object({
  companyName: required(160),
  contactPerson: required(120),
  email,
  phone,
  pickupLocation: required(200),
  deliveryLocation: required(200),
  cargoDescription: required(2000),
  weight: optional(120),
  pickupDate: isoDate,
  deliveryDate: isoDate,
  additional: optional(2000),
  consent,
});

export const carrierFormSchema = z.object({
  companyName: required(160),
  contactPerson: required(120),
  email,
  phone,
  country: required(80),
  fleetSize: optional(20),
  vehicleTypes: required(300),
  regions: optional(500),
  message: optional(2000),
  consent,
});

export type QuoteFormInput = z.input<typeof quoteFormSchema>;
export type QuoteFormValues = z.output<typeof quoteFormSchema>;
export type CarrierFormInput = z.input<typeof carrierFormSchema>;
export type CarrierFormValues = z.output<typeof carrierFormSchema>;

export const formSchemaFor = (type: LeadType) => (type === "quote" ? quoteFormSchema : carrierFormSchema);

/** Field order per form — used to focus the first invalid field. */
export const QUOTE_FIELD_ORDER = [
  "companyName",
  "contactPerson",
  "email",
  "phone",
  "pickupLocation",
  "deliveryLocation",
  "cargoDescription",
  "weight",
  "pickupDate",
  "deliveryDate",
  "additional",
  "consent",
] as const;

export const CARRIER_FIELD_ORDER = [
  "companyName",
  "contactPerson",
  "email",
  "phone",
  "country",
  "fleetSize",
  "vehicleTypes",
  "regions",
  "message",
  "consent",
] as const;

/* ───────────────────────── Request metadata (client → API) ───────────────────────── */

export const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"] as const;
export type UtmKey = (typeof UTM_KEYS)[number];
export type Utm = Partial<Record<UtmKey, string>>;

export const enquiryMetaSchema = z.object({
  type: z.enum(LEAD_TYPES),
  /** Page path the form was submitted from (no query string). */
  source: z.string().trim().max(300).optional(),
  utm: z.partialRecord(z.enum(UTM_KEYS), z.string().trim().max(200)).optional(),
  locale: z.string().trim().max(10).optional(),
  /** Honeypot — must stay empty. Hidden from humans and assistive tech. */
  website: z.string().max(500).optional(),
});

/* ───────────────────────── Error helpers ───────────────────────── */

export type FieldErrors = Record<string, string>;

/** First error code per field, e.g. { email: "email", consent: "consent" }. */
export function fieldErrorsOf(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path.map(String).join(".") || "_form";
    // missing / wrong-type fields come from zod itself (not our codes) → normalise to "required"
    const code = issue.code === "invalid_type" ? "required" : issue.message;
    if (!(key in out)) out[key] = code;
  }
  return out;
}
