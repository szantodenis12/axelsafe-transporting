"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Smoothstep ramp as gradient stops (alpha 0 -> 1 across from%..to%): no perceptible start, end or kink, so no edge is ever seen. */
function ramp(from: number, to: number, rising: boolean, steps = 10) {
  const out: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const a = t * t * (3 - 2 * t);
    out.push(`rgba(0,0,0,${(rising ? a : 1 - a).toFixed(3)}) ${(from + (to - from) * t).toFixed(1)}%`);
  }
  return out.join(",");
}

const FEATHER = {
  none: undefined,
  bottom: `linear-gradient(180deg,#000 0%,#000 45%,${ramp(45, 100, false)})`,
  top: `linear-gradient(180deg,${ramp(0, 42, true)},#000 100%)`,
  both: `linear-gradient(180deg,${ramp(0, 40, true)},#000 60%,${ramp(60, 100, false)})`,
  /** like `both`, but stays opaque longer and sinks over the last third, e.g. a planet horizon that must stay readable before it dissolves into the footer */
  bothLate: `linear-gradient(180deg,${ramp(0, 40, true)},#000 66%,${ramp(66, 100, false, 14)})`,
} as const;

/**
 * Background layer that drifts slower than the page (parallax) and dissolves at its edges
 * instead of ending in a hard rectangle. Oversized by `amount`% top and bottom so the drift
 * never reveals an edge. `zoom` adds a slow push-in (scale 1 -> 1+zoom) over the same pass, which reads as depth
 * on top of the drift. Transform only, scrubbed 1:1 (Lenis already smooths the scroll). Static under
 * prefers-reduced-motion; on phones the drift and the zoom are halved.
 */
export function ParallaxLayer({
  children,
  amount = 14,
  feather = "both",
  zoom = 0,
  className = "",
}: {
  children: ReactNode;
  amount?: number;
  feather?: keyof typeof FEATHER;
  /** extra push-in across the pass, e.g. 0.06 = ends 6% larger than it starts */
  zoom?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el?.parentElement) return;
    const mm = gsap.matchMedia();
    mm.add(
      {
        desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        mobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
      },
      (ctx) => {
        const k = ctx.conditions?.mobile ? 0.5 : 1;
        gsap.fromTo(
          el,
          { yPercent: (-amount * k) / 1.5, scale: 1 },
          {
            yPercent: (amount * k) / 1.5,
            scale: 1 + zoom * k,
            ease: "none",
            force3D: true,
            scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      },
    );
    return () => mm.revert();
  }, [amount, zoom]);

  const mask = FEATHER[feather];
  // the feather sits on a static wrapper so the soft edges stay at the section edges while the image drifts
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={mask ? { maskImage: mask, WebkitMaskImage: mask } : undefined}
    >
      <div ref={ref} style={{ top: `-${amount}%`, bottom: `-${amount}%` }} className="absolute inset-x-0 will-change-transform">
        {children}
      </div>
    </div>
  );
}
