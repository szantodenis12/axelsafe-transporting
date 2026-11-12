import Link from "next/link";
import { AlertTriangle, ArrowRight, Clock, Database, FileText, Inbox, PhoneCall, Truck } from "lucide-react";
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import type { LeadStatus, LeadType, SourceChannel } from "@/lib/leads/schema";
import { CHANNEL_LABEL, STATUS_LABEL, TYPE_LABEL, TYPE_SHORT } from "@/lib/leads/labels";
import type { LeadStoreStatus } from "@/lib/leads/repository";

/* ───────────────────────── Shared class strings (public-site language) ───────────────────────── */

/** Same control as the public forms (rounded 14px, bg-2, accent focus ring). */
export const adminInput =
  "block w-full rounded-[14px] border border-line bg-bg-2 px-4 text-[0.9375rem] text-ink placeholder:text-ink-3 outline-none " +
  "transition-[border-color,box-shadow,background-color] duration-300 hover:border-line-strong focus:border-accent/70 " +
  "focus:shadow-[0_0_0_3px_rgba(183,212,247,0.16)] focus-visible:outline-none aria-invalid:border-danger/80 disabled:opacity-60 [color-scheme:dark]";
export const adminInputH = `${adminInput} h-[46px]`;
export const adminTextarea = `${adminInput} min-h-[104px] resize-y py-3 leading-[1.6]`;
export const adminSelect = `${adminInputH} appearance-none bg-no-repeat pr-9 [background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23a9b8cc' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'><path d='m6 9 6 6 6-6'/></svg>")] [background-position:right_14px_center]`;

/** Ghost pill, no icon (secondary action). */
export const btnGhost = "pill pill-ghost pill-sm !px-5 disabled:opacity-60";
/** Quiet text button. */
export const btnQuiet =
  "inline-flex h-9 items-center gap-2 rounded-full px-3 text-[0.875rem] text-ink-2 transition-colors hover:bg-ink/[0.06] hover:text-ink";
/** Small inline action (copy, mailto, tel…). */
export const btnChip = "a-chip";

export const panel = "card-glow !rounded-[18px]";
export const label = "t-label !text-ink-3";

/** The site's primary pill with the round dark arrow. */
export function PillButton({
  children,
  variant = "primary",
  icon,
  className = "",
  ...rest
}: { children: ReactNode; variant?: "primary" | "ghost"; icon?: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`pill pill-${variant} pill-sm disabled:opacity-60 ${className}`} {...rest}>
      <span>{children}</span>
      <span className="pill-icon">{icon ?? <ArrowRight size={15} strokeWidth={1.6} aria-hidden />}</span>
    </button>
  );
}

/* ───────────────────────── Labels: single source in @/lib/leads/labels (also drivers + e-mail) ───────────────────────── */

export { CHANNEL_LABEL, STATUS_LABEL, TYPE_LABEL, TYPE_PLURAL, TYPE_SHORT } from "@/lib/leads/labels";

/** Restrained palette derived from the brand: accent blue for "new", soft desaturated hues only as dots / faint tints. */
export const STATUS_HEX: Record<LeadStatus, string> = {
  new: "#b7d4f7",
  reviewing: "#d9c28a",
  quoted: "#b4abe0",
  won: "#8fcfbd",
  approved: "#86c6cc",
  lost: "#d39d9d",
  rejected: "#d3a584",
  spam: "#6f8098",
};

export function StatusDot({ status, className = "" }: { status: LeadStatus; className?: string }) {
  return <span aria-hidden className={`inline-block h-1.5 w-1.5 shrink-0 rounded-full ${className}`} style={{ background: STATUS_HEX[status] }} />;
}

