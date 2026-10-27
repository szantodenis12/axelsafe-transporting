"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { DESKTOP_SCENE_QUERY, MOBILE_SCENE_QUERY, isLiteDevice, sceneMayRun } from "./heroMotion";

/**
 * "Traffic flowing along the corridors" — the dashed-stroke overlay of the road network.
 *
 * Why inline SVG and not <img src="roads-flow.svg">: an animated SVG inside an <img> can't be paused from outside and is
 * re-rasterised every frame forever, even at opacity 0 / off screen. Inline, the animation is a plain CSS animation on
 * <path>, so animation-play-state (data-run) really stops all repaint, and `.net-flow` (contain: paint + its own
 * composited layer) keeps each repaint off the photo / video / road-line layers.
 *
 * The path data is the same file the static fallback uses (/media/roads-flow.svg, immutable-cached), fetched once.
 *
 * mode="scroll": the hero timeline owns data-on (mounted/visible) and data-run (animating) — see HeroStage.
 * mode="view":   static/stacked figures; animates only while on screen.
 */
type Mode = "scroll" | "view";

let dataPromise: Promise<string> | null = null;
function loadPath(): Promise<string> {
  dataPromise ??= fetch("/media/roads-flow.svg")
    .then((r) => (r.ok ? r.text() : Promise.reject(new Error(String(r.status)))))
    .then((t) => /<path[^>]*\sd="([^"]+)"/.exec(t)?.[1] ?? Promise.reject(new Error("no path")))
    .catch((e) => {
      dataPromise = null;
      throw e;
    });
  return dataPromise;
}

/** Keep only the subpaths (dash pattern restarts per subpath, so the look is unchanged) whose bounding box touches the window
 *  [x0,y0,x1,y1] (fractions of the 3840×2160 frame). The mobile scene sets it: its screen only ever shows a sliver of the frame. */
function cropPath(d: string, win: number[]): string {
  const [x0, y0, x1, y1] = [win[0] * 3840, win[1] * 2160, win[2] * 3840, win[3] * 2160];
  const out: string[] = [];
  for (const sub of d.split("M")) {
    if (!sub) continue;
    const n = sub.trim().split(/[\s,]+/).map(Number);
    let a = Infinity, b = Infinity, c = -Infinity, e = -Infinity;
    for (let i = 0; i + 1 < n.length; i += 2) {
      if (n[i] < a) a = n[i];
      if (n[i] > c) c = n[i];
      if (n[i + 1] < b) b = n[i + 1];
      if (n[i + 1] > e) e = n[i + 1];
    }
    if (c >= x0 && a <= x1 && e >= y0 && b <= y1) out.push("M" + sub.trim());
  }
  return out.join(" ");
}

export function RoadsFlow({ mode, className = "" }: { mode: Mode; className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [full, setD] = useState<string | null>(null);
  const [win, setWin] = useState<string | null>(null);
  const d = useMemo(() => (full && win ? cropPath(full, win.split(",").map(Number)) : full), [full, win]);

  // the mobile scene publishes the visible window as data-win (desktop never does → the full path, as before)
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const read = () => setWin(host.dataset.win ?? null);
    read();
    const mo = new MutationObserver(read);
    mo.observe(host, { attributes: true, attributeFilter: ["data-win"] });
    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let cancelled = false;
    const load = () =>
      loadPath()
        .then((p) => !cancelled && setD(p))
        .catch(() => {});

    if (mode === "scroll") {
      // Only the sticky scenes (desktop, or the mobile one on non-lite devices) ever show this; fetch when the browser is idle after
      // load. The scene can switch on later (DevTools emulation, rotating a phone out of the static landscape layout, resizing the
      // window), so the check is repeated on every scene change until the path has been fetched.
      const scenes = [DESKTOP_SCENE_QUERY, MOBILE_SCENE_QUERY].map((q) => window.matchMedia(q));
      const idle = typeof window.requestIdleCallback === "function";
      let handle: number | null = null;
      let done = false;
      const wanted = () =>
        sceneMayRun() && !(isLiteDevice() && !window.matchMedia("(min-width: 768px) and (orientation: landscape)").matches);
      const schedule = () => {
        if (done || handle !== null || cancelled || !wanted()) return;
        done = true;
        handle = idle ? window.requestIdleCallback(load, { timeout: 3000 }) : window.setTimeout(load, 1200);
      };
      scenes.forEach((m) => m.addEventListener("change", schedule));
      schedule();
      return () => {
        cancelled = true;
        scenes.forEach((m) => m.removeEventListener("change", schedule));
        if (handle !== null) {
          if (idle) window.cancelIdleCallback(handle);
          else window.clearTimeout(handle);
        }
      };
    }

    // "view": animate only while on screen
    host.dataset.on = "true";
    let loaded = false;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !loaded) {
          loaded = true;
          load();
        }
        host.dataset.run = e.isIntersecting ? "true" : "false";
      },
      { rootMargin: "80px" },
    );
    io.observe(host);
    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, [mode]);

  return (
    <div ref={hostRef} data-net-flow className={`net-flow ${className}`} aria-hidden="true">
      {d ? (
        <svg viewBox="0 0 3840 2160" className="absolute inset-0 h-full w-full">
          <path d={d} fill="none" stroke="#FFFFFF" strokeWidth="3.4" strokeLinecap="round" strokeDasharray="14 190" />
        </svg>
      ) : mode === "view" ? (
        /* before hydration / while loading: the static (non-animated) file */
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/media/roads-flow.svg" alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full" />
      ) : null}
    </div>
  );
}
