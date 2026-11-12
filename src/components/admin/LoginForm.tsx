"use client";

import { useActionState, useState } from "react";
import { AlertCircle, Eye, EyeOff, LockKeyhole, LogIn } from "lucide-react";
import { loginAction, type LoginState } from "@/app/admin/login/actions";
import type { LoginMode } from "@/lib/admin/auth";
import { adminInputH, label as labelClass, panel, PillButton } from "./ui";

const MESSAGES: Record<NonNullable<LoginState["error"]>, string> = {
  invalid: "Date de autentificare incorecte.",
  missing: "Completează datele de autentificare.",
  not_configured: "Administrarea nu este configurată pe acest server.",
  rate_limited: "Prea multe încercări. Așteaptă 15 minute și încearcă din nou.",
  server: "Nu am putut verifica datele. Încearcă din nou.",
};

/**
 * users mode: e-mail + password (per-person accounts). fallback mode: only the shared ADMIN_PASSWORD,
 * accepted while no active account exists.
 */
export function LoginForm({ configured, mode, missing, next }: { configured: boolean; mode: LoginMode; missing: string[]; next: string }) {
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
      {mode === "users" ? (
        <div className="flex flex-col gap-2">
          <label htmlFor="admin-email" className={labelClass}>
            E-mail
          </label>
          <input
            id="admin-email"
            name="email"
            type="email"
            autoComplete="username"
            autoFocus={!state.email}
            defaultValue={state.email ?? ""}
            key={state.email ?? ""}
            required
            maxLength={254}
            className={adminInputH}
            aria-invalid={state.error ? true : undefined}
            aria-describedby={state.error ? "admin-password-error" : undefined}
          />
        </div>
      ) : (
        <p className="rounded-2xl border border-line bg-ink/[0.03] px-4 py-3 text-[0.875rem] text-ink-2">
          Nu există încă conturi personale. Intră cu parola comună, apoi creează conturile cu <code className="font-mono text-[0.8125rem] text-ink">pnpm admin:user</code> (docs/CRM.md).
        </p>
      )}
      <div className="flex flex-col gap-2">
        <label htmlFor="admin-password" className={labelClass}>
          {mode === "users" ? "Parolă" : "Parolă comună"}
        </label>
        <div className="relative">
          <input
            id="admin-password"
            name="password"
            type={show ? "text" : "password"}
            autoComplete="current-password"
            autoFocus={mode !== "users" || Boolean(state.email)}
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
