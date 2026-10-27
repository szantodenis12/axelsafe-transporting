/**
 * Official AXEL wordmark — vector rebuilt from the client's logo file (22.10.2026):
 * open Λ, X with a split brand-blue stroke, E as three free bars, L.
 * Sublines are live text ("SAFE TRANSPORTING SRL" / "LOGISTICS & TRANSPORT").
 */
const BRAND_BLUE = "#3570C8"; // client blue #2159A6, lifted for contrast on near-black navy

export function AxelWordmark({ className = "", title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 961 196"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <g fill="currentColor">
        <polygon points="0,196 39,196 133,34 225,196 264,196 152,0 114,0" />
        <polygon points="296,0 339,0 510,196 468,196" />
        <rect x="571" y="0" width="175" height="27" />
        <rect x="571" y="84.5" width="175" height="27" />
        <rect x="571" y="169" width="175" height="27" />
        <polygon points="803,0 835,0 835,169 961,169 961,196 803,196" />
      </g>
      <g fill={BRAND_BLUE}>
        <polygon points="471,0 510,0 440,81 420,58" />
        <polygon points="298,196 340,196 388,140 368,117" />
      </g>
    </svg>
  );
}

/** Square X glyph for compact placements (favicon, avatar). */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="290 -10 230 216" className={className} aria-hidden="true">
      <polygon points="296,0 339,0 510,196 468,196" fill="currentColor" />
      <polygon points="471,0 510,0 440,81 420,58" fill={BRAND_BLUE} />
      <polygon points="298,196 340,196 388,140 368,117" fill={BRAND_BLUE} />
    </svg>
  );
}

/** Header / footer lockup. `size="lg"` adds the blue rule + tagline, as on the official logo. */
export function Logo({ compact = false, size = "sm" }: { compact?: boolean; size?: "sm" | "lg" }) {
  if (size === "lg") {
    return (
      <span className="inline-flex w-[260px] flex-col items-stretch text-ink">
        <AxelWordmark className="h-auto w-full" />
        <span className="mt-3 flex justify-between text-[0.8rem] font-medium tracking-[0.02em]">
          {"SAFE TRANSPORTING SRL".split("").map((c, i) => (
            <span key={i}>{c === " " ? " " : c}</span>
          ))}
        </span>
        <span className="mx-auto mt-3 h-px w-1/3" style={{ background: BRAND_BLUE }} />
        <span className="mt-3 text-center text-[0.62rem] tracking-[0.42em] text-ink-2">LOGISTICS &amp; TRANSPORT</span>
      </span>
    );
  }
  return (
    <span className="inline-flex flex-col text-ink" style={{ width: compact ? 92 : 128 }}>
      <AxelWordmark className="h-auto w-full" />
      {!compact && (
        <span className="mt-[7px] flex justify-between text-[0.5rem] font-medium leading-none text-ink-2">
          {"SAFE TRANSPORTING".split("").map((c, i) => (
            <span key={i}>{c === " " ? " " : c}</span>
          ))}
        </span>
      )}
    </span>
  );
}
