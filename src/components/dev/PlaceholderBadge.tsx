"use client";

import { useEffect, useState } from "react";

type Item = { key: string; note: string };

/**
 * Preview-only indicator for prototype data. Rendered by the layout ONLY when
 * NEXT_PUBLIC_SITE_ENV !== "production", so it never reaches the live site.
 */
export function PlaceholderBadge({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.showPh = String(highlight);
  }, [highlight]);

  if (!items.length) return null;

  return (
    <div className="fixed bottom-[max(0.75rem,env(safe-area-inset-bottom))] right-[max(0.75rem,env(safe-area-inset-right))] z-[80] flex flex-col items-end max-w-[min(420px,calc(100vw-24px))] font-mono text-[10px] leading-snug sm:bottom-4 sm:right-4 sm:text-[11px]">
      {open && (
        <div data-lenis-prevent className="mb-2 max-h-[50vh] overflow-auto rounded-xl border border-amber-300/40 bg-[#1a1408]/95 p-4 text-amber-100 shadow-2xl backdrop-blur">
          <p className="mb-2 text-amber-200">
            Prototype data — not verified company facts. Replace in <code>src/content/companyData.ts</code>.
          </p>
          <ul className="space-y-1.5">
            {items.map((i) => (
              <li key={i.key}>
                <span className="text-amber-300">{i.key}</span> — {i.note.replace("[PLACEHOLDER] ", "")}
              </li>
            ))}
          </ul>
          <label className="mt-3 flex cursor-pointer items-center gap-2 text-amber-200">
            <input type="checkbox" checked={highlight} onChange={(e) => setHighlight(e.target.checked)} />
            Highlight placeholder content on page
          </label>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full border border-amber-300/50 bg-[#1a1408]/90 px-2.5 py-1.5 text-amber-200 backdrop-blur hover:border-amber-200 sm:gap-2 sm:px-3.5 sm:py-2"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
        PREVIEW · {items.length}<span className="hidden sm:inline"> placeholders</span>
      </button>
    </div>
  );
}
