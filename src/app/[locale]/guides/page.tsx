import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/pages/PageHero";
import { breadcrumbJsonLd } from "@/components/pages/breadcrumbs";
import { Rail } from "@/components/ui/Rail";
import { Reveal } from "@/components/ui/Reveal";
import { getGuides, guideIds } from "@/content/guides";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { guideHref } from "@/lib/routes";
import { JsonLd, pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/guides">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  return pageMetadata(locale, "guides", getDictionary(locale).meta.guides);
}

export default async function GuidesIndexPage({ params }: PageProps<"/[locale]/guides">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const g = getGuides(locale);
  const name = dict.footer.exploreItems.find((i) => i.key === "guides")?.label ?? "Guides";

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(locale, [{ key: "guides", name }])} />

      <PageHero pageName={name} titleLines={g.index.titleLines} text={g.index.text} glow />

      <section className="section-y-sm pt-0">
        <div className="wrap">
          <Rail className="m-block grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
            {guideIds.map((id, i) => {
              const a = g.articles[id];
              return (
                <Reveal as="li" key={id} delay={i * 100} data-speed={[0.02, 0.08, 0.05][i % 3]} className="card-glow m-card flex min-h-[320px] flex-col">
                  <Link href={guideHref(locale, id)} className="group flex flex-1 flex-col justify-between p-7 lg:p-8">
                    <span className="t-label">{String(i + 1).padStart(2, "0")}</span>
                    <span className="block pt-12 max-md:pt-8">
                      <h2 className="t-h3 transition-colors group-hover:text-accent">{a.title}</h2>
                      <p className="t-small mt-3">{a.description}</p>
                      <span className="link-arrow mt-6 min-h-11">
                        {g.index.read}
                        <ArrowUpRight size={16} strokeWidth={1.6} aria-hidden />
                      </span>
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </Rail>
        </div>
      </section>
    </>
  );
}
