"use client";

import { useEffect, useRef, type CSSProperties } from "react";

/**
 * One road layer as a PRE-RASTERISED lossless WebP (the two 3840×2160 single-path SVGs cost 100–270 ms of GPU raster per frame as the
 * reveal began; a bitmap is only a texture draw). The look is identical — same geometry, stroke and opacity; the SVG originals stay in
 * /public/media (roads-*.svg) and are the source for the rasters.
 *  - full: 3840 px-wide frame (desktop / landscape tablets)
 *  - crop: x 50–100 %, y 6–100 % of the frame, rendered at a 5760 px-wide equivalent (phones / portrait tablets, whose screen only
 *    ever shows a sliver of the frame, at DPR 2–3). Which one is shown is decided in CSS (.net-full / .net-crop).
 *
 * The WebPs are ~2× the bytes of the gzipped SVGs, so no copy may compete with the hero's LCP resources (the earth still / video):
 *  - mode "scene" (the sticky hero scene, hidden at opacity 0 until the reveal starts): `src` is set at the first real scroll /
 *    touch / key press, or otherwise 4 s after the load event once the browser is idle, and the image is decoded ahead.
 *  - mode "view" (static figures: the stacked hero copy, the enquiry map card): `src` is set when the figure is about to be on
 *    screen (IntersectionObserver; a display:none copy never is). A <noscript> copy keeps them working without JS.
 * Only the visible (CSS display) variant is ever requested.
 */
const CROP: CSSProperties = { left: "50%", top: "6%", width: "50%", height: "94%" };

export function RoadLayer({ kind, mode }: { kind: "minor" | "major"; mode: "scene" | "view" }) {
  const full = useRef<HTMLImageElement>(null);
  const crop = useRef<HTMLImageElement>(null);
  const cls = kind === "minor" ? "net-minor" : "net-major";
  const fullSrc = `/media/roads-${kind}-3840.webp`;
  const cropSrc = `/media/roads-${kind}-crop.webp`;

  useEffect(() => {
    const imgs = [full.current, crop.current].filter((i): i is HTMLImageElement => !!i);
    const load = (img: HTMLImageElement) => {
      if (img.getAttribute("src") || getComputedStyle(img).display === "none") return;
      img.setAttribute("src", img.dataset.src!);
      img.decode?.().catch(() => {});
    };

    if (mode === "view") {
      const io = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            load(e.target as HTMLImageElement);
            io.unobserve(e.target);
          }),
        { rootMargin: "400px" },
      );
      imgs.forEach((i) => io.observe(i));
      return () => io.disconnect();
    }

    let started = false;
    const ensure = () => {
      started = true;
      imgs.forEach(load);
    };
    // real input only: ScrollTrigger's refresh dispatches synthetic scroll / resize events right after hydration
    const events = ["scroll", "wheel", "touchstart", "keydown"] as const;
    const onInput = (e: Event) => {
      if (e.type === "scroll" && window.scrollY < 40) return;
      ensure();
      off();
    };
    const off = () => events.forEach((e) => window.removeEventListener(e, onInput));
    events.forEach((e) => window.addEventListener(e, onInput, { passive: true }));
    let idle = 0;
    let timer = 0;
    // not right after load: the hero video / poster (the LCP element) is usually still downloading and the WebPs would share its
    // bandwidth. The reveal starts ~1–2 s into the first scroll, which already triggers the load above.
    const schedule = () => {
      timer = window.setTimeout(() => {
        if (typeof window.requestIdleCallback === "function") idle = window.requestIdleCallback(ensure, { timeout: 2000 });
        else ensure();
      }, 4000);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    const onResize = () => started && ensure(); // rotation: the other variant may have become the visible one
    window.addEventListener("resize", onResize);
    return () => {
      off();
      window.removeEventListener("load", schedule);
      window.removeEventListener("resize", onResize);
      if (idle) window.cancelIdleCallback(idle);
      window.clearTimeout(timer);
    };
  }, [mode]);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={full} alt="" width={3840} height={2160} decoding="async" fetchPriority="low" data-src={fullSrc} className={`${cls} net-full absolute inset-0 h-full w-full`} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={crop} alt="" width={2880} height={3046} decoding="async" fetchPriority="low" data-src={cropSrc} className={`${cls} net-crop absolute`} style={CROP} />
      {mode === "view" && (
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={fullSrc} alt="" className={`${cls} net-full absolute inset-0 h-full w-full`} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={cropSrc} alt="" className={`${cls} net-crop absolute`} style={CROP} />
        </noscript>
      )}
    </>
  );
}
