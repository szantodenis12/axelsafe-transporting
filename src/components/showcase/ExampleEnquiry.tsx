"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Check, Truck } from "lucide-react";
import { Pill } from "@/components/ui/Pill";
import { EarthFrame } from "@/components/home/EarthFrame";
import overlay from "@/content/generated/hero-overlay.json";
import { CropFlow } from "./CropFlow";

type Props = {
  t: {
    label: string;
    route: { from: string; to: string; distance: string };
    fields: { cargo: string; trailer: string; dates: string };
    cargo: string;
    trailer: string;
    dates: string;
    steps: readonly string[];
  };
  originLabel: string;
  cta: { href: string; label: string };
};

const city = (n: string) => overlay.cities.find((c) => c.name === n)!;
/** Illustrative corridor along real motorway cities (frame %), drawn on the registered Earth render. */
const ROUTE = ["Reghin", "Budapest", "Vienna", "Munich"].map(city);
const routeD = ROUTE.map((c, i) => `${i ? "L" : "M"}${c.x} ${c.y}`).join(" ");

const DAY = 86_400_000;
const dd = (d: Date) => `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}`;
const noopSubscribe = () => () => {};

/** Next working day on or after `d` (Sat/Sun -> Monday). */
function workday(d: Date) {
  const out = new Date(d);
  while (out.getDay() === 0 || out.getDay() === 6) out.setDate(out.getDate() + 1);
  return out;
}

/** Example dates relative to today: loading = first working day at least 3 days out, delivery = loading + 2 days (weekend -> Monday). */
function exampleDates(now = new Date()) {
  const base = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const load = workday(new Date(base.getTime() + 3 * DAY));
  const drop = workday(new Date(load.getFullYear(), load.getMonth(), load.getDate() + 2));
  return `${dd(load)} → ${dd(drop)}`;
}

/** Client-only value: the static (server-rendered) text is the fallback, so hydration never mismatches. */
function useExampleDates(fallback: string) {
  return useSyncExternalStore(noopSubscribe, () => exampleDates(), () => fallback);
}

/**
 * Route board: map panel (crop of the hero Earth + road network, same coordinates) + one example
 * enquiry moving through the four steps. Clearly labelled as an example — not a tracking product.
 */
export function ExampleEnquiry({ t, originLabel, cta }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  const dates = useExampleDates(t.dates);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setOn(true), io.disconnect()), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="card-glow grid overflow-hidden lg:grid-cols-12" data-on={on || undefined}>
      {/* map */}
      {/* The panel shows a ~1/9 crop of the Earth frame. EarthFrame's own RoadsFlow strokes the WHOLE 79 KB corridor path (2135
          sub-paths) on every animation step and re-dashes it per raster tile; here a cropped copy (CropFlow) does the same job for the
          visible window only, so the original is hidden and the labels are lifted above the replacement.
          will-change: the three vector layers (minor / major roads + flow) cost 30-130 ms of GPU raster when the card is promoted by the
          parallax wrapper as it scrolls in; a permanent own layer lets the compositor rasterise it ahead of time, while it is still off screen. */}
      <div className="relative min-h-[300px] max-md:min-h-[190px] overflow-hidden border-b border-line lg:col-span-7 lg:min-h-[520px] lg:border-r lg:border-b-0 [will-change:transform] [&_[data-net-flow]]:hidden [&_[data-net-labels]]:z-[2]">
        <EarthFrame
          originLabel={originLabel}
          revealed
          style={{ width: "300%", left: "-171%", top: "-118%" }}
        >
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
            <path d={routeD} fill="none" stroke="#3570C8" strokeOpacity="0.45" strokeWidth="7" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" />
            <path d={routeD} fill="none" stroke="#B7D4F7" strokeWidth="2.2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" className="route-line" />
          </svg>
          <CropFlow />
          <span
            className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-accent bg-bg shadow-[0_0_16px_4px_rgba(53,112,200,0.6)]"
            style={{ left: `${ROUTE[3].x}%`, top: `${ROUTE[3].y}%` }}
          />
        </EarthFrame>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_60%_50%,transparent_55%,rgba(6,11,22,0.75))]" />
        <span className="absolute left-5 top-5 rounded-full border border-line-strong bg-bg/70 px-3 py-1 font-mono text-[0.6875rem] tracking-[0.12em] text-ink-2 uppercase backdrop-blur">
          {t.label}
        </span>
        <span className="absolute bottom-5 right-5 rounded-full border border-line-strong bg-bg/70 px-3 py-1 font-mono text-[0.75rem] text-ink backdrop-blur">
          {t.route.distance}
        </span>
      </div>

      {/* details */}
      <div className="flex flex-col p-5 md:p-8 lg:col-span-5">
        <div className="flex items-center gap-4">
          <span className="block h-2.5 w-2.5 shrink-0 rounded-full bg-ink shadow-[0_0_12px_3px_rgba(183,212,247,0.5)]" />
          <div className="relative h-px flex-1 bg-[repeating-linear-gradient(90deg,rgba(190,210,235,0.35)_0_6px,transparent_6px_12px)]">
            <span className="enquiry-truck absolute top-1/2 -translate-y-1/2 text-accent">
              <Truck size={18} strokeWidth={1.5} aria-hidden />
            </span>
          </div>
          <span className="block h-2.5 w-2.5 shrink-0 rounded-full border border-accent bg-bg" />
        </div>
        <div className="mt-3 flex justify-between text-[1.125rem] text-ink">
          <span>{t.route.from}</span>
          <span>{t.route.to}</span>
        </div>

        <dl className="mt-5 grid grid-cols-3 gap-4 border-y border-line py-4 md:mt-7 md:py-5">
          {(
            [
              [t.fields.cargo, t.cargo],
              [t.fields.trailer, t.trailer],
              [t.fields.dates, dates],
            ] as const
          ).map(([k, v]) => (
            <div key={k} className="min-w-0">
              <dt className="t-label !text-ink-3">{k}</dt>
              <dd className="mt-1.5 text-[0.875rem] leading-snug text-ink">{v}</dd>
            </div>
          ))}
        </dl>

        <ol className="mt-5 space-y-3 md:mt-6 md:space-y-3.5">
          {t.steps.map((s, i) => (
            <li key={s} className="enquiry-step flex items-center gap-3" style={{ transitionDelay: `${400 + i * 450}ms` }}>
              <span className="enquiry-dot grid h-6 w-6 place-items-center rounded-full border border-line-strong">
                <Check size={13} strokeWidth={2} aria-hidden />
              </span>
              <span className="text-[0.9375rem]">{s}</span>
            </li>
          ))}
        </ol>

        <div className="mt-auto pt-6 md:pt-8">
          <Pill href={cta.href} variant="ghost">
            {cta.label}
          </Pill>
        </div>
      </div>
    </div>
  );
}
