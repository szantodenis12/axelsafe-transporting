import Link from "next/link";
import { Columns3, List, Search, X } from "lucide-react";
import { LEAD_STATUSES, LEAD_TYPES, SOURCE_CHANNELS, statusesFor, type LeadStatus, type LeadType, type SourceChannel } from "@/lib/leads/schema";
import type { LeadStats, OwnerFilter } from "@/lib/leads/types";
import { CHANNEL_LABEL, STATUS_LABEL, TYPE_PLURAL } from "@/lib/leads/labels";
import { adminInputH, adminSelect, btnGhost, Kbd, StatusDot } from "./ui";

export type LeadView = "list" | "board";

export type LeadFilterValues = {
  type?: LeadType;
  status?: LeadStatus;
  channel?: SourceChannel;
  owner: OwnerFilter;
  q?: string;
  view: LeadView;
};

const OWNER_LABEL: Record<OwnerFilter, string> = { all: "Toate", mine: "Ale mele", unassigned: "Nealocate" };

/** Builds /admin/leads?… keeping the current filters, with overrides. */
export function leadsHref(values: LeadFilterValues, patch: Partial<LeadFilterValues> = {}) {
  const v = { ...values, ...patch };
  const sp = new URLSearchParams();
  if (v.view === "board") sp.set("view", "board");
  if (v.type) sp.set("type", v.type);
  if (v.status && v.view !== "board") sp.set("status", v.status);
  if (v.channel) sp.set("channel", v.channel);
  if (v.owner !== "all") sp.set("owner", v.owner);
  if (v.q) sp.set("q", v.q);
  const qs = sp.toString();
  return qs ? `/admin/leads?${qs}` : "/admin/leads";
}

const countFor = (stats: LeadStats | null, type: LeadType | undefined, status?: LeadStatus): number | null => {
  if (!stats) return null;
  let sum = 0;
  for (const t of type ? [type] : [...LEAD_TYPES]) {
    const b = stats.byType[t];
    sum += status ? (b.byStatus[status] ?? 0) : b.total;
  }
  return sum;
};

const segment = (on: boolean) =>
  `inline-flex h-9 shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 text-[0.875rem] font-medium transition-colors ${on ? "bg-ink/[0.09] text-ink" : "text-ink-2 hover:text-ink"}`;
const group = "inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-line-strong bg-bg-2/70 p-1.5 [scrollbar-width:none]";

function Count({ n }: { n: number | null }) {
  return n === null ? null : <span className="tabular font-mono text-[0.75rem] text-ink-3">{n}</span>;
}

/**
 * Quick filters + search. Everything is a plain link / GET form (server-rendered, works without JS,
 * URLs are shareable). Counts come from repo.stats() and show the whole pipeline at a glance.
 */
