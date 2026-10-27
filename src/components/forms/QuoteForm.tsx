"use client";

import { useId } from "react";
import { fact } from "@/content/companyData";
import { href } from "@/lib/routes";
import { QUOTE_FIELD_ORDER, quoteFormSchema } from "@/lib/leads/schema";
import { useEnquiryForm } from "./useEnquiryForm";
import { ConsentField, ErrorBanner, Honeypot, SubmitButton, SuccessPanel, TextAreaField, TextField } from "./fields";

/** Transport quote request — posts to /api/enquiries as type "quote". */
export function QuoteForm() {
  const uid = useId();
  const id = (name: string) => `quote-${name}-${uid}`;
  const { t, locale, formRef, successRef, status, errors, errorKind, requestId, onSubmit, clearError } = useEnquiryForm({
    type: "quote",
    schema: quoteFormSchema,
    fieldOrder: QUOTE_FIELD_ORDER,
  });
  const f = t.quote.fields;
  const submitting = status === "submitting";

  if (status === "success") return <SuccessPanel t={t} requestId={requestId} panelRef={successRef} />;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-busy={submitting || undefined} className="relative flex flex-col gap-8">
      <Honeypot id={id("website")} />

      <fieldset disabled={submitting} className="grid grid-cols-1 gap-x-5 gap-y-6 md:grid-cols-2">
        <legend className="sr-only">{t.quote.submit}</legend>

        <TextField id={id("companyName")} name="companyName" label={f.companyName} required errors={errors} t={t} onClear={clearError} autoComplete="organization" />
        <TextField id={id("contactPerson")} name="contactPerson" label={f.contactPerson} required errors={errors} t={t} onClear={clearError} autoComplete="name" />
        <TextField id={id("email")} name="email" type="email" inputMode="email" label={f.email} required errors={errors} t={t} onClear={clearError} autoComplete="email" />
        <TextField id={id("phone")} name="phone" type="tel" inputMode="tel" label={f.phone} required errors={errors} t={t} onClear={clearError} autoComplete="tel" />

        <TextField id={id("pickupLocation")} name="pickupLocation" label={f.pickupLocation} required errors={errors} t={t} onClear={clearError} autoComplete="off" />
        <TextField id={id("deliveryLocation")} name="deliveryLocation" label={f.deliveryLocation} required errors={errors} t={t} onClear={clearError} autoComplete="off" />

        <TextAreaField id={id("cargoDescription")} name="cargoDescription" label={f.cargoDescription} required errors={errors} t={t} onClear={clearError} className="md:col-span-2" />

        <TextField id={id("weight")} name="weight" label={f.weight} errors={errors} t={t} onClear={clearError} autoComplete="off" className="md:col-span-2" />
        <TextField id={id("pickupDate")} name="pickupDate" type="date" label={f.pickupDate} errors={errors} t={t} onClear={clearError} />
        <TextField id={id("deliveryDate")} name="deliveryDate" type="date" label={f.deliveryDate} errors={errors} t={t} onClear={clearError} />

        <TextAreaField id={id("additional")} name="additional" label={f.additional} errors={errors} t={t} onClear={clearError} className="md:col-span-2" rows={4} />

        <ConsentField id={id("consent")} errors={errors} t={t} onClear={clearError} privacyHref={href(locale, "privacy")} className="md:col-span-2" />
      </fieldset>

      {status === "error" && errorKind ? <ErrorBanner kind={errorKind} t={t} contactEmail={fact("email")} /> : null}

      <div>
        <SubmitButton label={t.quote.submit} submitting={submitting} sending={t.sending} />
      </div>
    </form>
  );
}
