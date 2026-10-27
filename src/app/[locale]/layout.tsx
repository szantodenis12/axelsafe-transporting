import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { AmbientBackground } from "@/components/layout/AmbientBackground";
import { ParallaxController } from "@/components/layout/ParallaxController";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { PlaceholderBadge } from "@/components/dev/PlaceholderBadge";
import { getDictionary, hasLocale, localeLabels, locales, plannedLocales } from "@/lib/i18n";
import { href, anchors, type RouteKey } from "@/lib/routes";
import { isPreview, siteUrl } from "@/lib/site";
import { listPlaceholders } from "@/content/companyData";

const geist = Geist({ subsets: ["latin", "latin-ext"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin", "latin-ext"], variable: "--font-geist-mono", display: "swap" });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "AXEL SAFE TRANSPORTING",
  robots: isPreview ? { index: false, follow: false } : { index: true, follow: true },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "48x48" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#060B16",
  colorScheme: "dark",
  viewportFit: "cover", // notched phones: the site then owns the safe-area insets (see .wrap in globals.css)
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const t = getDictionary(locale);

  const navItems = t.nav.items.map((i) => ({ href: href(locale, i.key as RouteKey), label: i.label }));

  return (
    <html lang={locale} className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <AmbientBackground />
        <SmoothScroll />
        <ParallaxController />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
        >
          {t.common.skip}
        </a>
        <SiteHeader
          homeHref={href(locale, "home")}
          items={navItems}
          cta={{ href: href(locale, "contact", anchors.quote), label: t.nav.cta }}
          labels={{ menu: t.nav.menu, close: t.nav.close, language: t.common.language }}
          locale={locale}
          languages={plannedLocales.map((code) => ({
            code,
            label: localeLabels[code],
            available: (locales as readonly string[]).includes(code),
          }))}
        />
        <main id="main">{children}</main>
        <SiteFooter locale={locale} t={t.footer} />
        {isPreview && <PlaceholderBadge items={listPlaceholders()} />}
      </body>
    </html>
  );
}
