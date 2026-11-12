import Link from "next/link";
import { ArrowRight, CalendarClock, ChevronRight } from "lucide-react";
import { leadTitle, type Lead } from "@/lib/leads/types";
import { isOverdueNew } from "@/lib/admin/metrics";
import { formatAge, formatDateTime, leadFacts } from "@/lib/admin/format";
import { ALERT_HEX, ChannelBadge, EmptyState, panel, SlaBadge, StatusBadge, TypeBadge } from "./ui";

const th = "t-label !text-ink-3 px-4 py-3.5 text-left font-normal";

const waitingMinutes = (lead: Lead, now: number) => Math.floor((now - new Date(lead.createdAt).getTime()) / 60_000);

function RouteCell({ lead }: { lead: Lead }) {
  const f = leadFacts(lead);
  return (
    <>
      {lead.type === "quote" ? (
        <div className="flex items-center gap-2 text-ink">
          <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-ink shadow-[0_0_8px_2px_rgba(183,212,247,0.45)]" />
          <span className="truncate">{f.from}</span>
          <ArrowRight size={13} strokeWidth={1.5} aria-label="spre" className="shrink-0 text-accent" />
          <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full border border-accent bg-bg" />
          <span className="truncate">{f.to}</span>
        </div>
      ) : (
        <div className="truncate text-ink">{f.primary}</div>
      )}
      {f.secondary ? <div className="mt-0.5 truncate text-[0.875rem] text-ink-3">{f.secondary}</div> : null}
    </>
  );
}

/** Follow-up date ("Următorul pas"); muted red once it is overdue. */
export function NextAction({ lead, now }: { lead: Lead; now: number }) {
  if (!lead.nextActionAt) return null;
  const late = new Date(lead.nextActionAt).getTime() < now;
  return (
    <span
      className={`mt-1 inline-flex max-w-full items-center gap-1.5 text-[0.8125rem] ${late ? "" : "text-ink-3"}`}
      style={late ? { color: ALERT_HEX } : undefined}
      title={lead.nextActionNote}
    >
      <CalendarClock size={13} strokeWidth={1.6} aria-hidden className="shrink-0" />
      <span className="sr-only">{late ? "Următorul pas, întârziat:" : "Următorul pas:"}</span>
      <span className="tabular truncate">
        {formatDateTime(lead.nextActionAt)}
        {lead.nextActionNote ? ` · ${lead.nextActionNote}` : ""}
      </span>
    </span>
  );
}

export function LeadsTable({
  leads,
  emptyTitle,
  emptyText,
  now,
  compact = false,
}: {
  leads: Lead[];
  emptyTitle: string;
  emptyText?: string;
  /** One clock per page (server-rendered). */
  now: number;
  /** Dashboard variant: fewer columns. */
  compact?: boolean;
}) {
  if (!leads.length) return <EmptyState title={emptyTitle} text={emptyText} />;

  return (
    <div className={`${panel} overflow-x-auto`}>
      <table className="w-full border-collapse text-left text-[0.9375rem]">
        <caption className="sr-only">Cereri, cele mai noi primele</caption>
        <thead>
          <tr className="border-b border-line">
            <th scope="col" className={`${th} w-[140px]`}>Stare</th>
            <th scope="col" className={th}>Cerere</th>
            <th scope="col" className={`${th} hidden md:table-cell`}>Rută / detalii</th>
            {!compact ? <th scope="col" className={`${th} hidden xl:table-cell`}>Date</th> : null}
            {!compact ? <th scope="col" className={`${th} hidden lg:table-cell`}>Responsabil</th> : null}
            <th scope="col" className={`${th} w-[120px] text-right`}>Primită</th>
            <th scope="col" className="w-8 px-1"><span className="sr-only">Deschide</span></th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => {
            const f = leadFacts(lead);
            const sla = isOverdueNew(lead, now);
            const subtitle = lead.companyName ? lead.contactPerson : lead.phone ?? lead.email;
            return (
              <tr key={lead.id} data-row className="group relative border-b border-line transition-colors last:border-b-0 hover:bg-ink/[0.03]">
                <td className="px-4 py-4 align-top">
                  <div className="flex flex-col items-start gap-1.5">
                    <StatusBadge status={lead.status} />
                    {sla ? <SlaBadge minutes={waitingMinutes(lead, now)} /> : null}
                  </div>
                </td>
                <td className="max-w-[300px] px-4 py-4 align-top">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      data-row-link
                      className="truncate rounded text-[1rem] font-medium text-ink after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                    >
                      {leadTitle(lead)}
                    </Link>
                    <span className="hidden sm:inline-flex"><TypeBadge type={lead.type} /></span>
                    <span className="hidden sm:inline-flex"><ChannelBadge channel={lead.sourceChannel} /></span>
                  </div>
                  {subtitle ? <div className="truncate text-[0.875rem] text-ink-2">{subtitle}</div> : null}
                  {/* phones: route under the name (the Route column is hidden) */}
                  <div className="mt-1 truncate text-[0.875rem] text-ink-3 md:hidden">{f.primary}</div>
                  <div className="md:hidden"><NextAction lead={lead} now={now} /></div>
                </td>
                <td className="hidden max-w-[380px] px-4 py-4 align-top md:table-cell">
                  <RouteCell lead={lead} />
                  <NextAction lead={lead} now={now} />
                </td>
                {!compact ? (
                  <td className="tabular hidden whitespace-nowrap px-4 py-4 align-top text-ink-2 xl:table-cell">
                    {f.dates || <span className="text-ink-3">—</span>}
                  </td>
                ) : null}
                {!compact ? (
                  <td className="hidden px-4 py-4 align-top text-ink-2 lg:table-cell">
                    {lead.assignedTo ?? <span className="text-ink-3">Nealocată</span>}
                  </td>
                ) : null}
                <td className="whitespace-nowrap px-4 py-4 text-right align-top">
                  <time dateTime={lead.createdAt} title={formatDateTime(lead.createdAt)} className="tabular text-[0.875rem] text-ink-2">
                    {formatAge(lead.createdAt, now)}
                  </time>
                  <div className="tabular hidden text-[0.75rem] text-ink-3 xl:block">{formatDateTime(lead.createdAt)}</div>
                </td>
                <td className="px-2 align-top text-ink-3 group-hover:text-ink">
                  <ChevronRight size={16} strokeWidth={1.5} aria-hidden className="mt-4" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
