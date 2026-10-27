import Link from "next/link";
import { ArrowRight, ChevronRight, Clock } from "lucide-react";
import type { Lead } from "@/lib/leads/types";
import { ageHours, formatAge, formatDateTime, leadFacts } from "@/lib/admin/format";
import { EmptyState, panel, StatusBadge, TypeBadge } from "./ui";

/** A "new" lead nobody has touched for this long gets the "waiting" marker. */
const WAITING_AFTER_H = 4;

const th = "t-label !text-ink-3 px-4 py-3.5 text-left font-normal";

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

export function LeadsTable({
  leads,
  emptyTitle,
  emptyText,
  compact = false,
}: {
  leads: Lead[];
  emptyTitle: string;
  emptyText?: string;
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
            const waiting = lead.status === "new" && ageHours(lead.createdAt) >= WAITING_AFTER_H;
            return (
              <tr
                key={lead.id}
                data-row
                className="group relative border-b border-line transition-colors last:border-b-0 hover:bg-ink/[0.03]"
              >
                <td className="px-4 py-4 align-top"><StatusBadge status={lead.status} /></td>
                <td className="max-w-[280px] px-4 py-4 align-top">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      data-row-link
                      className="truncate rounded text-[1rem] font-medium text-ink after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                    >
                      {lead.companyName}
                    </Link>
                    <span className="hidden sm:inline-flex"><TypeBadge type={lead.type} /></span>
                  </div>
                  <div className="truncate text-[0.875rem] text-ink-2">{lead.contactPerson}</div>
                  {/* phones: route under the name (the Route column is hidden) */}
                  <div className="mt-1 truncate text-[0.875rem] text-ink-3 md:hidden">{f.primary}</div>
                </td>
                <td className="hidden max-w-[380px] px-4 py-4 align-top md:table-cell"><RouteCell lead={lead} /></td>
                {!compact ? (
                  <td className="tabular hidden whitespace-nowrap px-4 py-4 align-top text-ink-2 xl:table-cell">
                    {f.dates || <span className="text-ink-3">—</span>}
                  </td>
                ) : null}
                {!compact ? (
                  <td className="hidden px-4 py-4 align-top text-ink-2 lg:table-cell">
                    {lead.assignedTo ?? <span className="text-ink-3">Neatribuită</span>}
                  </td>
                ) : null}
                <td className="whitespace-nowrap px-4 py-4 text-right align-top">
                  <time
                    dateTime={lead.createdAt}
                    title={formatDateTime(lead.createdAt)}
                    className={`tabular inline-flex items-center justify-end gap-1.5 text-[0.875rem] ${waiting ? "text-[#d9c28a]" : "text-ink-2"}`}
                  >
                    {waiting ? <Clock size={13} strokeWidth={1.6} aria-label="Așteaptă primul răspuns" /> : null}
                    {formatAge(lead.createdAt)}
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
