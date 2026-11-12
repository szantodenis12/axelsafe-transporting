"use client";

import { useId } from "react";
import { fact } from "@/content/companyData";
import { href } from "@/lib/routes";
import { CALLBACK_FIELD_ORDER, CALLBACK_TIMES, callbackFormSchema } from "@/lib/leads/schema";
import { useEnquiryForm } from "./useEnquiryForm";
import { ChoiceGroup, ConsentField, ErrorBanner, Honeypot, SubmitButton, SuccessPanel, TextField } from "./fields";

/** "Vă sunăm noi": name, phone, preferred time. Posts as type "callback". Compact layout for a side card. */
export function CallbackForm() {
  const uid = useId();
  const id = (name: string) => `callback-${name}-${uid}`;
  const { t, locale, formRef, successRef, status, errors, errorKind, requestId, onSubmit, clearError } = useEnquiryForm({
    type: "callback",
    schema: callbackFormSchema,
    fieldOrder: CALLBACK_FIELD_ORDER,
  });
  const c = t.callback;
  const submitting = status === "submitting";

  if (status === "success") return <SuccessPanel t={t} requestId={requestId} panelRef={successRef} />;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-busy={submitting || undefined} className="relative flex flex-col gap-6">
      <Honeypot id={id("website")} />

      <fieldset disabled={submitting} className="m-0 flex min-w-0 flex-col gap-5 border-0 p-0">
        <legend className="sr-only">{c.submit}</legend>
        <TextField id={id("contactPerson")} name="contactPerson" label={c.fields.contactPerson} required errors={errors} t={t} onClear={clearError} autoComplete="name" />
        <TextField id={id("phone")} name="phone" type="tel" inputMode="tel" label={c.fields.phone} required errors={errors} t={t} onClear={clearError} autoComplete="tel" />
        <ChoiceGroup
          id={id("preferredTime")}
          name="preferredTime"
          type="radio"
          label={c.fields.preferredTime}
          required
          defaultValue="any"
          options={CALLBACK_TIMES.map((v) => ({ value: v, label: c.timeOptions[v] }))}
          errors={errors}
          t={t}
          onClear={clearError}
        />
        <ConsentField id={id("consent")} errors={errors} t={t} onClear={clearError} privacyHref={href(locale, "privacy")} />
      </fieldset>

      {status === "error" && errorKind ? <ErrorBanner kind={errorKind} t={t} contactEmail={fact("email")} /> : null}

      <div>
        <SubmitButton label={c.submit} submitting={submitting} sending={t.sending} />
      </div>
    </form>
  );
}
