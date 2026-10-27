import Link from "next/link";
import { connection } from "next/server";
import { LogOut } from "lucide-react";
import { Logo, AxelWordmark } from "@/components/ui/Logo";
import { logoutAction } from "@/app/admin/login/actions";
import { adminAuthor } from "@/lib/admin/auth";
import { adminStore } from "@/lib/admin/data";
import { initials } from "@/lib/admin/format";
import { AdminNav, type NavCounts } from "./AdminNav";

function UserBlock({ name }: { name?: string }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <span aria-hidden className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line-strong bg-ink/[0.06] font-mono text-[0.6875rem] tracking-[0.04em] text-ink">
        {name ? initials(name) : "·"}
      </span>
      <div className="min-w-0 leading-tight">
        <p className="truncate text-[0.8125rem] font-medium text-ink">{name ?? "…"}</p>
        <p className="text-[0.75rem] text-ink-3">Autentificat</p>
      </div>
    </div>
  );
}

function SignOut() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        title="Deconectare"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-2 transition-colors hover:bg-ink/[0.06] hover:text-ink"
      >
        <LogOut size={16} strokeWidth={1.8} aria-hidden />
        <span className="sr-only">Deconectare</span>
      </button>
    </form>
  );
}

/** Static chrome: desktop sidebar + mobile top bar. Counts/user stream in via <ChromeData />. */
export function Chrome({ counts, name }: { counts?: NavCounts; name?: string }) {
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[244px] flex-col border-r border-line bg-bg/60 backdrop-blur-xl lg:flex">
        <div className="flex h-[76px] items-center px-6">
          <Link href="/admin" aria-label="AXEL SAFE TRANSPORTING — CRM, pagina principală" className="rounded-md">
            <Logo />
          </Link>
        </div>
        <p className="t-label eyebrow !text-ink-3 px-6 pb-3 pt-1">CRM dispecerat</p>
        <div className="flex-1 overflow-y-auto px-3 pb-4">
          <AdminNav counts={counts} orientation="vertical" />
        </div>
        <div className="flex items-center justify-between gap-2 border-t border-line px-4 py-3">
          <UserBlock name={name} />
          <SignOut />
        </div>
      </aside>

      <header className="sticky top-0 z-30 border-b border-line bg-bg/85 backdrop-blur-xl lg:hidden">
        <div className="flex h-14 items-center justify-between gap-3 px-4">
          <Link href="/admin" aria-label="AXEL SAFE TRANSPORTING — CRM, pagina principală" className="flex items-center gap-2.5 rounded-md">
            <AxelWordmark className="h-[14px] w-auto text-ink" />
            <span className="t-label !text-ink-3">CRM</span>
          </Link>
          <div className="flex items-center gap-2">
            <span className="max-w-[9rem] truncate text-[0.75rem] text-ink-2">{name}</span>
            <SignOut />
          </div>
        </div>
        <AdminNav counts={counts} orientation="horizontal" />
      </header>
    </>
  );
}

/** Request-time: verifies the session, reads counts + author name. Falls back to a count-less chrome on store errors. */
export async function ChromeData() {
  await connection();
  const name = adminAuthor();
  let counts: NavCounts | undefined;
  try {
    const { repo } = await adminStore();
    if (repo) {
      const s = await repo.stats();
      counts = {
        all: s.total,
        quoteNew: s.byType.quote.byStatus.new ?? 0,
        carrierNew: s.byType.carrier.byStatus.new ?? 0,
        spam: (s.byType.quote.byStatus.spam ?? 0) + (s.byType.carrier.byStatus.spam ?? 0),
      };
    }
  } catch (err) {
    if (err && typeof err === "object" && "digest" in err) throw err; // let redirect() through
    console.error("[admin] nav counts failed:", err instanceof Error ? err.message : err);
  }
  return <Chrome counts={counts} name={name} />;
}
