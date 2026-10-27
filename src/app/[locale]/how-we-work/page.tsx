import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/pages/PageHero";
import { RoleDiagram } from "@/components/pages/RoleDiagram";
import { StickyStages } from "@/components/pages/StickyStages";
import { SectionHead } from "@/components/pages/SectionHead";
import { breadcrumbJsonLd } from "@/components/pages/breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { Pill } from "@/components/ui/Pill";
import { EarthBackdrop } from "@/components/sections/EarthBackdrop";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { anchors, href } from "@/lib/routes";
import { JsonLd, pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/how-we-work">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  return pageMetadata(locale, "howWeWork", getDictionary(locale).meta.howWeWork);
}

/** Splits the first sentence off a paragraph (for the two-cell comparison), without rewording it. */
function splitFirstSentence(p: string): [string, string] {
  const i = p.indexOf(". ");
  return i === -1 ? [p, ""] : [p.slice(0, i + 1), p.slice(i + 2)];
}

export default async function HowWeWorkPage({ params }: PageProps<"/[locale]/how-we-work">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.howWeWork;
  const [fleetSentence, networkSentence] = splitFirstSentence(t.why.paragraphs[0]);
  const whyRest = t.why.paragraphs.slice(1);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(locale, [{ key: "howWeWork", name: dict.nav.items[2].label }])} />

      <PageHero
        eyebrow={t.hero.eyebrow}
        pageName={dict.footer.exploreItems[2].label}
        titleLines={t.hero.titleLines}
        text={t.hero.text}
        image={{
          src: "/media/terminal-docks.jpg",
          alt: "Row of semi-trailers backed into the loading docks of a logistics terminal on a wet evening.",
          position: "object-[50%_42%]",
        }}
      />

      {/* 01 — Our role + diagram */}
      <section className="section-y">
        <div className="wrap">
          <div className="grid-12 gap-y-10">
            <SectionHead eyebrow={t.model.eyebrow} titleLines={t.model.titleLines} className="col-span-12 lg:col-span-7" titleClassName="t-h2 max-w-[16ch]" />
            <Reveal delay={120} data-speed="0.03" className="col-span-12 md:col-span-9 md:col-start-4 lg:col-span-4 lg:col-start-9 lg:pt-3">
              <div className="space-y-5">
                {t.model.paragraphs.map((p) => (
                  <p key={p} className="t-body">
                    {p}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="m-block mt-16 border-y border-line py-6 md:mt-14 md:py-14">
            <RoleDiagram labels={t.model.diagram} notes={t.model.diagramNotes} />
          </div>
        </div>
      </section>

      {/* 02 — Stages, sticky-left */}
      <StickyStages eyebrow={t.stages.eyebrow} title={t.stages.title} items={t.stages.items} />

      {/* 03 — Why the model works: two-column comparison, text only */}
      <section className="section-y band-soft">
        <div className="wrap">
          <SectionHead eyebrow={t.why.eyebrow} title={t.why.title} titleClassName="t-h2 max-w-[18ch]" />

          <div className="m-block mt-14 grid grid-cols-1 border-t border-line md:mt-12 md:grid-cols-2">
            <Reveal data-speed="0.02" className="border-b border-line py-7 md:border-r md:py-14 md:pr-12">
              <span className="t-label !text-ink-3">A</span>
              <p className="mt-4 md:mt-6 max-w-[22ch] text-[clamp(1.5rem,2.4vw,2.25rem)] max-md:text-[1.375rem] leading-[1.18] font-light tracking-[-0.025em] text-ink-2">
                {fleetSentence}
              </p>
            </Reveal>
            <Reveal delay={140} data-speed="0.07" className="border-b border-line py-7 md:py-14 md:pl-12">
              <span className="t-label !text-accent">B</span>
              <p className="mt-4 md:mt-6 max-w-[22ch] text-[clamp(1.5rem,2.4vw,2.25rem)] max-md:text-[1.375rem] leading-[1.18] font-light tracking-[-0.025em] text-ink">
                {networkSentence}
              </p>
            </Reveal>
            {whyRest.map((p, i) => (
              <Reveal key={p} delay={i * 100} className={`border-line py-5 md:py-10 ${i === 0 ? "md:border-r md:pr-12" : "md:pl-12"}`}>
                <p className="t-body max-w-[46ch]">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 04 — Working together: closing band with CTA */}
      <section className="final-cta relative isolate overflow-hidden">
        <EarthBackdrop objectPosition="object-[50%_30%]" />
        <div className="wrap grid-12 min-h-[80svh] content-center gap-y-10 py-32 max-md:min-h-0 max-md:pb-[24svh] max-md:pt-16">
          <SectionHead eyebrow={t.transparency.eyebrow} titleLines={t.transparency.titleLines} className="col-span-12 lg:col-span-6" titleClassName="t-h1 max-w-[12ch]" />
          <Reveal delay={140} data-speed="0.04" className="col-span-12 md:col-span-9 lg:col-span-5 lg:col-start-8 lg:pt-4">
            <div className="space-y-5">
              {t.transparency.paragraphs.map((p) => (
                <p key={p} className="t-lead">
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-7 md:mt-10">
              {/* long label: let it wrap on very narrow screens instead of clipping */}
              <Pill
                href={href(locale, "contact", anchors.quote)}
                className="max-xs:!h-auto max-xs:!whitespace-normal max-xs:!py-2.5 max-xs:[&>span:first-child]:text-left max-xs:[&_.pill-icon]:shrink-0"
              >
                {t.transparency.cta}
              </Pill>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
