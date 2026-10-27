"use client";

import Link from "next/link";
import { AlertCircle, ArrowRight, Check } from "lucide-react";
import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import type { Dictionary } from "@/content/copy/en";
import { fact } from "@/content/companyData";
import type { FieldErrors } from "@/lib/leads/schema";
import type { SubmitErrorKind } from "./useEnquiryForm";

type FormsCopy = Dictionary["forms"];

/* ───────────────────────── Error code → copy ───────────────────────── */

/**
 * Codes without approved copy. These only trigger on inputs the browser normally
 * prevents (over max length, malformed phone/date). Flagged for copy approval.
 */
const UNAPPROVED_FALLBACKS: Record<string, string> = {
  too_long: "Please shorten this field.",
  invalid: "Please check the format of this field.",
};

export function messageFor(code: string | undefined, t: FormsCopy): string | undefined {
  if (!code) return undefined;
  if (code === "required") return t.errors.required;
  if (code === "email") return t.errors.email;
  if (code === "consent") return t.errors.consent;
  return UNAPPROVED_FALLBACKS[code] ?? t.errors.required;
}

/* ───────────────────────── Styles ───────────────────────── */

const control =
  "block w-full rounded-[14px] border border-line bg-bg-2 px-4 text-[1rem] text-ink placeholder:text-ink-3 md:pointer-fine:text-[0.9375rem] " +
  "outline-none transition-[border-color,box-shadow,background-color] duration-300 " +
  "hover:border-line-strong focus:border-accent/70 focus:shadow-[0_0_0_3px_rgba(183,212,247,0.16)] focus-visible:outline-none " +
  "aria-invalid:border-danger/80 aria-invalid:focus:shadow-[0_0_0_3px_rgba(242,167,167,0.18)] " +
  "disabled:opacity-60 [color-scheme:dark]";

export const inputClass = `${control} h-[52px]`;
export const textareaClass = `${control} min-h-[150px] resize-y py-3.5 leading-[1.6]`;

/* ───────────────────────── Field wrapper ───────────────────────── */

type FieldShellProps = {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  t: FormsCopy;
  className?: string;
  children: ReactNode;
};

export function FieldShell({ id, label, required, error, t, className = "", children }: FieldShellProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[0.9375rem] text-ink">
          {label}
        </label>
        <span className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-3" aria-hidden="true">
          {required ? t.required : t.optional}
        </span>
      </div>
      {children}
      {error ? (
        <p id={`${id}-error`} className="flex items-start gap-1.5 text-[0.8125rem] leading-snug text-danger">
          <AlertCircle size={14} strokeWidth={1.8} className="mt-[2px] shrink-0" aria-hidden />
          <span>{error}</span>
        </p>
      ) : null}
    </div>
  );
}

type Common = {
  id: string;
  name: string;
  label: string;
  required?: boolean;
  errors: FieldErrors;
  t: FormsCopy;
  onClear: (name: string) => void;
  className?: string;
};

export function TextField({
  id,
  name,
  label,
  required,
  errors,
  t,
  onClear,
  className,
  ...rest
}: Common & Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "name" | "required" | "className">) {
  const error = messageFor(errors[name], t);
  return (
    <FieldShell id={id} label={label} required={required} error={error} t={t} className={className}>
      <input
        id={id}
        name={name}
        className={inputClass}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onInput={() => onClear(name)}
        {...rest}
      />
    </FieldShell>
  );
}

export function TextAreaField({
  id,
  name,
  label,
  required,
  errors,
  t,
  onClear,
  className,
  ...rest
}: Common & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id" | "name" | "required" | "className">) {
  const error = messageFor(errors[name], t);
  return (
    <FieldShell id={id} label={label} required={required} error={error} t={t} className={className}>
      <textarea
        id={id}
        name={name}
        className={textareaClass}
        rows={5}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        onInput={() => onClear(name)}
        {...rest}
      />
    </FieldShell>
  );
}

/* ───────────────────────── Consent ───────────────────────── */

