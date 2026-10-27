"use client";

import { useActionState, useRef, useState } from "react";
import { AlertCircle, Check, MessageSquarePlus, ShieldAlert, Undo2, UserRound } from "lucide-react";
import { addNoteAction, assignAction, changeStatusAction, type ActionState } from "@/app/admin/(crm)/leads/[id]/actions";
import type { LeadStatus, LeadType } from "@/lib/leads/schema";
import { statusesFor } from "@/lib/leads/schema";
import { adminInputH, adminTextarea, btnChip, btnGhost, label as labelClass, panel, PillButton, STATUS_LABEL, StatusDot } from "./ui";

function Feedback({ state, successText }: { state: ActionState; successText: string }) {
  if (state.error) {
    return (
      <p role="alert" className="flex items-start gap-1.5 text-[0.875rem] text-[#e3a9a9]">
        <AlertCircle size={14} strokeWidth={1.6} className="mt-[3px] shrink-0" aria-hidden />
        {state.error}
      </p>
    );
  }
  if (state.ok) {
    return (
      <p role="status" className="flex items-center gap-1.5 text-[0.875rem] text-[#8fcfbd]">
        <Check size={14} strokeWidth={1.8} aria-hidden />
        {successText}
      </p>
    );
  }
  return null;
}

/** Status as one-tap chips (radio group) + optional reason. "Spam" lives in its own quick action. */
export function StatusForm({ leadId, type, current }: { leadId: string; type: LeadType; current: LeadStatus }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(changeStatusAction, {});
  const [selected, setSelected] = useState<LeadStatus>(current === "spam" ? "new" : current);
  const options = statusesFor(type).filter((s) => s !== "spam");
  const unchanged = selected === current;

  return (
    <form action={action} className={`${panel} flex flex-col gap-4 p-5`} aria-busy={pending || undefined}>
      <input type="hidden" name="id" value={leadId} />
      <fieldset className="flex flex-col gap-3">
        <legend className={`${labelClass} mb-3`}>Stare</legend>
        <div className="flex flex-wrap gap-2">
          {options.map((s) => (
            <label key={s} className="cursor-pointer">
              <input type="radio" name="status" value={s} checked={selected === s} onChange={() => setSelected(s)} className="peer sr-only" />
              <span className="a-chip !h-10 peer-checked:!border-accent/60 peer-checked:!bg-ink/[0.09] peer-focus-visible:outline peer-focus-visible:outline-[1.5px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
                <StatusDot status={s} />
                {STATUS_LABEL[s]}
                {s === current ? <span className="text-[0.75rem] text-ink-3">(curentă)</span> : null}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
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

export function AssignForm({ leadId, current, me }: { leadId: string; current?: string; me: string }) {
  const [state, action, pending] = useActionState<ActionState, FormData>(assignAction, {});
  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form ref={formRef} action={action} className={`${panel} flex flex-col gap-3 p-5`} aria-busy={pending || undefined}>
      <input type="hidden" name="id" value={leadId} />
      <label htmlFor="lead-assignee" className={labelClass}>
        Responsabil
      </label>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <UserRound size={15} strokeWidth={1.5} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-3" aria-hidden />
          <input
            id="lead-assignee"
            ref={inputRef}
            name="assignee"
            key={`${current ?? ""}-${state.at ?? 0}`}
            defaultValue={current ?? ""}
            placeholder="Nume (gol = neatribuită)"
            maxLength={80}
            className={`${adminInputH} pl-10`}
          />
        </div>
        <button type="submit" className={btnGhost} disabled={pending}>
          {pending ? "Se salvează…" : "Salvează"}
        </button>
      </div>
      <div className="flex items-center justify-between gap-3">
        <Feedback state={state} successText="Responsabilul a fost salvat" />
        {current !== me ? (
          <button
            type="button"
            className={`${btnChip} ml-auto`}
            onClick={() => {
              if (inputRef.current) inputRef.current.value = me;
              formRef.current?.requestSubmit();
            }}
          >
            Preia cererea
          </button>
        ) : null}
      </div>
    </form>
  );
}

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
