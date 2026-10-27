import type { Locale } from "@/lib/i18n";
import { href, type RouteKey } from "@/lib/routes";
import { siteUrl } from "@/lib/site";

/** BreadcrumbList JSON-LD for inner pages: Home › Page. */
export function breadcrumbJsonLd(locale: Locale, trail: { key: RouteKey; name: string }[]) {
  const items = [{ key: "home" as RouteKey, name: "Home" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteUrl}${href(locale, item.key)}`,
    })),
  };
}
