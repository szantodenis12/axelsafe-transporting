import { ArrowRight, BadgeCheck, CalendarClock, CircleDot, Coins, Landmark, MessageSquare, Sparkles, UserRound } from "lucide-react";
import type { LeadEvent, LeadEventKind } from "@/lib/leads/types";
import { formatAge, formatDateTime } from "@/lib/admin/format";
import { StatusBadge } from "./ui";

const ICON: Record<LeadEventKind, typeof CircleDot> = {
  created: Sparkles,
  status_changed: CircleDot,
  note: MessageSquare,
  assigned: UserRound,
  follow_up: CalendarClock,
  economics: Coins,
  verification: BadgeCheck,
  anaf_lookup: Landmark,
};

/** Event kinds whose note IS the title (Romanian text written by the drivers). */
const NOTE_AS_TITLE = new Set<LeadEventKind>(["assigned", "follow_up", "economics", "verification", "anaf_lookup"]);

/** v1 events stored English text ("Assigned to X" / "Unassigned"); v2 writes Romanian. */
function assignedText(note?: string) {
  if (!note) return "Responsabil modificat";
  const m = /^Assigned to (.+)$/.exec(note);
  if (m) return `Alocat lui ${m[1]}`;
  if (note === "Unassigned") return "Nealocat";
  return note;
}

function Title({ e }: { e: LeadEvent }) {
  if (e.kind === "created") return <span className="text-ink">{e.note ?? "Cerere primită"}</span>;
  if (e.kind === "status_changed")
    return (
      <span className="inline-flex flex-wrap items-center gap-1.5">
        {e.fromStatus ? <StatusBadge status={e.fromStatus} className="opacity-70" /> : <span className="text-ink-3">—</span>}
        <ArrowRight size={12} strokeWidth={1.6} aria-label="spre" className="text-ink-3" />
        {e.toStatus ? <StatusBadge status={e.toStatus} /> : <span className="text-ink-3">—</span>}
      </span>
    );
  if (e.kind === "assigned") return <span className="text-ink">{assignedText(e.note)}</span>;
  if (NOTE_AS_TITLE.has(e.kind)) return <span className="text-ink">{e.note ?? "Actualizare"}</span>;
  return <span className="text-ink">Notă</span>;
}

/** Newest first. Notes are shown as text blocks, status changes as badge → badge. */
export function Timeline({ events }: { events: LeadEvent[] }) {
  const ordered = [...events].reverse();
  if (!ordered.length) return <p className="text-[0.875rem] text-ink-3">Nicio activitate încă.</p>;
  return (
    <ol className="relative flex flex-col">
      {ordered.map((e, i) => {
        const Icon = ICON[e.kind] ?? CircleDot;
        const showNote = e.note && e.kind !== "created" && !NOTE_AS_TITLE.has(e.kind);
        return (
          <li key={e.id} className="relative flex gap-3 pb-4 last:pb-0">
            {i < ordered.length - 1 ? <span aria-hidden className="absolute left-[11px] top-6 h-[calc(100%-1.25rem)] w-px bg-line" /> : null}
            <span className="relative z-10 mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-line-strong bg-bg-2 text-accent">
              <Icon size={12} strokeWidth={1.6} aria-hidden />
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[0.875rem] text-ink">
                <Title e={e} />
                <time dateTime={e.createdAt} title={formatDateTime(e.createdAt)} className="tabular text-[0.75rem] text-ink-3">
                  {e.author} · {formatAge(e.createdAt)}
                </time>
              </div>
              {showNote ? (
                <p
                  className={`whitespace-pre-wrap break-words text-[0.875rem] leading-relaxed text-ink-2 ${
                    e.kind === "note" ? "rounded-2xl border border-line bg-ink/[0.03] px-4 py-3 text-ink" : ""
                  }`}
                >
                  {e.note}
                </p>
              ) : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
