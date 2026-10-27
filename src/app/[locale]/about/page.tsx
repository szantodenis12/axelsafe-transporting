import { factL } from "@/content/facts";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/pages/PageHero";
import { SectionHead } from "@/components/pages/SectionHead";
import { breadcrumbJsonLd } from "@/components/pages/breadcrumbs";
import { FinalCta } from "@/components/sections/FinalCta";
import { Reveal } from "@/components/ui/Reveal";
import { MobileEyebrow } from "@/components/ui/MobileEyebrow";
import { fact } from "@/content/companyData";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { href } from "@/lib/routes";
import { JsonLd, pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  return pageMetadata(locale, "about", getDictionary(locale).meta.about);
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.about;
  const office = factL("registeredOffice", locale);
  const domain = fact("domain");

  const details: { label: string; value: React.ReactNode }[] = [
    { label: t.details.labels.legalName, value: fact("legalName") },
    { label: t.details.labels.established, value: String(fact("established")) },
    {
      label: t.details.labels.office,
      value: (
        <>
          {office.street}
          <br />
          {office.postalCode} {office.city}, {office.county}, {office.country}
        </>
      ),
    },
    { label: t.details.labels.registration, value: fact("registrationNumber") },
    { label: t.details.labels.vat, value: fact("vatNumber") },
    { label: t.details.labels.activity, value: factL("caen", locale) },
    {
      label: t.details.labels.website,
      value: (
        <a href={fact("siteUrl")} className="link-arrow !p-0 !text-[inherit] !font-normal max-md:!py-3">
          {domain}
        </a>
      ),
    },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(locale, [{ key: "about", name: dict.nav.items[3].label }])} />

      <PageHero
        eyebrow={t.hero.eyebrow}
        pageName={dict.footer.exploreItems[3].label}
        titleLines={t.hero.titleLines}
        text={t.hero.text}
        image={{
          src: "/media/yard-overhead.jpg",
          alt: "Overhead night view of semi-trailers parked in ordered rows at a truck yard.",
          position: "object-[55%_40%]",
        }}
      />

      {/* 01 — Who we are: large editorial, first paragraph as lead */}
      <section className="section-y">
        <div className="wrap grid-12 gap-y-12">
          <SectionHead eyebrow={t.intro.eyebrow} title={t.intro.title} className="col-span-12 lg:col-span-6" titleClassName="t-h2 max-w-[13ch]" />
          <Reveal delay={120} data-speed="0.03" className="col-span-12 md:col-span-9 md:col-start-4 lg:col-span-5 lg:col-start-8">
            <p className="t-lead !text-ink">{t.intro.paragraphs[0]}</p>
            <div className="mt-6 space-y-4 border-t border-line pt-6 md:mt-8 md:space-y-5 md:pt-8">
              {t.intro.paragraphs.slice(1).map((p) => (
                <p key={p} className="t-body">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 02 — Philosophy: 2×2 hairline grid */}
      <section className="section-y band-soft">
        <div className="wrap">
          <SectionHead eyebrow={t.philosophy.eyebrow} title={t.philosophy.title} titleClassName="t-h2 max-w-[20ch]" />
          <ol className="m-block mt-14 grid grid-cols-1 border-t border-line sm:grid-cols-2 md:mt-12">
            {t.philosophy.items.map((item, i) => (
              <Reveal
                data-speed={i % 2 ? 0.08 : 0.03}
                as="li"
                key={item.title}
                delay={(i % 2) * 120}
                className={`flex min-h-[260px] flex-col border-b border-line py-8 max-md:min-h-0 max-md:py-5 sm:min-h-[300px] ${
                  i % 2 === 0 ? "sm:border-r sm:pr-10 lg:pr-16" : "sm:pl-10 lg:pl-16"
                }`}
              >
                <span className="t-label !text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                <div className="pt-10 max-md:pt-3 sm:pt-24">
                  <h3 className="text-[clamp(1.625rem,2.4vw,2.25rem)] leading-[1.1] font-light tracking-[-0.025em] max-md:text-[1.375rem]">{item.title}</h3>
                  <p className="t-body mt-3 max-w-[40ch] md:mt-4">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 03 — Company details: definition table */}
      <section className="section-y">
        <div className="wrap grid-12 gap-y-10">
          <Reveal className="col-span-12 lg:col-span-10">
            <MobileEyebrow>{t.details.eyebrow}</MobileEyebrow>
            <dl className="border-t border-line">
              {details.map((row) => (
                <div key={row.label} className="grid gap-y-1.5 border-b border-line py-5 max-md:grid-cols-[7rem_1fr] max-md:gap-x-4 max-md:py-3 md:grid-cols-[minmax(0,16rem)_1fr] md:gap-x-8 md:py-6">
                  <dt className="t-label !text-ink-3">{row.label}</dt>
                  <dd className="min-w-0 break-words text-[1.0625rem] leading-relaxed text-ink max-md:text-[0.9375rem] md:text-[1.125rem]">{row.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <FinalCta
        titleLines={[t.finalCta.title]}
        text={t.finalCta.text}
        primary={{ href: href(locale, "contact"), label: t.finalCta.cta }}
      />
    </>
  );
}
