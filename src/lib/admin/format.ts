/**
 * Pure formatting + lead-summary helpers for the CRM UI (Europe/Bucharest).
 * No server-only imports — safe for server and client components.
 */
import type { Lead } from "@/lib/leads/types";

const TZ = "Europe/Bucharest";

const dateTime = new Intl.DateTimeFormat("ro-RO", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: TZ,
});
const dateOnly = new Intl.DateTimeFormat("ro-RO", { day: "2-digit", month: "short", year: "numeric", timeZone: TZ });
const dayShort = new Intl.DateTimeFormat("ro-RO", { day: "numeric", month: "short", timeZone: TZ });
const dayLong = new Intl.DateTimeFormat("ro-RO", { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

export const formatDateTime = (iso: string) => dateTime.format(new Date(iso));
export const formatDate = (iso: string) => dateOnly.format(new Date(iso));

/** "YYYY-MM-DD" (HTML date value) → "mar., 3 nov. 2026". Falls back to the raw value. */
export function formatDay(value?: string) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return value ?? "";
  return dayLong.format(new Date(`${value}T00:00:00Z`));
}

/** "YYYY-MM-DD" → "3 nov." (compact, for table cells). */
export function formatDayShort(value?: string) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return value ?? "";
  return dayShort.format(new Date(`${value}T12:00:00Z`));
}

/** Relative label (ro): "chiar acum", "acum 4 min", "acum 3 h", "acum 2 zile", else a date. */
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

/** Hours since a timestamp (for "waiting" highlighting). */
export const ageHours = (iso: string, now = Date.now()) => Math.max(0, now - new Date(iso).getTime()) / 3_600_000;

export function initials(name: string) {
  const parts = name.trim().split(/[\s._-]+/).filter(Boolean);
  if (!parts.length) return "?";
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : parts[0][1] ?? "")).toUpperCase();
}

/** One-line facts per lead, used by the list and dashboard. */
export function leadFacts(lead: Lead): {
  /** Primary line: "Origin → Destination" or "Country". */
  primary: string;
  from?: string;
  to?: string;
  /** Secondary line: cargo/weight or fleet/vehicles. */
  secondary: string;
  /** Dates line (quotes only). */
  dates: string;
} {
  if (lead.type === "quote") {
    const d = lead.details;
    const dates = [d.pickupDate && formatDayShort(d.pickupDate), d.deliveryDate && formatDayShort(d.deliveryDate)].filter(Boolean);
    return {
      primary: `${d.pickupLocation} → ${d.deliveryLocation}`,
      from: d.pickupLocation,
      to: d.deliveryLocation,
      secondary: [d.cargoDescription, d.weight].filter(Boolean).join(" · "),
      dates: dates.length === 2 ? `${dates[0]} → ${dates[1]}` : dates[0] ? `${dates[0]}` : "",
    };
  }
  const d = lead.details;
  return {
    primary: d.country,
    secondary: [d.fleetSize ? `${d.fleetSize} vehicule` : "", d.vehicleTypes].filter(Boolean).join(" · "),
    dates: "",
  };
}