export function ConsentField({
  id,
  errors,
  t,
  onClear,
  privacyHref,
  className = "",
}: {
  id: string;
  errors: FieldErrors;
  t: FormsCopy;
  onClear: (name: string) => void;
  privacyHref: string;
  className?: string;
}) {
  const error = messageFor(errors.consent, t);
  // Approved sentence verbatim; "Privacy Policy" becomes the link.
  const [before, after] = t.consent.split("Privacy Policy");
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex items-start gap-3.5">
        <input
          id={id}
          name="consent"
          type="checkbox"
          className="mt-[3px] h-[22px] w-[22px] shrink-0 md:mt-[5px] md:h-[18px] md:w-[18px] cursor-pointer rounded-[5px] border border-line-strong bg-bg-2 accent-accent [color-scheme:dark] focus-visible:outline-accent"
          aria-required="true"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={() => onClear("consent")}
        />
        <label htmlFor={id} className="cursor-pointer text-[0.9375rem] leading-[1.6] text-ink-2">
          {before}
          <Link href={privacyHref} className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">
            Privacy Policy
          </Link>
          {after}
        </label>
      </div>
      {error ? (
        <p id={`${id}-error`} className="flex items-start gap-1.5 pl-[32px] text-[0.8125rem] leading-snug text-danger">
          <AlertCircle size={14} strokeWidth={1.8} className="mt-[2px] shrink-0" aria-hidden />
          <span>{error}</span>
        </p>
      ) : null}
    </div>
  );
}

/* ───────────────────────── Honeypot ───────────────────────── */

/** Off-screen, aria-hidden, untabbable. Humans and screen readers never meet it. */
export function Honeypot({ id }: { id: string }) {
  return (
    <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
      <label htmlFor={id}>Website</label>
      <input id={id} name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
    </div>
  );
}

/* ───────────────────────── Submit ───────────────────────── */

export function SubmitButton({ label, submitting, sending }: { label: string; submitting: boolean; sending: string }) {
  return (
    <button
      type="submit"
      className="pill pill-primary disabled:cursor-not-allowed disabled:opacity-60"
      disabled={submitting}
      aria-busy={submitting || undefined}
    >
      <span>{submitting ? sending : label}</span>
      <span className="pill-icon">
        <ArrowRight size={17} strokeWidth={1.6} aria-hidden className={submitting ? "animate-pulse" : ""} />
      </span>
    </button>
  );
}

/* ───────────────────────── Status panels ───────────────────────── */

export function SuccessPanel({
  t,
  requestId,
  panelRef,
}: {
  t: FormsCopy;
  requestId: string | null;
  panelRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={panelRef}
      tabIndex={-1}
      role="status"
      aria-live="polite"
      className="card-glow flex flex-col gap-5 p-8 outline-none md:p-10"
    >
      <span className="grid h-11 w-11 place-items-center rounded-full border border-line-strong bg-bg-2 text-accent">
        <Check size={20} strokeWidth={1.8} aria-hidden />
      </span>
      <div className="flex flex-col gap-3">
        <h3 className="t-h3 text-ink">{t.success.title}</h3>
        <p className="t-body max-w-[60ch]">{t.success.text}</p>
      </div>
      {requestId ? (
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-3">Ref {requestId.slice(0, 8)}</p>
      ) : null}
    </div>
  );
}

export function ErrorBanner({ kind, t, contactEmail }: { kind: SubmitErrorKind; t: FormsCopy; contactEmail: string }) {
  const message = kind === "rate_limited" ? t.errors.rateLimited : kind === "not_configured" ? t.errors.notConfigured : t.errors.generic;
  const phone = fact("phone");
  const showContacts = kind !== "rate_limited";
  return (
    <div
      role="alert"
      className="flex flex-col gap-3 rounded-[14px] border border-danger/35 bg-danger/[0.06] px-5 py-4 text-[0.9375rem] leading-[1.6] text-ink"
    >
      <p className="flex items-start gap-2.5">
        <AlertCircle size={18} strokeWidth={1.7} className="mt-[3px] shrink-0 text-danger" aria-hidden />
        <span>{message}</span>
      </p>
      {showContacts ? (
        <p className="flex flex-wrap gap-x-6 gap-y-1 pl-[28px] text-ink-2">
          <a href={`mailto:${contactEmail}`} className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">
            {contactEmail}
          </a>
          <a href={phone.href} className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-ink">
            {phone.display}
          </a>
        </p>
      ) : null}
    </div>
  );
}
