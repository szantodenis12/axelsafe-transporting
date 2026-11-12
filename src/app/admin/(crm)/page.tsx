import type { Metadata } from "next";
import Link from "next/link";
import { Suspense, type ReactNode } from "react";
import { AlarmClock, ArrowRight, CalendarClock, CheckCircle2, Plus } from "lucide-react";
import { adminStore, leadStats, requestNow } from "@/lib/admin/data";
import { computeDashboard, type DashboardMetrics } from "@/lib/admin/metrics";
import { formatAge, formatDateTime, leadFacts } from "@/lib/admin/format";
import { LEAD_TYPES, statusesFor, type LeadStatus } from "@/lib/leads/schema";
import { CHANNEL_LABEL, formatDuration, formatMoney, formatTime, LOST_REASON_LABEL } from "@/lib/leads/labels";
import { leadTitle, type Lead, type LeadStats } from "@/lib/leads/types";
import { Hotkeys } from "@/components/admin/Hotkeys";
import { LeadsTable } from "@/components/admin/LeadsTable";
import {
  ALERT_HEX,
  Bars,
  btnGhost,
  DriverTag,
  ErrorPanel,
  label,
  PageHeader,
  panel,
  Skeleton,
  StoreBanner,
  STATUS_HEX,
  STATUS_LABEL,
  StatusDot,
  TYPE_PLURAL,
} from "@/components/admin/ui";

export const metadata: Metadata = { title: "Panou" };

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<Skeleton />}>
      <Dashboard />
    </Suspense>
  );
}

const sumStatus = (stats: LeadStats, ...statuses: LeadStatus[]) =>
  LEAD_TYPES.reduce((n, t) => n + statuses.reduce((m, s) => m + (stats.byType[t].byStatus[s] ?? 0), 0), 0);

const plural = (n: number, one: string, many: string) => (n === 1 ? one : many);

/** Overview strip: one tile per stage, each a link to the filtered list. */
function OverviewStrip({ stats }: { stats: LeadStats }) {
  const tiles: { key: string; label: string; hint: string; n: number; href: string; dot: LeadStatus; strong?: boolean }[] = [
    { key: "new", label: "Noi", hint: "așteaptă primul răspuns", n: sumStatus(stats, "new"), href: "/admin/leads?status=new", dot: "new", strong: true },
    { key: "progress", label: "În lucru", hint: "în lucru + ofertate", n: sumStatus(stats, "reviewing", "quoted"), href: "/admin/leads?status=reviewing", dot: "reviewing" },
    { key: "won", label: "Câștigate / aprobate", hint: "închise, pozitiv", n: sumStatus(stats, "won", "approved"), href: "/admin/leads?status=won", dot: "won" },
    { key: "lost", label: "Pierdute / respinse", hint: "închise, negativ", n: sumStatus(stats, "lost", "rejected"), href: "/admin/leads?status=lost", dot: "lost" },
    { key: "spam", label: "Spam", hint: "în afara fluxului", n: sumStatus(stats, "spam"), href: "/admin/leads?status=spam", dot: "spam" },
  ];
  return (
    <section aria-label="Sumar" className="mb-3 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
      <div className="a-tile col-span-2 flex flex-col justify-between gap-5 p-5 sm:col-span-3 xl:col-span-1">
        <p className="t-label !text-ink-3">Total cereri</p>
        <p className="a-num">{stats.total}</p>
        <p className="text-[0.875rem] text-ink-2">
          {stats.byType.quote.total} oferte · {stats.byType.callback.total} apeluri · {stats.byType.carrier.total} transportatori
        </p>
      </div>
      {tiles.map((t) => (
        <Link key={t.key} href={t.href} className={`a-tile group flex flex-col justify-between gap-5 p-5 hover:bg-ink/[0.03] ${t.strong && t.n > 0 ? "!border-accent/35" : ""}`}>
          <p className="t-label flex items-center gap-2 !text-ink-3">
            <StatusDot status={t.dot} />
            {t.label}
          </p>
          <p className="a-num">{t.n}</p>
          <p className="text-[0.875rem] text-ink-3">{t.hint}</p>
        </Link>
      ))}
    </section>
  );
}

