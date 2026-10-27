import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Logo } from "@/components/ui/Logo";
import { getAdminConfig, hasAdminSession, safeAdminPath } from "@/lib/admin/auth";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = { title: "Autentificare" };

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default function AdminLoginPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <main className="grid min-h-dvh place-items-center px-5 py-12">
      <div className="flex w-full max-w-[420px] flex-col gap-9">
        <header className="flex flex-col items-start gap-8">
          <Logo size="lg" />
          <div className="flex flex-col gap-3">
            <p className="t-label eyebrow">CRM dispecerat</p>
            <h1 className="a-title">Autentificare</h1>
            <p className="text-[0.9375rem] text-ink-2">Acces intern. Intră pentru a gestiona cererile de ofertă și solicitările transportatorilor.</p>
          </div>
        </header>
        <Suspense fallback={<div aria-hidden className="h-[172px] animate-pulse rounded-[18px] border border-line bg-bg-2/60" />}>
          <LoginGate searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}

/** Request-time: reads the session cookie and the env. Already signed in → /admin. */
async function LoginGate({ searchParams }: { searchParams: SearchParams }) {
  if (await hasAdminSession()) redirect("/admin");
  const config = getAdminConfig();
  const next = safeAdminPath((await searchParams).next);
  return <LoginForm configured={config.configured} missing={config.configured ? [] : config.missing} next={next} />;
}
