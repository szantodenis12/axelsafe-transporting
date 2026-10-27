"use client";

import { Children, useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * Repeated cards: on desktop the element is exactly what you pass in (usually a grid via `className`); below 768 px
 * the `.m-rail` rules in globals.css turn it into a scroll-snap carousel (next card peeks in) and the dots show progress.
 *
 * Progress uses one IntersectionObserver rooted on the rail — no scroll listeners. The "active" card is the last one that
 * touches the rail's left 40%, which is the snapped card for every position including the final, narrower-than-viewport one.
 * Dots are real buttons (44 px hit area) that scroll the rail; their labels are numbers, so they need no translation.
 */
export function Rail({
  as: Tag = "ul",
  className = "",
  children,
  ...rest
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
} & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const count = Children.count(children);

  useEffect(() => {
    const rail = ref.current;
    if (!rail) return;
    const seen = new Set<number>();
    const items = Array.from(rail.children);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const i = items.indexOf(e.target);
          if (i < 0) continue;
          if (e.isIntersecting) seen.add(i);
          else seen.delete(i);
        }
        if (seen.size) setActive(Math.max(...seen));
      },
      { root: rail, rootMargin: "0px -60% 0px 0px", threshold: 0 },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [count]);

  const go = (i: number) => {
    const rail = ref.current;
    const el = rail?.children[i] as HTMLElement | undefined;
    if (!rail || !el) return;
    const pad = parseFloat(getComputedStyle(rail).paddingLeft) || 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollTo({ left: el.offsetLeft - pad, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <>
      <Tag ref={ref} className={`m-rail ${className}`} {...rest}>
        {children}
      </Tag>
      {count > 1 && (
        <div className="m-rail-dots md:hidden">
          {Array.from({ length: count }, (_, i) => (
            <button
              key={i}
              type="button"
              className="m-rail-dot"
              aria-label={`${i + 1} / ${count}`}
              aria-current={i === active}
              onClick={() => go(i)}
            />
          ))}
        </div>
      )}
    </>
  );
}
