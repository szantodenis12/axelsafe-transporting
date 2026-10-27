import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { ArrowLeft, Mail, Package, Phone, Truck, UserRound } from "lucide-react";
import { adminAuthor } from "@/lib/admin/auth";
import { adminStore } from "@/lib/admin/data";
import { formatAge, formatDateTime, formatDay } from "@/lib/admin/format";
import type { CarrierLead, Lead, QuoteLead } from "@/lib/leads/types";
import { CopyButton } from "@/components/admin/CopyButton";
import { Hotkeys } from "@/components/admin/Hotkeys";
import { AssignForm, NoteForm, SpamButton, StatusForm } from "@/components/admin/LeadActions";
import { Timeline } from "@/components/admin/Timeline";
import { BackLink, ErrorPanel, Kbd, PageHeader, Skeleton, StatusBadge, StoreBanner, TypeBadge, TYPE_LABEL, btnChip, label, panel } from "@/components/admin/ui";

export const metadata: Metadata = { title: "Cerere" };

type Params = Promise<{ id: string }>;

export default function AdminLeadPage({ params }: { params: Params }) {
  return (
    <Suspense fallback={<Skeleton rows={8} />}>
      <LeadDetail params={params} />
    </Suspense>
  );
}

/* ───────────────────────── Small building blocks ───────────────────────── */

function Section({ id, title, icon, children }: { id: string; title: string; icon?: ReactNode; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className={`${panel} p-5 sm:p-6`}>
      <h2 id={id} className={`${label} mb-5 flex items-center gap-2.5`}>
        {icon}
        {title}
      </h2>
      {children}
    </section>
  );
}

function Field({ label: l, children, wide }: { label: string; children: ReactNode; wide?: boolean }) {
  return (
    <div className={`flex min-w-0 flex-col gap-1.5 ${wide ? "sm:col-span-2" : ""}`}>
      <dt className="t-label !text-ink-3">{l}</dt>
      <dd className="min-w-0 break-words text-[1rem] text-ink">{children}</dd>
    </div>
  );
}

const Dash = () => <span className="text-ink-3">—</span>;

function Text({ value }: { value?: string }) {
  return value ? <span className="whitespace-pre-wrap leading-relaxed">{value}</span> : <Dash />;
}

/** Route board, after the public ExampleEnquiry card: dot — dashed line with truck — dot. */
function RouteBoard({ lead }: { lead: QuoteLead }) {
  const d = lead.details;
  return (
    <section aria-labelledby="route-h" className={`${panel} p-5 sm:p-6`}>
      <h2 id="route-h" className={`${label} mb-6 flex items-center gap-2.5`}>
        <Truck size={14} strokeWidth={1.5} aria-hidden className="text-accent" />
        Rută și date
      </h2>
      <div className="flex items-center gap-4">
        <span className="block h-2.5 w-2.5 shrink-0 rounded-full bg-ink shadow-[0_0_12px_3px_rgba(183,212,247,0.5)]" />
        <div className="relative h-px flex-1 bg-[repeating-linear-gradient(90deg,rgba(190,210,235,0.35)_0_6px,transparent_6px_12px)]">
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg-2 px-2 text-accent">
            <Truck size={18} strokeWidth={1.5} aria-hidden />
          </span>
        </div>
        <span className="block h-2.5 w-2.5 shrink-0 rounded-full border border-accent bg-bg" />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="min-w-0">
          <p className="t-label !text-ink-3">Încărcare</p>
          <p className="mt-1.5 break-words text-[1.375rem] font-light leading-tight tracking-[-0.02em] text-ink">{d.pickupLocation}</p>
          <p className="tabular mt-1 text-[0.9375rem] text-ink-2">{d.pickupDate ? formatDay(d.pickupDate) : "Data nespecificată"}</p>
        </div>
        <div className="min-w-0 text-right">
          <p className="t-label !text-ink-3">Livrare</p>
          <p className="mt-1.5 break-words text-[1.375rem] font-light leading-tight tracking-[-0.02em] text-ink">{d.deliveryLocation}</p>
          <p className="tabular mt-1 text-[0.9375rem] text-ink-2">{d.deliveryDate ? formatDay(d.deliveryDate) : "Data nespecificată"}</p>
        </div>
      </div>
    </section>
  );
}

