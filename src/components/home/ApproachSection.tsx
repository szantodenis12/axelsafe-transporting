import { Reveal } from "@/components/ui/Reveal";
import { Pill } from "@/components/ui/Pill";
import { Rail } from "@/components/ui/Rail";
import { MobileEyebrow } from "@/components/ui/MobileEyebrow";

/** Minimal line graphics — one per card, drawn to the same 64×64 grid. */
const glyphs = [
  // Transport Planning — a plotted point on a grid
  <g key="g0">
    <path d="M8 20h48M8 32h48M8 44h48M20 8v48M32 8v48M44 8v48" strokeOpacity=".28" />
    <circle cx="44" cy="20" r="4" />
    <path d="M20 44 L44 20" strokeDasharray="2 3" />
  </g>,
  // Carrier Coordination — two nodes joined through a centre
  <g key="g1">
    <circle cx="12" cy="44" r="4" />
    <circle cx="52" cy="44" r="4" />
    <circle cx="32" cy="18" r="5" />
    <path d="M15 41 L28.5 22 M49 41 L35.5 22" />
    <path d="M16 44h32" strokeOpacity=".3" strokeDasharray="2 3" />
  </g>,
  // Communication — parallel signals
  <g key="g2">
    <path d="M10 22h30M10 32h44M10 42h22" />
    <circle cx="48" cy="22" r="3" />
    <circle cx="40" cy="42" r="3" />
  </g>,
  // Flexible Solutions — one origin, several possible paths
  <g key="g3">
    <circle cx="12" cy="32" r="4" />
    <path d="M16 32 C30 32 32 14 52 14 M16 32 H52 M16 32 C30 32 32 50 52 50" />
    <path d="M52 14v0M52 32v0M52 50v0" strokeWidth="6" strokeLinecap="round" strokeOpacity=".5" />
  </g>,
];

export function ApproachSection({
  t,
  cta,
  watermark,
}: {
  t: { eyebrow: string; titleLines: readonly string[]; text: string; cards: readonly { title: string; text: string }[] };
  cta: { href: string; label: string };
  watermark?: string;
}) {
  return (
    <section className="section-y relative overflow-hidden">
      {watermark && (
        <div aria-hidden className="watermark pointer-events-none absolute -left-[2vw] top-[2%] text-[clamp(7rem,19vw,19rem)]" data-speed="-0.15">
          {watermark}
        </div>
      )}
      <div className="wrap relative">
        <div className="grid-12 items-end gap-y-8">
          <Reveal early className="col-span-12 lg:col-span-7" data-speed="0.05">
            <MobileEyebrow>{t.eyebrow}</MobileEyebrow>
            <h2 className="t-h2">
              {t.titleLines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </h2>
          </Reveal>
          <Reveal early className="col-span-12 lg:col-span-4 lg:col-start-9" delay={80}>
            <p className="t-lead">{t.text}</p>
          </Reveal>
        </div>

        <Rail as="ol" className="m-block mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 md:mt-14 lg:grid-cols-4 lg:gap-5">
          {t.cards.map((card, i) => (
            <Reveal as="li" key={card.title} delay={i * 90} data-speed={[0.03, 0.09, 0.05, 0.11][i]} className="card-glow m-card flex flex-col p-7 lg:p-8">
              <div className="flex h-[180px] items-center justify-center max-md:h-[64px] max-md:justify-start lg:h-[220px]">
                <svg
                  viewBox="0 0 64 64"
                  className="h-28 w-28 text-accent max-md:h-14 max-md:w-14 lg:h-32 lg:w-32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.9"
                  aria-hidden
                >
                  {glyphs[i]}
                </svg>
              </div>
              <div>
                <h3 className="t-h3">{card.title}</h3>
                <p className="t-small mt-4">{card.text}</p>
              </div>
            </Reveal>
          ))}
        </Rail>

        <Reveal className="m-block mt-12 flex md:mt-16">
          <Pill href={cta.href} variant="ghost">
            {cta.label}
          </Pill>
        </Reveal>
      </div>
    </section>
  );
}
