import type { Locale } from "@/lib/i18n";
import { href, type RouteKey } from "@/lib/routes";
import { siteUrl } from "@/lib/site";

type Crumb = { key: RouteKey; name: string } | { path: string; name: string };

/** BreadcrumbList JSON-LD for inner pages: Home › Page (› Sub-page, via an explicit path). */
export function breadcrumbJsonLd(locale: Locale, trail: Crumb[]) {
  const items: Crumb[] = [{ key: "home", name: "Home" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${"path" in item ? item.path : href(locale, item.key)}`,
    })),
  };
}
