import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Mail, MessageCircle, Phone, Search, X } from "lucide-react";
import { adminStore } from "@/lib/admin/data";
import { formatDate } from "@/lib/admin/format";
import { telHref, VEHICLE_TYPES, whatsappDigits, type VehicleType } from "@/lib/leads/schema";
import { VEHICLE_LABEL } from "@/lib/leads/labels";
import { isVehicleType, vehicleLabels } from "@/lib/leads/summary";
import { leadTitle } from "@/lib/leads/types";
import { Hotkeys } from "@/components/admin/Hotkeys";
import { adminInputH, btnChip, btnGhost, DriverTag, EmptyState, ErrorPanel, Kbd, PageHeader, Skeleton, StoreBanner } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Transportatori aprobați" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;
const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

function href(vehicle?: VehicleType, q?: string) {
  const sp = new URLSearchParams();
  if (vehicle) sp.set("vehicle", vehicle);
  if (q) sp.set("q", q);
  const qs = sp.toString();
  return qs ? `/admin/carriers?${qs}` : "/admin/carriers";
}

export default function CarriersPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <Suspense fallback={<Skeleton rows={8} />}>
      <Carriers searchParams={searchParams} />
    </Suspense>
  );
}

async function Carriers({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const vehicleRaw = first(sp.vehicle) ?? "";
  const vehicle: VehicleType | undefined = isVehicleType(vehicleRaw) ? vehicleRaw : undefined;
  const q = first(sp.q)?.trim().slice(0, 80) || undefined;

  const { repo, status } = await adminStore();
  if (!repo) {
    return (
      <>
        <PageHeader title="Transportatori aprobați" eyebrow="CRM" />
        <StoreBanner status={status} />
      </>
    );
  }

  let carriers;
  try {
    carriers = await repo.carriers({ vehicle, q });
  } catch (err) {
    console.error("[admin] carriers failed:", err instanceof Error ? err.message : err);
    return (
      <>
        <PageHeader title="Transportatori aprobați" eyebrow="CRM" />
        <ErrorPanel title="Nu am putut încărca lista." text="Verifică conexiunea la stocarea cererilor și încearcă din nou." />
      </>
    );
  }

  const filtered = Boolean(vehicle || q);

  return (
    <>
      <Hotkeys mode="list" />
      <PageHeader
        title="Transportatori aprobați"
        eyebrow="CRM"
        meta={
          <span>
            {carriers.length} {filtered ? "potriviți" : "în total"} · doar transportatorii cu toate cele 4 verificări bifate
          </span>
        }
        actions={<DriverTag status={status} />}
      />

      <div className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-3">
        <div role="group" aria-label="Vehicul" className="inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-line-strong bg-bg-2/70 p-1.5 [scrollbar-width:none]">
          {[undefined, ...VEHICLE_TYPES].map((v) => {
            const on = vehicle === v;
            return (
              <Link
                key={v ?? "all"}
                href={href(v, q)}
                aria-current={on ? "true" : undefined}
                className={`inline-flex h-9 shrink-0 items-center whitespace-nowrap rounded-full px-4 text-[0.875rem] font-medium transition-colors ${on ? "bg-ink/[0.09] text-ink" : "text-ink-2 hover:text-ink"}`}
              >
                {v ? VEHICLE_LABEL[v] : "Toate vehiculele"}
              </Link>
            );
          })}
        </div>
        <form method="get" action="/admin/carriers" role="search" className="flex w-full items-center gap-2 xl:ml-auto xl:w-auto">
          {vehicle ? <input type="hidden" name="vehicle" value={vehicle} /> : null}
          <div className="relative min-w-0 flex-1 sm:w-[340px] sm:flex-none">
            <label htmlFor="f-q" className="sr-only">Rută, regiune, țară sau firmă</label>
            <Search size={15} strokeWidth={1.6} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-3" aria-hidden />
            <input
              id="f-q"
              name="q"
              type="search"
              defaultValue={q ?? ""}
              placeholder="Rută, regiune, țară sau firmă"
              maxLength={80}
              autoComplete="off"
              className={`${adminInputH} !rounded-full pl-10 pr-10`}
            />
            <span className="pointer-events-none absolute right-3.5 top-1/2 hidden -translate-y-1/2 lg:block"><Kbd>/</Kbd></span>
          </div>
          <button type="submit" className={btnGhost}>Caută</button>
          {filtered ? (
            <Link href="/admin/carriers" className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full px-3 text-[0.875rem] text-ink-2 hover:bg-ink/[0.06] hover:text-ink">
              <X size={13} strokeWidth={1.8} aria-hidden /> Șterge
            </Link>
          ) : null}
        </form>
      </div>

      {carriers.length ? (
        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2 2xl:grid-cols-3">
          {carriers.map((c) => {
            const wa = whatsappDigits(c.phone);
            const vehicles = vehicleLabels(c);
            const title = leadTitle(c);
            return (
              <li key={c.id} className="a-tile flex flex-col gap-4 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <Link href={`/admin/leads/${c.id}`} data-row-link className="block truncate rounded text-[1.0625rem] font-medium text-ink underline-offset-4 hover:underline">
                      {title}
                    </Link>
                    <p className="mt-0.5 truncate text-[0.875rem] text-ink-2">
                      {c.contactPerson}
                      {c.details.country ? ` · ${c.details.country}` : ""}
                    </p>
                  </div>
                  {c.approvedAt ? <span className="tabular shrink-0 text-[0.75rem] text-ink-3">aprobat {formatDate(c.approvedAt)}</span> : null}
                </div>
                {c.vatNumber ? <p className="tabular -mt-2 font-mono text-[0.8125rem] text-ink-3">CUI {c.vatNumber}</p> : null}
                {vehicles.length ? (
                  <ul className="flex flex-wrap gap-1.5" aria-label="Vehicule">
                    {vehicles.map((v) => (
                      <li key={v} className="inline-flex h-7 items-center rounded-full border border-line px-3 text-[0.8125rem] text-ink-2">
                        {v}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {c.details.regions ? <p className="text-[0.875rem] leading-relaxed text-ink-2">{c.details.regions}</p> : null}
                <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
                  {c.phone ? (
                    <a href={telHref(c.phone)} className={btnChip} aria-label={`Sună ${title}`}>
                      <Phone size={14} strokeWidth={1.6} aria-hidden /> Sună
                    </a>
                  ) : null}
                  {wa ? (
                    <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" className={btnChip} aria-label={`WhatsApp ${title}`}>
                      <MessageCircle size={14} strokeWidth={1.6} aria-hidden /> WhatsApp
                    </a>
                  ) : null}
                  {c.email ? (
                    <a href={`mailto:${c.email}`} className={btnChip} aria-label={`E-mail ${title}`}>
                      <Mail size={14} strokeWidth={1.6} aria-hidden /> E-mail
                    </a>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <EmptyState
          title={filtered ? "Niciun transportator pentru acest filtru" : "Niciun transportator aprobat încă"}
          text="Transportatorii apar aici după ce sunt bifate cele 4 verificări și starea devine „Aprobat”."
        />
      )}
    </>
  );
}
