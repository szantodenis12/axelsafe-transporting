"use client";

import { useId, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";

type Item = { q: string; a: string };

/**
 * Numbered accordion cards. One open at a time (first open by default). Height animates via
 * grid-template-rows 0fr -> 1fr in CSS (see ".faq-*" in globals.css): no measuring, no layout JS.
 * Closed panels are visibility:hidden so nothing inside them is reachable; the answers stay in the DOM.
 */
export function FaqAccordion({ items }: { items: readonly Item[] }) {
  const uid = useId();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <ul className="space-y-3 md:space-y-4">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${uid}-q${i}`;
        const panelId = `${uid}-a${i}`;
        return (
          <Reveal as="li" key={item.q} delay={Math.min(i, 4) * 50}>
            <div className="faq-card" data-open={isOpen}>
              <h3>
                <button
                  type="button"
                  id={btnId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="faq-trigger"
                >
                  <span className="faq-num" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="faq-q">{item.q}</span>
                  <span className="faq-icon" aria-hidden>
                    <span />
                    <span />
                  </span>
                </button>
              </h3>
              <div id={panelId} role="region" aria-labelledby={btnId} className="faq-panel">
                <div>
                  <p className="faq-a t-body">{item.a}</p>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </ul>
  );
}
