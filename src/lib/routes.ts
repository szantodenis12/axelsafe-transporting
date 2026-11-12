import type { Locale } from "./i18n";
// relative import on purpose: next.config.ts loads this file without the "@/" alias
import { guideSlugs, type GuideId } from "../content/guides/slugs";

type Localised = Readonly<Record<Locale, string>>;

/**
 * Public route map. Keys are stable. A value is either one slug used by every locale,
 * or a per-locale record (localised slug). For localised routes the app/ folder is named
 * after the EN slug; next.config.ts rewrites the RO/ES slugs onto it (see `localisedRewrites`).
 * next.config.ts imports this file: keep runtime imports relative and dependency-free.
 */
export const routes = {
  home: "",
  services: "services",
  howWeWork: "how-we-work",
  about: "about",
  forCarriers: "for-carriers",
  contact: "contact",
  vetting: { en: "how-we-vet-carriers", ro: "cum-verificam-transportatorii", es: "como-verificamos-a-los-transportistas" },
  guides: { en: "guides", ro: "ghiduri", es: "guias" },
  privacy: "privacy-policy",
  cookies: "cookie-policy",
  terms: "terms-of-use",
} as const satisfies Record<string, string | Localised>;

export type RouteKey = keyof typeof routes;

export function slugFor(locale: Locale, key: RouteKey): string {
  const r: string | Localised = routes[key];
  return typeof r === "string" ? r : r[locale];
}

export function href(locale: Locale, key: RouteKey, hash?: string) {
  const slug = slugFor(locale, key);
  return `/${locale}${slug ? `/${slug}` : ""}${hash ? `#${hash}` : ""}`;
}

/** URL of one guide article in the given locale. */
export function guideHref(locale: Locale, id: GuideId) {
  return `${href(locale, "guides")}/${guideSlugs[id][locale]}`;
}

/**
 * Maps the current pathname to the same page in another locale (language switcher).
 * Handles localised route slugs and guide article slugs; anything unknown keeps its path.
 */
export function localisePath(pathname: string, to: Locale): string {
  const [, from, first, second, ...rest] = pathname.split("/");
  if (!first) return `/${to}`;
  const key = (Object.keys(routes) as RouteKey[]).find((k) => slugFor(from as Locale, k) === first && first !== "");
  if (!key) return `/${to}/${[first, second, ...rest].filter(Boolean).join("/")}`;
  let out = href(to, key);
  if (second) {
    const id = key === "guides" ? (Object.keys(guideSlugs) as GuideId[]).find((g) => guideSlugs[g][from as Locale] === second) : undefined;
    out += `/${id ? guideSlugs[id][to] : second}`;
  }
  return rest.length ? `${out}/${rest.join("/")}` : out;
}

/**
 * Rewrites (localised slug → app/ folder) and redirects (folder slug used in a locale
 * that has its own slug → localised slug) for next.config.ts.
 */
export function localisedRewrites() {
  const rewrites: { source: string; destination: string }[] = [];
  const redirects: { source: string; destination: string; permanent: boolean }[] = [];
  for (const r of Object.values(routes) as (string | Localised)[]) {
    if (typeof r === "string") continue;
    const folder = r.en;
    for (const [locale, slug] of Object.entries(r)) {
      if (slug === folder) continue;
      rewrites.push(
        { source: `/${locale}/${slug}`, destination: `/${locale}/${folder}` },
        { source: `/${locale}/${slug}/:path*`, destination: `/${locale}/${folder}/:path*` },
      );
      redirects.push(
        { source: `/${locale}/${folder}`, destination: `/${locale}/${slug}`, permanent: true },
        { source: `/${locale}/${folder}/:path*`, destination: `/${locale}/${slug}/:path*`, permanent: true },
      );
    }
  }
  return { rewrites, redirects };
}

/** Contact page anchors used by CTAs. */
export const anchors = {
  quote: "quote",
  carrierForm: "partnership-enquiry",
} as const;