export function StatusBadge({ status, className = "" }: { status: LeadStatus; className?: string }) {
  const hex = STATUS_HEX[status];
  const style: CSSProperties = {
    borderColor: `color-mix(in srgb, ${hex} 32%, transparent)`,
    background: `color-mix(in srgb, ${hex} 9%, transparent)`,
  };
  return (
    <span
      style={style}
      className={`inline-flex h-7 items-center gap-2 whitespace-nowrap rounded-full border px-3 text-[0.8125rem] ${status === "spam" ? "text-ink-3" : "text-ink"} ${className}`}
    >
      <StatusDot status={status} />
      {STATUS_LABEL[status]}
    </span>
  );
}

const TYPE_ICON = { quote: FileText, carrier: Truck, callback: PhoneCall } as const;

export function TypeBadge({ type, iconOnly = false }: { type: LeadType; iconOnly?: boolean }) {
  const Icon = TYPE_ICON[type];
  return (
    <span
      title={TYPE_LABEL[type]}
      className="inline-flex h-7 items-center gap-1.5 whitespace-nowrap rounded-full border border-line px-2.5 text-[0.8125rem] text-ink-2"
    >
      <Icon size={13} strokeWidth={1.6} aria-hidden className="text-accent" />
      {iconOnly ? <span className="sr-only">{TYPE_SHORT[type]}</span> : TYPE_SHORT[type]}
    </span>
  );
}

/** Where a lead came from; nothing for website leads (the default). */
export function ChannelBadge({ channel }: { channel: SourceChannel }) {
  if (channel === "site") return null;
  return (
    <span className="inline-flex h-7 items-center whitespace-nowrap rounded-full border border-line bg-ink/[0.03] px-2.5 text-[0.8125rem] text-ink-2">
      {CHANNEL_LABEL[channel]}
    </span>
  );
}

/** Muted red used for the response-time promise and overdue follow-ups (no saturated colours). */
export const ALERT_HEX = "#e3a9a9";

/** Still "new" after the 60-minute first-reply promise. */
export function SlaBadge({ minutes }: { minutes: number }) {
  const text = minutes >= 48 * 60 ? `${Math.floor(minutes / 1440)} zile` : minutes >= 120 ? `${Math.floor(minutes / 60)} h` : `${minutes} min`;
  return (
    <span
      title="Cerere nouă fără răspuns de peste 60 de minute"
      style={{ borderColor: `color-mix(in srgb, ${ALERT_HEX} 45%, transparent)`, background: `color-mix(in srgb, ${ALERT_HEX} 12%, transparent)`, color: ALERT_HEX }}
      className="tabular inline-flex h-7 items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 text-[0.8125rem]"
    >
      <Clock size={12} strokeWidth={1.8} aria-hidden />
      <span className="sr-only">Fără răspuns de</span>
      {text}
    </span>
  );
}

/* ───────────────────────── Page chrome ───────────────────────── */