/** KPI tile (same language as the overview strip, smaller number). */
function Kpi({ label: l, value, hint, tone }: { label: string; value: ReactNode; hint?: string; tone?: "ok" | "alert" }) {
  return (
    <div className="a-tile flex flex-col justify-between gap-4 p-5">
      <p className="t-label !text-ink-3">{l}</p>
      <p
        className="tabular text-[clamp(1.625rem,2.2vw,2rem)] font-light leading-none tracking-[-0.035em] text-ink"
        style={tone ? { color: tone === "ok" ? "#8fcfbd" : ALERT_HEX } : undefined}
      >
        {value}
      </p>
      {hint ? <p className="text-[0.8125rem] text-ink-3">{hint}</p> : null}
    </div>
  );
}

function KpiRow({ m }: { m: DashboardMetrics }) {
  const margins = Object.entries(m.marginByCurrency);
  return (
    <section aria-label="Indicatori" className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
      <Kpi
        label="Primul răspuns · mediană"
        value={m.medianFirstResponseMin === undefined ? "—" : formatDuration(m.medianFirstResponseMin * 60_000)}
        hint={`cereri de pe site, 30 de zile (${m.firstResponseSample})`}
        tone={m.medianFirstResponseMin === undefined ? undefined : m.medianFirstResponseMin <= 60 ? "ok" : "alert"}
      />
      <Kpi label="Cereri noi" value={`${m.new7} / ${m.new30}`} hint="ultimele 7 / 30 de zile" />
      <Kpi
        label="Conversie"
        value={m.conversion === undefined ? "—" : `${Math.round(m.conversion * 100)}%`}
        hint={`câștigate / închise (${m.won} din ${m.won + m.lost}) · oferte + apeluri`}
      />
      <Kpi
        label="Marjă câștigate"
        value={
          margins.length ? (
            <span className="flex flex-col gap-1">
              {margins.map(([cur, v]) => (
                <span key={cur} className={margins.length > 1 ? "text-[1.25rem]" : ""}>{formatMoney(v, cur)}</span>
              ))}
            </span>
          ) : (
            "—"
          )
        }
        hint={`${m.won} ${plural(m.won, "câștigată", "câștigate")}${m.marginMissing ? ` · ${m.marginMissing} fără preț și cost` : ""}`}
      />
      <Kpi label="Transportatori aprobați" value={String(m.carriersApprovedThisMonth)} hint="luna aceasta" />
    </section>
  );
}

function SlaBanner({ leads, now }: { leads: Lead[]; now: number }) {
  if (!leads.length) return null;
  return (
    <section
      aria-labelledby="sla-h"
      className="mb-6 rounded-[18px] border p-5"
      style={{ borderColor: `color-mix(in srgb, ${ALERT_HEX} 38%, transparent)`, background: `color-mix(in srgb, ${ALERT_HEX} 6%, transparent)` }}
    >
      <h2 id="sla-h" className="mb-3 flex items-center gap-2.5 text-[1rem] text-ink">
        <AlarmClock size={17} strokeWidth={1.6} style={{ color: ALERT_HEX }} aria-hidden />
        {leads.length} {plural(leads.length, "cerere nouă așteaptă", "cereri noi așteaptă")} răspuns de peste o oră
      </h2>
      <ul className="flex flex-col divide-y divide-line">
        {leads.slice(0, 6).map((l) => (
          <li key={l.id}>
            <Link href={`/admin/leads/${l.id}`} className="flex items-baseline justify-between gap-4 py-2 text-[0.9375rem] text-ink-2 transition-colors hover:text-ink">
              <span className="min-w-0 truncate">
                <span className="text-ink">{leadTitle(l)}</span> · {leadFacts(l).primary}
              </span>
              <span className="tabular shrink-0 text-[0.8125rem]" style={{ color: ALERT_HEX }}>{formatAge(l.createdAt, now)}</span>
            </Link>
          </li>
        ))}
      </ul>
      {leads.length > 6 ? (
        <Link href="/admin/leads?status=new" className="link-arrow mt-3 !text-[0.875rem] !text-ink-2">
          Toate cele noi <ArrowRight size={14} strokeWidth={1.6} aria-hidden />
        </Link>
      ) : null}
    </section>
  );
}

