"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Snowflake } from "lucide-react";

type Spec = { length: number; pallets: number; payload: number; height: number; volume: number; temperature: string };
type TypeKey = "curtainsider" | "refrigerated" | "mega";

type Props = {
  types: { key: TypeKey; title: string; text: string }[];
  specs: Record<TypeKey, Spec>;
  t: {
    labels: { length: string; pallets: string; payload: string; height: string; volume: string; temperature: string };
    units: { m: string; t: string; m3: string };
    note: string;
    topView: string;
  };
};

/**
 * Deck geometry measured on each render (percent of the cropped 1980×610 image):
 * where the usable interior starts/ends and where the floor surface is.
 */
const STAGE: Record<TypeKey, { src: string; left: number; right: number; deck: number; top: number; marker: number }> = {
  curtainsider: { src: "/media/truck-side-curtainsider.webp", left: 20.0, right: 86.6, deck: 54.2, top: 12.0, marker: 96.6 },
  refrigerated: { src: "/media/truck-side-refrigerated.webp", left: 23.1, right: 90.6, deck: 55.2, top: 13.3, marker: 96.6 },
  mega: { src: "/media/truck-side-mega.webp", left: 19.5, right: 87.6, deck: 54.9, top: 15.3, marker: 96.6 },
};
const IMG_RATIO = 1980 / 610;
const PALLET_RATIO = 0.726; // width / height of the pallet sprite (1.2 m side × ~1.65 m loaded)
const STACKS = 11; // 33 EUR pallets = 11 rows × 3 across → 11 stacks seen from the side

/* Top-view plan: 13.6 m deck at 60 px/m; EUR pallet 1.2 × 0.8 m */
const PX = 60;
const DECK = { x: 40, y: 20, w: 13.6 * PX, h: 2.45 * PX };
const PALLET = { l: 1.2 * PX, w: 0.8 * PX };
const plan = Array.from({ length: 33 }, (_, i) => ({
  x: DECK.x + 6 + Math.floor(i / 3) * (PALLET.l + 1.6),
  y: DECK.y + 2.5 + (i % 3) * (PALLET.w + 0.9),
}));

const max = { height: 3.0, payload: 24, volume: 100 };

