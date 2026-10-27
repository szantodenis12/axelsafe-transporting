"use client";

import { useActionState, useState } from "react";
import { AlertCircle, Eye, EyeOff, LockKeyhole, LogIn } from "lucide-react";
import { loginAction, type LoginState } from "@/app/admin/login/actions";
import { adminInputH, label as labelClass, panel, PillButton } from "./ui";

const MESSAGES: Record<NonNullable<LoginState["error"]>, string> = {
  invalid: "Parolă incorectă.",
  missing: "Introdu parola de administrare.",
  not_configured: "Administrarea nu este configurată pe acest server.",
  rate_limited: "Prea multe încercări. Așteaptă 15 minute și încearcă din nou.",
};

export function LoginForm({ configured, missing, next }: { configured: boolean; missing: string[]; next: string }) {
  const [state, action, pending] = useActionState<LoginState, FormData>(loginAction, {});
  const [show, setShow] = useState(false);

  if (!configured) {
    return (
      <div className={`${panel} flex flex-col gap-3 p-7`} role="alert">
        <span className="grid h-10 w-10 place-items-center rounded-full border border-line bg-bg text-ink-3">
          <LockKeyhole size={18} strokeWidth={1.7} aria-hidden />
        </span>
        <p className="text-[1rem] font-medium text-ink">Administrare neconfigurată</p>
        <p className="text-[0.875rem] text-ink-2">
          Autentificarea este dezactivată până când sunt setate aceste variabile de mediu:
        </p>
        <ul className="flex flex-col gap-1 font-mono text-[0.8125rem] text-ink">
          {missing.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
        <p className="text-[0.8125rem] text-ink-3">Vezi docs/CRM.md.</p>
      </div>
    );
  }

  return (
    <form action={action} className={`${panel} flex flex-col gap-6 p-7`} aria-busy={pending || undefined}>
      <input type="hidden" name="next" value={next} />
      <div className="flex flex-col gap-2">
        <label htmlFor="admin-password" className={labelClass}>
          Parolă
        </label>
        <div className="relative">
          <input
            id="admin-password"
            name="password"
            type={show ? "text" : "password"}
            autoComplete="current-password"
            autoFocus
            required
            className={`${adminInputH} pr-12`}
            aria-invalid={state.error ? true : undefined}
            aria-describedby={state.error ? "admin-password-error" : undefined}
          />
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? "Ascunde parola" : "Arată parola"}
            aria-pressed={show}
            className="absolute right-1.5 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-ink-3 hover:bg-surface hover:text-ink"
          >
            {show ? <EyeOff size={16} strokeWidth={1.8} aria-hidden /> : <Eye size={16} strokeWidth={1.8} aria-hidden />}
          </button>
        </div>
        {state.error ? (
          <p id="admin-password-error" role="alert" className="flex items-start gap-1.5 text-[0.8125rem] text-[#e3a9a9]">
            <AlertCircle size={14} strokeWidth={1.8} className="mt-[2px] shrink-0" aria-hidden />
            {MESSAGES[state.error]}
          </p>
        ) : null}
      </div>
      <PillButton type="submit" disabled={pending} icon={<LogIn size={15} strokeWidth={1.6} aria-hidden />}>
        {pending ? "Se verifică…" : "Intră"}
      </PillButton>
    </form>
  );
}
