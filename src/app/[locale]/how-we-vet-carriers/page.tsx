import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/pages/PageHero";
import { RoleDiagram } from "@/components/pages/RoleDiagram";
import { SectionHead } from "@/components/pages/SectionHead";
import { breadcrumbJsonLd } from "@/components/pages/breadcrumbs";
import { FinalCta } from "@/components/sections/FinalCta";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "@/components/ui/Pill";
import { Ph } from "@/components/ui/Ph";
import { factL } from "@/content/facts";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { anchors, guideHref, href } from "@/lib/routes";
import { JsonLd, pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/how-we-vet-carriers">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  return pageMetadata(locale, "vetting", getDictionary(locale).meta.vetting);
}

/** For shippers: what we check before an independent carrier gets a load. */
export default async function VettingPage({ params }: PageProps<"/[locale]/how-we-vet-carriers">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.vetting;
  const checks = factL("carrierVerification", locale);
  const name = dict.footer.exploreItems.find((i) => i.key === "vetting")?.label ?? t.hero.titleLines[0];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(locale, [{ key: "vetting", name }])} />

      <PageHero
        eyebrow={t.hero.eyebrow}
        pageName={name}
        titleLines={t.hero.titleLines}
        text={t.hero.text}
        primary={{ href: href(locale, "contact", anchors.quote), label: t.finalCta.cta }}
        image={{
          src: "/media/equipment-curtainsider.jpg",
          alt: "White curtainsider truck parked on a wet, floodlit yard at dusk.",
          position: "object-[64%_center]",
        }}
      />

      {/* 01 — Why the check matters */}
      <section className="section-y">
        <div className="wrap grid-12 gap-y-10">
          <SectionHead title={t.why.title} className="col-span-12 lg:col-span-6" titleClassName="t-h2 max-w-[13ch]" />
          <Reveal delay={120} data-speed="0.03" className="col-span-12 md:col-span-9 md:col-start-4 lg:col-span-5 lg:col-start-8">
            <p className="t-lead !text-ink">{t.why.paragraphs[0]}</p>
            <div className="mt-8 space-y-5 border-t border-line pt-8">
              {t.why.paragraphs.slice(1).map((p) => (
                <p key={p} className="t-body">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 02 — The four checks (titles = verified fact, notes = explanation) */}
      <section className="section-y band-soft">
        <div className="wrap">
          <SectionHead title={t.checks.title} titleClassName="t-h2 max-w-[16ch]" />
          <Ph k="carrierVerification" as="ol" className="m-block mt-14 block border-t border-line md:mt-12">
            {checks.map((c, i) => (
              <Reveal as="li" key={c} delay={i * 80} className="grid-12 items-baseline gap-y-3 border-b border-line py-8 max-md:gap-y-2 max-md:py-5 md:py-10">
                <span
                  aria-hidden
                  className="col-span-12 text-[clamp(2rem,3.4vw,3rem)] leading-none font-light tracking-[-0.04em] text-ink-3/70 tabular-nums md:col-span-2"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="t-h3 col-span-12 md:col-span-4">{c}</h3>
                <p className="t-body col-span-12 max-w-[48ch] md:col-span-6 md:col-start-7">{t.checks.notes[i]}</p>
              </Reveal>
            ))}
          </Ph>
        </div>
      </section>

      {/* 03 — Who does what */}
      <section className="section-y">
        <div className="wrap">
          <div className="grid-12 gap-y-10">
            <SectionHead title={t.roles.title} className="col-span-12 lg:col-span-6" titleClassName="t-h2 max-w-[12ch]" />
            <Reveal delay={120} data-speed="0.03" className="col-span-12 md:col-span-9 md:col-start-4 lg:col-span-5 lg:col-start-8">
              <div className="space-y-5">
                {t.roles.paragraphs.map((p, i) => (
                  <p key={p} className={i === 1 ? "t-body !text-ink" : "t-body"}>
                    {p}
                  </p>
                ))}
              </div>
              <ArrowLink href={guideHref(locale, "roles")} className="mt-8">
                {t.roles.guideLink}
              </ArrowLink>
            </Reveal>
          </div>
          <div className="m-block mt-16 border-y border-line py-6 md:mt-14 md:py-14">
            <RoleDiagram labels={dict.howWeWork.model.diagram} notes={dict.howWeWork.model.diagramNotes} />
          </div>
        </div>
      </section>

      <FinalCta
        titleLines={[t.finalCta.title]}
        text={t.finalCta.text}
        primary={{ href: href(locale, "contact", anchors.quote), label: t.finalCta.cta }}
      />
    </>
  );
}
