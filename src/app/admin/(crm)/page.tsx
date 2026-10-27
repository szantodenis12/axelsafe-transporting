import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { adminStore } from "@/lib/admin/data";
import { LEAD_TYPES, statusesFor, type LeadStatus } from "@/lib/leads/schema";
import type { LeadStats } from "@/lib/leads/types";
import { Hotkeys } from "@/components/admin/Hotkeys";
import { LeadsTable } from "@/components/admin/LeadsTable";
import { DriverTag, ErrorPanel, PageHeader, Skeleton, StoreBanner, STATUS_HEX, STATUS_LABEL, StatusDot, TYPE_PLURAL, panel } from "@/components/admin/ui";

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
    { key: "progress", label: "În lucru", hint: "în analiză + ofertă trimisă", n: sumStatus(stats, "reviewing", "quoted"), href: "/admin/leads?status=reviewing", dot: "reviewing" },
    { key: "won", label: "Câștigate / aprobate", hint: "închise, pozitiv", n: sumStatus(stats, "won", "approved"), href: "/admin/leads?status=won", dot: "won" },
    { key: "lost", label: "Pierdute / respinse", hint: "închise, negativ", n: sumStatus(stats, "lost", "rejected"), href: "/admin/leads?status=lost", dot: "lost" },
    { key: "spam", label: "Spam", hint: "în afara fluxului", n: sumStatus(stats, "spam"), href: "/admin/leads?status=spam", dot: "spam" },
  ];
  return (
    <section aria-label="Sumar" className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
      <div className="a-tile col-span-2 flex flex-col justify-between gap-5 p-5 sm:col-span-3 xl:col-span-1">
        <p className="t-label !text-ink-3">Total cereri</p>
        <p className="a-num">{stats.total}</p>
        <p className="text-[0.875rem] text-ink-2">
          {stats.byType.quote.total} oferte · {stats.byType.carrier.total} transportatori
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

/** Per-type pipeline: thin muted bar + a count per status. */
function TypeBreakdown({ stats }: { stats: LeadStats }) {
  return (
    <section aria-label="Pe tipuri" className="mb-9 grid grid-cols-1 gap-3 lg:grid-cols-2">
      {LEAD_TYPES.map((type) => {
        const bucket = stats.byType[type];
        const list = statusesFor(type);
        return (
          <div key={type} className={`${panel} flex flex-col gap-5 p-6`}>
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="a-h2">
                {TYPE_PLURAL[type]} <span className="tabular ml-2 font-mono text-[0.875rem] text-ink-3">{bucket.total}</span>
              </h2>
              <Link href={`/admin/leads?type=${type}`} className="link-arrow !text-[0.875rem] !text-ink-2">
                Deschide <ArrowRight size={14} strokeWidth={1.6} aria-hidden />
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

  let stats, waiting, recent;
  try {
    [stats, waiting, recent] = await Promise.all([repo.stats(), repo.list({ status: "new", limit: 8 }), repo.list({ limit: 10 })]);
  } catch (err) {
    console.error("[admin] dashboard load failed:", err instanceof Error ? err.message : err);
    return (
      <>
        <PageHeader title="Panou" eyebrow="CRM" />
        <ErrorPanel title="Nu am putut încărca cererile." text="Verifică conexiunea la stocarea cererilor și încearcă din nou." />
      </>
    );
  }

  const newCount = sumStatus(stats, "new");

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
          </span>
        }
        actions={<DriverTag status={status} />}
      />

      <OverviewStrip stats={stats} />
      <TypeBreakdown stats={stats} />

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
          <LeadsTable leads={waiting} emptyTitle="" compact />
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
        <LeadsTable leads={recent} emptyTitle="Nicio cerere încă" emptyText="Solicitările primite de pe site vor apărea aici." compact />
      </section>
    </>
  );
}
