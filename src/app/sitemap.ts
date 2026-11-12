import type { MetadataRoute } from "next";
import { hreflang, locales } from "@/lib/i18n";
import { guideHref, href, routes, type RouteKey } from "@/lib/routes";
import { guideIds } from "@/content/guides/slugs";
import { siteUrl } from "@/lib/site";

const priority: Partial<Record<RouteKey, number>> = { home: 1, services: 0.9, contact: 0.9, howWeWork: 0.8, forCarriers: 0.8, about: 0.7, vetting: 0.7, guides: 0.6 };

export default function sitemap(): MetadataRoute.Sitemap {
  const keys = Object.keys(routes) as RouteKey[];
  const pages = keys.flatMap((key) =>
    locales.map((locale) => ({
      url: `${siteUrl}${href(locale, key)}`,
      changeFrequency: "monthly" as const,
      priority: priority[key] ?? 0.3,
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((l) => [hreflang[l], `${siteUrl}${href(l, key)}`])),
          "x-default": `${siteUrl}${href("en", key)}`,
        },
      },
    })),
  );
  const guides = guideIds.flatMap((id) =>
    locales.map((locale) => ({
      url: `${siteUrl}${guideHref(locale, id)}`,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((l) => [hreflang[l], `${siteUrl}${guideHref(l, id)}`])),
          "x-default": `${siteUrl}${guideHref("en", id)}`,
        },
      },
    })),
  );
  return [...pages, ...guides];
}
