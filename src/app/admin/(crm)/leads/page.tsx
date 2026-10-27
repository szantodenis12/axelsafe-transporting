import type { Metadata } from "next";
import { Suspense } from "react";
import { adminStore } from "@/lib/admin/data";
import { isLeadStatus, isLeadType } from "@/lib/leads/schema";
import { Hotkeys } from "@/components/admin/Hotkeys";
import { LeadFilters, type LeadFilterValues } from "@/components/admin/LeadFilters";
import { LeadsTable } from "@/components/admin/LeadsTable";
import { DriverTag, ErrorPanel, Kbd, PageHeader, Skeleton, StoreBanner, STATUS_LABEL, TYPE_PLURAL } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Cereri" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default function AdminLeadsPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <LeadsList searchParams={searchParams} />
    </Suspense>
  );
}

async function LeadsList({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const type = first(sp.type);
  const status = first(sp.status);
  const q = first(sp.q)?.trim().slice(0, 80);
  const filters: LeadFilterValues = {
    type: isLeadType(type) ? type : undefined,
    status: isLeadStatus(status) ? status : undefined,
    q: q || undefined,
  };

  const { repo, status: store } = await adminStore();

  if (!repo) {
    return (
      <>
        <PageHeader title="Cereri" eyebrow="CRM" />
        <StoreBanner status={store} />
      </>
    );
  }

  let leads, stats;
  try {
    [leads, stats] = await Promise.all([repo.list({ ...filters, limit: 200 }), repo.stats()]);
  } catch (err) {
    console.error("[admin] leads list failed:", err instanceof Error ? err.message : err);
    return (
      <>
        <PageHeader title="Cereri" eyebrow="CRM" />
        <ErrorPanel title="Nu am putut încărca cererile." text="Verifică conexiunea la stocarea cererilor și încearcă din nou." />
      </>
    );
  }

  const filtered = Boolean(filters.type || filters.status || filters.q);
  const title = filters.status === "spam" ? "Spam" : filters.type ? TYPE_PLURAL[filters.type] : "Toate cererile";
  const scope = [filters.status && filters.status !== "spam" ? STATUS_LABEL[filters.status] : null, filters.q ? `“${filters.q}”` : null]
    .filter(Boolean)
    .join(" · ");

  return (
    <>
      <Hotkeys mode="list" />
      <PageHeader
        title={title}
        eyebrow="CRM"
        meta={
          <span>
            {leads.length}
            {leads.length === 200 ? "+" : ""} {leads.length === 1 ? "cerere" : "cereri"}
            {scope ? ` · ${scope}` : ""} · cele mai noi primele
          </span>
        }
        actions={<DriverTag status={store} />}
      />
      <LeadFilters values={filters} stats={stats} />
      <LeadsTable
        leads={leads}
        emptyTitle={filtered ? "Nicio cerere nu corespunde filtrelor" : "Nicio cerere încă"}
        emptyText={filtered ? "Șterge căutarea sau alege altă stare." : "Solicitările primite de pe site vor apărea aici."}
      />
      {leads.length ? (
        <p className="mt-3 hidden items-center gap-2 text-[0.75rem] text-ink-3 lg:flex">
          <Kbd>j</Kbd> <Kbd>k</Kbd> navigare · <Kbd>Enter</Kbd> deschide · <Kbd>/</Kbd> căutare · <Kbd>g</Kbd> <Kbd>d</Kbd> panou
        </p>
      ) : null}
    </>
  );
}
