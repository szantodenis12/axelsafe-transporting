"use client";

import { useActionState, useState } from "react";
import {
  AlertCircle,
  ArrowRightLeft,
  BadgeCheck,
  CalendarClock,
  Check,
  Coins,
  Hand,
  Landmark,
  MessageSquarePlus,
  ShieldAlert,
  Square,
  SquareCheck,
  Undo2,
  UserRound,
} from "lucide-react";
import {
  addNoteAction,
  anafLookupAction,
  assignAction,
  changeStatusAction,
  checkAction,
  claimAction,
  economicsAction,
  followUpAction,
  type ActionState,
} from "@/app/admin/(crm)/leads/[id]/actions";
import { CARRIER_CHECKS, CURRENCIES, LOST_REASONS, statusesFor, type Currency, type LeadStatus, type LeadType } from "@/lib/leads/schema";
import { CHECK_LABEL_RO, formatDateTime, formatMoney, LOST_REASON_LABEL, marginOf, STATUS_LABEL, toLocalInput } from "@/lib/leads/labels";
import type { CarrierChecks } from "@/lib/leads/types";
import { ALERT_HEX, adminInputH, adminSelect, adminTextarea, btnChip, btnGhost, label as labelClass, panel, PillButton, StatusDot } from "./ui";

const OK_HEX = "#8fcfbd";

function Feedback({ state, successText }: { state: ActionState; successText: string }) {
  if (state.error) {
    return (
      <p role="alert" className="flex items-start gap-1.5 text-[0.875rem]" style={{ color: ALERT_HEX }}>
        <AlertCircle size={14} strokeWidth={1.6} className="mt-[3px] shrink-0" aria-hidden />
        {state.error}
      </p>
    );
  }
  if (state.ok) {
    return (
      <p role="status" className="flex items-center gap-1.5 text-[0.875rem]" style={{ color: OK_HEX }}>
        <Check size={14} strokeWidth={1.8} aria-hidden />
        {successText}
      </p>
    );
  }
  return null;
}

/* ───────────────────────── Status (+ lost reason) ───────────────────────── */

/** Required when moving to "Pierdut": reason + free text ("Altul" needs the text). */
function LostReasonFields({ idPrefix }: { idPrefix: string }) {
  return (
    <div
      className="flex flex-col gap-2.5 rounded-2xl border p-3.5"
      style={{ borderColor: `color-mix(in srgb, ${ALERT_HEX} 30%, transparent)`, background: `color-mix(in srgb, ${ALERT_HEX} 5%, transparent)` }}
    >
      <label htmlFor={`${idPrefix}-reason`} className={labelClass}>
        Motivul pierderii
      </label>
      <select id={`${idPrefix}-reason`} name="lostReason" required defaultValue="" className={adminSelect}>
        <option value="" disabled>
          Alege motivul…
        </option>
        {LOST_REASONS.map((r) => (
          <option key={r} value={r}>
            {LOST_REASON_LABEL[r]}
          </option>
        ))}
      </select>
      <input name="lostNote" maxLength={1000} placeholder="Detalii (obligatoriu la „Altul”)" className={adminInputH} aria-label="Detalii motiv" />
    </div>
  );
}

const lockedApprove = (s: LeadStatus, canApprove: boolean, current: LeadStatus) => s === "approved" && !canApprove && current !== "approved";

