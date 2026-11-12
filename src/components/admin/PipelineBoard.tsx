import Link from "next/link";
import { UserRound } from "lucide-react";
import { CARRIER_CHECKS, statusesFor, type LeadType } from "@/lib/leads/schema";
import { allChecksDone, leadTitle, type Lead } from "@/lib/leads/types";
import { formatMoney, marginOf, STATUS_LABEL } from "@/lib/leads/labels";
import { isOverdueNew } from "@/lib/admin/metrics";
import { formatAge, formatDateTime, leadFacts } from "@/lib/admin/format";
import { CardStatusForm } from "./LeadActions";
import { NextAction } from "./LeadsTable";
import { ALERT_HEX, ChannelBadge, SlaBadge, StatusDot } from "./ui";

/**
 * Pipeline per lead type: one column per status (spam hidden). Columns scroll horizontally on
 * small screens (snap per column). Status changes happen from the card, no drag-and-drop.
 * Server component; `now` is passed in so every card uses the same clock.
 */
export function PipelineBoard({ type, leads, now }: { type: LeadType; leads: Lead[]; now: number }) {
  const columns = statusesFor(type).filter((s) => s !== "spam");
  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-3 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0" role="region" aria-label="Pipeline" tabIndex={0}>
      <div className="flex snap-x snap-mandatory gap-3">
        {columns.map((status) => {
          const items = leads.filter((l) => l.status === status);
          return (
            <section
              key={status}
              aria-labelledby={`col-${status}`}
              className="flex w-[84vw] max-w-[320px] shrink-0 snap-start flex-col gap-2.5 rounded-[18px] border border-line bg-bg-2/40 p-2.5 sm:w-[290px]"
            >
              <h2 id={`col-${status}`} className="t-label flex items-center justify-between gap-2 px-2 pb-1 pt-1.5 !text-ink-2">
                <span className="flex items-center gap-2">
                  <StatusDot status={status} />
                  {STATUS_LABEL[status]}
                </span>
                <span className="tabular font-mono text-ink-3">{items.length}</span>
              </h2>
              {items.length ? (
                <ul className="flex flex-col gap-2">
                  {items.map((lead) => (
                    <Card key={lead.id} lead={lead} now={now} />
                  ))}
                </ul>
              ) : (
                <p className="px-2 py-6 text-center text-[0.8125rem] text-ink-3">Nicio cerere</p>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}

function Card({ lead, now }: { lead: Lead; now: number }) {
  const sla = isOverdueNew(lead, now);
  const margin = lead.type !== "carrier" ? marginOf(lead) : undefined;
  const f = leadFacts(lead);
  const checks = lead.type === "carrier" ? CARRIER_CHECKS.filter((k) => lead.checks[k]).length : 0;
  return (
    <li
      className="a-tile flex flex-col gap-2.5 p-3.5"
      style={sla ? { borderColor: `color-mix(in srgb, ${ALERT_HEX} 45%, transparent)` } : undefined}
    >
      <div className="flex items-start justify-between gap-2">
        <Link href={`/admin/leads/${lead.id}`} data-row-link className="min-w-0 rounded font-medium text-ink underline-offset-4 hover:underline">
          <span className="block truncate">{leadTitle(lead)}</span>
        </Link>
        <time dateTime={lead.createdAt} title={formatDateTime(lead.createdAt)} className="tabular shrink-0 text-[0.75rem] text-ink-3">
          {formatAge(lead.createdAt, now)}
        </time>
      </div>
      <p className="truncate text-[0.875rem] text-ink-2" title={f.primary}>
        {f.primary}
      </p>
      <div className="flex flex-wrap items-center gap-1.5 text-[0.8125rem] text-ink-3">
        {sla ? <SlaBadge minutes={Math.floor((now - new Date(lead.createdAt).getTime()) / 60_000)} /> : null}
        <ChannelBadge channel={lead.sourceChannel} />
        <span className="inline-flex min-w-0 items-center gap-1">
          <UserRound size={12} strokeWidth={1.6} aria-hidden />
          <span className="truncate">{lead.assignedTo ?? "nealocată"}</span>
        </span>
        {margin ? <span className="tabular" style={{ color: margin.value < 0 ? ALERT_HEX : "#8fcfbd" }}>· marjă {formatMoney(margin.value, lead.currency ?? "EUR")}</span> : null}
        {lead.type === "carrier" ? <span className="tabular">· verificări {checks}/4</span> : null}
      </div>
      <NextAction lead={lead} now={now} />
      <CardStatusForm leadId={lead.id} type={lead.type} current={lead.status} canApprove={lead.type === "carrier" && allChecksDone(lead.checks)} />
    </li>
  );
}