export function LeadFilters({ values, stats }: { values: LeadFilterValues; stats: LeadStats | null }) {
  const board = values.view === "board";
  const active = Boolean((!board && values.type) || values.status || values.channel || values.q || values.owner !== "all");
  const statuses: readonly LeadStatus[] = values.type ? statusesFor(values.type) : LEAD_STATUSES;

  return (
    <div className="mb-5 flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
        <div role="group" aria-label="Vizualizare" className={group}>
          <Link href={leadsHref(values, { view: "list" })} aria-current={!board ? "true" : undefined} className={segment(!board)}>
            <List size={14} strokeWidth={1.6} aria-hidden /> Listă
          </Link>
          <Link
            href={leadsHref(values, { view: "board", type: values.type ?? "quote", status: undefined })}
            aria-current={board ? "true" : undefined}
            className={segment(board)}
          >
            <Columns3 size={14} strokeWidth={1.6} aria-hidden /> Pipeline
          </Link>
        </div>
        <div role="group" aria-label="Responsabil" className={group}>
          {(["all", "mine", "unassigned"] as const).map((k) => (
            <Link key={k} href={leadsHref(values, { owner: k })} aria-current={values.owner === k ? "true" : undefined} className={segment(values.owner === k)}>
              {OWNER_LABEL[k]}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <div role="group" aria-label="Tip cerere" className={group}>
          {board ? null : (
            <Link href={leadsHref(values, { type: undefined })} aria-current={!values.type ? "true" : undefined} className={segment(!values.type)}>
              Toate <Count n={countFor(stats, undefined, values.status)} />
            </Link>
          )}
          {LEAD_TYPES.map((t) => {
            // switching type drops a status that does not exist for the other type
            const keepStatus = values.status && statusesFor(t).includes(values.status) ? values.status : undefined;
            const on = values.type === t;
            return (
              <Link key={t} href={leadsHref(values, { type: t, status: keepStatus })} aria-current={on ? "true" : undefined} className={segment(on)}>
                {TYPE_PLURAL[t]} <Count n={countFor(stats, t, board ? undefined : values.status)} />
              </Link>
            );
          })}
        </div>

        <form method="get" action="/admin/leads" role="search" className="flex w-full flex-wrap items-center gap-2 xl:ml-auto xl:w-auto">
          {board ? <input type="hidden" name="view" value="board" /> : null}
          {values.type ? <input type="hidden" name="type" value={values.type} /> : null}
          {values.status && !board ? <input type="hidden" name="status" value={values.status} /> : null}
          {values.owner !== "all" ? <input type="hidden" name="owner" value={values.owner} /> : null}
          <div className="relative min-w-0 basis-full sm:w-[320px] sm:flex-none sm:basis-auto">
            <label htmlFor="f-q" className="sr-only">Caută cereri</label>
            <Search size={15} strokeWidth={1.6} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-3" aria-hidden />
            <input
              id="f-q"
              name="q"
              type="search"
              defaultValue={values.q ?? ""}
              placeholder="Firmă, persoană, e-mail, telefon, CUI"
              maxLength={80}
              autoComplete="off"
              className={`${adminInputH} !rounded-full pl-10 pr-10`}
            />
            <span className="pointer-events-none absolute right-3.5 top-1/2 hidden -translate-y-1/2 lg:block"><Kbd>/</Kbd></span>
          </div>
          <label htmlFor="f-channel" className="sr-only">Canal</label>
          <select id="f-channel" name="channel" defaultValue={values.channel ?? ""} className={`${adminSelect} !w-auto flex-1 !rounded-full sm:!w-[150px] sm:flex-none`}>
            <option value="">Orice canal</option>
            {SOURCE_CHANNELS.map((c) => (
              <option key={c} value={c}>{CHANNEL_LABEL[c]}</option>
            ))}
          </select>
          <button type="submit" className={btnGhost}>Caută</button>
        </form>
      </div>

      <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Stare">
        {board ? null : (
          <>
            <Link href={leadsHref(values, { status: undefined })} aria-current={!values.status ? "true" : undefined} className="a-chip" data-on={!values.status}>
              Orice stare
            </Link>
            {statuses.map((s) => {
              const n = countFor(stats, values.type, s);
              const on = values.status === s;
              return (
                <Link key={s} href={leadsHref(values, { status: s })} aria-current={on ? "true" : undefined} data-on={on} className={`a-chip ${n === 0 && !on ? "opacity-55" : ""}`}>
                  <StatusDot status={s} />
                  {STATUS_LABEL[s]}
                  <Count n={n} />
                </Link>
              );
            })}
          </>
        )}
        {values.channel ? (
          <Link href={leadsHref(values, { channel: undefined })} className="a-chip" data-on="true" aria-label={`Elimină filtrul canal ${CHANNEL_LABEL[values.channel]}`}>
            Canal: {CHANNEL_LABEL[values.channel]} <X size={12} strokeWidth={1.8} aria-hidden />
          </Link>
        ) : null}
        {active ? (
          <Link
            href={leadsHref({ view: values.view, owner: "all", type: board ? values.type : undefined })}
            className="ml-1 inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-[0.875rem] text-ink-2 hover:bg-ink/[0.06] hover:text-ink"
          >
            <X size={13} strokeWidth={1.8} aria-hidden /> Șterge filtrele
          </Link>
        ) : null}
      </div>
    </div>
  );
}
