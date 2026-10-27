import { factL } from "@/content/facts";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/pages/PageHero";
import { breadcrumbJsonLd } from "@/components/pages/breadcrumbs";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { Reveal } from "@/components/ui/Reveal";
import { Pill } from "@/components/ui/Pill";
import { Ph } from "@/components/ui/Ph";
import { fact } from "@/content/companyData";
import { getDictionary, hasLocale } from "@/lib/i18n";
import { anchors, href } from "@/lib/routes";
import { JsonLd, pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  return pageMetadata(locale, "contact", getDictionary(locale).meta.contact);
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const t = dict.contact;
  const email = fact("email");
  const phone = fact("phone");
  const transportEmail = fact("transportEmail");
  const transportPhone = fact("transportPhone");
  const hours = factL("businessHours", locale);
  const responseTime = factL("responseTime", locale);

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(locale, [{ key: "contact", name: dict.footer.exploreItems[5].label }])} />

      <PageHero eyebrow={t.hero.eyebrow} pageName={dict.footer.exploreItems[5].label} titleLines={[t.hero.title]} text={t.hero.text} glow />

      <section className="pb-[clamp(96px,12vw,180px)] pt-[clamp(64px,8vw,112px)] max-md:pb-14 max-md:pt-10">
        <div className="wrap grid-12 gap-y-14">
          {/* Quote form */}
          <div id={anchors.quote} className="col-span-12 scroll-mt-[calc(var(--header-h)+24px)] lg:col-span-7">
            <Reveal>
              <h2 className="t-h2 max-w-[14ch]">{t.quote.title}</h2>
              <p className="t-lead mt-4 max-w-[42ch] md:mt-6">{t.quote.text}</p>
            </Reveal>
            <Reveal variant="fade" delay={120} className="mt-6 md:mt-12">
              <QuoteForm />
            </Reveal>
          </div>

          {/* Direct contact — sticky on desktop */}
          <aside className="col-span-12 lg:col-span-4 lg:col-start-9">
            <div className="flex flex-col gap-5 lg:sticky lg:top-[calc(var(--header-h)+40px)]">
              <Reveal delay={160} className="card-glow m-card p-7 lg:p-8">
                <h2 className="t-h3">{t.direct.title}</h2>

                <dl className="mt-5 border-t border-line md:mt-7">
                  <ContactGroup
                    heading="Office"
                    emailLabel={t.direct.labels.email}
                    phoneLabel={t.direct.labels.phone}
                    email={email}
                    phone={phone}
                    emailKey="email"
                    phoneKey="phone"
                  />
                  <ContactGroup
                    heading="Transport desk"
                    emailLabel={t.direct.labels.email}
                    phoneLabel={t.direct.labels.phone}
                    email={transportEmail}
                    phone={transportPhone}
                    emailKey="transportEmail"
                    phoneKey="transportPhone"
                  />
                  <div className="grid gap-y-1 border-b border-line py-4">
                    <dt className="t-label !text-ink-3">{t.direct.labels.location}</dt>
                    <dd className="text-ink">{t.direct.location}</dd>
                  </div>
                  <div className="grid gap-y-1 border-b border-line py-4">
                    <dt className="t-label !text-ink-3">{t.direct.labels.hours}</dt>
                    <dd className="text-ink">
                      <Ph k="businessHours">{hours}</Ph>
                    </dd>
                  </div>
                </dl>
                <p className="t-small mt-5 flex gap-3 !text-ink-3">
                  <span aria-hidden className="mt-[0.75em] h-px w-4 shrink-0 bg-accent/70" />
                  <Ph k="responseTime">We usually reply {responseTime}.</Ph>
                </p>
              </Reveal>

              <Reveal delay={240} className="m-card rounded-[20px] border border-line bg-bg-2/60 p-7 lg:p-8">
                <h3 className="t-h3 max-w-[18ch]">{t.carriers.title}</h3>
                <p className="t-small mt-3 max-w-[32ch]">{t.carriers.text}</p>
                <div className="mt-6">
                  <Pill href={href(locale, "forCarriers", anchors.carrierForm)} variant="ghost" size="sm" arrow="diag">
                    {t.carriers.cta}
                  </Pill>
                </div>
              </Reveal>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function ContactGroup({
  heading,
  emailLabel,
  phoneLabel,
  email,
  phone,
  emailKey,
  phoneKey,
}: {
  heading: string;
  emailLabel: string;
  phoneLabel: string;
  email: string;
  phone: { display: string; href: string };
  emailKey: "email" | "transportEmail";
  phoneKey: "phone" | "transportPhone";
}) {
  return (
    <div className="border-b border-line py-4">
      <p className="t-label mb-3 !text-accent/90">{heading}</p>
      <div className="grid gap-y-3 max-md:gap-y-1">
        <div className="grid gap-y-0.5">
          <dt className="t-label !text-ink-3 max-md:sr-only">{emailLabel}</dt>
          <dd>
            <Ph k={emailKey}>
              <a href={`mailto:${email}`} className="break-words text-ink transition-colors hover:text-accent max-md:inline-flex max-md:min-h-[44px] max-md:items-center">
                {email}
              </a>
            </Ph>
          </dd>
        </div>
        <div className="grid gap-y-0.5">
          <dt className="t-label !text-ink-3 max-md:sr-only">{phoneLabel}</dt>
          <dd>
            <Ph k={phoneKey}>
              <a href={phone.href} className="whitespace-nowrap text-ink transition-colors hover:text-accent max-md:inline-flex max-md:min-h-[44px] max-md:items-center">
                {phone.display}
              </a>
            </Ph>
          </dd>
        </div>
      </div>
    </div>
  );
}