/** Status as one-tap chips (radio group) + optional reason. "Spam" lives in its own quick action. */
export function StatusForm({ leadId, type, current, canApprove }: { leadId: string; type: LeadType; current: LeadStatus; canApprove: boolean }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(changeStatusAction, {});
  const [selected, setSelected] = useState<LeadStatus>(current === "spam" ? "new" : current);
  const options = statusesFor(type).filter((s) => s !== "spam");
  const unchanged = selected === current;

  return (
    <form action={action} className={`${panel} flex flex-col gap-4 p-5`} aria-busy={pending || undefined}>
      <input type="hidden" name="id" value={leadId} />
      {/* React resets the form after every action; the radios are not submitted, this carries the selection. */}
      <input type="hidden" name="status" value={selected} />
      <fieldset className="flex flex-col gap-3">
        <legend className={`${labelClass} mb-3`}>Stare</legend>
        <div className="flex flex-wrap gap-2">
          {options.map((s) => {
            const locked = lockedApprove(s, canApprove, current);
            return (
              <label key={s} className={locked ? "cursor-not-allowed" : "cursor-pointer"} title={locked ? "Bifează întâi cele 4 verificări" : undefined}>
                <input
                  type="radio"
                  name="status-choice"
                  value={s}
                  checked={selected === s}
                  disabled={locked}
                  onChange={() => setSelected(s)}
                  className="peer sr-only"
                />
                <span className="a-chip !h-10 peer-checked:!border-accent/60 peer-checked:!bg-ink/[0.09] peer-disabled:opacity-45 peer-focus-visible:outline peer-focus-visible:outline-[1.5px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
                  <StatusDot status={s} />
                  {STATUS_LABEL[s]}
                  {s === current ? <span className="text-[0.75rem] text-ink-3">(curentă)</span> : null}
                  {locked ? <span className="text-[0.75rem] text-ink-3">(4/4)</span> : null}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>
      {selected === "lost" && current !== "lost" ? <LostReasonFields idPrefix="lead-status" /> : null}
      <input
        id="lead-status-note"
        name="note"
        placeholder="Motiv / context (opțional)"
        maxLength={2000}
        className={adminInputH}
        key={`note-${state.at ?? 0}`}
        aria-label="Notă la schimbarea stării"
      />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Feedback state={state} successText="Starea a fost actualizată" />
        <PillButton type="submit" className="ml-auto" disabled={pending || unchanged}>
          {pending ? "Se salvează…" : unchanged ? "Alege o altă stare" : `Mută în „${STATUS_LABEL[selected]}”`}
        </PillButton>
      </div>
    </form>
  );
}

/** Compact status changer for pipeline cards (lost asks for the reason inline). */
export function CardStatusForm({ leadId, type, current, canApprove }: { leadId: string; type: LeadType; current: LeadStatus; canApprove: boolean }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(changeStatusAction, {});
  const [selected, setSelected] = useState<LeadStatus>(current);
  const selectId = `card-${leadId}`;
  return (
    <form action={action} className="flex flex-col gap-2" aria-busy={pending || undefined}>
      <input type="hidden" name="id" value={leadId} />
      <div className="flex gap-1.5">
        <label htmlFor={selectId} className="sr-only">
          Mută în
        </label>
        <input type="hidden" name="status" value={selected} />
        <select
          id={selectId}
          value={selected}
          key={`${current}-${state.at ?? 0}`}
          onChange={(e) => setSelected(e.target.value as LeadStatus)}
          className={`${adminSelect} !h-9 !rounded-full !pl-3.5 !text-[0.8125rem]`}
        >
          {statusesFor(type).map((s) => (
            <option key={s} value={s} disabled={lockedApprove(s, canApprove, current)}>
              {STATUS_LABEL[s]}
            </option>
          ))}
        </select>
        <button type="submit" className={`${btnChip} !h-9 shrink-0`} disabled={pending || selected === current} aria-label="Mută cererea">
          <ArrowRightLeft size={13} strokeWidth={1.6} aria-hidden />
          <span className="sr-only sm:not-sr-only">{pending ? "…" : "Mută"}</span>
        </button>
      </div>
      {selected === "lost" && current !== "lost" ? <LostReasonFields idPrefix={selectId} /> : null}
      {state.error ? <Feedback state={state} successText="" /> : null}
    </form>
  );
}

/** Two-step "mark as spam" (reversible: status can be set back from the Status panel). */
export function SpamButton({ leadId, isSpam }: { leadId: string; isSpam: boolean }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(changeStatusAction, {});
  const [confirm, setConfirm] = useState(false);

  if (isSpam) {
    return (
      <form action={action}>
        <input type="hidden" name="id" value={leadId} />
        <input type="hidden" name="status" value="new" />
        <input type="hidden" name="note" value="Restaurată din spam" />
        <button type="submit" className={btnChip} disabled={pending}>
          <Undo2 size={14} strokeWidth={1.6} aria-hidden /> {pending ? "Se restaurează…" : "Nu e spam — restaurează"}
        </button>
        {state.error ? <Feedback state={state} successText="" /> : null}
      </form>
    );
  }

  if (!confirm) {
    return (
      <button type="button" className={btnChip} onClick={() => setConfirm(true)}>
        <ShieldAlert size={14} strokeWidth={1.6} aria-hidden /> Marchează ca spam
      </button>
    );
  }

  return (
    <form action={action} className="flex flex-wrap items-center gap-2">
      <input type="hidden" name="id" value={leadId} />
      <input type="hidden" name="status" value="spam" />
      <input type="hidden" name="note" value="Marcată ca spam" />
      <span className="text-[0.875rem] text-ink-2">Marchezi ca spam?</span>
      <button type="submit" disabled={pending} className={btnChip}>
        {pending ? "Se salvează…" : "Da, spam"}
      </button>
      <button type="button" className={btnChip} onClick={() => setConfirm(false)}>Anulează</button>
      {state.error ? <Feedback state={state} successText="" /> : null}
    </form>
  );
}

/* ───────────────────────── Owner ───────────────────────── */

export function OwnerPanel({
  leadId,
  ownerId,
  ownerName,
  me,
  users,
}: {
  leadId: string;
  ownerId?: string;
  ownerName?: string;
  me: { id: string | null; name: string };
  users: { id: string; name: string }[];
}) {
  const [claimState, claim, claiming] = useActionState<ActionState, FormData>(claimAction, {});
  const [state, action, pending] = useActionState<ActionState, FormData>(assignAction, {});
  const mine = Boolean(me.id) && ownerId === me.id;

  return (
    <section className={`${panel} flex flex-col gap-4 p-5`} aria-labelledby="owner-h">
      <h2 id="owner-h" className={labelClass}>
        Responsabil
      </h2>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="flex min-w-0 items-center gap-2.5 text-[1rem] text-ink">
          <UserRound size={15} strokeWidth={1.5} className="shrink-0 text-ink-3" aria-hidden />
          {ownerName ? <span className="truncate">{ownerName}</span> : <span className="text-ink-3">Nealocată</span>}
          {mine ? <span className="rounded-full border border-accent/40 bg-accent/10 px-2 text-[0.75rem] text-accent">tu</span> : null}
        </p>
        {me.id && !mine ? (
          <form action={claim}>
            <input type="hidden" name="id" value={leadId} />
            <PillButton type="submit" disabled={claiming} icon={<Hand size={15} strokeWidth={1.6} aria-hidden />}>
              {claiming ? "Se preia…" : ownerId ? "Preiau eu" : "Preiau"}
            </PillButton>
          </form>
        ) : null}
      </div>
      <Feedback state={claimState} successText="Cererea e a ta" />
      {users.length ? (
        <form action={action} className="flex gap-2" aria-busy={pending || undefined}>
          <input type="hidden" name="id" value={leadId} />
          <label htmlFor="lead-assignee" className="sr-only">
            Alocă lui
          </label>
          <select id="lead-assignee" name="userId" defaultValue={ownerId ?? ""} key={`${ownerId}-${state.at ?? 0}`} className={`${adminSelect} flex-1`}>
            <option value="">Nealocată</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
          <button type="submit" className={btnGhost} disabled={pending}>
            {pending ? "…" : "Alocă"}
          </button>
        </form>
      ) : (
        <p className="text-[0.8125rem] text-ink-3">
          „Preiau” și alocarea pe persoane apar după ce sunt create conturile de utilizator (vezi docs/CRM.md).
        </p>
      )}
      <Feedback state={state} successText="Responsabilul a fost salvat" />
    </section>
  );
}

/* ───────────────────────── Follow-up ───────────────────────── */

/** `late` is computed on the server (one clock for the whole page). */
export function FollowUpForm({ leadId, at, note, late }: { leadId: string; at?: string; note?: string; late: boolean }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(followUpAction, {});
  return (
    <form action={action} className={`${panel} flex flex-col gap-3 p-5`} aria-busy={pending || undefined} key={`${at}-${state.at ?? 0}`}>
      <input type="hidden" name="id" value={leadId} />
      <h2 className={`${labelClass} flex items-center gap-2`}>
        <CalendarClock size={14} strokeWidth={1.5} className="text-accent" aria-hidden /> Următorul pas
      </h2>
      {at ? (
        <p className={`tabular text-[0.875rem] ${late ? "" : "text-ink-2"}`} style={late ? { color: ALERT_HEX } : undefined}>
          {late ? "Întârziat: " : "Programat: "}
          {formatDateTime(at)}
        </p>
      ) : null}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,210px)_minmax(0,1fr)] xl:grid-cols-1">
        <label htmlFor="lead-next-at" className="sr-only">
          Data și ora
        </label>
        <input id="lead-next-at" name="at" type="datetime-local" defaultValue={toLocalInput(at)} className={adminInputH} />
        <label htmlFor="lead-next-note" className="sr-only">
          Ce urmează
        </label>
        <input id="lead-next-note" name="note" defaultValue={note ?? ""} maxLength={500} placeholder="Ce urmează (ex. revin cu preț)" className={adminInputH} />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Feedback state={state} successText="Salvat" />
        <div className="ml-auto flex gap-2">
          {at ? (
            <button type="submit" name="intent" value="clear" className={btnChip} disabled={pending}>
              Șterge
            </button>
          ) : null}
          <button type="submit" name="intent" value="save" className={btnGhost} disabled={pending}>
            {pending ? "Se salvează…" : "Salvează"}
          </button>
        </div>
      </div>
    </form>
  );
}

/* ───────────────────────── Quote economics ───────────────────────── */

const parseMoney = (v: string) => {
  if (!v.trim()) return undefined;
  const n = Number(v.replace(/\s/g, "").replace(/\.(?=\d{3}(\D|$))/g, "").replace(",", "."));
  return Number.isFinite(n) ? n : undefined;
};

export function EconomicsForm({ leadId, offeredPrice, carrierCost, currency }: { leadId: string; offeredPrice?: number; carrierCost?: number; currency?: Currency }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(economicsAction, {});
  const [price, setPrice] = useState(offeredPrice?.toString().replace(".", ",") ?? "");
  const [cost, setCost] = useState(carrierCost?.toString().replace(".", ",") ?? "");
  const [cur, setCur] = useState<Currency>(currency ?? "EUR");
  const margin = marginOf({ offeredPrice: parseMoney(price), carrierCost: parseMoney(cost) });
  const sub = "text-[0.8125rem] text-ink-3";
  return (
    <form action={action} className={`${panel} flex flex-col gap-3 p-5`} aria-busy={pending || undefined}>
      <input type="hidden" name="id" value={leadId} />
      <h2 className={`${labelClass} flex items-center gap-2`}>
        <Coins size={14} strokeWidth={1.5} className="text-accent" aria-hidden /> Preț și marjă
      </h2>
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_96px] gap-2">
        <div className="flex min-w-0 flex-col gap-1.5">
          <label htmlFor="eco-price" className={sub}>
            Preț ofertat
          </label>
          <input id="eco-price" name="offeredPrice" inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} className={`${adminInputH} tabular`} placeholder="0,00" />
        </div>
        <div className="flex min-w-0 flex-col gap-1.5">
          <label htmlFor="eco-cost" className={sub}>
            Cost transportator
          </label>
          <input id="eco-cost" name="carrierCost" inputMode="decimal" value={cost} onChange={(e) => setCost(e.target.value)} className={`${adminInputH} tabular`} placeholder="0,00" />
        </div>
        <div className="flex min-w-0 flex-col gap-1.5">
          <label htmlFor="eco-currency" className={sub}>
            Monedă
          </label>
          <select id="eco-currency" name="currency" value={cur} onChange={(e) => setCur(e.target.value as Currency)} className={adminSelect}>
            {CURRENCIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>
      <output htmlFor="eco-price eco-cost" className="tabular rounded-2xl border border-line bg-ink/[0.03] px-4 py-3 text-[0.9375rem]" aria-live="polite">
        {margin ? (
          <span className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="text-ink-3">Marjă</span>
            <span style={{ color: margin.value < 0 ? ALERT_HEX : OK_HEX }}>
              {formatMoney(margin.value, cur)}
              {margin.pct !== undefined ? ` · ${margin.pct.toFixed(1).replace(".", ",")}%` : ""}
            </span>
          </span>
        ) : (
          <span className="text-[0.875rem] text-ink-3">Marja apare când completezi ambele sume.</span>
        )}
      </output>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Feedback state={state} successText="Prețurile au fost salvate" />
        <button type="submit" className={`${btnGhost} ml-auto`} disabled={pending}>
          {pending ? "Se salvează…" : "Salvează"}
        </button>
      </div>
    </form>
  );
}

/* ───────────────────────── Carrier verification ───────────────────────── */

function CheckRow({ leadId, k, mark, locked }: { leadId: string; k: (typeof CARRIER_CHECKS)[number]; mark?: CarrierChecks[keyof CarrierChecks]; locked: boolean }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(checkAction, {});
  const checked = Boolean(mark);
  return (
    <li className="flex flex-col gap-1">
      <form action={action}>
        <input type="hidden" name="id" value={leadId} />
        <input type="hidden" name="key" value={k} />
        <input type="hidden" name="checked" value={checked ? "0" : "1"} />
        <button
          type="submit"
          role="checkbox"
          aria-checked={checked}
          disabled={pending || (locked && checked)}
          className="flex w-full items-start gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors hover:bg-ink/[0.04] disabled:cursor-not-allowed"
        >
          {checked ? (
            <SquareCheck size={18} strokeWidth={1.6} className="mt-[2px] shrink-0" style={{ color: OK_HEX }} aria-hidden />
          ) : (
            <Square size={18} strokeWidth={1.5} className="mt-[2px] shrink-0 text-ink-3" aria-hidden />
          )}
          <span className="flex min-w-0 flex-col">
            <span className="text-[0.9375rem] text-ink">{CHECK_LABEL_RO[k]}</span>
            {mark ? (
              <span className="tabular text-[0.8125rem] text-ink-3">
                {mark.by} · {formatDateTime(mark.at)}
              </span>
            ) : null}
          </span>
        </button>
      </form>
      {state.error ? <div className="px-3"><Feedback state={state} successText="" /></div> : null}
    </li>
  );
}

export function CarrierChecklist({ leadId, checks, approved }: { leadId: string; checks: CarrierChecks; approved: boolean }) {
  const done = CARRIER_CHECKS.filter((k) => checks[k]).length;
  return (
    <section className={`${panel} flex flex-col gap-3 p-5`} aria-labelledby="checks-h">
      <div className="flex items-baseline justify-between gap-2">
        <h2 id="checks-h" className={`${labelClass} flex items-center gap-2`}>
          <BadgeCheck size={14} strokeWidth={1.5} className="text-accent" aria-hidden /> Verificare transportator
        </h2>
        <span className="tabular font-mono text-[0.8125rem]" style={{ color: done === 4 ? OK_HEX : undefined }}>
          <span className={done === 4 ? "" : "text-ink-3"}>{done}/4</span>
        </span>
      </div>
      <div aria-hidden className="flex h-1 gap-0.5 overflow-hidden rounded-full bg-ink/[0.06]">
        {CARRIER_CHECKS.map((k) => (
          <span key={k} className="flex-1 opacity-70" style={{ background: checks[k] ? OK_HEX : "transparent" }} />
        ))}
      </div>
      <ul className="-mx-3 flex flex-col">
        {CARRIER_CHECKS.map((k) => (
          <CheckRow key={k} leadId={leadId} k={k} mark={checks[k]} locked={approved} />
        ))}
      </ul>
      <p className="text-[0.8125rem] text-ink-3">
        {done === 4 ? "Toate verificările sunt bifate. Poți aproba transportatorul." : "Aprobarea devine posibilă după ce toate cele 4 verificări sunt bifate."}
      </p>
    </section>
  );
}

export function AnafButton({ leadId, hasVat }: { leadId: string; hasVat: boolean }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(anafLookupAction, {});
  return (
    <form action={action} className="flex flex-col items-start gap-2">
      <input type="hidden" name="id" value={leadId} />
      <button type="submit" className={btnChip} disabled={pending || !hasVat}>
        <Landmark size={14} strokeWidth={1.6} aria-hidden />
        {pending ? "Se interoghează ANAF…" : "Verifică la ANAF"}
      </button>
      <Feedback state={state} successText="Datele ANAF au fost actualizate" />
    </form>
  );
}

/* ───────────────────────── Notes ───────────────────────── */

export function NoteForm({ leadId }: { leadId: string }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(addNoteAction, {});
  return (
    <form action={action} className="flex flex-col gap-3" aria-busy={pending || undefined}>
      <input type="hidden" name="id" value={leadId} />
      <label htmlFor="lead-note" className={labelClass}>
        Adaugă notă internă
      </label>
      <textarea
        id="lead-note"
        name="note"
        key={state.at ?? 0}
        required
        maxLength={2000}
        placeholder="Rezumatul apelului, tarif oferit, pasul următor…"
        className={adminTextarea}
        aria-invalid={state.error ? true : undefined}
        onKeyDown={(e) => {
          if ((e.ctrlKey || e.metaKey) && e.key === "Enter") e.currentTarget.form?.requestSubmit();
        }}
      />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Feedback state={state} successText="Nota a fost adăugată" />
        <PillButton type="submit" className="ml-auto" disabled={pending} title="Ctrl+Enter" icon={<MessageSquarePlus size={15} strokeWidth={1.6} aria-hidden />}>
          {pending ? "Se salvează…" : "Adaugă nota"}
        </PillButton>
      </div>
    </form>
  );
}
