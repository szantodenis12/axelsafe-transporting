import { factL } from "@/content/facts";
import Link from "next/link";
import { ArrowUp, Mail, Phone } from "lucide-react";
import { FooterYear } from "@/components/layout/FooterYear";
import { AxelWordmark, Logo } from "@/components/ui/Logo";
import { Ph } from "@/components/ui/Ph";
import { Pill } from "@/components/ui/Pill";
import { SocialIcons } from "@/components/ui/SocialIcons";
import { companyData, fact } from "@/content/companyData";
import type { Dictionary } from "@/content/copy/en";
import { anchors, href, type RouteKey } from "@/lib/routes";
import type { Locale } from "@/lib/i18n";

/** Year the site was built — server/hydration fallback; the browser then shows the current year. */
const BUILD_YEAR = 2026;

/**
 * Page navy, alpha 0 -> 1 as a smoothstep over the first 14rem (pages with a closing CTA continue the second half of the same curve, see .site-footer in globals.css) (no tone step: same navy as <html>, never the lighter bg-2), so the
 * Earth of the closing CTA sinks into the footer instead of meeting a straight edge.
 */
const TOP_FADE =
  "linear-gradient(180deg,rgba(6,11,22,0.000) 0.00rem,rgba(6,11,22,0.020) 1.17rem,rgba(6,11,22,0.074) 2.33rem,rgba(6,11,22,0.156) 3.50rem,rgba(6,11,22,0.259) 4.67rem,rgba(6,11,22,0.376) 5.83rem,rgba(6,11,22,0.500) 7.00rem,rgba(6,11,22,0.624) 8.17rem,rgba(6,11,22,0.741) 9.33rem,rgba(6,11,22,0.844) 10.50rem,rgba(6,11,22,0.926) 11.67rem,rgba(6,11,22,0.980) 12.83rem,rgba(6,11,22,1.000) 14.00rem)";

const linkCls =
  "inline-block py-3 text-[0.9375rem] md:pointer-fine:py-1.5 leading-snug text-ink-2 underline decoration-transparent decoration-1 underline-offset-[5px] transition-[color,text-decoration-color] duration-300 hover:text-ink hover:decoration-line-strong focus-visible:text-ink";

/** Mobile footer link: a 44 px tap row. */
const mLinkCls =
  "flex min-h-[44px] items-center py-2 text-[0.9375rem] leading-snug text-ink-2 transition-colors hover:text-ink focus-visible:text-ink";

