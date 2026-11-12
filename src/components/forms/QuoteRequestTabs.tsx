"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import type { Dictionary } from "@/content/copy/en";
import { QuickQuoteForm } from "./QuickQuoteForm";
import { QuoteForm } from "./QuoteForm";

type Tab = "full" | "quick";

/**
 * Contact page: full quote form or "Cerere rapidă", as accessible tabs (WAI-ARIA tabs pattern,
 * arrow keys move between tabs). Both panels stay mounted so typed values survive a switch.
 */
export function QuoteRequestTabs({ copy }: { copy: Dictionary["forms"]["contactBlocks"] }) {
  const uid = useId();
  const [tab, setTab] = useState<Tab>("full");
  const refs = useRef<Record<Tab, HTMLButtonElement | null>>({ full: null, quick: null });
  const tabs: { key: Tab; label: string }[] = [
    { key: "full", label: copy.tabFull },
    { key: "quick", label: copy.tabQuick },
  ];

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    const next: Tab = e.key === "Home" ? "full" : e.key === "End" ? "quick" : tab === "full" ? "quick" : "full";
    setTab(next);
    refs.current[next]?.focus();
  };

  return (
    <div className="flex flex-col gap-8">
      <div role="tablist" aria-label={copy.tabsLabel} className="inline-flex w-fit max-md:w-full rounded-full border border-line bg-bg-2/60 p-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            ref={(el) => {
              refs.current[t.key] = el;
            }}
            id={`${uid}-tab-${t.key}`}
            type="button"
            role="tab"
            aria-selected={tab === t.key}
            aria-controls={`${uid}-panel-${t.key}`}
            tabIndex={tab === t.key ? 0 : -1}
            onClick={() => setTab(t.key)}
            onKeyDown={onKey}
            className={`h-11 rounded-full px-5 max-md:flex-1 text-[0.875rem] transition-colors ${tab === t.key ? "bg-ink text-bg" : "text-ink-2 hover:text-ink"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div id={`${uid}-panel-full`} role="tabpanel" aria-labelledby={`${uid}-tab-full`} hidden={tab !== "full"}>
        <QuoteForm />
      </div>
      <div id={`${uid}-panel-quick`} role="tabpanel" aria-labelledby={`${uid}-tab-quick`} hidden={tab !== "quick"} className="flex flex-col gap-6">
        <p className="t-body max-w-[52ch]">{copy.quickText}</p>
        <QuickQuoteForm />
      </div>
    </div>
  );
}
