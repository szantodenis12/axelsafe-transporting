"use client";

import { useActionState, useState, type ReactNode } from "react";
import { AlertCircle, FileText, PhoneCall, Plus, Truck } from "lucide-react";
import { createManualLeadAction, type ManualLeadState } from "@/app/admin/(crm)/leads/new/actions";
import { CALLBACK_TIMES, LEAD_TYPES, SOURCE_CHANNELS, VEHICLE_TYPES, type LeadType } from "@/lib/leads/schema";
import { CALLBACK_TIME_LABEL, CHANNEL_LABEL, TYPE_LABEL, VEHICLE_LABEL } from "@/lib/leads/labels";
import { ALERT_HEX, adminInputH, adminSelect, adminTextarea, label as labelClass, panel, PillButton } from "./ui";

const TYPE_ICON = { quote: FileText, carrier: Truck, callback: PhoneCall } as const;

/** "Lead nou": requests that came by phone, e-mail, WhatsApp, freight exchange, referral… */
export function ManualLeadForm() {
  const [state, action, pending] = useActionState<ManualLeadState, FormData>(createManualLeadAction, {});
  const v = state.values ?? {};
  const [type, setType] = useState<LeadType>((v.type as LeadType) ?? "quote");
  const err = (name: string) => state.fields?.[name];
  const str = (name: string) => (typeof v[name] === "string" ? (v[name] as string) : "");
  const vehicles = Array.isArray(v.vehicleTypes) ? v.vehicleTypes : [];

  const field = (name: string, text: string, input: ReactNode, wide = false) => (
    <div className={`flex min-w-0 flex-col gap-2 ${wide ? "sm:col-span-2" : ""}`}>
      <label htmlFor={`ml-${name}`} className={labelClass}>
        {text}
      </label>
      {input}
      {err(name) ? (
        <p id={`ml-${name}-err`} className="flex items-start gap-1.5 text-[0.8125rem]" style={{ color: ALERT_HEX }}>
          <AlertCircle size={14} strokeWidth={1.6} className="mt-[2px] shrink-0" aria-hidden />
          {err(name)}
        </p>
      ) : null}
    </div>
  );
  const aria = (name: string) => (err(name) ? { "aria-invalid": true, "aria-describedby": `ml-${name}-err` } : {});
  const sectionTitle = `${labelClass} mb-5 sm:col-span-2`;

  return (
    <form action={action} className="flex flex-col gap-4" aria-busy={pending || undefined} key={state.error ?? "form"}>
      <section className={`${panel} flex flex-col gap-5 p-5 sm:p-6`} aria-labelledby="ml-kind-h">
        <h2 id="ml-kind-h" className={labelClass}>Tip și canal</h2>
        <fieldset className="flex flex-col gap-2">
          <legend className="sr-only">Tip</legend>
          <div className="flex flex-wrap gap-2">
            {LEAD_TYPES.map((t) => {
              const Icon = TYPE_ICON[t];
              return (
                <label key={t} className="cursor-pointer">
                  <input type="radio" name="type" value={t} checked={type === t} onChange={() => setType(t)} className="peer sr-only" />
                  <span className="a-chip !h-10 peer-checked:!border-accent/60 peer-checked:!bg-ink/[0.09] peer-focus-visible:outline peer-focus-visible:outline-[1.5px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
                    <Icon size={14} strokeWidth={1.6} aria-hidden className="text-accent" />
                    {TYPE_LABEL[t]}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {field(
            "sourceChannel",
            "Canal",
            <select id="ml-sourceChannel" name="sourceChannel" defaultValue={str("sourceChannel") || "phone"} className={adminSelect} {...aria("sourceChannel")}>
              {SOURCE_CHANNELS.map((c) => (
                <option key={c} value={c}>
                  {CHANNEL_LABEL[c]}
                </option>
              ))}
            </select>,
          )}
        </div>
      </section>

      <section className={`${panel} grid grid-cols-1 gap-x-5 gap-y-4 p-5 sm:grid-cols-2 sm:p-6`} aria-labelledby="ml-contact-h">
        <h2 id="ml-contact-h" className={sectionTitle}>Contact</h2>
        {field("contactPerson", "Persoană de contact *", <input id="ml-contactPerson" name="contactPerson" required maxLength={120} defaultValue={str("contactPerson")} className={adminInputH} {...aria("contactPerson")} />)}
        {field("companyName", type === "carrier" ? "Firmă *" : "Firmă", <input id="ml-companyName" name="companyName" maxLength={160} defaultValue={str("companyName")} className={adminInputH} {...aria("companyName")} />)}
        {field("phone", "Telefon", <input id="ml-phone" name="phone" type="tel" inputMode="tel" maxLength={40} defaultValue={str("phone")} className={adminInputH} {...aria("phone")} />)}
        {field("email", "E-mail", <input id="ml-email" name="email" type="email" maxLength={254} defaultValue={str("email")} className={adminInputH} {...aria("email")} />)}
        {field("vatNumber", "CUI / cod TVA", <input id="ml-vatNumber" name="vatNumber" maxLength={20} defaultValue={str("vatNumber")} className={adminInputH} {...aria("vatNumber")} />)}
        <p className="self-end text-[0.8125rem] text-ink-3 sm:pb-3">Telefonul sau e-mailul este obligatoriu.</p>
      </section>

      <section className={`${panel} grid grid-cols-1 gap-x-5 gap-y-4 p-5 sm:grid-cols-2 sm:p-6`} aria-labelledby="ml-details-h">
        <h2 id="ml-details-h" className={sectionTitle}>
          {type === "quote" ? "Rută și marfă" : type === "carrier" ? "Profil transportator" : "Apel"}
        </h2>
        {type === "quote" ? (
          <>
            {field("pickupLocation", "De unde *", <input id="ml-pickupLocation" name="pickupLocation" maxLength={200} defaultValue={str("pickupLocation")} className={adminInputH} {...aria("pickupLocation")} />)}
            {field("deliveryLocation", "Până unde *", <input id="ml-deliveryLocation" name="deliveryLocation" maxLength={200} defaultValue={str("deliveryLocation")} className={adminInputH} {...aria("deliveryLocation")} />)}
            {field("cargoDescription", "Marfă", <input id="ml-cargoDescription" name="cargoDescription" maxLength={2000} defaultValue={str("cargoDescription")} className={adminInputH} />, true)}
          </>
        ) : null}
        {type === "carrier" ? (
          <>
            {field("country", "Țara de înregistrare", <input id="ml-country" name="country" maxLength={80} defaultValue={str("country")} className={adminInputH} />)}
            {field("regions", "Zone / rute", <input id="ml-regions" name="regions" maxLength={500} defaultValue={str("regions")} className={adminInputH} />)}
            <fieldset className="flex flex-col gap-2 sm:col-span-2">
              <legend className={`${labelClass} mb-2`}>Tipuri de vehicule</legend>
              <div className="flex flex-wrap gap-2">
                {VEHICLE_TYPES.map((vt) => (
                  <label key={vt} className="cursor-pointer">
                    <input type="checkbox" name="vehicleTypes" value={vt} defaultChecked={vehicles.includes(vt)} className="peer sr-only" />
                    <span className="a-chip peer-checked:!border-accent/60 peer-checked:!bg-ink/[0.09] peer-focus-visible:outline peer-focus-visible:outline-[1.5px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent">
                      {VEHICLE_LABEL[vt]}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          </>
        ) : null}
        {type === "callback"
          ? field(
              "preferredTime",
              "Când să sunăm",
              <select id="ml-preferredTime" name="preferredTime" defaultValue={str("preferredTime") || "any"} className={adminSelect}>
                {CALLBACK_TIMES.map((t) => (
                  <option key={t} value={t}>
                    {CALLBACK_TIME_LABEL[t]}
                  </option>
                ))}
              </select>,
            )
          : null}
        {field("notes", "Detalii / notițe", <textarea id="ml-notes" name="notes" maxLength={2000} defaultValue={str("notes")} className={adminTextarea} />, true)}
      </section>

      {state.error ? (
        <p role="alert" className="flex items-start gap-2 text-[0.9375rem]" style={{ color: ALERT_HEX }}>
          <AlertCircle size={16} strokeWidth={1.6} className="mt-[3px] shrink-0" aria-hidden />
          {state.error}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[0.8125rem] text-ink-3">Cererea îți este alocată automat (cu un cont personal).</p>
        <PillButton type="submit" disabled={pending} icon={<Plus size={15} strokeWidth={1.6} aria-hidden />}>
          {pending ? "Se salvează…" : "Salvează cererea"}
        </PillButton>
      </div>
    </form>
  );
}
