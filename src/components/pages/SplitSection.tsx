import Image from "next/image";
import { ParallaxLayer } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { Pill } from "@/components/ui/Pill";
import { HairlineList } from "./HairlineList";
import { MobileEyebrow } from "@/components/ui/MobileEyebrow";

type Props = {
  id: string;
  label: string;
  title: string;
  paragraphs: readonly string[];
  listTitle?: string;
  list?: readonly string[];
  cta: { href: string; label: string; arrow?: "right" | "diag" };
  image: { src: string; alt: string; position?: string };
  /** Image on the right instead of the left. */
  flip?: boolean;
};

/** Alternating image / text section used for the three core services. */
export function SplitSection({ id, label, title, paragraphs, listTitle, list, cta, image, flip = false }: Props) {
  const hasList = Boolean(list && list.length);
  return (
    <section id={id} className="section-y-sm scroll-mt-[var(--header-h)]">
      <div className="wrap">
        <div className="grid-12 items-start gap-y-6 md:gap-y-10">
          <Reveal
            data-speed="0.07"
            variant="fade"
            className={`col-span-12 md:col-span-6 lg:col-span-5 ${flip ? "lg:col-start-8 md:order-2" : ""}`}
          >
            <div className={`m-media-wide relative overflow-hidden rounded-[18px] border border-line ${hasList ? "aspect-[4/5] sm:aspect-[5/4] md:aspect-[4/5]" : "aspect-[4/5] sm:aspect-[5/4] md:aspect-[4/5] lg:aspect-[5/4]"}`}>
              <ParallaxLayer feather="none" amount={12} zoom={0.06}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  quality={80}
                  sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
                  className={`object-cover ${image.position ?? "object-center"}`}
                />
              </ParallaxLayer>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,11,22,0)_55%,rgba(6,11,22,0.45)_100%)]" />
              <span className="t-label absolute left-5 top-5 !text-ink">{label.split("/")[0].trim()}</span>
            </div>
          </Reveal>

          <div className={`col-span-12 md:col-span-6 ${flip ? "lg:col-span-6 lg:col-start-1 md:order-1" : "lg:col-span-6 lg:col-start-7"}`}>
            <Reveal data-speed="0.02">
              <MobileEyebrow plain>{label}</MobileEyebrow>
              <h2 className="t-h2 max-w-[15ch]">{title}</h2>
              <div className="mt-5 max-w-[46ch] space-y-4 md:mt-8 md:space-y-5">
                {paragraphs.map((p) => (
                  <p key={p} className="t-body">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
            {hasList && (
              <Reveal delay={120} className="mt-7 max-w-[52ch] md:mt-10">
                {listTitle && <p className="t-label mb-4">{listTitle}</p>}
                <HairlineList items={list!} />
              </Reveal>
            )}
            <Reveal delay={160} className="mt-7 md:mt-10">
              <Pill href={cta.href} variant="ghost" arrow={cta.arrow ?? "right"}>
                {cta.label}
              </Pill>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
