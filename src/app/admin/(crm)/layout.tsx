import { Suspense } from "react";
import { requireAdmin } from "@/lib/admin/auth";
import { Chrome, ChromeData } from "@/components/admin/AdminChrome";
import { Skeleton } from "@/components/admin/ui";

/**
 * CRM shell: fixed sidebar (≥ lg) / sticky top bar with scrolling nav (< lg) + content area.
 * The static chrome renders instantly; the session check, nav counts and the author name stream
 * in behind <Suspense> (cookies() is a request-time API under Cache Components). Pages re-check too.
 */
export default function CrmLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh">
      <Suspense fallback={<Chrome />}>
        <ChromeData />
      </Suspense>
      <main className="mx-auto w-full max-w-[1440px] px-4 pb-20 pt-6 sm:px-6 lg:pl-[calc(244px+2.5rem)] lg:pr-10 lg:pt-10">
        <Suspense fallback={<Skeleton />}>
          <AdminGate>{children}</AdminGate>
        </Suspense>
      </main>
    </div>
  );
}

async function AdminGate({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return <>{children}</>;
}
