import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

/** Rendered for unknown lead ids (and any other missing /admin route). */
export default function AdminNotFound() {
  return (
    <main className="grid min-h-dvh place-items-center px-6 py-12">
      <div className="flex w-full max-w-[420px] flex-col items-center gap-4 card-glow !rounded-[18px] px-7 py-12 text-center">
        <span className="grid h-11 w-11 place-items-center rounded-full border border-line-strong text-accent">
          <SearchX size={20} strokeWidth={1.5} aria-hidden />
        </span>
        <h1 className="a-h2">Nu am găsit pagina</h1>
        <p className="text-[0.875rem] text-ink-2">Această cerere nu există sau a fost ștearsă.</p>
        <Link href="/admin/leads" className="inline-flex items-center gap-1.5 text-[0.875rem] text-ink-2 transition-colors hover:text-ink">
          <ArrowLeft size={14} strokeWidth={1.6} aria-hidden /> Toate cererile
        </Link>
      </div>
    </main>
  );
}
