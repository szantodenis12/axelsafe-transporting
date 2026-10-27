"use client";

import { useId } from "react";
import { fact } from "@/content/companyData";
import { href } from "@/lib/routes";
import { CARRIER_FIELD_ORDER, carrierFormSchema } from "@/lib/leads/schema";
import { useEnquiryForm } from "./useEnquiryForm";
import { ConsentField, ErrorBanner, Honeypot, SubmitButton, SuccessPanel, TextAreaField, TextField } from "./fields";

/** Carrier partnership enquiry — posts to /api/enquiries as type "carrier". */
export function CarrierForm() {
  const uid = useId();
  const id = (name: string) => `carrier-${name}-${uid}`;
  const { t, locale, formRef, successRef, status, errors, errorKind, requestId, onSubmit, clearError } = useEnquiryForm({
    type: "carrier",
    schema: carrierFormSchema,
    fieldOrder: CARRIER_FIELD_ORDER,
  });
  const f = t.carrier.fields;
  const submitting = status === "submitting";

  if (status === "success") return <SuccessPanel t={t} requestId={requestId} panelRef={successRef} />;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-busy={submitting || undefined} className="relative flex flex-col gap-8">
      <Honeypot id={id("website")} />

      <fieldset disabled={submitting} className="grid grid-cols-1 gap-x-5 gap-y-6 md:grid-cols-2">
        <legend className="sr-only">{t.carrier.submit}</legend>

        <TextField id={id("companyName")} name="companyName" label={f.companyName} required errors={errors} t={t} onClear={clearError} autoComplete="organization" />
        <TextField id={id("contactPerson")} name="contactPerson" label={f.contactPerson} required errors={errors} t={t} onClear={clearError} autoComplete="name" />
        <TextField id={id("email")} name="email" type="email" inputMode="email" label={f.email} required errors={errors} t={t} onClear={clearError} autoComplete="email" />
        <TextField id={id("phone")} name="phone" type="tel" inputMode="tel" label={f.phone} required errors={errors} t={t} onClear={clearError} autoComplete="tel" />

        <TextField id={id("country")} name="country" label={f.country} required errors={errors} t={t} onClear={clearError} autoComplete="country-name" />
        <TextField id={id("fleetSize")} name="fleetSize" inputMode="numeric" label={f.fleetSize} errors={errors} t={t} onClear={clearError} autoComplete="off" />

        <TextField id={id("vehicleTypes")} name="vehicleTypes" label={f.vehicleTypes} required errors={errors} t={t} onClear={clearError} autoComplete="off" className="md:col-span-2" />
        <TextField id={id("regions")} name="regions" label={f.regions} errors={errors} t={t} onClear={clearError} autoComplete="off" className="md:col-span-2" />

        <TextAreaField id={id("message")} name="message" label={f.message} errors={errors} t={t} onClear={clearError} className="md:col-span-2" rows={4} />

        <ConsentField id={id("consent")} errors={errors} t={t} onClear={clearError} privacyHref={href(locale, "privacy")} className="md:col-span-2" />
      </fieldset>

      {status === "error" && errorKind ? <ErrorBanner kind={errorKind} t={t} contactEmail={fact("carrierEmail")} /> : null}

      <div>
        <SubmitButton label={t.carrier.submit} submitting={submitting} sending={t.sending} />
      </div>
    </form>
  );
}
