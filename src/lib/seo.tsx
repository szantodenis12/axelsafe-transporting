import type { Metadata } from "next";
import { companyData } from "@/content/companyData";
import { hreflang, locales, type Locale } from "./i18n";
import { href, type RouteKey } from "./routes";
import { siteUrl } from "./site";

/** Per-route metadata: unique title/description, self-canonical, hreflang, OG. */
export function pageMetadata(
  locale: Locale,
  key: RouteKey,
  meta: { title: string; description: string },
  image = "/media/og-default.jpg",
): Metadata {
  const path = href(locale, key);
  const languages: Record<string, string> = Object.fromEntries(locales.map((l) => [hreflang[l], href(l, key)]));
  languages["x-default"] = href("en", key);
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: path, languages },
    openGraph: {
      type: "website",
      url: path,
      siteName: companyData.brandName.value,
      title: meta.title,
      description: meta.description,
      locale,
      images: [{ url: image, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description, images: [image] },
  };
}

/**
 * Organization JSON-LD — homepage only. Uses VERIFIED facts only;
 * contact points are added automatically once phone/email are verified in companyData.
 */
export function organizationJsonLd() {
  const o = companyData.registeredOffice.value;
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: companyData.brandName.value,
    legalName: companyData.legalName.value,
    url: siteUrl,
    logo: `${siteUrl}/icon.svg`,
    foundingDate: String(companyData.established.value),
    vatID: companyData.vatNumber.value,
    description: "Road freight coordination through independent carrier partnerships.",
    address: {
      "@type": "PostalAddress",
      streetAddress: o.street,
      addressLocality: o.city,
      addressRegion: o.county,
      postalCode: o.postalCode,
      addressCountry: "RO",
    },
  };
  const points: Record<string, unknown>[] = [];
  if (companyData.phone.status === "verified" && companyData.email.status === "verified") {
    points.push({
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: companyData.phone.value.href.replace("tel:", ""),
      email: companyData.email.value,
      availableLanguage: ["en", "ro"],
    });
  }
  if (companyData.transportPhone.status === "verified" && companyData.transportEmail.status === "verified") {
    points.push({
      "@type": "ContactPoint",
      contactType: "sales",
      name: "Transport desk",
      telephone: companyData.transportPhone.value.href.replace("tel:", ""),
      email: companyData.transportEmail.value,
      areaServed: "Europe",
      availableLanguage: ["en", "ro"],
    });
  }
  if (points.length) data.contactPoint = points;
  if (companyData.coverage.status === "verified") data.areaServed = { "@type": "Place", name: "Europe" };
  data.knowsAbout = ["Road freight transport", "Freight forwarding", "Transport coordination"];
  if (companyData.social.status === "verified") data.sameAs = companyData.social.value.map((s) => s.url);
  return data;
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** Service JSON-LD for the services page — provider = the organisation, area = Europe (verified). */
export function servicesJsonLd(services: readonly { title: string; text: string }[], url: string) {
  return {
    "@context": "https://schema.org",
    "@graph": services.map((sv) => ({
      "@type": "Service",
      name: sv.title,
      description: sv.text,
      serviceType: "Road freight transport coordination",
      areaServed: { "@type": "Place", name: "Europe" },
      url,
      provider: { "@type": "Organization", name: companyData.legalName.value, url: siteUrl },
      ...(companyData.transportTypes.status === "verified"
        ? { hasOfferCatalog: { "@type": "OfferCatalog", name: "Trailer types", itemListElement: companyData.transportTypes.value.map((t) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: t.title } })) } }
        : {}),
    })),
  };
}