function QuoteBody({ lead }: { lead: QuoteLead }) {
  const d = lead.details;
  return (
    <>
      <RouteBoard lead={lead} />
      <Section id="cargo-h" title="Marfă" icon={<Package size={14} strokeWidth={1.5} aria-hidden className="text-accent" />}>
        <dl className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
          <Field label="Descrierea mărfii" wide><Text value={d.cargoDescription} /></Field>
          <Field label="Greutate"><Text value={d.weight} /></Field>
        </dl>
      </Section>
      <Section id="msg-h" title="Informații suplimentare">
        <p className="text-[1rem]"><Text value={d.additional} /></p>
      </Section>
    </>
  );
}

function CarrierBody({ lead }: { lead: CarrierLead }) {
  const d = lead.details;
  return (
    <>
      <Section id="fleet-h" title="Profil transportator" icon={<Truck size={14} strokeWidth={1.5} aria-hidden className="text-accent" />}>
        <dl className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
          <Field label="Țara"><Text value={d.country} /></Field>
          <Field label="Dimensiunea flotei"><Text value={d.fleetSize} /></Field>
          <Field label="Tipuri de vehicule" wide><Text value={d.vehicleTypes} /></Field>
          <Field label="Regiuni deservite" wide><Text value={d.regions} /></Field>
        </dl>
      </Section>
      <Section id="msg-h" title="Mesaj">
        <p className="text-[1rem]"><Text value={d.message} /></p>
      </Section>
    </>
  );
}

function Meta({ k, v, mono, small }: { k: string; v?: string; mono?: boolean; small?: boolean }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="text-ink-3">{k}</dt>
      <dd className={`break-all text-ink-2 ${mono ? "font-mono text-[0.8125rem]" : ""} ${small ? "text-[0.8125rem] leading-snug" : ""}`}>
        {v || <Dash />}
      </dd>
    </div>
  );
}

function Tracking({ lead }: { lead: Lead }) {
  return (
    <details className={`${panel} group`}>
      <summary className={`${label} flex cursor-pointer list-none items-center justify-between gap-3 p-5 sm:px-6 [&::-webkit-details-marker]:hidden`}>
        <span>Urmărire și detalii tehnice</span>
        <span aria-hidden className="text-ink-3 transition-transform group-open:rotate-180">⌄</span>
      </summary>
      <dl className="grid grid-cols-1 gap-x-10 gap-y-4 border-t border-line p-5 text-[0.875rem] sm:grid-cols-2 sm:px-6">
        <Meta k="Pagina sursă" v={lead.source} />
        <Meta k="Limbă" v={lead.locale} />
        {lead.utm ? Object.entries(lead.utm).map(([k, v]) => <Meta key={k} k={k} v={v} mono />) : <Meta k="UTM" v={undefined} />}
        <Meta k="ID cerere" v={lead.requestId} mono />
        <Meta k="Hash IP" v={lead.ipHash ? `${lead.ipHash.slice(0, 12)}…` : undefined} mono />
        <Meta k="Consimțământ acordat" v={formatDateTime(lead.consentAt)} />
        <Meta k="Ultima actualizare" v={formatDateTime(lead.updatedAt)} />
        <div className="sm:col-span-2"><Meta k="User agent" v={lead.userAgent} small /></div>
      </dl>
    </details>
  );
}

/* ───────────────────────── Page ───────────────────────── */

