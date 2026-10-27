import { Factory, Truck } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { AxelWordmark } from "@/components/ui/Logo";

/**
 * Shipper → AXEL SAFE TRANSPORTING → Independent Carrier.
 * Pure CSS: horizontal on md+, vertical below. The connectors draw in once the
 * block scrolls into view (Reveal sets data-in on the wrapper; children respond).
 * The side roles carry an icon, a readable label and a neutral one-line descriptor; the middle box carries the logo.
 */
export function RoleDiagram({
  labels,
  notes,
}: {
  labels: readonly [string, string, string] | readonly string[];
  notes?: readonly string[];
}) {
  const [shipper, hub, carrier] = labels;

  return (
    <Reveal
      data-speed="0.04"
      variant="fade"
      className="group/diag relative flex flex-col items-stretch md:flex-row md:items-center"
      role="img"
      aria-label={labels.join(" → ")}
    >
      <Node label={shipper} note={notes?.[0]} index="A" icon={<Factory size={26} strokeWidth={1.4} aria-hidden />} />
      <Connector delay={250} />
      <Node label={hub} note={notes?.[1]} index="B" highlighted />
      <Connector delay={900} />
      <Node label={carrier} note={notes?.[2]} index="C" icon={<Truck size={26} strokeWidth={1.4} aria-hidden />} />
    </Reveal>
  );
}

function Node({
  label,
  note,
  index,
  icon,
  highlighted = false,
}: {
  label: string;
  note?: string;
  index: string;
  icon?: React.ReactNode;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`relative flex flex-1 flex-col items-center justify-center rounded-[18px] border px-6 py-9 max-md:px-5 max-md:py-6 text-center transition-colors duration-700 md:min-h-[200px] md:px-8 ${
        highlighted
          ? "border-accent/50 bg-[linear-gradient(180deg,rgba(17,27,44,0.9),rgba(11,18,32,0.9))] shadow-[0_0_0_1px_rgba(183,212,247,0.08),0_30px_80px_-30px_rgba(183,212,247,0.35)]"
          : "border-line bg-bg-2/40"
      }`}
    >
      <span className="t-label absolute left-5 top-4 !text-ink-3">{index}</span>
      {highlighted ? (
        <span className="inline-flex w-[min(190px,70%)] flex-col text-ink" aria-hidden>
          <AxelWordmark className="h-auto w-full" />
          <span className="mt-2 flex justify-between text-[0.62rem] font-medium leading-none text-ink-2">
            {"SAFE TRANSPORTING".split("").map((c, i) => (
              <span key={i}>{c === " " ? " " : c}</span>
            ))}
          </span>
        </span>
      ) : (
        <>
          <span className="mb-3 grid h-11 w-11 place-items-center md:mb-4 md:h-14 md:w-14 rounded-full border border-line-strong bg-surface/60 text-accent">{icon}</span>
          <span className="text-[1.25rem] leading-snug tracking-[-0.01em] text-ink md:text-[1.375rem]">{label}</span>
        </>
      )}
      {note && <span className={`mt-3 max-w-[26ch] text-[0.9375rem] leading-snug text-ink-2`}>{note}</span>}
      {highlighted && (
        <span
          aria-hidden
          className="absolute inset-x-[18%] bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(183,212,247,0.7),transparent)]"
        />
      )}
    </div>
  );
}

/** Two thin lines: a solid forward line that draws in, and a faint dashed return line. */
function Connector({ delay }: { delay: number }) {
  return (
    <div
      aria-hidden
      className="relative mx-auto h-10 w-px shrink-0 md:h-16 md:mx-0 md:h-px md:w-[clamp(56px,8vw,140px)]"
      style={{ "--cd": `${delay}ms` } as React.CSSProperties}
    >
      {/* forward line (vertical below md, horizontal above) */}
      <span className="absolute inset-0 bg-line-strong" />
      <span className="absolute inset-0 origin-top scale-y-0 bg-accent transition-transform duration-[900ms] ease-[var(--ease-in-out-quart)] [transition-delay:var(--cd)] group-data-[in=true]/diag:scale-y-100 md:origin-left md:scale-x-0 md:scale-y-100 md:group-data-[in=true]/diag:scale-x-100" />
      {/* arrow head */}
      <span className="absolute left-1/2 -bottom-[3px] h-[7px] w-[7px] -translate-x-1/2 rotate-45 border-b border-r border-accent opacity-0 transition-opacity duration-500 [transition-delay:calc(var(--cd)+800ms)] group-data-[in=true]/diag:opacity-100 md:left-auto md:-right-[3px] md:top-1/2 md:bottom-auto md:-translate-y-1/2 md:translate-x-0 md:-rotate-45" />
      {/* faint return line (information flows back) */}
      <span className="absolute inset-y-0 left-[6px] w-px border-l border-dashed border-line opacity-0 transition-opacity duration-700 [transition-delay:calc(var(--cd)+600ms)] group-data-[in=true]/diag:opacity-100 md:inset-x-0 md:inset-y-auto md:left-0 md:top-[7px] md:h-px md:w-auto md:border-l-0 md:border-t" />
    </div>
  );
}
