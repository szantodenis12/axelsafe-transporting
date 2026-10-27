import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ParallaxLayer } from "@/components/ui/Parallax";
import { Rail } from "@/components/ui/Rail";
import { MobileEyebrow } from "@/components/ui/MobileEyebrow";

type Card = { title: string; text: string; href: string; image: string; alt: string };

export function ServicesPreview({
  t,
  cards,
  cardCta,
}: {
  t: { eyebrow: string; title: string; text: string };
  cards: Card[];
  cardCta: string;
}) {
  return (
    <section className="section-y relative band-soft">
      <div className="wrap">
        <div className="grid-12 gap-y-8">
          <Reveal className="col-span-12 lg:col-span-8" data-speed="0.05">
            <MobileEyebrow>{t.eyebrow}</MobileEyebrow>
            <h2 className="t-h2 max-w-[17ch]">{t.title}</h2>
          </Reveal>
          <Reveal className="col-span-12 md:col-span-8 lg:col-span-5 lg:col-start-8" delay={120} data-speed="0.02">
            <p className="t-lead">{t.text}</p>
          </Reveal>
        </div>

        <Rail className="m-block mt-16 grid grid-cols-1 gap-5 md:mt-14 md:grid-cols-3 md:gap-6">
          {cards.map((card, i) => (
            <Reveal as="li" key={card.title} delay={i * 110} data-speed={[0.02, 0.1, 0.06][i]} className={i === 1 ? "md:mt-12" : i === 2 ? "md:mt-10" : ""}>
              <Link
                href={card.href}
                className="group relative block overflow-hidden rounded-[22px] border border-line bg-surface transition-colors duration-500 hover:border-line-strong"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  {/* the photo drifts against the card inside its mask: the layer carries the scroll transform, the <Image> keeps its hover transition */}
                  <ParallaxLayer feather="none" amount={7} zoom={0.04}>
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      quality={80}
                      sizes="(min-width: 768px) 32vw, 100vw"
                      className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.045]"
                    />
                  </ParallaxLayer>
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,11,22,0.2)_0%,rgba(6,11,22,0.05)_28%,rgba(6,11,22,0.55)_52%,rgba(6,11,22,0.93)_72%,rgba(6,11,22,0.98)_100%)]" />
                  <span className="t-label absolute left-6 top-6 !text-ink">{String(i + 1).padStart(2, "0")}</span>
                  <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                    <h3 className="t-h3">{card.title}</h3>
                    <p className="t-small mt-3 max-w-[34ch]">{card.text}</p>
                    <span className="mt-6 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink">
                      {cardCta}
                      <ArrowUpRight
                        size={16}
                        strokeWidth={1.6}
                        className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </Rail>
      </div>
    </section>
  );
}
