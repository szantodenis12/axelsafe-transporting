import Link from "next/link";
import { Search, X } from "lucide-react";
import { LEAD_STATUSES, LEAD_TYPES, statusesFor, type LeadStatus, type LeadType } from "@/lib/leads/schema";
import type { LeadStats } from "@/lib/leads/types";
import { adminInputH, btnGhost, Kbd, STATUS_LABEL, StatusDot, TYPE_PLURAL } from "./ui";

export type LeadFilterValues = { type?: LeadType; status?: LeadStatus; q?: string };

function href(v: LeadFilterValues) {
  const p = new URLSearchParams();
  if (v.type) p.set("type", v.type);
  if (v.status) p.set("status", v.status);
  if (v.q) p.set("q", v.q);
  const qs = p.toString();
  return qs ? `/admin/leads?${qs}` : "/admin/leads";
}

const countFor = (stats: LeadStats, type: LeadType | undefined, status?: LeadStatus): number => {
  let sum = 0;
  for (const t of type ? [type] : [...LEAD_TYPES]) {
    const b = stats.byType[t];
    sum += status ? (b.byStatus[status] ?? 0) : b.total;
  }
  return sum;
};

/**
 * Quick filters + search. Everything is a plain link / GET form (server-rendered, works without JS,
 * URLs are shareable). Counts come from repo.stats() and show the whole pipeline at a glance.
 */
export function LeadFilters({ values, stats }: { values: LeadFilterValues; stats: LeadStats }) {
  const active = Boolean(values.type || values.status || values.q);
  const statuses: readonly LeadStatus[] = values.type ? statusesFor(values.type) : LEAD_STATUSES;

  return (
    <div className="mb-5 flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <div role="group" aria-label="Tip cerere" className="inline-flex flex-wrap items-center gap-1 rounded-full border border-line-strong bg-bg-2/70 p-1.5">
          <Link
            href={href({ ...values, type: undefined, status: values.status })}
            aria-current={!values.type ? "true" : undefined}
            className={`inline-flex h-9 items-center gap-2 rounded-full px-4 text-[0.875rem] font-medium transition-colors ${!values.type ? "bg-ink/[0.09] text-ink" : "text-ink-2 hover:text-ink"}`}
          >
            Toate <span className="tabular font-mono text-[0.75rem] text-ink-3">{countFor(stats, undefined, values.status)}</span>
          </Link>
          {LEAD_TYPES.map((t) => {
            // switching type drops a status that does not exist for the other type
            const keepStatus = values.status && statusesFor(t).includes(values.status) ? values.status : undefined;
            const on = values.type === t;
            return (
              <Link
                key={t}
                href={href({ q: values.q, type: t, status: keepStatus })}
                aria-current={on ? "true" : undefined}
                className={`inline-flex h-9 items-center gap-2 rounded-full px-4 text-[0.875rem] font-medium transition-colors ${on ? "bg-ink/[0.09] text-ink" : "text-ink-2 hover:text-ink"}`}
              >
                {TYPE_PLURAL[t]} <span className="tabular font-mono text-[0.75rem] text-ink-3">{countFor(stats, t, values.status)}</span>
              </Link>
            );
          })}
        </div>

        <form method="get" action="/admin/leads" role="search" className="ml-auto flex w-full items-center gap-2 sm:w-auto">
          {values.type ? <input type="hidden" name="type" value={values.type} /> : null}
          {values.status ? <input type="hidden" name="status" value={values.status} /> : null}
          <div className="relative min-w-0 flex-1 sm:w-[340px] sm:flex-none">
            <label htmlFor="f-q" className="sr-only">Caută cereri</label>
            <Search size={15} strokeWidth={1.6} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-3" aria-hidden />
            <input
              id="f-q"
              name="q"
              type="search"
              defaultValue={values.q ?? ""}
              placeholder="Caută firmă, persoană, e-mail"
              maxLength={80}
              autoComplete="off"
              className={`${adminInputH} !rounded-full pl-10 pr-10`}
            />
            <span className="pointer-events-none absolute right-3.5 top-1/2 hidden -translate-y-1/2 lg:block"><Kbd>/</Kbd></span>
          </div>
          <button type="submit" className={btnGhost}>Caută</button>
        </form>
      </div>

      <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Stare">
        <Link href={href({ ...values, status: undefined })} aria-current={!values.status ? "true" : undefined} className="a-chip" data-on={!values.status}>
          Orice stare
        </Link>
        {statuses.map((s) => {
          const n = countFor(stats, values.type, s);
          const on = values.status === s;
          return (
            <Link key={s} href={href({ ...values, status: s })} aria-current={on ? "true" : undefined} data-on={on} className={`a-chip ${n === 0 && !on ? "opacity-55" : ""}`}>
              <StatusDot status={s} />
              {STATUS_LABEL[s]}
              <span className="tabular font-mono text-[0.75rem] text-ink-3">{n}</span>
            </Link>
          );
        })}
        {active ? (
          <Link href="/admin/leads" className="ml-1 inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-[0.875rem] text-ink-2 hover:bg-ink/[0.06] hover:text-ink">
            <X size={13} strokeWidth={1.8} aria-hidden /> Șterge filtrele
          </Link>
        ) : null}
      </div>
    </div>
  );
}
