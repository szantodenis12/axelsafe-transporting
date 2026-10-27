"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";
import { getLenis, setLenis } from "@/lib/lenis";

gsap.registerPlugin(ScrollTrigger);

const REDUCED = "(prefers-reduced-motion: reduce)";
// Same rule as the agency site: Lenis smooths WHEEL input, and with syncTouch off it does nothing for touch
// scrolling, so phones/tablets keep the compositor-driven native scroll and skip the per-frame loop entirely.
const COARSE = "(hover: none) and (pointer: coarse)";

/**
 * Lenis smooth scrolling for the public site (mounted in the [locale] layout only, so /admin keeps native scroll).
 *
 * Lenis keeps the NATIVE scroll position (it only eases window.scrollTo), so CSS `position: sticky`
 * (the hero stage) and every ScrollTrigger keep working; ScrollTrigger is simply told about each Lenis frame.
 * Driven from gsap.ticker so the scrubbed timelines and the smoothed scroll advance on the same clock.
 */
export function SmoothScroll() {
  const pathname = usePathname();
  const lastPath = useRef(pathname);

  useEffect(() => {
    const reduced = window.matchMedia(REDUCED);
    const coarse = window.matchMedia(COARSE);

    let teardown: (() => void) | null = null;
    let starting = false; // the dynamic import is in flight: never create a second instance
    let cancelled = false;
    // Both conditions can change WHILE the page is open (DevTools device emulation flips the pointer type live, a tablet gets a
    // mouse, the OS motion setting changes), so Lenis is started and stopped on every change instead of being decided once on mount.
    const wanted = () => !cancelled && !reduced.matches && !coarse.matches;

    const start = () => {
      if (teardown || starting || !wanted()) return;
      starting = true;
      import("lenis").then(
        ({ default: Lenis }) => {
          starting = false;
          if (teardown || !wanted()) return;
          // lerp (not duration): frame-rate independent and steadier under scrubbed ScrollTriggers. 0.1 = the agency site.
          const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, syncTouch: false });
          setLenis(lenis);
          lenis.on("scroll", ScrollTrigger.update);
          const tick = (time: number) => lenis.raf(time * 1000);
          gsap.ticker.add(tick);
          gsap.ticker.lagSmoothing(0);
          // Lenis caches the scroll limit; the hero stage / section heights change after it measures
          // (data-motion toggles the 400svh stage, ScrollTrigger.refresh re-measures), so re-measure on every refresh.
          const onRefresh = () => lenis.resize();
          ScrollTrigger.addEventListener("refresh", onRefresh);
          lenis.resize();

          // In-page #hash links: ease there with Lenis (it honours scroll-margin-top / html scroll-padding-top, i.e. the
          // fixed header). preventDefault makes next/link skip its own instant jump but React onClick handlers still run.
          const onClick = (e: MouseEvent) => {
            if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
            const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
            if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
            const url = new URL(a.href, window.location.href);
            if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || url.search !== window.location.search) return;
            if (!url.hash) return;
            const id = decodeURIComponent(url.hash.slice(1));
            const target = id ? document.getElementById(id) : null;
            if (id && !target) return;
            e.preventDefault();
            if (lenis.isStopped) lenis.start(); // opened mobile menu: it is closing as part of this click
            lenis.scrollTo(target ?? 0, { force: true });
            if (url.hash !== window.location.hash) window.history.pushState(window.history.state, "", url.href);
            if (target && id === "main") {
              target.setAttribute("tabindex", "-1");
              target.focus({ preventScroll: true });
            }
          };
          document.addEventListener("click", onClick, true);

          teardown = () => {
            document.removeEventListener("click", onClick, true);
            ScrollTrigger.removeEventListener("refresh", onRefresh);
            gsap.ticker.remove(tick);
            gsap.ticker.lagSmoothing(500, 33); // gsap defaults
            lenis.destroy(); // also removes the .lenis classes from <html>; the native scroll position is untouched
            setLenis(null);
            teardown = null;
          };
        },
        () => {
          starting = false;
        },
      );
    };

    const sync = () => {
      if (wanted()) start();
      else teardown?.();
    };
    reduced.addEventListener("change", sync);
    coarse.addEventListener("change", sync);
    start();

    return () => {
      cancelled = true;
      reduced.removeEventListener("change", sync);
      coarse.removeEventListener("change", sync);
      teardown?.();
    };
  }, []);

  // ScrollTrigger is configured with ignoreMobileResize (HeroStage): touch browsers resize the viewport whenever the URL bar
  // collapses, and that must not re-measure the svh-based scenes. But DevTools emulation (and a rotated or folded device)
  // changes the viewport height for real without ScrollTrigger noticing, and its "is this a touch device" flag is fixed at
  // load. The SMALL viewport height (100svh) tells the two apart: it ignores toolbars, so it only moves on a real resize.
  useEffect(() => {
    const probe = document.createElement("div");
    probe.setAttribute("aria-hidden", "true");
    probe.style.cssText = "position:fixed;left:0;top:0;width:0;height:100svh;visibility:hidden;pointer-events:none";
    document.body.appendChild(probe);
    let lastH = probe.offsetHeight;
    let lastW = window.innerWidth;
    let timer = 0;
    const settle = () => {
      const h = probe.offsetHeight;
      if (h !== lastH) {
        lastH = h;
        ScrollTrigger.refresh();
      }
    };
    const onResize = () => {
      if (window.innerWidth !== lastW) {
        // a width change is re-measured by ScrollTrigger itself
        lastW = window.innerWidth;
        lastH = probe.offsetHeight;
        return;
      }
      window.clearTimeout(timer);
      timer = window.setTimeout(settle, 300);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(timer);
      probe.remove();
    };
  }, []);

  // Route change: Next jumps the document to the top; make Lenis agree immediately (no inherited inertia/target).
  // A hash navigation (/en/contact#quote) is left to the browser/Next, which scroll to the anchor themselves.
  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    const lenis = getLenis();
    if (!lenis || window.location.hash) return;
    lenis.scrollTo(0, { immediate: true, force: true });
  }, [pathname]);

  return null;
}
