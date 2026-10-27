import Image from "next/image";
import { ParallaxLayer } from "@/components/ui/Parallax";
import type { CSSProperties, ReactNode } from "react";
import { AxelWordmark } from "@/components/ui/Logo";
import { Pill } from "@/components/ui/Pill";

type Cta = { href: string; label: string };

type Props = {
  eyebrow?: string;
  /** Page name shown under the big logo on the first screen ("About Us", "For Carriers"…). Localised nav label. */
  pageName: string;
  titleLines: readonly string[];
  /** One lead paragraph, or several short ones (for-carriers hero). */
  text?: string;
  paragraphs?: readonly string[];
  primary?: Cta;
  secondary?: Cta;
  /** Photographic background. Omit for the typographic variant. */
  image?: { src: string; alt: string; position?: string };
  /** Extra content rendered under the CTA row (e.g. a hairline meta row). */
  children?: ReactNode;
  /** Typographic variant only: soft accent glow near the bottom, fully faded out before the hero's edge (a glow centred on the edge shows as a hard line). */
  glow?: boolean;
};

const d = (s: number) => ({ "--d": `${s}s` }) as CSSProperties;

/**
 * Inner-page hero in two beats, on one continuous photo:
 *  1. a first screen with nothing but the large AXEL logo + the page name + a scroll cue (CSS fade-in on load, so the
 *     text is there immediately, never waiting for an observer), and
 *  2. the page headline (the only <h1>), lead and CTAs, which the photo dissolves into.
 * The page name is a plain <p>, not a heading: the descriptive headline keeps the h1 role (it carries the page's
 * topic for search and screen readers; the name just repeats the nav label), and heading order stays h1 → h2.
 */
export function PageHero({ pageName, titleLines, text, paragraphs, primary, secondary, image, children, glow }: Props) {
  const photographic = Boolean(image);

  return (
    <section className="page-hero relative isolate overflow-hidden">
      {image && (
        <>
          <ParallaxLayer className="-z-20" feather="bottom" amount={14} zoom={0.08}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              loading="eager"
              fetchPriority="high"
              quality={80}
              sizes="100vw"
              className={`object-cover ${image.position ?? "object-center"}`}
            />
          </ParallaxLayer>
          <div aria-hidden className="page-hero-scrim absolute inset-0 -z-10" />
        </>
      )}
      {!image && glow && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[55%] bg-[radial-gradient(ellipse_70%_45%_at_50%_50%,rgba(183,212,247,0.12)_0%,rgba(183,212,247,0.105)_12%,rgba(183,212,247,0.075)_28%,rgba(183,212,247,0.04)_46%,rgba(183,212,247,0.015)_66%,rgba(183,212,247,0.004)_84%,rgba(183,212,247,0)_100%)]"
        />
      )}

      {/* 1 — first screen: logo + page name */}
      <div
        className={`page-hero-stage relative flex flex-col items-center justify-center px-[var(--gutter)] pb-[clamp(72px,12svh,128px)] pt-[calc(var(--header-h)+24px)] text-center ${
          photographic ? "min-h-[100svh]" : "min-h-[64svh]"
        }`}
      >
        <div className="page-hero-lockup flex flex-col items-center">
          <span
            className="inline-flex flex-col text-ink drop-shadow-[0_2px_28px_rgba(6,11,22,0.55)]"
            style={{ width: "clamp(180px, 28vw, 420px)" }}
          >
            <AxelWordmark className="h-auto w-full" title="AXEL SAFE TRANSPORTING" />
            <span
              aria-hidden
              className="mt-[0.5em] flex justify-between font-medium leading-none text-ink-2"
              style={{ fontSize: "clamp(0.703rem, 1.75vw, 1.64rem)" }} // = 6.25% of the logo width, as in the header lockup
            >
              {"SAFE TRANSPORTING".split("").map((c, i) => (
                <span key={i}>{c === " " ? " " : c}</span>
              ))}
            </span>
          </span>
          <span aria-hidden className="mt-[clamp(28px,4.4vw,52px)] block h-px w-10" style={{ background: "#3570C8" }} />
          <p className="mt-[clamp(18px,2.4vw,28px)] text-[clamp(1.5rem,2.9vw,2.75rem)] font-light leading-[1.05] tracking-[-0.025em] text-ink [text-shadow:0_2px_24px_rgba(6,11,22,0.6)]">
            {pageName}
          </p>
        </div>
        <span aria-hidden className="page-hero-cue absolute bottom-[clamp(20px,4.5svh,44px)] left-1/2 block h-12 w-px -translate-x-1/2" />
      </div>

      {/* 2 — headline, lead, CTAs */}
      <div data-speed="0.08" className="wrap flex flex-col pb-[clamp(44px,7vh,88px)] pt-[clamp(8px,2vw,32px)] max-md:pb-10 max-md:pt-2">
        <h1 className="t-h1 max-w-[18ch]">
          {titleLines.map((line, i) => (
            <span key={line} className="mask-line">
              <span style={d(0.18 + i * 0.12)}>{line}</span>
            </span>
          ))}
        </h1>
        {text && (
          <p className="t-lead fade-up mt-5 max-w-[46ch] md:mt-9" style={d(0.5)}>
            {text}
          </p>
        )}
        {paragraphs && (
          <div className="fade-up mt-5 max-w-[46ch] space-y-3 md:mt-9 md:space-y-4" style={d(0.5)}>
            {paragraphs.map((p) => (
              <p key={p} className="t-lead">
                {p}
              </p>
            ))}
          </div>
        )}
        {(primary || secondary) && (
          <div className="fade-up mt-7 flex flex-wrap items-center gap-3 md:mt-9" style={d(0.62)}>
            {primary && <Pill href={primary.href}>{primary.label}</Pill>}
            {secondary && (
              <Pill href={secondary.href} variant="ghost" arrow="diag">
                {secondary.label}
              </Pill>
            )}
          </div>
        )}
        {children && (
          <div className="fade-up" style={d(0.8)}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
