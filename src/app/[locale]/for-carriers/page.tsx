import { factL } from "@/content/facts";
import { FaqSection } from "@/components/sections/FaqSection";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/pages/PageHero";
import { SectionHead } from "@/components/pages/SectionHead";
import { HairlineList } from "@/components/pages/HairlineList";
import { breadcrumbJsonLd } from "@/components/pages/breadcrumbs";
import { CarrierForm } from "@/components/forms/CarrierForm";
import { Reveal } from "@/components/ui/Reveal";
import { Ph } from "@/components/ui/Ph";
import { Rail } from "@/components/ui/Rail";
import { fact } from "@/content/companyData";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { anchors, href } from "@/lib/routes";
import { JsonLd, pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/for-carriers">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  return pageMetadata(locale, "forCarriers", getDictionary(locale).meta.forCarriers);
}

export default async function ForCarriersPage({ params }: PageProps<"/[locale]/for-carriers">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.forCarriers;
  const verification = factL("carrierVerification", locale);
  const conditions = factL("carrierConditions", locale);
  const carrierEmail = fact("carrierEmail");

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(locale, [{ key: "forCarriers", name: dict.nav.items[4].label }])} />

      <PageHero
        eyebrow={t.hero.eyebrow}
        pageName={dict.footer.exploreItems[4].label}
        titleLines={t.hero.titleLines}
        paragraphs={t.hero.paragraphs}
        primary={{ href: href(locale, "forCarriers", anchors.carrierForm), label: t.hero.cta }}
        image={{
          src: "/media/trailer-detail.jpg",
          alt: "Rain-soaked curtainsider trailer with tensioned straps, lit by the lamps of a depot at night.",
          position: "object-[62%_center]",
        }}
      />

      {/* 01 — Working together */}
      <section className="section-y">
        <div className="wrap grid-12 gap-y-10">
          <SectionHead eyebrow={t.intro.eyebrow} title={t.intro.title} className="col-span-12 lg:col-span-8" titleClassName="t-h2 max-w-[16ch]" />
          <Reveal delay={120} data-speed="0.03" className="col-span-12 md:col-span-8 md:col-start-5 lg:col-span-5 lg:col-start-7">
            <div className="space-y-5">
              {t.intro.paragraphs.map((p, i) => (
                <p key={p} className={i === 0 ? "text-[1.1875rem] leading-snug tracking-[-0.012em] text-ink" : "t-body"}>
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 02 — Four steps as full-width numbered rows */}
      <section className="section-y band-soft">
        <div className="wrap">
          <SectionHead eyebrow={t.process.eyebrow} title={t.process.title} titleClassName="t-h2 max-w-[15ch]" />
          <ol className="m-block mt-14 border-t border-line md:mt-12">
            {t.process.steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 80} className="grid-12 items-baseline gap-y-3 border-b border-line py-8 max-md:gap-y-2 max-md:py-5 md:py-10">
                <span
                  aria-hidden
                  className="col-span-12 text-[clamp(2rem,3.4vw,3rem)] leading-none font-light tracking-[-0.04em] text-ink-3/70 tabular-nums md:col-span-2"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="t-h3 col-span-12 md:col-span-4">{s.title}</h3>
                <p className="t-body col-span-12 max-w-[44ch] md:col-span-6 md:col-start-7">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 03 — What we ask for [PLACEHOLDER data] */}
      <section className="section-y">
        <div className="wrap grid-12 gap-y-10">
          <div className="col-span-12 lg:col-span-5">
            <SectionHead eyebrow={t.extras.requirementsEyebrow} title={t.extras.requirementsTitle} titleClassName="t-h2 max-w-[11ch]" />
          </div>
          <Reveal delay={120} data-speed="0.04" className="col-span-12 lg:col-span-6 lg:col-start-7">
            <Ph k="carrierVerification">
              <HairlineList items={verification} rowClassName="py-5" />
            </Ph>
          </Reveal>
        </div>
      </section>

      {/* 04 — How we cooperate [PLACEHOLDER data] */}
      <section className="section-y-sm">
        <div className="wrap">
          <SectionHead eyebrow={t.extras.conditionsEyebrow} title={t.extras.conditionsTitle} titleClassName="t-h2 max-w-[14ch]" />
          <Ph k="carrierConditions" as="div" className="m-block mt-14 block md:mt-14">
            <Rail className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
            {conditions.map((c, i) => (
              <Reveal as="li" key={c.title} delay={i * 100} data-speed={[0.02, 0.08, 0.05][i]} className="card-glow m-card flex min-h-[240px] flex-col justify-between p-7 lg:p-8">
                <span className="t-label">{String(i + 1).padStart(2, "0")}</span>
                <div className="pt-12 max-md:pt-8">
                  <h3 className="t-h3">{c.title}</h3>
                  <p className="t-small mt-3">{c.text}</p>
                </div>
              </Reveal>
            ))}
            </Rail>
          </Ph>
        </div>
      </section>

      {/* Enquiry */}
      <FaqSection
        id="carrier-faq"
        title={dict.faq.title}
        items={dict.faq.carriers}
        cta={{ href: href(locale, "forCarriers", anchors.carrierForm), label: t.hero.cta }}
      />

      <section id={anchors.carrierForm} className="section-y band-soft scroll-mt-[var(--header-h)]">
        <div className="wrap grid-12 gap-y-12">
          <div className="col-span-12 lg:col-span-4">
            <Reveal className="lg:sticky lg:top-[calc(var(--header-h)+48px)]">
              <h2 className="t-h2 max-w-[12ch]">{t.enquiry.title}</h2>
              <p className="t-lead mt-7 max-w-[32ch]">{t.enquiry.text}</p>
              <p className="t-small mt-8 border-t border-line pt-6 max-w-[34ch]">
                <Ph k="carrierEmail">
                  <a href={`mailto:${carrierEmail}`} className="break-words text-ink transition-colors hover:text-accent max-md:inline-flex max-md:min-h-[44px] max-md:items-center">
                    {carrierEmail}
                  </a>
                </Ph>
              </p>
            </Reveal>
          </div>
          <Reveal variant="fade" delay={120} className="col-span-12 lg:col-span-7 lg:col-start-6">
            <div className="rounded-[22px] border border-line bg-surface/40 p-6 md:p-10">
              <CarrierForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
