import { factL } from "@/content/facts";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HeroStage } from "@/components/home/HeroStage";
import { ApproachSection } from "@/components/home/ApproachSection";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { CarrierBand } from "@/components/home/CarrierBand";
import { FinalCta } from "@/components/sections/FinalCta";
import { FaqSection } from "@/components/sections/FaqSection";
import { EquipmentSection } from "@/components/showcase/EquipmentSection";
import { ExampleEnquiry } from "@/components/showcase/ExampleEnquiry";
import { Ph } from "@/components/ui/Ph";

import { getDictionary, hasLocale } from "@/lib/i18n";
import { anchors, href } from "@/lib/routes";
import { JsonLd, organizationJsonLd, pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  return pageMetadata(locale, "home", getDictionary(locale).meta.home);
}

const serviceImages = [
  { image: "/media/motorway-blue-hour.jpg", alt: "Unbranded curtainsider truck on a European motorway at blue hour." },
  { image: "/media/terminal-docks.jpg", alt: "Semi-trailers backed into the loading docks of a logistics terminal at dusk." },
  { image: "/media/yard-overhead.jpg", alt: "Aerial view of rows of semi-trailers in a truck yard at night." },
];

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.home;
  const stats = factL("stats", locale);
  const coverage = factL("coverage", locale);
  const equipment = factL("transportTypes", locale);

  return (
    <>
      <JsonLd data={organizationJsonLd()} />

      <HeroStage
        hero={{
          ...t.hero,
          primary: { href: href(locale, "contact", anchors.quote), label: t.hero.primary },
          secondary: { href: href(locale, "services"), label: t.hero.secondary },
        }}
        intro={{ ...t.intro, cta: { href: href(locale, "howWeWork"), label: t.intro.cta } }}
        originLabel={t.network.origin}
        networkPanel={
          <div className="rounded-[20px] border border-line-strong bg-bg/85 p-6 md:p-7">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5 md:gap-x-12">
              <div>
                <dt className="t-label md:whitespace-nowrap !text-ink-3">{t.network.coverageLabel}</dt>
                <dd className="mt-2 text-[1.0625rem] leading-snug text-ink md:whitespace-nowrap">{coverage.join(", ")}</dd>
              </div>
              <div>
                <dt className="t-label md:whitespace-nowrap !text-ink-3">{t.network.equipmentLabel}</dt>
                <dd className="mt-2 text-[1.0625rem] leading-snug text-ink md:whitespace-nowrap">
                  {equipment.map((e) => e.short).join(" · ")}
                </dd>
              </div>
              <div>
                <dt className="t-label md:whitespace-nowrap !text-ink-3">{t.network.baseLabel}</dt>
                <dd className="mt-2 text-[1.0625rem] leading-snug text-ink md:whitespace-nowrap">{t.network.baseValue}</dd>
              </div>
              <Ph k="stats" as="div">
                <dt className="t-label md:whitespace-nowrap !text-ink-3">{stats[0].label}</dt>
                <dd className="mt-1 text-[1.75rem] leading-none font-light tracking-[-0.03em] text-ink">{stats[0].value}</dd>
              </Ph>
            </dl>
            <p className="mt-6 border-t border-line pt-4 text-[0.75rem] leading-relaxed text-ink-3 lg:whitespace-nowrap">{t.network.caption}</p>
          </div>
        }
      />

      {/* .home-rise: on the cinematic hero this slides up over the pinned scene (see globals.css) */}
      <div className="home-rise">
        <ApproachSection t={t.approach} cta={{ href: href(locale, "services"), label: t.approach.cta }} watermark={dict.showcase.watermark} />
      </div>

      <ServicesPreview
        t={t.services}
        cardCta={t.services.cardCta}
        cards={t.services.cards.map((c, i) => ({
          title: c.title,
          text: c.text,
          href: href(locale, "services", c.anchor),
          ...serviceImages[i],
        }))}
      />

      <EquipmentSection t={dict.showcase.equipment} locale={locale} />

      <ProcessTimeline
        t={t.process}
        cta={{ href: href(locale, "howWeWork"), label: t.process.cta }}
        aside={
          <ExampleEnquiry
            t={dict.showcase.enquiry}
            originLabel={t.network.origin}
            cta={{ href: href(locale, "howWeWork"), label: t.process.cta }}
          />
        }
      />

      <CarrierBand t={t.carriers} cta={{ href: href(locale, "forCarriers"), label: t.carriers.cta }} />

      <FaqSection title={dict.faq.title} items={dict.faq.shippers} cta={{ href: href(locale, "contact", anchors.quote), label: dict.nav.cta }} />

      <FinalCta
        eyebrow={t.finalCta.eyebrow}
        titleLines={t.finalCta.titleLines}
        text={t.finalCta.text}
        primary={{ href: href(locale, "contact", anchors.quote), label: t.finalCta.primary }}
        secondary={{ href: href(locale, "contact"), label: t.finalCta.secondary }}
      />
    </>
  );
}
