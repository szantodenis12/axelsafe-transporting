/**
 * Dashboard metrics — pure functions over the lead list (same result for both drivers).
 */
import { CLOSED_STATUSES, isClosed, LEAD_TYPES, LOST_REASONS, SOURCE_CHANNELS, statusesFor, type Currency, type LeadStatus, type LeadType, type LostReason, type SourceChannel } from "@/lib/leads/schema";
import { bucharestDayBounds, bucharestMonthStart, marginOf } from "@/lib/leads/labels";
import type { Lead } from "@/lib/leads/types";

/** A new lead older than this without a reply is flagged red. */
export const RESPONSE_SLA_MS = 60 * 60_000;

export const isOverdueNew = (lead: Pick<Lead, "status" | "createdAt">, now = Date.now()) =>
  lead.status === "new" && now - new Date(lead.createdAt).getTime() > RESPONSE_SLA_MS;

export type Count<K extends string> = { key: K; count: number };

export type DashboardMetrics = {
  total: number;
  openByType: Record<LeadType, Count<LeadStatus>[]>;
  openTotal: number;
  new7: number;
  new30: number;
  /** Customer leads (quote + callback): won / (won + lost). */
  won: number;
  lost: number;
  conversion?: number;
  marginByCurrency: Partial<Record<Currency, number>>;
  marginMissing: number;
  lostReasons: Count<LostReason>[];
  byChannel: Count<SourceChannel>[];
  byUtmSource: Count<string>[];
  /** Median minutes from creation to first response, website leads of the last 30 days. */
  medianFirstResponseMin?: number;
  firstResponseSample: number;
  waitingOverSla: Lead[];
  carriersApprovedThisMonth: number;
  dueToday: Lead[];
  overdue: Lead[];
};

function median(values: number[]): number | undefined {
  if (!values.length) return undefined;
  const v = [...values].sort((a, b) => a - b);
  const mid = Math.floor(v.length / 2);
  return v.length % 2 ? v[mid] : (v[mid - 1] + v[mid]) / 2;
}

const sortCounts = <K extends string>(m: Map<K, number>): Count<K>[] =>
  [...m.entries()].map(([key, count]) => ({ key, count })).sort((a, b) => b.count - a.count);

export function computeDashboard(leads: Lead[], nowDate = new Date()): DashboardMetrics {
  const now = nowDate.getTime();
  const day = 24 * 3600_000;
  const { end: endOfToday } = bucharestDayBounds(nowDate);
  const monthStart = bucharestMonthStart(nowDate).getTime();

  const openByType = Object.fromEntries(
    LEAD_TYPES.map((t) => [t, statusesFor(t).filter((s) => !CLOSED_STATUSES.includes(s)).map((s) => ({ key: s, count: 0 }))]),
  ) as Record<LeadType, Count<LeadStatus>[]>;

  let openTotal = 0;
  let new7 = 0;
  let new30 = 0;
  let won = 0;
  let lost = 0;
  let marginMissing = 0;
  let carriersApprovedThisMonth = 0;
  const marginByCurrency: Partial<Record<Currency, number>> = {};
  const lostReasons = new Map<LostReason, number>(LOST_REASONS.map((r) => [r, 0]));
  const byChannel = new Map<SourceChannel, number>(SOURCE_CHANNELS.map((c) => [c, 0]));
  const byUtm = new Map<string, number>();
  const responseMinutes: number[] = [];
  const waitingOverSla: Lead[] = [];
  const dueToday: Lead[] = [];
  const overdue: Lead[] = [];

  for (const lead of leads) {
    const created = new Date(lead.createdAt).getTime();
    if (lead.status === "spam") continue;

    if (now - created <= 7 * day) new7++;
    if (now - created <= 30 * day) new30++;

    if (!isClosed(lead.status)) {
      openTotal++;
      const bucket = openByType[lead.type]?.find((c) => c.key === lead.status);
      if (bucket) bucket.count++;
      if (isOverdueNew(lead, now)) waitingOverSla.push(lead);
      if (lead.nextActionAt) {
        const at = new Date(lead.nextActionAt).getTime();
        if (at < now) overdue.push(lead);
        else if (at < endOfToday.getTime()) dueToday.push(lead);
      }
    }

    if (lead.type !== "carrier") {
      if (lead.status === "won") {
        won++;
        const m = marginOf(lead);
        if (m) marginByCurrency[lead.currency ?? "EUR"] = Math.round(((marginByCurrency[lead.currency ?? "EUR"] ?? 0) + m.value) * 100) / 100;
        else marginMissing++;
      }
      if (lead.status === "lost") {
        lost++;
        if (lead.lostReason) lostReasons.set(lead.lostReason, (lostReasons.get(lead.lostReason) ?? 0) + 1);
      }
    } else if (lead.status === "approved" && lead.approvedAt && new Date(lead.approvedAt).getTime() >= monthStart) {
      carriersApprovedThisMonth++;
    }

    byChannel.set(lead.sourceChannel, (byChannel.get(lead.sourceChannel) ?? 0) + 1);
    if (lead.sourceChannel === "site") {
      const src = lead.utm?.utm_source?.toLowerCase() || (lead.utm?.gclid ? "google (gclid)" : lead.utm?.fbclid ? "facebook (fbclid)" : "fără UTM");
      byUtm.set(src, (byUtm.get(src) ?? 0) + 1);
    }

    if (lead.sourceChannel === "site" && lead.firstResponseAt && now - created <= 30 * day) {
      responseMinutes.push(Math.max(0, (new Date(lead.firstResponseAt).getTime() - created) / 60_000));
    }
  }

  const byTime = (a: Lead, b: Lead) => (a.nextActionAt ?? "").localeCompare(b.nextActionAt ?? "");
  const med = median(responseMinutes);

  return {
    total: leads.length,
    openByType,
    openTotal,
    new7,
    new30,
    won,
    lost,
    conversion: won + lost ? won / (won + lost) : undefined,
    marginByCurrency,
    marginMissing,
    lostReasons: sortCounts(lostReasons),
    byChannel: sortCounts(byChannel),
    byUtmSource: sortCounts(byUtm).slice(0, 8),
    medianFirstResponseMin: med === undefined ? undefined : Math.round(med),
    firstResponseSample: responseMinutes.length,
    waitingOverSla: waitingOverSla.sort((a, b) => a.createdAt.localeCompare(b.createdAt)),
    carriersApprovedThisMonth,
    dueToday: dueToday.sort(byTime),
    overdue: overdue.sort(byTime),
  };
}
