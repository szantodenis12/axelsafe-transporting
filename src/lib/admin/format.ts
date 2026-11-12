/**
 * UI-only formatting helpers for the CRM (Europe/Bucharest). No server-only imports — safe for
 * server and client components. Date/time + relative-age formatting has ONE source of truth:
 * `@/lib/leads/labels` (also used by the drivers and the notification e-mail); re-exported here.
 */
import { CALLBACK_TIME_LABEL, formatDate, formatDateTime, formatAge, TZ } from "@/lib/leads/labels";
import { vehicleLabels } from "@/lib/leads/summary";
import type { Lead } from "@/lib/leads/types";

export { formatAge, formatDate, formatDateTime };

const dayShort = new Intl.DateTimeFormat("ro-RO", { day: "numeric", month: "short", timeZone: TZ });
// Date-only values ("YYYY-MM-DD") carry no time zone: format them as UTC so the day never shifts.
const dayLong = new Intl.DateTimeFormat("ro-RO", { weekday: "short", day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

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

/** Hours since a timestamp. */
export const ageHours = (iso: string, now = Date.now()) => Math.max(0, now - new Date(iso).getTime()) / 3_600_000;

export function initials(name: string) {
  const parts = name.trim().split(/[\s._-]+/).filter(Boolean);
  if (!parts.length) return "?";
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : parts[0][1] ?? "")).toUpperCase();
}

/** One-line facts per lead, used by the list, the board and the dashboard. */
export function leadFacts(lead: Lead): {
  /** Primary line: "Origin → Destination", "Country", or the preferred call time. */
  primary: string;
  from?: string;
  to?: string;
  /** Secondary line: cargo/weight, fleet/vehicles, or the callback note. */
  secondary: string;
  /** Dates line (quotes only). */
  dates: string;
} {
  if (lead.type === "quote") {
    const d = lead.details;
    const dates = [d.pickupDate && formatDayShort(d.pickupDate), d.deliveryDate && formatDayShort(d.deliveryDate)].filter(Boolean);
    return {
      primary: `${d.pickupLocation || "?"} → ${d.deliveryLocation || "?"}`,
      from: d.pickupLocation || "?",
      to: d.deliveryLocation || "?",
      secondary: [d.mode === "quick" ? "Cerere rapidă" : "", d.cargoDescription, d.weight].filter(Boolean).join(" · "),
      dates: dates.length === 2 ? `${dates[0]} → ${dates[1]}` : dates[0] ? `${dates[0]}` : "",
    };
  }
  if (lead.type === "callback") {
    const d = lead.details;
    return {
      primary: `Sunați: ${CALLBACK_TIME_LABEL[d.preferredTime] ?? d.preferredTime}`,
      secondary: d.note ?? "",
      dates: "",
    };
  }
  const d = lead.details;
  return {
    primary: d.country || "Țară nespecificată",
    secondary: [d.fleetSize ? `${d.fleetSize} vehicule` : "", vehicleLabels(lead).join(", ")].filter(Boolean).join(" · "),
    dates: "",
  };
}
