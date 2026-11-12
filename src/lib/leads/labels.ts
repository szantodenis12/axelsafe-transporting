/**
 * Romanian CRM labels + Europe/Bucharest time helpers. Client-safe (no server imports):
 * used by the admin UI, both drivers (event notes) and the notification e-mail.
 */
import type {
  CallbackTime,
  CarrierCheckKey,
  Currency,
  LeadStatus,
  LeadType,
  LostReason,
  SourceChannel,
  UserRole,
  VehicleType,
} from "./schema";

export const TYPE_LABEL: Record<LeadType, string> = {
  quote: "Cerere de ofertă",
  carrier: "Transportator",
  callback: "Vă sunăm noi",
};
export const TYPE_SHORT: Record<LeadType, string> = { quote: "Ofertă", carrier: "Transportator", callback: "Apel" };
export const TYPE_PLURAL: Record<LeadType, string> = {
  quote: "Cereri de ofertă",
  carrier: "Transportatori (înscrieri)",
  callback: "Cereri de apel",
};

export const STATUS_LABEL: Record<LeadStatus, string> = {
  new: "Nou",
  reviewing: "În lucru",
  quoted: "Ofertat",
  won: "Câștigat",
  lost: "Pierdut",
  approved: "Aprobat",
  rejected: "Respins",
  spam: "Spam",
};

export const CHANNEL_LABEL: Record<SourceChannel, string> = {
  site: "Site",
  phone: "Telefon",
  email: "E-mail",
  whatsapp: "WhatsApp",
  exchange: "Bursă",
  referral: "Recomandare",
  other: "Altul",
};

export const LOST_REASON_LABEL: Record<LostReason, string> = {
  price: "Preț",
  no_truck: "Nu am găsit camion",
  no_reply: "Clientul nu a mai răspuns",
  deadline: "Termen",
  other: "Altul",
};

export const VEHICLE_LABEL: Record<VehicleType, string> = {
  curtainsider: "Prelată",
  reefer: "Frigorific",
  mega: "Mega",
  other: "Altele",
};

export const CALLBACK_TIME_LABEL: Record<CallbackTime, string> = {
  any: "Oricând",
  morning: "Dimineața",
  afternoon: "După-amiaza",
  evening: "Seara",
};

export const CHECK_LABEL_RO: Record<CarrierCheckKey, string> = {
  license: "Licență comunitară",
  cmr: "CMR confirmată la asigurător",
  vehicleDocs: "Documente vehicul",
  companyActive: "Firmă activă, fără insolvență",
};

export const ROLE_LABEL: Record<UserRole, string> = { admin: "Administrator", dispatcher: "Dispecer" };

/* ───────────────────────── Time (Europe/Bucharest) ───────────────────────── */

export const TZ = "Europe/Bucharest";

const dateTimeFmt = new Intl.DateTimeFormat("ro-RO", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: TZ,
});
const dateFmt = new Intl.DateTimeFormat("ro-RO", { day: "2-digit", month: "short", year: "numeric", timeZone: TZ });
const timeFmt = new Intl.DateTimeFormat("ro-RO", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: TZ });

/** 10 nov. 2026, 14:05 */
export const formatDateTime = (iso: string) => dateTimeFmt.format(new Date(iso));
/** 10 nov. 2026 */
export const formatDate = (iso: string) => dateFmt.format(new Date(iso));
/** 14:05 */
export const formatTime = (iso: string) => timeFmt.format(new Date(iso));

/** Wall-clock parts of an instant in Bucharest. */
function partsIn(date: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(date);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  return { y: get("year"), m: get("month"), d: get("day"), h: get("hour") % 24, mi: get("minute"), s: get("second") };
}

/** Offset of Bucharest vs UTC (ms) at an instant. */
function offsetAt(ms: number) {
  const p = partsIn(new Date(ms));
  return Date.UTC(p.y, p.m - 1, p.d, p.h, p.mi, p.s) - Math.floor(ms / 1000) * 1000;
}