/** Site footer — statement + CTA band, brand/company block, link columns, direct contacts, outlined wordmark. */
export function SiteFooter({ locale, t }: { locale: Locale; t: Dictionary["footer"] }) {
  const office = factL("registeredOffice", locale);
  const caen = factL("caen", locale);

  const contacts = [
    {
      label: t.labels.office,
      emailKey: "email",
      email: fact("email"),
      phoneKey: "phone",
      phone: fact("phone"),
    },
    {
      label: t.labels.dispatch,
      emailKey: "transportEmail",
      email: fact("transportEmail"),
      phoneKey: "transportPhone",
      phone: fact("transportPhone"),
    },
  ] as const;

  return (
    <footer className="site-footer relative isolate overflow-hidden" style={{ backgroundImage: TOP_FADE }}>
      <div className="wrap pt-24 max-md:hidden md:pt-36">
        {/* ───── Statement + CTA ───── */}
        <div className="grid-12 items-end gap-y-10">
          <p className="col-span-12 max-w-[22ch] text-balance text-[clamp(1.75rem,3.6vw,3.25rem)] font-light leading-[1.12] tracking-[-0.03em] text-ink lg:col-span-8">
            {t.statement}
          </p>
          <div className="col-span-12 flex lg:col-span-4 lg:justify-end">
            <Pill href={href(locale, "contact", anchors.quote)}>{t.cta}</Pill>
          </div>
        </div>

        <div className="mt-16 h-px bg-[linear-gradient(90deg,var(--color-line-strong),var(--color-line)_55%,transparent)] md:mt-24" />

        {/* ───── Brand / company + navigation + contacts ───── */}
        <div className="grid-12 gap-y-16 pt-14 md:pt-20">
          <div className="col-span-12 lg:col-span-4">
            <Link href={href(locale, "home")} aria-label="AXEL SAFE TRANSPORTING" className="inline-block">
              <Logo size="lg" />
            </Link>

            <p className="mt-10 text-[0.9375rem] font-medium text-ink">{companyData.legalName.value}</p>
            <dl className="mt-4 grid max-w-[34rem] grid-cols-[auto_1fr] gap-x-6 gap-y-2.5 text-[0.875rem] leading-snug">
              <dt className="t-label !text-ink-3">{t.labels.registeredOffice}</dt>
              <dd className="text-ink-2">
                {office.street}, {office.postalCode} {office.city}, {office.county}, {office.country}
              </dd>
              <dt className="t-label !text-ink-3">{t.labels.regNo}</dt>
              <dd className="text-ink-2">{fact("registrationNumber")}</dd>
              <dt className="t-label !text-ink-3">{t.labels.vat}</dt>
              <dd className="text-ink-2">{fact("vatNumber")}</dd>
              <dt className="t-label !text-ink-3">{t.labels.activity}</dt>
              <dd className="text-ink-2">{caen}</dd>
            </dl>

            <p className="t-label mt-10">{t.social}</p>
            <SocialIcons className="mt-4" />
          </div>

          <div className="col-span-12 lg:col-span-8">
            <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3">
              <nav aria-label={t.nav}>
                <p className="t-label">{t.explore}</p>
                <ul className="mt-4">
                  {t.exploreItems.map((i) => (
                    <li key={i.key}>
                      <Link href={href(locale, i.key as RouteKey)} className={linkCls}>
                        {i.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <nav aria-label={t.services}>
                <p className="t-label">{t.services}</p>
                <ul className="mt-4">
                  {t.servicesItems.map((i) => (
                    <li key={i.id}>
                      <Link href={href(locale, "services", i.id)} className={linkCls}>
                        {i.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <nav aria-label={t.legalNav} className="col-span-2 sm:col-span-1">
                <p className="t-label">{t.legal}</p>
                <ul className="mt-4">
                  {t.legalItems.map((i) => (
                    <li key={i.key}>
                      <Link href={href(locale, i.key as RouteKey)} className={linkCls}>
                        {i.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {contacts.map((c) => (
                <div key={c.label} className="bg-bg-2 p-6 md:p-8 md:max-lg:p-6">
                  <p className="t-label">{c.label}</p>
                  <ul className="mt-5 space-y-1">
                    <li>
                      <Ph k={c.emailKey}>
                        <a
                          href={`mailto:${c.email}`}
                          className="inline-block break-all py-2.5 text-[1.0625rem] md:max-lg:text-[0.9375rem] md:pointer-fine:py-1 leading-snug text-ink underline decoration-line-strong decoration-1 underline-offset-[6px] transition-[text-decoration-color] duration-300 hover:decoration-accent focus-visible:decoration-accent"
                        >
                          {c.email}
                        </a>
                      </Ph>
                    </li>
                    <li>
                      <Ph k={c.phoneKey}>
                        <a
                          href={c.phone.href}
                          className="inline-block whitespace-nowrap py-2.5 text-[1.0625rem] md:pointer-fine:py-1 leading-snug text-ink-2 transition-colors duration-300 hover:text-ink focus-visible:text-ink"
                        >
                          {c.phone.display}
                        </a>
                      </Ph>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ───── Bottom bar ───── */}
        <div className="mt-20 h-px bg-line md:mt-28" />
        <div className="flex flex-col gap-4 py-6 font-mono text-[0.6875rem] leading-relaxed tracking-[0.04em] text-ink-3 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <FooterYear fallback={BUILD_YEAR} /> {t.rights}
          </p>
          <p>
            {t.credit}{" "}
            <a
              href="https://epicdigitalhub.ro"
              target="_blank"
              rel="noopener"
              className="text-ink-2 underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink"
            >
              Epic Digital Hub
            </a>
          </p>
          <a
            href="#main"
            className="inline-flex items-center gap-2 self-start py-3 text-ink-2 md:pointer-fine:py-1 transition-colors hover:text-ink sm:self-auto"
          >
            {t.labels.backToTop}
            <ArrowUp size={14} strokeWidth={1.6} aria-hidden />
          </a>
        </div>

        {/* ───── Outlined wordmark (cropped at the baseline, gentle parallax) ───── */}
        <div aria-hidden className="pointer-events-none relative mt-6 aspect-[961/118] select-none overflow-hidden">
          <div data-speed="0.05">
            <AxelWordmark className="block h-auto w-full [&_*]:fill-transparent [&_*]:stroke-[rgba(183,212,247,0.14)] [&_*]:stroke-1 [&_*]:[vector-effect:non-scaling-stroke] [&_g:last-child_*]:stroke-[rgba(53,112,200,0.34)]" />
          </div>
        </div>
      </div>

      {/* ═════ Mobile footer (< 768 px): compact + scannable — statement/CTA, two contact rows, 2-column nav, one small legal block,
          slim bottom bar. The desktop footer above is untouched (max-md:hidden); this one is md:hidden. See docs/MOBILE.md. ═════ */}
      <div className="wrap pb-3 pt-16 md:hidden">
        <p className="max-w-[22ch] text-balance text-[1.5rem] font-light leading-[1.18] tracking-[-0.025em] text-ink">{t.statement}</p>
        <div className="mt-5">
          <Pill href={href(locale, "contact", anchors.quote)}>{t.cta}</Pill>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-bg-2">
          {contacts.map((c) => (
            <div key={c.label} className="border-b border-line px-4 py-2.5 last:border-b-0">
              <p className="t-label !text-ink-3">{c.label}</p>
              <ul>
                <li>
                  <Ph k={c.emailKey} as="div">
                    <a href={`mailto:${c.email}`} className="flex min-h-[44px] items-center gap-3 break-all text-[0.9375rem] leading-snug text-ink">
                      <Mail size={16} strokeWidth={1.6} className="shrink-0 text-accent" aria-hidden />
                      {c.email}
                    </a>
                  </Ph>
                </li>
                <li>
                  <Ph k={c.phoneKey} as="div">
                    <a href={c.phone.href} className="flex min-h-[44px] items-center gap-3 whitespace-nowrap text-[0.9375rem] leading-snug text-ink-2">
                      <Phone size={16} strokeWidth={1.6} className="shrink-0 text-accent" aria-hidden />
                      {c.phone.display}
                    </a>
                  </Ph>
                </li>
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-5">
          <nav aria-label={t.nav}>
            <p className="t-label">{t.explore}</p>
            <ul className="mt-1">
              {t.exploreItems.map((i) => (
                <li key={i.key}>
                  <Link href={href(locale, i.key as RouteKey)} className={mLinkCls}>
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label={t.services}>
            <p className="t-label">{t.services}</p>
            <ul className="mt-1">
              {t.servicesItems.map((i) => (
                <li key={i.id}>
                  <Link href={href(locale, "services", i.id)} className={mLinkCls}>
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <nav aria-label={t.legalNav} className="mt-2 flex flex-wrap gap-x-5 border-t border-line">
          {t.legalItems.map((i) => (
            <Link key={i.key} href={href(locale, i.key as RouteKey)} className={mLinkCls}>
              {i.label}
            </Link>
          ))}
        </nav>

        <div className="mt-5 border-t border-line pt-5">
          <Link href={href(locale, "home")} aria-label="AXEL SAFE TRANSPORTING" className="inline-block">
            <Logo />
          </Link>
          <p className="mt-3 text-[0.8125rem] font-medium text-ink-2">{companyData.legalName.value}</p>
          <dl className="mt-1.5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[0.75rem] leading-[1.5]">
            <dt className="t-label !text-[0.625rem] !text-ink-3">{t.labels.registeredOffice}</dt>
            <dd className="text-ink-3">
              {office.street}, {office.postalCode} {office.city}, {office.county}, {office.country}
            </dd>
            <dt className="t-label !text-[0.625rem] !text-ink-3">{t.labels.regNo}</dt>
            <dd className="text-ink-3">{fact("registrationNumber")}</dd>
            <dt className="t-label !text-[0.625rem] !text-ink-3">{t.labels.vat}</dt>
            <dd className="text-ink-3">{fact("vatNumber")}</dd>
            <dt className="t-label !text-[0.625rem] !text-ink-3">{t.labels.activity}</dt>
            <dd className="text-ink-3">{caen}</dd>
          </dl>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-3">
          <SocialIcons />
          <a
            href="#main"
            className="inline-flex min-h-[44px] items-center gap-2 font-mono text-[0.6875rem] tracking-[0.04em] text-ink-2 transition-colors hover:text-ink"
          >
            {t.labels.backToTop}
            <ArrowUp size={14} strokeWidth={1.6} aria-hidden />
          </a>
        </div>
        <p className="pt-1 font-mono text-[0.625rem] leading-relaxed tracking-[0.04em] text-ink-3">
          © <FooterYear fallback={BUILD_YEAR} /> {t.rights}
        </p>
        <p className="pb-2 font-mono text-[0.625rem] leading-relaxed tracking-[0.04em] text-ink-3">
          {t.credit}{" "}
          <a
            href="https://epicdigitalhub.ro"
            target="_blank"
            rel="noopener"
            className="inline-flex min-h-[44px] items-center text-ink-2 underline decoration-line-strong underline-offset-4"
          >
            Epic Digital Hub
          </a>
        </p>
      </div>
    </footer>
  );
}
