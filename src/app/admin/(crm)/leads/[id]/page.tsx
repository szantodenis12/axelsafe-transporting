import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { AlertTriangle, ArrowLeft, Copy, Landmark, Mail, MessageCircle, Package, Phone, PhoneCall, Truck, UserRound } from "lucide-react";
import { activeUsers, adminStore, requestNow } from "@/lib/admin/data";
import { isOverdueNew } from "@/lib/admin/metrics";
import { formatAge, formatDateTime, formatDay, leadFacts } from "@/lib/admin/format";
import { isCustomerType, telHref, whatsappDigits } from "@/lib/leads/schema";
import { CALLBACK_TIME_LABEL, CHANNEL_LABEL, formatDuration, LOST_REASON_LABEL } from "@/lib/leads/labels";
import { vehicleLabels } from "@/lib/leads/summary";
import { allChecksDone, leadTitle, type AnafSnapshot, type CallbackLead, type CarrierLead, type Lead, type QuoteLead } from "@/lib/leads/types";
import { CopyButton } from "@/components/admin/CopyButton";
import { Hotkeys } from "@/components/admin/Hotkeys";
import { AnafButton, CarrierChecklist, EconomicsForm, FollowUpForm, NoteForm, OwnerPanel, SpamButton, StatusForm } from "@/components/admin/LeadActions";
import { Timeline } from "@/components/admin/Timeline";
import {
  ALERT_HEX,
  BackLink,
  btnChip,
  ChannelBadge,
  ErrorPanel,
  Kbd,
  label,
  PageHeader,
  panel,
  Skeleton,
  SlaBadge,
  StatusBadge,
  StoreBanner,
  TYPE_LABEL,
  TypeBadge,
} from "@/components/admin/ui";

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

