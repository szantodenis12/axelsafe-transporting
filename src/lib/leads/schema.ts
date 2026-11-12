/**
 * Lead schemas: shared by the browser (client-side validation) and the server
 * (API + repository + admin actions). Keep this file free of server-only imports.
 *
 * Public-form error messages are short CODES ("required", "email", "consent", "too_long",
 * "invalid"); the UI maps them to the approved copy in `forms.errors`.
 */
import { z } from "zod";

/* ───────────────────────── Types & statuses ───────────────────────── */

export const LEAD_TYPES = ["quote", "carrier", "callback"] as const;
export type LeadType = (typeof LEAD_TYPES)[number];

/** Pipeline per lead type, in display order. "spam" is allowed for every type. */
export const QUOTE_STATUSES = ["new", "reviewing", "quoted", "won", "lost", "spam"] as const;
export const CARRIER_STATUSES = ["new", "reviewing", "approved", "rejected", "spam"] as const;
/** Callback = "please call me back": called → converted (won) or closed without an order (lost). */
export const CALLBACK_STATUSES = ["new", "reviewing", "won", "lost", "spam"] as const;
export const LEAD_STATUSES = ["new", "reviewing", "quoted", "won", "lost", "approved", "rejected", "spam"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const statusesFor = (type: LeadType): readonly LeadStatus[] =>
  type === "quote" ? QUOTE_STATUSES : type === "carrier" ? CARRIER_STATUSES : CALLBACK_STATUSES;

export const isLeadType = (v: unknown): v is LeadType => (LEAD_TYPES as readonly string[]).includes(String(v));
export const isLeadStatus = (v: unknown): v is LeadStatus => (LEAD_STATUSES as readonly string[]).includes(String(v));
export const isStatusAllowed = (type: LeadType, status: LeadStatus) => statusesFor(type).includes(status);

/** Terminal / closed statuses. */
export const CLOSED_STATUSES: readonly LeadStatus[] = ["won", "lost", "approved", "rejected", "spam"];
export const isClosed = (s: LeadStatus) => CLOSED_STATUSES.includes(s);

/** Customer-side leads (have a price / margin / lost reason). Carriers are supply side. */
export const isCustomerType = (t: LeadType) => t === "quote" || t === "callback";

/* ───────────────────────── CRM enums ───────────────────────── */

export const SOURCE_CHANNELS = ["site", "phone", "email", "whatsapp", "exchange", "referral", "other"] as const;
export type SourceChannel = (typeof SOURCE_CHANNELS)[number];

export const LOST_REASONS = ["price", "no_truck", "no_reply", "deadline", "other"] as const;
export type LostReason = (typeof LOST_REASONS)[number];

export const CURRENCIES = ["EUR", "RON"] as const;
export type Currency = (typeof CURRENCIES)[number];

export const VEHICLE_TYPES = ["curtainsider", "reefer", "mega", "other"] as const;
export type VehicleType = (typeof VEHICLE_TYPES)[number];

export const CALLBACK_TIMES = ["any", "morning", "afternoon", "evening"] as const;
export type CallbackTime = (typeof CALLBACK_TIMES)[number];

/** Carrier verification checklist: all four must be ticked before "approved". */
export const CARRIER_CHECKS = ["license", "cmr", "vehicleDocs", "companyActive"] as const;
export type CarrierCheckKey = (typeof CARRIER_CHECKS)[number];

export const USER_ROLES = ["admin", "dispatcher"] as const;
export type UserRole = (typeof USER_ROLES)[number];

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

const PHONE_RE = /^[+()0-9\s.\-/]{6,40}$/;
const phone = z.string().trim().min(1, "required").max(40, "too_long").regex(PHONE_RE, "invalid");

/** HTML date input value (YYYY-MM-DD) or empty. */
const isoDate = z
  .string()
  .trim()
  .max(10, "invalid")
  .regex(/^(\d{4}-\d{2}-\d{2})?$/, "invalid")
  .optional()
  .transform((v) => (v ? v : undefined));

const consent = z.literal(true, "consent");

/**
 * CUI / VAT number. Accepts "RO12345678", "12345678", "DE123456789", "ESB12345678"…
 * Normalised to upper case without spaces/dots/dashes.
 */
export const normalizeVat = (v: string) => v.toUpperCase().replace(/[\s.\-/]/g, "");
const vatNumber = z
  .string()
  .trim()
  .min(1, "required")
  .max(20, "too_long")
  .transform(normalizeVat)
  .pipe(z.string().regex(/^[A-Z]{0,3}[0-9A-Z]{2,14}$/, "invalid").refine((v) => /\d/.test(v), "invalid"));

/** Checkbox group: one checked box arrives as a string, several as an array. */
const vehicleTypes = z.preprocess(
  (v) => (v === undefined || v === null || v === "" ? [] : Array.isArray(v) ? v : [v]),
  z.array(z.enum(VEHICLE_TYPES, "invalid")).min(1, "required").max(VEHICLE_TYPES.length, "invalid"),
);

/* ───────────────────────── Public form schemas ───────────────────────── */

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

/** "Cerere rapidă": name, phone, from → to, optional note. Stored as a quote with details.mode = "quick". */
export const quickQuoteFormSchema = z.object({
  contactPerson: required(120),
  phone,
  pickupLocation: required(200),
  deliveryLocation: required(200),
  note: optional(1000),
  consent,
});

export const carrierFormSchema = z.object({
  companyName: required(160),
  vatNumber,
  contactPerson: required(120),
  email,
  phone,
  country: required(80),
  fleetSize: optional(20),
  vehicleTypes,
  cmrInsurance: z.enum(["yes", "no"], "required"),
  licenceNumber: optional(60),
  regions: optional(500),
  message: optional(2000),
  consent,
});

/** "Vă sunăm noi": name, phone, preferred time. */
export const callbackFormSchema = z.object({
  contactPerson: required(120),
  phone,
  preferredTime: z.enum(CALLBACK_TIMES, "required"),
  consent,
});

export type QuoteFormValues = z.output<typeof quoteFormSchema>;
export type QuickQuoteFormValues = z.output<typeof quickQuoteFormSchema>;
export type CarrierFormValues = z.output<typeof carrierFormSchema>;
export type CallbackFormValues = z.output<typeof callbackFormSchema>;

export const FORM_MODES = ["full", "quick"] as const;
export type FormMode = (typeof FORM_MODES)[number];

/** Public form name: also the analytics `form` value. */
export type FormName = "quote" | "quote_quick" | "carrier" | "callback";

export function formNameFor(type: LeadType, mode?: FormMode): FormName {
  if (type === "quote") return mode === "quick" ? "quote_quick" : "quote";
  return type;
}

export function formSchemaFor(name: FormName) {
  switch (name) {
    case "quote":
      return quoteFormSchema;
    case "quote_quick":
      return quickQuoteFormSchema;
    case "carrier":
      return carrierFormSchema;
    case "callback":
      return callbackFormSchema;
  }
}

/** Field order per form: used to focus the first invalid field. */
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

export const QUICK_QUOTE_FIELD_ORDER = ["contactPerson", "phone", "pickupLocation", "deliveryLocation", "note", "consent"] as const;

export const CARRIER_FIELD_ORDER = [
  "companyName",
  "vatNumber",
  "contactPerson",
  "email",
  "phone",
  "country",
  "fleetSize",
  "vehicleTypes",
  "cmrInsurance",
  "licenceNumber",
  "regions",
  "message",
  "consent",
] as const;

export const CALLBACK_FIELD_ORDER = ["contactPerson", "phone", "preferredTime", "consent"] as const;

/* ───────────────────────── Request metadata (client → API) ───────────────────────── */

export const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"] as const;
export type UtmKey = (typeof UTM_KEYS)[number];
export type Utm = Partial<Record<UtmKey, string>>;

export const enquiryMetaSchema = z.object({
  type: z.enum(LEAD_TYPES),
  /** Only for type "quote": "quick" = Cerere rapidă. */
  mode: z.enum(FORM_MODES).optional(),
  /** Page path the form was submitted from (no query string). */
  source: z.string().trim().max(300).optional(),
  utm: z.partialRecord(z.enum(UTM_KEYS), z.string().trim().max(200)).optional(),
  locale: z.string().trim().max(10).optional(),
  /** Honeypot: must stay empty. Hidden from humans and assistive tech. */
  website: z.string().max(500).optional(),
});

/* ───────────────────────── Admin: manual lead ("Lead nou") ───────────────────────── */

const optionalEmail = z
  .string()
  .trim()
  .max(254, "Adresa de e-mail este prea lungă.")
  .optional()
  .transform((v) => (v ? v : undefined))
  .pipe(z.email("Adresa de e-mail nu este validă.").optional());

const optionalPhone = z
  .string()
  .trim()
  .max(40, "Telefonul este prea lung.")
  .optional()
  .transform((v) => (v ? v : undefined))
  .pipe(z.string().regex(PHONE_RE, "Telefonul conține caractere nepermise.").optional());

const optionalVat = z
  .string()
  .trim()
  .max(20, "CUI prea lung.")
  .optional()
  .transform((v) => (v ? normalizeVat(v) : undefined));

const adminText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, `Maximum ${max} de caractere.`)
    .optional()
    .transform((v) => (v ? v : undefined));

