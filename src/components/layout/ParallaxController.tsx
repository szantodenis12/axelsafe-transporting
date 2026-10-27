"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Site-wide element parallax. Any element with `data-speed="0.08"` drifts while it crosses
 * the viewport: positive = moves up faster than the page (closer), negative = lags (further).
 * Distance = speed × viewport height. Re-scans on every route change.
 * Optional `data-speed-x` adds a sideways drift (distance = speed × viewport width): used on the big outlined
 * watermarks / hairline rings so they slide as well as rise. Both are transforms only.
 * Off for reduced motion; off on phones too (< 768 px: the blocks stay put — see docs/MOBILE.md).
 */
export function ParallaxController() {
  const pathname = usePathname();

  useEffect(() => {
    const mm = gsap.matchMedia();
    const setup = () =>
      mm.add(
        {
          desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
          mobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          // phones: no text/card drift at all (m5 mobile layout system) — blocks stay put so the page reads as stable sections
          const factor = ctx.conditions?.mobile ? 0 : 1;
          const els = document.querySelectorAll<HTMLElement>("[data-speed]");
          els.forEach((el) => {
            const speed = parseFloat(el.dataset.speed || "0") * factor;
            const speedX = parseFloat(el.dataset.speedX || "0") * factor;
            if (!speed && !speedX) return;
            gsap.fromTo(
              el,
              { y: () => speed * window.innerHeight * 0.5, x: () => speedX * window.innerWidth * 0.5 },
              {
                y: () => -speed * window.innerHeight * 0.5,
                x: () => -speedX * window.innerWidth * 0.5,
                ease: "none",
                force3D: true, // keep translate3d → the element stays on its own compositor layer while it drifts
                scrollTrigger: {
                  trigger: el,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.25, // Lenis smooths the scroll itself; a long scrub on top reads as lag
                  invalidateOnRefresh: true,
                  // promote only while crossing the viewport (30 permanent layers would cost more than they save)
                  onToggle: (self) => {
                    el.style.willChange = self.isActive ? "transform" : "";
                  },
                },
              },
            );
          });
          // switching desktop <-> mobile (or reduced motion) reverts the tweens (transforms cleared); also drop the layer hint the
          // scroll callbacks set by hand, which gsap does not know about
          return () => els.forEach((el) => (el.style.willChange = ""));
        },
      );

    // Start only after load + a beat, so inline transforms never race React hydration of streamed sections.
    let timer = 0;
    const start = () => {
      timer = window.setTimeout(setup, 300);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      window.removeEventListener("load", start);
      window.clearTimeout(timer);
      mm.revert();
    };
  }, [pathname]);

  return null;
}
