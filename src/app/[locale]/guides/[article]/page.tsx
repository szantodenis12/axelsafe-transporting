import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/pages/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { breadcrumbJsonLd } from "@/components/pages/breadcrumbs";
import { FinalCta } from "@/components/sections/FinalCta";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getGuides, guideIds, guideSlugs, type GuideId } from "@/content/guides";
import { getDictionary, hasLocale, locales, type Locale } from "@/lib/i18n";
import { anchors, guideHref, href } from "@/lib/routes";
import { JsonLd, articleJsonLd, metadataForPaths } from "@/lib/seo";

/**
 * Blocking on purpose: the whole page depends on the slug, and every valid slug is prerendered
 * (generateStaticParams). Streaming it behind <Suspense> would turn unknown slugs into soft 404s.
 */
export const instant = false;

/** Article slugs are localised: each locale only prerenders its own slugs. */
export async function generateStaticParams({ params }: { params: { locale: string } }) {
  const locale = (hasLocale(params.locale) ? params.locale : "en") as Locale;
  return guideIds.map((id) => ({ article: guideSlugs[id][locale] }));
}

function findGuide(locale: Locale, slug: string): GuideId | undefined {
  return guideIds.find((id) => guideSlugs[id][locale] === slug);
}

const anchorId = (i: number) => `section-${i + 1}`;

export async function generateMetadata({ params }: PageProps<"/[locale]/guides/[article]">): Promise<Metadata> {
  const { locale, article } = await params;
  if (!hasLocale(locale)) return {};
  const id = findGuide(locale, article);
  if (!id) return {};
  const a = getGuides(locale).articles[id];
  const paths = Object.fromEntries(locales.map((l) => [l, guideHref(l, id)])) as Record<Locale, string>;
  return metadataForPaths(locale, paths, { title: `${a.title} | AXEL SAFE TRANSPORTING`, description: a.description }, undefined, "article");
}

export default async function GuidePage({ params }: PageProps<"/[locale]/guides/[article]">) {
  const { locale, article } = await params;
  if (!hasLocale(locale)) notFound();
  const id = findGuide(locale, article);
  if (!id) notFound();
  const dict = getDictionary(locale);
  const g = getGuides(locale);
  const a = g.articles[id];
  const path = guideHref(locale, id);
  const guidesName = dict.footer.exploreItems.find((i) => i.key === "guides")?.label ?? "Guides";
  const [y, m, d] = g.published.split("-");

  return (
    <>
      <JsonLd data={articleJsonLd({ title: a.title, description: a.description, path, locale, published: g.published })} />
      <JsonLd data={breadcrumbJsonLd(locale, [{ key: "guides", name: guidesName }, { path, name: a.title }])} />

      <article>
        <PageHero pageName={guidesName} titleLines={[a.title]} text={a.lead} glow>
          <p className="t-label mt-7 !text-ink-3">
            {g.ui.updated} <time dateTime={g.published}>{`${d}.${m}.${y}`}</time>
          </p>
        </PageHero>

        <div className="section-y-sm pt-0">
          <div className="wrap grid-12 gap-y-10">
            <nav aria-label={g.ui.contents} className="col-span-12 lg:col-span-3">
              <div className="lg:sticky lg:top-[calc(var(--header-h)+32px)]">
                <Link href={href(locale, "guides")} className="link-arrow min-h-11">
                  <ArrowLeft size={16} strokeWidth={1.6} aria-hidden />
                  {g.ui.allGuides}
                </Link>
                <p className="t-label mt-8 !text-ink-3">{g.ui.contents}</p>
                <ol className="mt-3 space-y-1">
                  {a.sections.map((s, i) => (
                    <li key={s.heading}>
                      <a href={`#${anchorId(i)}`} className="t-small flex min-h-11 items-center !text-ink-2 transition-colors hover:!text-ink">
                        {s.heading}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </nav>

            <div className="col-span-12 lg:col-span-8 lg:col-start-5">
              {a.sections.map((s, i) => (
                <Reveal as="section" key={s.heading} id={anchorId(i)} className="scroll-mt-[calc(var(--header-h)+24px)] py-8 first:pt-0 md:py-10">
                  <h2 className="t-h3 max-w-[30ch]">{s.heading}</h2>
                  <div className="mt-5 max-w-[64ch] space-y-5 md:mt-6">
                    {s.body.map((b, j) =>
                      typeof b === "string" ? (
                        <p key={j} className="t-body">
                          {b}
                        </p>
                      ) : (
                        <ul key={j} className="space-y-2.5">
                          {b.list.map((li) => (
                            <li key={li} className="flex items-baseline gap-4">
                              <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-accent/70" />
                              <span className="t-body !text-ink">{li}</span>
                            </li>
                          ))}
                        </ul>
                      ),
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </article>

      <FinalCta
        titleLines={[a.cta.title]}
        text={a.cta.text}
        primary={{ href: href(locale, "contact", anchors.quote), label: a.cta.label }}
      />
    </>
  );
}