async function LeadDetail({ params }: { params: Params }) {
  const { id } = await params;
  const { repo, status: store } = await adminStore();

  if (!repo) {
    return (
      <>
        <PageHeader title="Cerere" eyebrow="CRM" />
        <StoreBanner status={store} />
      </>
    );
  }

  let result;
  try {
    result = await repo.get(id);
  } catch (err) {
    console.error("[admin] lead load failed:", err instanceof Error ? err.message : err);
    return (
      <>
        <PageHeader title="Cerere" eyebrow="CRM" />
        <ErrorPanel title="Nu am putut încărca această cerere." text="Verifică conexiunea la stocarea cererilor și încearcă din nou." />
      </>
    );
  }
  if (!result) notFound();

  const { lead, events } = result;
  const me = adminAuthor();
  const phoneHref = `tel:${lead.phone.replace(/[^+\d]/g, "")}`;
  const isSpam = lead.status === "spam";

  return (
    <>
      <Hotkeys mode="detail" />
      <div className="mb-5">
        <BackLink href="/admin/leads">
          <ArrowLeft size={14} strokeWidth={1.6} aria-hidden /> Toate cererile
        </BackLink>
      </div>

      <header className={`${panel} mb-6 flex flex-col gap-6 p-5 sm:p-7`}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="t-label eyebrow mb-3">{TYPE_LABEL[lead.type]}</p>
            <h1 className="a-title break-words">{lead.companyName}</h1>
            <p className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.9375rem] text-ink-2">
              <UserRound size={14} strokeWidth={1.5} aria-hidden className="text-ink-3" />
              {lead.contactPerson}
              <span aria-hidden className="text-ink-3">·</span>
              <time dateTime={lead.createdAt} title={formatDateTime(lead.createdAt)}>
                primită {formatDateTime(lead.createdAt)} ({formatAge(lead.createdAt)})
              </time>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <TypeBadge type={lead.type} />
            <StatusBadge status={lead.status} />
          </div>
        </div>

        {isSpam ? (
          <p role="status" className="rounded-2xl border border-line bg-ink/[0.03] px-4 py-3 text-[0.9375rem] text-ink-2">
            Această cerere este marcată ca spam și nu apare în totalurile fluxului. Folosește „Nu e spam — restaurează” dacă a fost o greșeală.
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Acțiuni rapide">
          <a href={`mailto:${lead.email}`} className={btnChip}>
            <Mail size={14} strokeWidth={1.6} aria-hidden /> Trimite e-mail
            <span className="hidden text-ink-3 sm:inline">· {lead.email}</span>
          </a>
          <CopyButton value={lead.email} label="e-mailul" />
          <a href={phoneHref} className={btnChip}>
            <Phone size={14} strokeWidth={1.6} aria-hidden /> Sună
            <span className="hidden text-ink-3 sm:inline">· {lead.phone}</span>
          </a>
          <CopyButton value={lead.phone} label="telefonul" />
          <span className="hidden h-5 w-px bg-line sm:block" aria-hidden />
          <SpamButton leadId={lead.id} isSpam={isSpam} />
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_410px]">
        {/* ───────── Left: request data ───────── */}
        <div className="flex min-w-0 flex-col gap-4">
          {lead.type === "quote" ? <QuoteBody lead={lead} /> : <CarrierBody lead={lead} />}

          <Section id="contact-h" title="Contact" icon={<UserRound size={14} strokeWidth={1.5} aria-hidden className="text-accent" />}>
            <dl className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
              <Field label="Persoană de contact"><Text value={lead.contactPerson} /></Field>
              <Field label="Companie"><Text value={lead.companyName} /></Field>
              <Field label="E-mail">
                <a href={`mailto:${lead.email}`} className="underline-offset-4 hover:underline">{lead.email}</a>
              </Field>
              <Field label="Telefon">
                <a href={phoneHref} className="underline-offset-4 hover:underline">{lead.phone}</a>
              </Field>
            </dl>
          </Section>

          <Tracking lead={lead} />
          <p className="hidden items-center gap-2 text-[0.8125rem] text-ink-3 xl:flex">
            <Kbd>n</Kbd> notă · <Kbd>s</Kbd> motiv stare · <Kbd>Esc</Kbd> înapoi la listă
          </p>
        </div>

        {/* ───────── Right: workflow panel ───────── */}
        <aside aria-label="Flux de lucru" className="flex min-w-0 flex-col gap-4 xl:sticky xl:top-6 xl:max-h-[calc(100dvh-3rem)] xl:self-start xl:overflow-y-auto xl:pr-1">
          <StatusForm leadId={lead.id} type={lead.type} current={lead.status} />
          <AssignForm leadId={lead.id} current={lead.assignedTo} me={me} />
          <section aria-labelledby="activity-h" className={`${panel} flex flex-col gap-5 p-5`}>
            <h2 id="activity-h" className="sr-only">Note și activitate</h2>
            <NoteForm leadId={lead.id} />
            <div className="border-t border-line pt-5">
              <p className={`${label} mb-4`}>Activitate · cele mai noi primele</p>
              <Timeline events={events} />
            </div>
          </section>
        </aside>
      </div>
    </>
  );
}