/** Bucharest wall-clock (y, m, d, h, mi) → UTC instant. Handles DST. */
export function bucharestToDate(y: number, m: number, d: number, h = 0, mi = 0): Date {
  const guess = Date.UTC(y, m - 1, d, h, mi);
  let ms = guess - offsetAt(guess);
  ms = guess - offsetAt(ms);
  return new Date(ms);
}

/** "2026-11-10T14:30" (datetime-local, Bucharest) → ISO string. Null when malformed. */
export function parseLocalDateTime(value: string): string | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(value.trim());
  if (!m) return null;
  const [, y, mo, d, h, mi] = m.map(Number);
  const date = bucharestToDate(y, mo, d, h, mi);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

/** ISO → "2026-11-10T14:30" for a datetime-local input (Bucharest wall clock). */
export function toLocalInput(iso: string | undefined): string {
  if (!iso) return "";
  const p = partsIn(new Date(iso));
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${p.y}-${pad(p.m)}-${pad(p.d)}T${pad(p.h)}:${pad(p.mi)}`;
}

/** Start of the Bucharest day containing `now`, and the start of the next one. */
export function bucharestDayBounds(now = new Date()) {
  const p = partsIn(now);
  const start = bucharestToDate(p.y, p.m, p.d);
  const next = new Date(Date.UTC(p.y, p.m - 1, p.d) + 36 * 3600_000); // safely inside tomorrow
  const q = partsIn(next);
  return { start, end: bucharestToDate(q.y, q.m, q.d) };
}

/** Start of the Bucharest calendar month containing `now`. */
export function bucharestMonthStart(now = new Date()) {
  const p = partsIn(now);
  return bucharestToDate(p.y, p.m, 1);
}

/** Relative label: "chiar acum", "acum 4 min", "acum 3 h", "acum 2 zile", else a date. */
export function formatAge(iso: string, now = Date.now()) {
  const diff = Math.max(0, now - new Date(iso).getTime());
  const min = Math.floor(diff / 60_000);
  if (min < 1) return "chiar acum";
  if (min < 60) return `acum ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `acum ${h} h`;
  const d = Math.floor(h / 24);
  if (d < 7) return d === 1 ? "acum 1 zi" : `acum ${d} zile`;
  return formatDate(iso);
}

/** 47 min · 3 h 10 min · 2 z 4 h */
export function formatDuration(ms: number) {
  const min = Math.max(0, Math.round(ms / 60_000));
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `${h} h${min % 60 ? ` ${min % 60} min` : ""}`;
  const d = Math.floor(h / 24);
  return `${d} z${h % 24 ? ` ${h % 24} h` : ""}`;
}

/* ───────────────────────── Money ───────────────────────── */

const moneyFmt = new Intl.NumberFormat("ro-RO", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
/** 1.250,00 EUR */
export const formatMoney = (n: number, currency: Currency | string = "EUR") => `${moneyFmt.format(n)} ${currency}`;

export function marginOf(e: { offeredPrice?: number; carrierCost?: number }) {
  if (e.offeredPrice === undefined || e.carrierCost === undefined) return undefined;
  const value = Math.round((e.offeredPrice - e.carrierCost) * 100) / 100;
  const pct = e.offeredPrice > 0 ? (value / e.offeredPrice) * 100 : undefined;
  return { value, pct };
}

/* ───────────────────────── Event notes ───────────────────────── */

export function describeFollowUp(at: string | undefined, note: string | undefined) {
  if (!at) return "Următorul pas a fost șters";
  return `Următorul pas: ${formatDateTime(at)}${note ? ` · ${note}` : ""}`;
}

export function describeEconomics(e: { offeredPrice?: number; carrierCost?: number; currency?: Currency }) {
  const cur = e.currency ?? "EUR";
  const parts = [
    e.offeredPrice !== undefined ? `Preț ofertat ${formatMoney(e.offeredPrice, cur)}` : null,
    e.carrierCost !== undefined ? `Cost transportator ${formatMoney(e.carrierCost, cur)}` : null,
  ].filter(Boolean);
  const m = marginOf(e);
  if (m) parts.push(`Marjă ${formatMoney(m.value, cur)}`);
  return parts.length ? parts.join(" · ") : "Prețurile au fost șterse";
}