export function TrailerExplorer({ types, specs, t }: Props) {
  const [active, setActive] = useState<TypeKey>(types[0].key);
  const [inView, setInView] = useState(false);
  const [cycle, setCycle] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const spec = specs[active];
  const stage = STAGE[active];
  const current = types.find((x) => x.key === active)!;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setInView(true), io.disconnect()), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const select = (k: TypeKey) => {
    if (k === active) return;
    setActive(k);
    setCycle((c) => c + 1);
  };

  // side-view pallet slots
  const slot = (stage.right - stage.left) / STACKS;
  const pw = slot * 0.95; // pallet width in % of image width
  const ph = ((pw / PALLET_RATIO) * IMG_RATIO); // pallet height in % of image height

  const bars = [
    { label: t.labels.length, value: `${spec.length.toLocaleString("en")} ${t.units.m}`, pct: spec.length / 13.6 },
    { label: t.labels.payload, value: `${spec.payload} ${t.units.t}`, pct: spec.payload / max.payload },
    { label: t.labels.height, value: `${spec.height.toFixed(1)} ${t.units.m}`, pct: spec.height / max.height },
    { label: t.labels.volume, value: `≈ ${spec.volume} ${t.units.m3}`, pct: spec.volume / max.volume },
  ];

  return (
    <div ref={ref} className="card-glow overflow-hidden p-4 md:p-8 lg:p-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="tablist" aria-label="Trailer types" className="flex flex-wrap gap-2">
          {types.map((x) => (
            <button
              key={x.key}
              role="tab"
              aria-selected={x.key === active}
              onClick={() => select(x.key)}
              className={`min-h-[44px] rounded-full border px-4 py-2 text-[0.875rem] md:min-h-0 font-medium transition-colors duration-300 ${
                x.key === active ? "border-transparent bg-ink text-bg" : "border-line-strong text-ink-2 hover:text-ink"
              }`}
            >
              {x.title}
            </button>
          ))}
        </div>
        <span className="t-label !text-ink-3">
          {spec.pallets} {t.labels.pallets} · {spec.length.toLocaleString("en")} {t.units.m}
        </span>
      </div>

      {/* ── side-view stage: the real truck, pallets loading in ── */}
      <div className="relative mt-6 md:mt-8">
        <div className="pointer-events-none absolute inset-x-[6%] -bottom-[4%] h-[16%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(183,212,247,0.14),transparent)]" />
        <div className="relative w-full" style={{ aspectRatio: `${IMG_RATIO}` }}>
          <Image
            key={stage.src}
            src={stage.src}
            alt={current.title}
            fill
            sizes="(min-width: 1440px) 1300px, 92vw"
            className="truck-in object-contain"
          />
          {/* internal-height marker */}
          <div
            className="absolute border-r border-dashed border-accent/40"
            style={{ left: `${stage.marker}%`, top: `${stage.top}%`, height: `${stage.deck - stage.top}%` }}
          >
            <span className="absolute right-2 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[10px] text-accent md:text-[11px]">
              {spec.height.toFixed(1)} {t.units.m}
            </span>
          </div>
          {inView && (
            <div key={`${active}-${cycle}`} className="absolute inset-0">
              {Array.from({ length: STACKS }, (_, i) => {
                const left = stage.left + i * slot + (slot - pw) / 2;
                const style = {
                  left: `${left}%`,
                  width: `${pw}%`,
                  height: `${ph}%`,
                  bottom: `${100 - stage.deck}%`,
                  "--dx": `${((104 - left) / pw) * 100}%`,
                  animationDelay: `${250 + i * 190}ms`,
                } as CSSProperties;
                return (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={i} src="/media/pallet.webp" alt="" className="pallet-load absolute" style={style} draggable={false} />
                );
              })}
              {active === "refrigerated" && <div className="reefer-chill absolute" style={{ left: `${stage.left}%`, right: `${100 - stage.right}%`, top: `${stage.top}%`, bottom: `${100 - stage.deck}%` }} />}
            </div>
          )}
        </div>
      </div>

      {/* ── load plan + specs ── */}
      <div className="mt-6 grid gap-6 border-t border-line pt-6 md:mt-8 md:gap-10 md:pt-8 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-7">
          <div className="flex items-baseline justify-between">
            <h3 className="t-h3">{current.title}</h3>
            <p className="t-label !text-ink-3 max-md:hidden">{t.topView}</p>
          </div>
          <p className="t-small mt-2 max-w-[52ch]">{current.text}</p>
          <svg viewBox="0 0 900 210" className="mt-6 w-full max-md:hidden" role="img" aria-label={`${spec.pallets} ${t.labels.pallets}`}>
            <rect x={DECK.x} y={DECK.y} width={DECK.w} height={DECK.h} rx="6" fill="rgba(6,11,22,0.6)" stroke="rgba(190,210,235,0.45)" strokeWidth="1.5" />
            <g fill="none" stroke="rgba(190,210,235,0.14)" strokeDasharray="3 3">
              {plan.map((p, i) => (
                <rect key={i} x={p.x} y={p.y} width={PALLET.l} height={PALLET.w} rx="4" />
              ))}
            </g>
            {inView && (
              <g key={`${active}-${cycle}`}>
                {plan.map((p, i) => (
                  <rect key={i} x={p.x} y={p.y} width={PALLET.l} height={PALLET.w} rx="4" className="pallet" style={{ animationDelay: `${250 + Math.floor(i / 3) * 190}ms` }} />
                ))}
              </g>
            )}
            <g stroke="rgba(190,210,235,0.35)" strokeWidth="1" fill="rgba(169,184,204,0.85)" fontSize="13" fontFamily="var(--font-geist-mono)">
              <path d={`M${DECK.x} ${DECK.y + DECK.h + 18} H ${DECK.x + DECK.w}`} />
              <path d={`M${DECK.x} ${DECK.y + DECK.h + 12} v12 M${DECK.x + DECK.w} ${DECK.y + DECK.h + 12} v12`} />
              <text x={DECK.x + DECK.w / 2} y={DECK.y + DECK.h + 40} textAnchor="middle" stroke="none">
                {spec.length.toLocaleString("en")} {t.units.m} · {spec.pallets} EUR
              </text>
            </g>
          </svg>
        </div>

        <dl className="space-y-4 max-md:grid max-md:grid-cols-2 max-md:gap-x-5 max-md:gap-y-4 max-md:space-y-0 lg:col-span-4 lg:col-start-9">
          <div className="flex items-baseline justify-between border-b border-line pb-3 max-md:col-span-2">
            <dt className="t-label !text-ink-3">{t.labels.pallets}</dt>
            <dd className="text-[1.75rem] leading-none font-light tracking-[-0.03em]">{spec.pallets}</dd>
          </div>
          {bars.map((b) => (
            <div key={b.label}>
              <div className="flex items-baseline justify-between max-md:flex-col max-md:items-start max-md:gap-0.5">
                <dt className="t-label !text-ink-3">{b.label}</dt>
                <dd className="text-[0.9375rem] text-ink">{b.value}</dd>
              </div>
              <div className="mt-2 h-[3px] overflow-hidden rounded-full bg-line">
                <div
                  className="h-full rounded-full bg-[#3570C8] transition-[width] duration-[1.2s] ease-[var(--ease-out-expo)]"
                  style={{ width: inView ? `${Math.round(b.pct * 100)}%` : "0%" }}
                />
              </div>
            </div>
          ))}
          {spec.temperature && (
            <div className="flex items-center justify-between rounded-xl border border-[#3570C8]/40 bg-[#3570C8]/10 px-4 py-3 max-md:col-span-2">
              <dt className="t-label flex items-center gap-2 !text-accent">
                <Snowflake size={14} strokeWidth={1.6} aria-hidden /> {t.labels.temperature}
              </dt>
              <dd className="text-[0.9375rem] text-ink">{spec.temperature}</dd>
            </div>
          )}
        </dl>
      </div>
      <p className="mt-6 border-t border-line pt-4 text-[0.75rem] leading-relaxed text-ink-3 md:mt-8">{t.note}</p>
    </div>
  );
}
