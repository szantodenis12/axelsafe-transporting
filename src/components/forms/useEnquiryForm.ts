"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import type { z } from "zod";
import { scrollElementToCenter } from "@/lib/lenis";
import { defaultLocale, getDictionary, hasLocale, type Locale } from "@/lib/i18n";
import { fieldErrorsOf, UTM_KEYS, type FieldErrors, type LeadType, type Utm } from "@/lib/leads/schema";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export type FormStatus = "idle" | "submitting" | "success" | "error";
export type SubmitErrorKind = "generic" | "not_configured" | "rate_limited";

type Options = {
  type: LeadType;
  schema: z.ZodType<unknown, Record<string, unknown>>;
  fieldOrder: readonly string[];
};

function collect(form: HTMLFormElement): Record<string, string | boolean> {
  const fd = new FormData(form);
  const out: Record<string, string | boolean> = {};
  for (const [key, value] of fd.entries()) {
    if (key === "website") continue; // honeypot travels separately
    if (typeof value === "string") out[key] = value;
  }
  out.consent = fd.get("consent") === "on";
  return out;
}

function readUtm(): Utm | undefined {
  const params = new URLSearchParams(window.location.search);
  const utm: Utm = {};
  for (const key of UTM_KEYS) {
    const v = params.get(key);
    if (v) utm[key] = v.slice(0, 200);
  }
  return Object.keys(utm).length ? utm : undefined;
}

function focusField(form: HTMLFormElement, name: string) {
  const el = form.elements.namedItem(name);
  if (el instanceof HTMLElement) {
    el.focus({ preventScroll: true });
    scrollElementToCenter(el);
  }
}

export function useEnquiryForm({ type, schema, fieldOrder }: Options) {
  const pathname = usePathname();
  const seg = pathname?.split("/")[1] ?? "";
  const locale: Locale = hasLocale(seg) ? seg : defaultLocale;
  const t = getDictionary(locale).forms;

  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [errorKind, setErrorKind] = useState<SubmitErrorKind | null>(null);
  const [requestId, setRequestId] = useState<string | null>(null);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const focusFirstInvalid = useCallback(
    (errs: FieldErrors) => {
      const form = formRef.current;
      if (!form) return;
      const first = fieldOrder.find((name) => name in errs) ?? Object.keys(errs)[0];
      if (first) focusField(form, first);
    },
    [fieldOrder],
  );

  const clearError = useCallback((name: string) => {
    setErrors((prev) => {
      if (!(name in prev)) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }, []);

  const onSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (status === "submitting") return;

      const raw = collect(form);
      const parsed = schema.safeParse(raw);
      if (!parsed.success) {
        const errs = fieldErrorsOf(parsed.error);
        setErrors(errs);
        setStatus("idle");
        focusFirstInvalid(errs);
        return;
      }

      setErrors({});
      setErrorKind(null);
      setStatus("submitting");

      const honeypot = (form.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
      const payload = {
        type,
        ...raw,
        website: honeypot,
        source: window.location.pathname,
        utm: readUtm(),
        locale,
      };

      try {
        const res = await fetch("/api/enquiries", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.status === 201) {
          const data = (await res.json().catch(() => ({}))) as { requestId?: string };
          const id = data.requestId ?? null;
          setRequestId(id);
          setStatus("success");
          window.dataLayer?.push({ event: "lead_submit", form: type, event_id: id });
          return;
        }

        if (res.status === 422) {
          const data = (await res.json().catch(() => ({}))) as { fields?: FieldErrors };
          const errs = data.fields ?? {};
          setErrors(errs);
          setStatus("idle");
          focusFirstInvalid(errs);
          return;
        }

        setErrorKind(res.status === 429 ? "rate_limited" : res.status === 503 ? "not_configured" : "generic");
        setStatus("error");
      } catch {
        setErrorKind("generic");
        setStatus("error");
      }
    },
    [status, schema, type, locale, focusFirstInvalid],
  );

  return { t, locale, formRef, successRef, status, errors, errorKind, requestId, onSubmit, clearError };
}
