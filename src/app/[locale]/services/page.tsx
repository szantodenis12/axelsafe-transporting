import { factL } from "@/content/facts";
import { EquipmentSection } from "@/components/showcase/EquipmentSection";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/pages/PageHero";
import { SplitSection } from "@/components/pages/SplitSection";
import { SectionHead } from "@/components/pages/SectionHead";
import { HairlineList } from "@/components/pages/HairlineList";
import { breadcrumbJsonLd } from "@/components/pages/breadcrumbs";
import { FinalCta } from "@/components/sections/FinalCta";
import { Reveal } from "@/components/ui/Reveal";
import { Pill } from "@/components/ui/Pill";
import { Ph } from "@/components/ui/Ph";
import { Rail } from "@/components/ui/Rail";
import { fact } from "@/content/companyData";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { anchors, href, type RouteKey } from "@/lib/routes";
import { JsonLd, pageMetadata, servicesJsonLd } from "@/lib/seo";
import { siteUrl } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/[locale]/services">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  return pageMetadata(locale, "services", getDictionary(locale).meta.services);
}

const coreImages = [
  {
    src: "/media/motorway-blue-hour.jpg",
    alt: "Unbranded curtainsider truck travelling along a European motorway at blue hour.",
    position: "object-[60%_center]",
  },
  {
    src: "/media/trailer-detail.jpg",
    alt: "Close-up of tensioned curtain straps on a semi-trailer parked at a depot in the rain.",
    position: "object-[30%_center]",
  },
  {
    src: "/media/viaduct-dawn.jpg",
    alt: "A single articulated truck crossing a motorway viaduct above a misty valley at dawn.",
    position: "object-[50%_60%]",
  },
];

const equipmentImages = [
  { src: "/media/equipment-curtainsider.jpg", alt: "Curtainsider semi-trailer with its side curtain open at a loading bay." },
  { src: "/media/equipment-reefer.jpg", alt: "Refrigerated semi-trailer with a front-mounted cooling unit, parked at night." },
  { src: "/media/equipment-mega.jpg", alt: "Mega trailer with low chassis and increased internal height at a logistics yard." },
];

