"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Traffic-flow overlay for the example-enquiry map, which only shows a small crop of the Earth frame (viewBox 3840 x 2160).
 * Same stroke, dash and 15 fps stepped animation as RoadsFlow (.net-flow in globals.css), but only the corridor sub-paths that
 * touch the visible window are kept (~1/5 of the 2135), so each animation step re-records and re-dashes a fraction of the geometry.
 * The window is generous (x 50-95 %, y 35-100 % of the frame) so every layout from phone to wide desktop stays covered.
 * Own compositor layer (will-change): its stepped repaint must not re-raster the photo + the two static road SVGs under it.
 * Animates only while on screen; the source file is the one RoadsFlow already fetches (same URL, cached).
 */
const W = 3840;
const H = 2160;
const WINDOW = { x0: 0.5 * W, x1: 0.95 * W, y0: 0.35 * H, y1: H };

let cropPromise: Promise<string> | null = null;
function loadCrop(): Promise<string> {
  cropPromise ??= fetch("/media/roads-flow.svg")
    .then((r) => (r.ok ? r.text() : Promise.reject(new Error(String(r.status)))))
    .then((t) => {
      const d = /<path[^>]*\sd="([^"]+)"/.exec(t)?.[1];
      if (!d) throw new Error("no path");
      return d
        .split(/(?=M)/)
        .filter((sub) => {
          const n = sub.match(/-?\d+(?:\.\d+)?/g);
          if (!n) return false;
          let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
          for (let i = 0; i + 1 < n.length; i += 2) {
            const x = +n[i], y = +n[i + 1];
            if (x < x0) x0 = x;
            if (x > x1) x1 = x;
            if (y < y0) y0 = y;
            if (y > y1) y1 = y;
          }
          return x1 >= WINDOW.x0 && x0 <= WINDOW.x1 && y1 >= WINDOW.y0 && y0 <= WINDOW.y1;
        })
        .join(" ");
    })
    .catch((e) => {
      cropPromise = null;
      throw e;
    });
  return cropPromise;
}

export function CropFlow() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [d, setD] = useState<string | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let cancelled = false;
    let loaded = false;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !loaded) {
          loaded = true;
          loadCrop()
            .then((p) => !cancelled && setD(p))
            .catch(() => {});
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
  }, []);

  return (
    <div ref={hostRef} className="net-flow net-layer pointer-events-none absolute inset-0 opacity-70 [will-change:transform]" aria-hidden="true">
      {d && (
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full">
          <path d={d} fill="none" stroke="#FFFFFF" strokeWidth="3.4" strokeLinecap="round" strokeDasharray="14 190" />
        </svg>
      )}
    </div>
  );
}
