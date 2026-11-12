import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Plus } from "lucide-react";
import { adminStore, leadStats, requestNow } from "@/lib/admin/data";
import { isLeadStatus, isLeadType, SOURCE_CHANNELS, type SourceChannel } from "@/lib/leads/schema";
import type { LeadStats, OwnerFilter } from "@/lib/leads/types";
import { CHANNEL_LABEL, STATUS_LABEL, TYPE_PLURAL } from "@/lib/leads/labels";
import { Hotkeys } from "@/components/admin/Hotkeys";
import { LeadFilters, type LeadFilterValues } from "@/components/admin/LeadFilters";
import { LeadsTable } from "@/components/admin/LeadsTable";
import { PipelineBoard } from "@/components/admin/PipelineBoard";
import { btnGhost, DriverTag, ErrorPanel, Kbd, PageHeader, Skeleton, StoreBanner } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Cereri" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
const isChannel = (value: unknown): value is SourceChannel => (SOURCE_CHANNELS as readonly string[]).includes(String(value));
const isOwner = (value: unknown): value is OwnerFilter => value === "mine" || value === "unassigned";

export default function AdminLeadsPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <Suspense fallback={<Skeleton rows={10} />}>
      <LeadsList searchParams={searchParams} />
    </Suspense>
  );
}

async function LeadsList({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const view = first(sp.view) === "board" ? "board" : "list";
  const type = first(sp.type);
  const status = first(sp.status);
  const channel = first(sp.channel);
  const owner = first(sp.owner);
  const q = first(sp.q)?.trim().slice(0, 80);
  const filters: LeadFilterValues = {
    view,
    type: isLeadType(type) ? type : view === "board" ? "quote" : undefined,
    status: view === "list" && isLeadStatus(status) ? status : undefined,
    channel: isChannel(channel) ? channel : undefined,
    owner: isOwner(owner) ? owner : "all",
    q: q || undefined,
  };

  const { repo, status: store, user } = await adminStore();
  const newButton = (
    <Link href="/admin/leads/new" className={`${btnGhost} inline-flex items-center gap-2`}>
      <Plus size={15} strokeWidth={1.6} aria-hidden /> Lead nou
    </Link>
  );

  if (!repo) {
    return (
      <>
        <PageHeader title="Cereri" eyebrow="CRM" />
        <StoreBanner status={store} />
      </>
    );
  }

  const limit = view === "board" ? 500 : 200;
  let leads, stats: LeadStats | null;
  try {
    [leads, stats] = await Promise.all([repo.list({ ...filters, userId: user.id, limit }), leadStats()]);
  } catch (err) {
    console.error("[admin] leads list failed:", err instanceof Error ? err.message : err);
    return (
      <>
        <PageHeader title="Cereri" eyebrow="CRM" />
        <ErrorPanel title="Nu am putut încărca cererile." text="Verifică conexiunea la stocarea cererilor și încearcă din nou." />
      </>
    );
  }

  const now = requestNow();
  const filtered = Boolean(filters.type || filters.status || filters.channel || filters.q || filters.owner !== "all");
  const title =
    view === "board" && filters.type
      ? `Pipeline · ${TYPE_PLURAL[filters.type]}`
      : filters.status === "spam"
        ? "Spam"
        : filters.type
          ? TYPE_PLURAL[filters.type]
          : "Toate cererile";
  const scope = [
    filters.status && filters.status !== "spam" ? STATUS_LABEL[filters.status] : null,
    filters.channel ? `canal ${CHANNEL_LABEL[filters.channel]}` : null,
    filters.owner === "mine" ? "ale mele" : filters.owner === "unassigned" ? "nealocate" : null,
    filters.q ? `“${filters.q}”` : null,
  ]
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
            {leads.length >= limit ? "+" : ""} {leads.length === 1 ? "cerere" : "cereri"}
            {scope ? ` · ${scope}` : ""}
            {view === "list" ? " · cele mai noi primele" : " · spam ascuns"}
          </span>
        }
        actions={
          <>
            <DriverTag status={store} />
            {newButton}
          </>
        }
      />
      <LeadFilters values={filters} stats={stats} />
      {filters.owner === "mine" && !user.id ? (
        <p className="mb-4 text-[0.875rem] text-ink-3">„Ale mele” funcționează doar cu un cont personal (nu cu parola comună).</p>
      ) : null}
      {view === "board" && filters.type ? (
        <PipelineBoard type={filters.type} leads={leads.filter((l) => l.status !== "spam")} now={now} />
      ) : (
        <LeadsTable
          leads={leads}
          now={now}
          emptyTitle={filtered ? "Nicio cerere nu corespunde filtrelor" : "Nicio cerere încă"}
          emptyText={filtered ? "Șterge căutarea sau alege alt filtru." : "Solicitările de pe site și cele adăugate manual vor apărea aici."}
        />
      )}
      {leads.length ? (
        <p className="mt-3 hidden items-center gap-2 text-[0.75rem] text-ink-3 lg:flex">
          <Kbd>j</Kbd> <Kbd>k</Kbd> navigare · <Kbd>Enter</Kbd> deschide · <Kbd>/</Kbd> căutare · <Kbd>g</Kbd> <Kbd>d</Kbd> panou
        </p>
      ) : null}
    </>
  );
}
