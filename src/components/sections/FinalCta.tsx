import { Reveal } from "@/components/ui/Reveal";
import { Pill } from "@/components/ui/Pill";
import { EarthBackdrop } from "@/components/sections/EarthBackdrop";

/** Closing call to action over the Earth-curvature image. Reused on every page. */
export function FinalCta({
  titleLines,
  text,
  primary,
  secondary,
}: {
  eyebrow?: string;
  titleLines: readonly string[];
  text: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="final-cta relative isolate overflow-hidden">
      <EarthBackdrop />
      <div className="wrap flex min-h-[70svh] flex-col items-center justify-center pb-[34svh] pt-24 text-center max-md:min-h-0 max-md:pb-[24svh] max-md:pt-14 md:py-24">
        <Reveal className="flex flex-col items-center" data-speed="0.1">
          <h2 className="t-h1 max-w-[18ch]">
            {titleLines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </h2>
          <p className="t-lead mt-5 max-w-[44ch] md:mt-7">{text}</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 md:mt-10">
            <Pill href={primary.href}>{primary.label}</Pill>
            {secondary && (
              <Pill href={secondary.href} variant="ghost" arrow="diag">
                {secondary.label}
              </Pill>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