export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.services;
  const types = factL("transportTypes", locale);
  const industries = fact("industries");

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(locale, [{ key: "services", name: dict.nav.items[1].label }])} />
      <JsonLd data={servicesJsonLd(dict.home.services.cards, `${siteUrl}${href(locale, "services")}`)} />

      <PageHero
        eyebrow={t.hero.eyebrow}
        pageName={dict.footer.exploreItems[1].label}
        titleLines={t.hero.titleLines}
        text={t.hero.text}
        primary={{ href: href(locale, "contact", anchors.quote), label: t.hero.cta }}
        image={{
          src: "/media/interchange-night.jpg",
          alt: "Aerial long exposure of a motorway interchange at night, light trails crossing on several levels.",
          position: "object-[62%_45%]",
        }}
      />

      {/* 01 — Intro: quiet editorial type */}
      <section className="section-y">
        <div className="wrap grid-12 gap-y-10">
          <SectionHead plainEyebrow eyebrow={t.intro.eyebrow} title={t.intro.title} className="col-span-12 lg:col-span-7" titleClassName="t-h2 max-w-[14ch]" />
          <Reveal delay={120} data-speed="0.03" className="col-span-12 md:col-span-9 md:col-start-4 lg:col-span-4 lg:col-start-9 lg:pt-3">
            <div className="space-y-5">
              {t.intro.paragraphs.map((p, i) => (
                <p key={p} className={i === t.intro.paragraphs.length - 1 ? "text-[1.1875rem] leading-snug tracking-[-0.012em] text-ink" : "t-body"}>
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Core services — alternating splits */}
      {t.core.map((s, i) => (
        <SplitSection
          key={s.id}
          id={s.id}
          label={s.label}
          title={s.title}
          paragraphs={s.paragraphs}
          listTitle={s.listTitle}
          list={s.list}
          cta={{
            href: s.ctaTarget === "contact" ? href(locale, "contact", anchors.quote) : href(locale, s.ctaTarget as RouteKey),
            label: s.cta,
            arrow: s.ctaTarget === "contact" ? "right" : "diag",
          }}
          image={coreImages[i]}
          flip={i % 2 === 1}
        />
      ))}

      {/* Requirements */}
      <section className="section-y">
        <div className="wrap grid-12 gap-y-12">
          <div className="col-span-12 lg:col-span-5">
            <SectionHead plainEyebrow eyebrow={t.requirements.eyebrow} title={t.requirements.title} titleClassName="t-h2 max-w-[12ch]" />
            <Reveal delay={100}>
              <p className="t-lead mt-5 max-w-[38ch] md:mt-8">{t.requirements.text}</p>
            </Reveal>
          </div>
          <Reveal delay={160} data-speed="0.04" className="col-span-12 lg:col-span-6 lg:col-start-7">
            <p className="t-label">{t.requirements.listTitle}</p>
            <p className="mt-5 border-t border-line pt-6 text-[clamp(1.25rem,1.8vw,1.625rem)] max-md:text-[1.125rem] max-md:pt-4 leading-[1.4] font-light tracking-[-0.015em] text-ink">
              {t.requirements.list}
            </p>
            <div className="mt-6 flex gap-4 border-t border-line pt-5 md:mt-8 md:pt-6">
              <span aria-hidden className="mt-[0.75em] h-px w-5 shrink-0 bg-accent/80" />
              <p className="t-small max-w-[56ch]">{t.requirements.note}</p>
            </div>
            <div className="mt-7 md:mt-10">
              <Pill href={href(locale, "contact", anchors.quote)}>{t.requirements.cta}</Pill>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Equipment — verified transport types */}
      <section className="section-y band-soft">
        <div className="wrap">
          <div className="grid-12 items-end gap-y-6">
            <SectionHead plainEyebrow eyebrow={t.extras.typesEyebrow} title={t.extras.typesTitle} className="col-span-12 lg:col-span-8" />
          </div>
          <Ph k="transportTypes" as="div" className="m-block mt-14 block md:mt-12">
          <Rail className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-3">
            {types.map((type, i) => (
              <Reveal as="li" key={type.title} delay={i * 100} data-speed={[0.02, 0.08, 0.05][i]} className="group">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[16px] border border-line bg-surface">
                  <Image
                    src={equipmentImages[i].src}
                    alt={equipmentImages[i].alt}
                    fill
                    quality={80}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-[1.4s] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,11,22,0.08)_0%,rgba(6,11,22,0)_40%,rgba(6,11,22,0.5)_100%)]" />
                  <span className="t-label absolute left-5 top-4 !text-ink">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className="mt-6 border-t border-line pt-5">
                  <h3 className="t-h3">{type.title}</h3>
                  <p className="t-small mt-3 max-w-[36ch]">{type.text}</p>
                </div>
              </Reveal>
            ))}
          </Rail>
          </Ph>
        </div>
      </section>

      {/* Sectors — rendered only once the client has a client base to show */}
      {industries.length > 0 && (
        <section className="section-y-sm">
          <div className="wrap grid-12 gap-y-10">
            <SectionHead plainEyebrow eyebrow={t.extras.industriesEyebrow} title={t.extras.industriesTitle} className="col-span-12 lg:col-span-5" />
            <Reveal delay={120} className="col-span-12 lg:col-span-6 lg:col-start-7">
              <Ph k="industries">
                <HairlineList items={industries} numbered={false} rowClassName="py-5" />
              </Ph>
            </Reveal>
          </div>
        </section>
      )}

      <EquipmentSection t={dict.showcase.equipment} locale={locale} />

      <FinalCta
        titleLines={[t.finalCta.title]}
        text={t.finalCta.text}
        primary={{ href: href(locale, "contact"), label: t.finalCta.cta }}
      />
    </>
  );
}