/** Admin-side form: messages are Romanian sentences (shown as-is in the CRM). */
export const manualLeadSchema = z
  .object({
    type: z.enum(LEAD_TYPES, "Alegeți tipul."),
    sourceChannel: z.enum(SOURCE_CHANNELS, "Alegeți canalul."),
    contactPerson: z.string().trim().min(1, "Completați persoana de contact.").max(120, "Maximum 120 de caractere."),
    companyName: adminText(160),
    phone: optionalPhone,
    email: optionalEmail,
    vatNumber: optionalVat,
    pickupLocation: adminText(200),
    deliveryLocation: adminText(200),
    cargoDescription: adminText(2000),
    preferredTime: z.enum(CALLBACK_TIMES).optional(),
    country: adminText(80),
    vehicleTypes: z.preprocess(
      (v) => (v === undefined || v === null || v === "" ? [] : Array.isArray(v) ? v : [v]),
      z.array(z.enum(VEHICLE_TYPES)).max(VEHICLE_TYPES.length),
    ),
    regions: adminText(500),
    notes: adminText(2000),
  })
  .superRefine((v, ctx) => {
    if (!v.phone && !v.email) ctx.addIssue({ code: "custom", path: ["phone"], message: "Completați telefonul sau e-mailul." });
    if (v.type === "quote" && (!v.pickupLocation || !v.deliveryLocation)) {
      ctx.addIssue({ code: "custom", path: ["pickupLocation"], message: "Completați ruta (de unde → unde)." });
    }
    if (v.type === "carrier" && !v.companyName) {
      ctx.addIssue({ code: "custom", path: ["companyName"], message: "Completați denumirea firmei." });
    }
  });