function TaskCard({ id, title, icon, leads, now, late }: { id: string; title: string; icon: ReactNode; leads: Lead[]; now: number; late?: boolean }) {
  return (
    <section aria-labelledby={id} className={`${panel} flex flex-col gap-4 p-5 sm:p-6`}>
      <h2 id={id} className="a-h2 flex items-center justify-between gap-3">
        <span>
          {title} <span className="tabular ml-1.5 font-mono text-[0.875rem] text-ink-3">{leads.length}</span>
        </span>
        {icon}
      </h2>
      {leads.length ? (
        <ul className="flex flex-col divide-y divide-line">
          {leads.slice(0, 10).map((l) => (
            <li key={l.id}>
              <Link href={`/admin/leads/${l.id}`} className="group flex items-start justify-between gap-4 py-2.5">
                <span className="min-w-0">
                  <span className="block truncate text-[0.9375rem] text-ink group-hover:underline group-hover:underline-offset-4">{leadTitle(l)}</span>
                  <span className="block truncate text-[0.8125rem] text-ink-3">{l.nextActionNote || leadFacts(l).primary}</span>
                </span>
                <span
                  className={`tabular shrink-0 text-[0.8125rem] ${late ? "" : "text-ink-2"}`}
                  style={late ? { color: ALERT_HEX } : undefined}
                  title={l.nextActionAt ? formatDateTime(l.nextActionAt) : undefined}
                >
                  {l.nextActionAt ? (late ? `întârziat ${formatDuration(now - new Date(l.nextActionAt).getTime())}` : formatTime(l.nextActionAt)) : ""}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="flex items-center gap-2.5 text-[0.9375rem] text-ink-3">
          <CheckCircle2 size={16} strokeWidth={1.5} className="text-[#8fcfbd]" aria-hidden />
          {late ? "Nimic întârziat." : "Nimic programat pentru azi."}
        </p>
      )}
    </section>
  );
}

/** Per-type pipeline: thin muted bar + a count per status. */
function TypeBreakdown({ stats }: { stats: LeadStats }) {
  return (
    <section aria-label="Pe tipuri" className="mb-6 grid grid-cols-1 gap-3 lg:grid-cols-3">
      {LEAD_TYPES.map((type) => {
        const bucket = stats.byType[type];
        const list = statusesFor(type);
        return (
          <div key={type} className={`${panel} flex flex-col gap-5 p-6`}>
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="a-h2">
                {TYPE_PLURAL[type]} <span className="tabular ml-2 font-mono text-[0.875rem] text-ink-3">{bucket.total}</span>
              </h2>
              <Link href={`/admin/leads?view=board&type=${type}`} className="link-arrow shrink-0 !text-[0.875rem] !text-ink-2">
                Pipeline <ArrowRight size={14} strokeWidth={1.6} aria-hidden />
              </Link>
            </div>
            <div className="flex h-1 gap-0.5 overflow-hidden rounded-full bg-ink/[0.06]" role="img" aria-label={`${TYPE_PLURAL[type]} pe stări`}>
              {list.map((s) => {
                const n = bucket.byStatus[s] ?? 0;
                return n ? <span key={s} className="opacity-70" style={{ width: `${(n / bucket.total) * 100}%`, background: STATUS_HEX[s] }} /> : null;
              })}
            </div>
            <ul className="flex flex-wrap gap-2">
              {list.map((s) => {
                const n = bucket.byStatus[s] ?? 0;
                return (
                  <li key={s}>
                    <Link href={`/admin/leads?type=${type}&status=${s}`} className={`a-chip ${n === 0 ? "opacity-55" : ""}`}>
                      <StatusDot status={s} />
                      {STATUS_LABEL[s]}
                      <span className="tabular font-mono text-[0.75rem] text-ink-3">{n}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </section>
  );
}

function MetricCard({ title, children }: { title: string; children: ReactNode }) {
  const id = `m-${title.replace(/\W+/g, "-").toLowerCase()}`;
  return (
    <section aria-labelledby={id} className={`${panel} flex flex-col gap-5 p-6`}>
      <h2 id={id} className={label}>{title}</h2>
      {children}
    </section>
  );
}

async function Dashboard() {
  const { repo, status } = await adminStore();

  if (!repo) {
    return (
      <>
        <PageHeader title="Panou" eyebrow="CRM" />
        <StoreBanner status={status} />
      </>
    );
  }

  let leads, stats;
  try {
    [leads, stats] = await Promise.all([repo.all(), leadStats()]);
  } catch (err) {
    console.error("[admin] dashboard load failed:", err instanceof Error ? err.message : err);
    return (
      <>
        <PageHeader title="Panou" eyebrow="CRM" />
        <ErrorPanel title="Nu am putut încărca cererile." text="Verifică conexiunea la stocarea cererilor și încearcă din nou." />
      </>
    );
  }
  if (!stats) return null;

  const now = requestNow();
  const m = computeDashboard(leads, new Date(now));
  const newCount = sumStatus(stats, "new");
  // all() is newest first
  const waiting = leads.filter((l) => l.status === "new").slice(0, 8);
  const recent = leads.slice(0, 10);

  return (
    <>
      <Hotkeys mode="list" />
      <PageHeader
        title="Panou"
        eyebrow="CRM"
        meta={
          <span>
            {newCount > 0
              ? `${newCount} ${plural(newCount, "cerere nouă așteaptă", "cereri noi așteaptă")} un răspuns`
              : "Nimic în așteptare — totul a fost preluat"}
            {` · ${m.openTotal} ${plural(m.openTotal, "deschisă", "deschise")}`}
          </span>
        }
        actions={
          <>
            <DriverTag status={status} />
            <Link href="/admin/leads/new" className={`${btnGhost} inline-flex items-center gap-2`}>
              <Plus size={15} strokeWidth={1.6} aria-hidden /> Lead nou
            </Link>
          </>
        }
      />

      <SlaBanner leads={m.waitingOverSla} now={now} />
      <OverviewStrip stats={stats} />
      <KpiRow m={m} />

      <div className="mb-6 grid grid-cols-1 gap-3 lg:grid-cols-2">
        <TaskCard id="today-h" title="De făcut azi" icon={<CalendarClock size={17} strokeWidth={1.5} className="text-accent" aria-hidden />} leads={m.dueToday} now={now} />
        <TaskCard
          id="overdue-h"
          title="Întârziate"
          icon={<AlarmClock size={17} strokeWidth={1.5} style={{ color: m.overdue.length ? ALERT_HEX : undefined }} className={m.overdue.length ? "" : "text-ink-3"} aria-hidden />}
          leads={m.overdue}
          now={now}
          late
        />
      </div>

      <TypeBreakdown stats={stats} />

      <div className="mb-9 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        <MetricCard title="Motive de pierdere">
          <Bars
            hex={STATUS_HEX.lost}
            rows={m.lostReasons.filter((r) => r.count).map((r) => ({ label: LOST_REASON_LABEL[r.key], value: r.count }))}
            empty="Nicio cerere pierdută."
          />
        </MetricCard>
        <MetricCard title="Cereri pe canal">
          <Bars rows={m.byChannel.filter((c) => c.count).map((c) => ({ label: CHANNEL_LABEL[c.key], value: c.count, href: `/admin/leads?channel=${c.key}` }))} />
        </MetricCard>
        <MetricCard title="Site · sursă UTM">
          <Bars hex={STATUS_HEX.quoted} rows={m.byUtmSource.map((c) => ({ label: c.key, value: c.count }))} />
        </MetricCard>
      </div>

      <section aria-labelledby="waiting-heading" className="mb-9 flex flex-col gap-4">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="waiting-heading" className="a-h2">Necesită primul răspuns</h2>
          {newCount > 0 ? (
            <Link href="/admin/leads?status=new" className="link-arrow !text-[0.875rem] !text-ink-2">
              Toate cele noi ({newCount}) <ArrowRight size={14} strokeWidth={1.6} aria-hidden />
            </Link>
          ) : null}
        </div>
        {waiting.length ? (
          <LeadsTable leads={waiting} emptyTitle="" now={now} compact />
        ) : (
          <div className={`${panel} flex items-center gap-3 px-6 py-5 text-[0.9375rem] text-ink-2`}>
            <CheckCircle2 size={18} strokeWidth={1.5} className="text-[#8fcfbd]" aria-hidden />
            Toate cererile au fost preluate. Solicitările noi de pe site vor apărea aici.
          </div>
        )}
      </section>

      <section aria-labelledby="recent-heading" className="flex flex-col gap-4">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="recent-heading" className="a-h2">Ultimele cereri</h2>
          <Link href="/admin/leads" className="link-arrow !text-[0.875rem] !text-ink-2">
            Toate cererile <ArrowRight size={14} strokeWidth={1.6} aria-hidden />
          </Link>
        </div>
        <LeadsTable leads={recent} now={now} emptyTitle="Nicio cerere încă" emptyText="Solicitările primite de pe site vor apărea aici." compact />
      </section>
    </>
  );
}
