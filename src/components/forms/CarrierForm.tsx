"use client";

import { useId } from "react";
import { fact } from "@/content/companyData";
import { href } from "@/lib/routes";
import { CARRIER_FIELD_ORDER, carrierFormSchema, VEHICLE_TYPES } from "@/lib/leads/schema";
import { useEnquiryForm } from "./useEnquiryForm";
import { ChoiceGroup, ConsentField, ErrorBanner, Honeypot, SubmitButton, SuccessPanel, TextAreaField, TextField } from "./fields";

const ARRAY_FIELDS = ["vehicleTypes"] as const;

/** Carrier partnership enquiry: posts to /api/enquiries as type "carrier". */
export function CarrierForm() {
  const uid = useId();
  const id = (name: string) => `carrier-${name}-${uid}`;
  const { t, locale, formRef, successRef, status, errors, errorKind, requestId, onSubmit, clearError } = useEnquiryForm({
    type: "carrier",
    arrayFields: ARRAY_FIELDS,
    schema: carrierFormSchema,
    fieldOrder: CARRIER_FIELD_ORDER,
  });
  const c = t.carrier;
  const f = c.fields;
  const submitting = status === "submitting";

  if (status === "success") return <SuccessPanel t={t} requestId={requestId} panelRef={successRef} />;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-busy={submitting || undefined} className="relative flex flex-col gap-8">
      <Honeypot id={id("website")} />

      <fieldset disabled={submitting} className="grid grid-cols-1 gap-x-5 gap-y-6 md:grid-cols-2">
        <legend className="sr-only">{c.submit}</legend>

        <TextField id={id("companyName")} name="companyName" label={f.companyName} required errors={errors} t={t} onClear={clearError} autoComplete="organization" />
        <TextField id={id("vatNumber")} name="vatNumber" label={f.vatNumber} required errors={errors} t={t} onClear={clearError} autoComplete="off" maxLength={20} />
        <TextField id={id("contactPerson")} name="contactPerson" label={f.contactPerson} required errors={errors} t={t} onClear={clearError} autoComplete="name" />
        <TextField id={id("email")} name="email" type="email" inputMode="email" label={f.email} required errors={errors} t={t} onClear={clearError} autoComplete="email" />
        <TextField id={id("phone")} name="phone" type="tel" inputMode="tel" label={f.phone} required errors={errors} t={t} onClear={clearError} autoComplete="tel" />
        <TextField id={id("country")} name="country" label={f.country} required errors={errors} t={t} onClear={clearError} autoComplete="country-name" />

        <ChoiceGroup
          id={id("vehicleTypes")}
          name="vehicleTypes"
          type="checkbox"
          label={f.vehicleTypes}
          required
          options={VEHICLE_TYPES.map((v) => ({ value: v, label: c.vehicleOptions[v] }))}
          errors={errors}
          t={t}
          onClear={clearError}
          className="md:col-span-2"
        />

        <ChoiceGroup
          id={id("cmrInsurance")}
          name="cmrInsurance"
          type="radio"
          label={f.cmrInsurance}
          required
          options={[
            { value: "yes", label: c.cmrOptions.yes },
            { value: "no", label: c.cmrOptions.no },
          ]}
          errors={errors}
          t={t}
          onClear={clearError}
        />
        <TextField id={id("licenceNumber")} name="licenceNumber" label={f.licenceNumber} errors={errors} t={t} onClear={clearError} autoComplete="off" maxLength={60} />

        <TextField id={id("fleetSize")} name="fleetSize" inputMode="numeric" label={f.fleetSize} errors={errors} t={t} onClear={clearError} autoComplete="off" />
        <TextField id={id("regions")} name="regions" label={f.regions} errors={errors} t={t} onClear={clearError} autoComplete="off" />

        <TextAreaField id={id("message")} name="message" label={f.message} errors={errors} t={t} onClear={clearError} className="md:col-span-2" rows={4} />

        <ConsentField id={id("consent")} errors={errors} t={t} onClear={clearError} privacyHref={href(locale, "privacy")} className="md:col-span-2" />
      </fieldset>

      {status === "error" && errorKind ? <ErrorBanner kind={errorKind} t={t} contactEmail={fact("carrierEmail")} /> : null}

      <div>
        <SubmitButton label={c.submit} submitting={submitting} sending={t.sending} />
      </div>
    </form>
  );
}