export function PageHeader({ title, meta, actions, eyebrow }: { title: string; meta?: ReactNode; actions?: ReactNode; eyebrow?: string }) {
  return (
    <div className="mb-7 flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
      <div className="flex min-w-0 flex-col gap-3">
        {eyebrow ? <p className="t-label eyebrow">{eyebrow}</p> : null}
        <h1 className="a-title">{title}</h1>
        {meta ? <div className="text-[0.9375rem] text-ink-2">{meta}</div> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}

/** Discreet muted chip: where the leads are stored. */
export function DriverTag({ status }: { status: LeadStoreStatus }) {
  if (!status.configured) return null;
  return (
    <span className="inline-flex h-7 items-center gap-1.5 rounded-full border border-line px-3 text-[0.75rem] text-ink-3">
      <Database size={11} strokeWidth={1.6} aria-hidden />
      {status.driver === "local" ? "Stocare locală · dev" : "Supabase"}
    </span>
  );
}

export function StoreBanner({ status }: { status: LeadStoreStatus }) {
  if (status.configured) return null;
  return (
    <div role="alert" className={`${panel} flex items-start gap-3 px-5 py-4 text-[0.9375rem] text-ink`}>
      <AlertTriangle size={18} strokeWidth={1.6} className="mt-[2px] shrink-0 text-[#d9c28a]" aria-hidden />
      <div className="flex flex-col gap-1">
        <p>Stocarea cererilor nu este configurată — solicitările de pe site sunt respinse (HTTP 503).</p>
        <p className="text-ink-2">
          {status.reason}. Vezi <code className="font-mono text-[0.8125rem] text-ink">docs/CRM.md</code>.
        </p>
      </div>
    </div>
  );
}

export function EmptyState({ title, text, action }: { title: string; text?: string; action?: ReactNode }) {
  return (
    <div className={`${panel} flex flex-col items-center gap-3 px-6 py-14 text-center`}>
      <span className="grid h-11 w-11 place-items-center rounded-full border border-line-strong text-accent">
        <Inbox size={19} strokeWidth={1.5} aria-hidden />
      </span>
      <p className="a-h2">{title}</p>
      {text ? <p className="max-w-[46ch] text-[0.9375rem] text-ink-2">{text}</p> : null}
      {action}
    </div>
  );
}

export function ErrorPanel({ title, text }: { title: string; text?: string }) {
  return (
    <div role="alert" className={`${panel} flex items-start gap-3 px-5 py-4 text-[0.9375rem] text-ink`}>
      <AlertTriangle size={18} strokeWidth={1.6} className="mt-[2px] shrink-0 text-[#d39d9d]" aria-hidden />
      <div>
        <p>{title}</p>
        {text ? <p className="text-ink-2">{text}</p> : null}
      </div>
    </div>
  );
}

export function Skeleton({ rows = 6 }: { rows?: number }) {
  return (
    <div aria-hidden className="flex animate-pulse flex-col gap-3">
      <div className="mb-3 h-9 w-56 rounded-full bg-surface/70" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-12 rounded-2xl bg-surface/50" style={{ opacity: 1 - i * 0.1 }} />
      ))}
    </div>
  );
}

export function BackLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2 text-[0.875rem] text-ink-2 transition-colors hover:text-ink">
      {children}
    </Link>
  );
}

/** Keyboard key hint, e.g. <Kbd>/</Kbd>. */
export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-grid h-5 min-w-5 place-items-center rounded-md border border-line-strong px-1 font-mono text-[0.6875rem] text-ink-2">
      {children}
    </kbd>
  );
}

/* ───────────────────────── Bars (dashboard, no chart library) ───────────────────────── */

/**
 * Thin horizontal bars in the brand's muted hues. Each row is plain text (label + number), so
 * screen readers get the data; the bar itself is decorative.
 */
export function Bars({ rows, empty = "Nu există date încă.", hex = "#b7d4f7" }: { rows: { label: string; value: number; href?: string; hex?: string }[]; empty?: string; hex?: string }) {
  const max = Math.max(0, ...rows.map((r) => r.value));
  if (!rows.length || max === 0) return <p className="text-[0.875rem] text-ink-3">{empty}</p>;
  return (
    <ul className="flex flex-col gap-3">
      {rows.map((r) => {
        const content = (
          <>
            <span className="flex items-baseline justify-between gap-3 text-[0.875rem]">
              <span className="truncate text-ink-2">{r.label}</span>
              <span className="tabular font-mono text-[0.8125rem] text-ink">{r.value}</span>
            </span>
            <span aria-hidden className="block h-1 overflow-hidden rounded-full bg-ink/[0.06]">
              <span className="block h-full rounded-full opacity-70" style={{ width: `${Math.max(2, (r.value / max) * 100)}%`, background: r.hex ?? hex }} />
            </span>
          </>
        );
        return (
          <li key={r.label}>
            {r.href ? (
              <Link href={r.href} className="flex flex-col gap-1.5 rounded-md transition-opacity hover:opacity-80">
                {content}
              </Link>
            ) : (
              <div className="flex flex-col gap-1.5">{content}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
