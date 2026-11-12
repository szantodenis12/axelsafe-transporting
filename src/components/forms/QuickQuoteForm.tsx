"use client";

import { useId } from "react";
import { fact } from "@/content/companyData";
import { href } from "@/lib/routes";
import { QUICK_QUOTE_FIELD_ORDER, quickQuoteFormSchema } from "@/lib/leads/schema";
import { useEnquiryForm } from "./useEnquiryForm";
import { ConsentField, ErrorBanner, Honeypot, SubmitButton, SuccessPanel, TextAreaField, TextField } from "./fields";

/** "Cerere rapidă": name, phone, from → to, optional note. Posts as type "quote" with mode "quick". */
export function QuickQuoteForm() {
  const uid = useId();
  const id = (name: string) => `quick-${name}-${uid}`;
  const { t, locale, formRef, successRef, status, errors, errorKind, requestId, onSubmit, clearError } = useEnquiryForm({
    type: "quote",
    mode: "quick",
    schema: quickQuoteFormSchema,
    fieldOrder: QUICK_QUOTE_FIELD_ORDER,
  });
  const f = t.quick.fields;
  const submitting = status === "submitting";

  if (status === "success") return <SuccessPanel t={t} requestId={requestId} panelRef={successRef} />;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-busy={submitting || undefined} className="relative flex flex-col gap-8">
      <Honeypot id={id("website")} />

      <fieldset disabled={submitting} className="grid grid-cols-1 gap-x-5 gap-y-6 md:grid-cols-2">
        <legend className="sr-only">{t.quick.submit}</legend>

        <TextField id={id("contactPerson")} name="contactPerson" label={f.contactPerson} required errors={errors} t={t} onClear={clearError} autoComplete="name" />
        <TextField id={id("phone")} name="phone" type="tel" inputMode="tel" label={f.phone} required errors={errors} t={t} onClear={clearError} autoComplete="tel" />
        <TextField id={id("pickupLocation")} name="pickupLocation" label={f.pickupLocation} required errors={errors} t={t} onClear={clearError} autoComplete="off" />
        <TextField id={id("deliveryLocation")} name="deliveryLocation" label={f.deliveryLocation} required errors={errors} t={t} onClear={clearError} autoComplete="off" />
        <TextAreaField id={id("note")} name="note" label={f.note} errors={errors} t={t} onClear={clearError} className="md:col-span-2" rows={3} maxLength={1000} />

        <ConsentField id={id("consent")} errors={errors} t={t} onClear={clearError} privacyHref={href(locale, "privacy")} className="md:col-span-2" />
      </fieldset>

      {status === "error" && errorKind ? <ErrorBanner kind={errorKind} t={t} contactEmail={fact("email")} /> : null}

      <div>
        <SubmitButton label={t.quick.submit} submitting={submitting} sending={t.sending} />
      </div>
    </form>
  );
}