function Section({ id, title, icon, children, aside }: { id: string; title: string; icon?: ReactNode; children: ReactNode; aside?: ReactNode }) {
  return (
    <section aria-labelledby={id} className={`${panel} p-5 sm:p-6`}>
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <h2 id={id} className={`${label} flex items-center gap-2.5`}>
          {icon}
          {title}
        </h2>
        {aside}
      </div>
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

const icon = (I: typeof Truck) => <I size={14} strokeWidth={1.5} aria-hidden className="text-accent" />;

/** Route board, after the public ExampleEnquiry card: dot — dashed line with truck — dot. */
function RouteBoard({ lead }: { lead: QuoteLead }) {
  const d = lead.details;
  const quick = d.mode === "quick";
  return (
    <section aria-labelledby="route-h" className={`${panel} p-5 sm:p-6`}>
      <h2 id="route-h" className={`${label} mb-6 flex items-center gap-2.5`}>
        {icon(Truck)}
        {quick ? "Rută · cerere rapidă" : "Rută și date"}
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
          <p className="mt-1.5 break-words text-[1.375rem] font-light leading-tight tracking-[-0.02em] text-ink">{d.pickupLocation || "?"}</p>
          <p className="tabular mt-1 text-[0.9375rem] text-ink-2">{d.pickupDate ? formatDay(d.pickupDate) : "Data nespecificată"}</p>
        </div>
        <div className="min-w-0 text-right">
          <p className="t-label !text-ink-3">Livrare</p>
          <p className="mt-1.5 break-words text-[1.375rem] font-light leading-tight tracking-[-0.02em] text-ink">{d.deliveryLocation || "?"}</p>
          <p className="tabular mt-1 text-[0.9375rem] text-ink-2">{d.deliveryDate ? formatDay(d.deliveryDate) : "Data nespecificată"}</p>
        </div>
      </div>
    </section>
  );
}

function QuoteBody({ lead }: { lead: QuoteLead }) {
  const d = lead.details;
  const quick = d.mode === "quick";
  return (
    <>
      <RouteBoard lead={lead} />
      {quick ? null : (
        <Section id="cargo-h" title="Marfă" icon={icon(Package)}>
          <dl className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
            <Field label="Descrierea mărfii" wide><Text value={d.cargoDescription} /></Field>
            <Field label="Greutate / unități"><Text value={d.weight} /></Field>
          </dl>
        </Section>
      )}
      <Section id="msg-h" title={quick ? "Notă" : "Informații suplimentare"}>
        <p className="text-[1rem]"><Text value={d.additional} /></p>
      </Section>
    </>
  );
}

function CallbackBody({ lead }: { lead: CallbackLead }) {
  const d = lead.details;
  return (
    <Section id="call-h" title="Vă sunăm noi" icon={icon(PhoneCall)}>
      <dl className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
        <Field label="Când să sunăm">
          <span className="text-[1.375rem] font-light tracking-[-0.02em]">{CALLBACK_TIME_LABEL[d.preferredTime] ?? d.preferredTime}</span>
        </Field>
        <Field label="Telefon">{lead.phone ? <a href={telHref(lead.phone)} className="underline-offset-4 hover:underline">{lead.phone}</a> : <Dash />}</Field>
        <Field label="Notă" wide><Text value={d.note} /></Field>
      </dl>
    </Section>
  );
}

function CarrierBody({ lead }: { lead: CarrierLead }) {
  const d = lead.details;
  const vehicles = vehicleLabels(lead);
  return (
    <>
      <Section id="fleet-h" title="Profil transportator" icon={icon(Truck)}>
        <dl className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
          <Field label="CUI / cod TVA">{lead.vatNumber ? <span className="tabular font-mono text-[0.9375rem]">{lead.vatNumber}</span> : <Dash />}</Field>
          <Field label="Țara de înregistrare"><Text value={d.country} /></Field>
          <Field label="Număr de vehicule"><Text value={d.fleetSize} /></Field>
          <Field label="Asigurare CMR">
            <Text value={d.cmrInsurance === "yes" ? "Da (declarat)" : d.cmrInsurance === "no" ? "Nu" : undefined} />
          </Field>
          <Field label="Tipuri de vehicule" wide>
            {vehicles.length ? (
              <span className="flex flex-wrap gap-1.5">
                {vehicles.map((v) => (
                  <span key={v} className="inline-flex h-7 items-center rounded-full border border-line px-3 text-[0.8125rem] text-ink-2">{v}</span>
                ))}
              </span>
            ) : (
              <Dash />
            )}
          </Field>
          <Field label="Nr. licență transport"><Text value={d.licenceNumber} /></Field>
          <Field label="Regiuni / rute deservite" wide><Text value={d.regions} /></Field>
        </dl>
      </Section>
      <Section id="msg-h" title="Mesaj">
        <p className="text-[1rem]"><Text value={d.message} /></p>
      </Section>
    </>
  );
}

function AnafPanel({ leadId, anaf, hasVat }: { leadId: string; anaf?: AnafSnapshot; hasVat: boolean }) {
  return (
    <Section
      id="anaf-h"
      title="Date oficiale ANAF"
      icon={icon(Landmark)}
      aside={<AnafButton leadId={leadId} hasVat={hasVat} />}
    >
      <p className="-mt-3 mb-4 text-[0.8125rem] text-ink-3">
        {anaf ? `Verificat de ${anaf.checkedBy}, ${formatDateTime(anaf.checkedAt)}` : hasVat ? "Încă neverificat." : "Cererea nu are CUI."}
      </p>
      {anaf ? (
        <div className="flex flex-col gap-5">
          {anaf.inactive || anaf.insolvencyFlag ? (
            <p
              role="alert"
              className="flex items-start gap-2.5 rounded-2xl border px-4 py-3 text-[0.9375rem] text-ink"
              style={{ borderColor: `color-mix(in srgb, ${ALERT_HEX} 40%, transparent)`, background: `color-mix(in srgb, ${ALERT_HEX} 7%, transparent)` }}
            >
              <AlertTriangle size={16} strokeWidth={1.6} className="mt-[3px] shrink-0" style={{ color: ALERT_HEX }} aria-hidden />
              <span>
                {anaf.inactive ? `Contribuabil INACTIV${anaf.inactiveSince ? ` din ${anaf.inactiveSince}` : ""}. ` : ""}
                {anaf.insolvencyFlag ? "Starea de înregistrare indică radiere, dizolvare sau insolvență. " : ""}
                Nu aproba fără clarificări.
              </span>
            </p>
          ) : null}
          <dl className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
            <Field label="Denumire"><Text value={anaf.name} /></Field>
            <Field label="CUI"><span className="tabular font-mono text-[0.9375rem]">{anaf.cui}</span></Field>
            <Field label="Adresă" wide><Text value={anaf.address} /></Field>
            <Field label="Nr. Registrul Comerțului"><Text value={anaf.regCom} /></Field>
            <Field label="CAEN"><Text value={anaf.caen} /></Field>
            <Field label="Plătitor TVA"><Text value={anaf.vatPayer ? `Da${anaf.vatSince ? `, din ${anaf.vatSince}` : ""}` : "Nu"} /></Field>
            <Field label="Inactiv"><Text value={anaf.inactive ? "Da" : "Nu"} /></Field>
            <Field label="Stare înregistrare" wide><Text value={anaf.registrationStatus} /></Field>
          </dl>
          <p className="text-[0.8125rem] text-ink-3">
            Serviciul ANAF nu publică direct insolvența. Pentru bifa „Firmă activă, fără insolvență” verifică și Buletinul Procedurilor de Insolvență (ONRC).
          </p>
        </div>
      ) : null}
    </Section>
  );
}

function DuplicatesPanel({ duplicates }: { duplicates: Lead[] }) {
  return (
    <Section id="dup-h" title="Posibile duplicate" icon={icon(Copy)}>
      {duplicates.length ? (
        <ul className="-my-2 flex flex-col divide-y divide-line">
          {duplicates.map((d) => (
            <li key={d.id} className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 py-3">
              <Link href={`/admin/leads/${d.id}`} className="group min-w-0">
                <span className="block truncate text-[0.9375rem] text-ink group-hover:underline group-hover:underline-offset-4">{leadTitle(d)}</span>
                <span className="block truncate text-[0.8125rem] text-ink-3">{leadFacts(d).primary}</span>
              </Link>
              <span className="flex flex-wrap items-center gap-1.5">
                <TypeBadge type={d.type} />
                <StatusBadge status={d.status} />
                <time dateTime={d.createdAt} className="tabular text-[0.75rem] text-ink-3">{formatDateTime(d.createdAt)}</time>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-[0.9375rem] text-ink-3">Nicio altă cerere cu același e-mail, telefon sau CUI.</p>
      )}
    </Section>
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

/** Attribution / audit trail, collapsed by default. */
function Provenance({ lead }: { lead: Lead }) {
  return (
    <details className={`${panel} group`}>
      <summary className={`${label} flex cursor-pointer list-none items-center justify-between gap-3 p-5 sm:px-6 [&::-webkit-details-marker]:hidden`}>
        <span>Proveniență · {CHANNEL_LABEL[lead.sourceChannel]}</span>
        <span aria-hidden className="text-ink-3 transition-transform group-open:rotate-180">⌄</span>
      </summary>
      <dl className="grid grid-cols-1 gap-x-10 gap-y-4 border-t border-line p-5 text-[0.875rem] sm:grid-cols-2 sm:px-6">
        <Meta k="Canal" v={CHANNEL_LABEL[lead.sourceChannel]} />
        <Meta k="Pagina sursă" v={lead.source} />
        <Meta k="Limbă" v={lead.locale} />
        {lead.utm ? Object.entries(lead.utm).map(([k, v]) => <Meta key={k} k={k} v={v} mono />) : <Meta k="UTM" v={undefined} />}
        <Meta k="ID cerere" v={lead.requestId} mono />
        <Meta k="Hash IP" v={lead.ipHash ? `${lead.ipHash.slice(0, 12)}…` : undefined} mono />
        <Meta k="Consimțământ" v={lead.consentAt ? `Acordat ${formatDateTime(lead.consentAt)}` : "Cerere introdusă manual"} />
        <Meta k="Ultima actualizare" v={formatDateTime(lead.updatedAt)} />
        <div className="sm:col-span-2"><Meta k="User agent" v={lead.userAgent} small /></div>
      </dl>
    </details>
  );
}

/* ───────────────────────── Page ───────────────────────── */

async function LeadDetail({ params }: { params: Params }) {
  const { id } = await params;
  const { repo, status: store, user } = await adminStore();

  if (!repo) {
    return (
      <>
        <PageHeader title="Cerere" eyebrow="CRM" />
        <StoreBanner status={store} />
      </>
    );
  }

  let result,
    duplicates: Lead[] = [],
    users;
  try {
    result = await repo.get(id);
    if (result) [duplicates, users] = await Promise.all([repo.duplicates(result.lead), activeUsers()]);
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
  const now = requestNow();
  const isSpam = lead.status === "spam";
  const wa = whatsappDigits(lead.phone);
  const sla = isOverdueNew(lead, now);
  const firstResponse = lead.firstResponseAt ? new Date(lead.firstResponseAt).getTime() - new Date(lead.createdAt).getTime() : undefined;

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
            <h1 className="a-title break-words">{leadTitle(lead)}</h1>
            <p className="mt-3 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.9375rem] text-ink-2">
              <UserRound size={14} strokeWidth={1.5} aria-hidden className="text-ink-3" />
              {lead.contactPerson}
              <span aria-hidden className="text-ink-3">·</span>
              <time dateTime={lead.createdAt} title={formatDateTime(lead.createdAt)}>
                primită {formatDateTime(lead.createdAt)} ({formatAge(lead.createdAt, now)})
              </time>
              {firstResponse !== undefined ? (
                <>
                  <span aria-hidden className="text-ink-3">·</span>
                  <span>primul răspuns în {formatDuration(firstResponse)}</span>
                </>
              ) : null}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <TypeBadge type={lead.type} />
            <ChannelBadge channel={lead.sourceChannel} />
            <StatusBadge status={lead.status} />
            {sla ? <SlaBadge minutes={Math.floor((now - new Date(lead.createdAt).getTime()) / 60_000)} /> : null}
          </div>
        </div>

        {isSpam ? (
          <p role="status" className="rounded-2xl border border-line bg-ink/[0.03] px-4 py-3 text-[0.9375rem] text-ink-2">
            Această cerere este marcată ca spam și nu apare în totalurile fluxului. Folosește „Nu e spam — restaurează” dacă a fost o greșeală.
          </p>
        ) : null}
        {lead.status === "lost" && lead.lostReason ? (
          <p
            role="note"
            className="rounded-2xl border px-4 py-3 text-[0.9375rem] text-ink"
            style={{ borderColor: `color-mix(in srgb, ${ALERT_HEX} 30%, transparent)`, background: `color-mix(in srgb, ${ALERT_HEX} 5%, transparent)` }}
          >
            <span className="text-ink-3">Pierdută: </span>
            {LOST_REASON_LABEL[lead.lostReason]}
            {lead.lostNote ? ` · ${lead.lostNote}` : ""}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Acțiuni rapide">
          {lead.phone ? (
            <>
              <a href={telHref(lead.phone)} className={btnChip}>
                <Phone size={14} strokeWidth={1.6} aria-hidden /> Sună
                <span className="hidden text-ink-3 sm:inline">· {lead.phone}</span>
              </a>
              {wa ? (
                <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" className={btnChip}>
                  <MessageCircle size={14} strokeWidth={1.6} aria-hidden /> WhatsApp
                </a>
              ) : null}
              <CopyButton value={lead.phone} label="telefonul" />
            </>
          ) : null}
          {lead.email ? (
            <>
              <a href={`mailto:${lead.email}`} className={btnChip}>
                <Mail size={14} strokeWidth={1.6} aria-hidden /> Trimite e-mail
                <span className="hidden text-ink-3 sm:inline">· {lead.email}</span>
              </a>
              <CopyButton value={lead.email} label="e-mailul" />
            </>
          ) : null}
          <span className="hidden h-5 w-px bg-line sm:block" aria-hidden />
          <SpamButton leadId={lead.id} isSpam={isSpam} />
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_410px]">
        {/* ───────── Left: request data ───────── */}
        <div className="flex min-w-0 flex-col gap-4">
          {lead.type === "quote" ? <QuoteBody lead={lead} /> : lead.type === "callback" ? <CallbackBody lead={lead} /> : <CarrierBody lead={lead} />}

          <Section id="contact-h" title="Contact" icon={icon(UserRound)}>
            <dl className="grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2">
              <Field label="Persoană de contact"><Text value={lead.contactPerson} /></Field>
              <Field label="Companie"><Text value={lead.companyName} /></Field>
              <Field label="E-mail">
                {lead.email ? <a href={`mailto:${lead.email}`} className="underline-offset-4 hover:underline">{lead.email}</a> : <Dash />}
              </Field>
              <Field label="Telefon">
                {lead.phone ? <a href={telHref(lead.phone)} className="underline-offset-4 hover:underline">{lead.phone}</a> : <Dash />}
              </Field>
              {lead.type !== "carrier" && lead.vatNumber ? (
                <Field label="CUI / cod TVA"><span className="tabular font-mono text-[0.9375rem]">{lead.vatNumber}</span></Field>
              ) : null}
            </dl>
          </Section>

          {lead.type === "carrier" ? <AnafPanel leadId={lead.id} anaf={lead.anaf} hasVat={Boolean(lead.vatNumber)} /> : null}
          <DuplicatesPanel duplicates={duplicates} />
          <Provenance lead={lead} />
          <p className="hidden items-center gap-2 text-[0.8125rem] text-ink-3 xl:flex">
            <Kbd>n</Kbd> notă · <Kbd>s</Kbd> motiv stare · <Kbd>Esc</Kbd> înapoi la listă
          </p>
        </div>

        {/* ───────── Right: workflow panel ───────── */}
        <aside aria-label="Flux de lucru" className="flex min-w-0 flex-col gap-4 [&>*]:shrink-0 xl:sticky xl:top-6 xl:max-h-[calc(100dvh-3rem)] xl:self-start xl:overflow-y-auto xl:pr-1">
          <OwnerPanel
            leadId={lead.id}
            ownerId={lead.assignedUserId}
            ownerName={lead.assignedTo}
            me={{ id: user.id, name: user.name }}
            users={(users ?? []).map((u) => ({ id: u.id, name: u.name }))}
          />
          <StatusForm leadId={lead.id} type={lead.type} current={lead.status} canApprove={lead.type === "carrier" && allChecksDone(lead.checks)} />
          {lead.type === "carrier" ? <CarrierChecklist leadId={lead.id} checks={lead.checks} approved={lead.status === "approved"} /> : null}
          {isCustomerType(lead.type) ? (
            <EconomicsForm leadId={lead.id} offeredPrice={lead.offeredPrice} carrierCost={lead.carrierCost} currency={lead.currency} />
          ) : null}
          <FollowUpForm
            leadId={lead.id}
            at={lead.nextActionAt}
            note={lead.nextActionNote}
            late={lead.nextActionAt ? new Date(lead.nextActionAt).getTime() < now : false}
          />
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