export type ManualLeadValues = z.output<typeof manualLeadSchema>;

/* ───────────────────────── Error helpers ───────────────────────── */

export type FieldErrors = Record<string, string>;

/** First error code per field, e.g. { email: "email", consent: "consent" }. */
export function fieldErrorsOf(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    // "vehicleTypes.0" → "vehicleTypes"
    const key = (issue.path.length ? String(issue.path[0]) : "") || "_form";
    // missing / wrong-type fields come from zod itself (not our codes) → normalise to "required"
    const code = issue.code === "invalid_type" ? "required" : issue.message;
    if (!(key in out)) out[key] = code;
  }
  return out;
}

/* ───────────────────────── Small shared helpers ───────────────────────── */

/** Last 9 digits of a phone number: matches "0744 123 456", "+40 744 123 456", "0040744123456". */
export const phoneKey = (phone: string | undefined | null): string | undefined => {
  const digits = (phone ?? "").replace(/\D/g, "");
  return digits.length >= 6 ? digits.slice(-9) : undefined;
};

/** Digits for https://wa.me/<digits>. Romanian national numbers (07…) get the 40 prefix. */
export function whatsappDigits(phone: string | undefined | null): string | undefined {
  if (!phone) return undefined;
  let d = phone.replace(/\D/g, "");
  if (phone.trim().startsWith("00")) d = d.slice(2);
  else if (/^0\d{9}$/.test(d)) d = `4${d}`; // 07xx xxx xxx → 407xx xxx xxx
  return d.length >= 8 ? d : undefined;
}

export const telHref = (phone: string) => `tel:${phone.replace(/[^+\d]/g, "")}`;
