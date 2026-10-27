import type { Locale } from "./i18n";

/**
 * Public route map. Keys are stable; slugs can be localised later
 * (e.g. ro: "servicii") by turning each value into a per-locale record.
 */
export const routes = {
  home: "",
  services: "services",
  howWeWork: "how-we-work",
  about: "about",
  forCarriers: "for-carriers",
  contact: "contact",
  privacy: "privacy-policy",
  cookies: "cookie-policy",
  terms: "terms-of-use",
} as const;

export type RouteKey = keyof typeof routes;

export function href(locale: Locale, key: RouteKey, hash?: string) {
  const slug = routes[key];
  return `/${locale}${slug ? `/${slug}` : ""}${hash ? `#${hash}` : ""}`;
}

/** Contact page anchors used by CTAs. */
export const anchors = {
  quote: "quote",
  carrierForm: "partnership-enquiry",
} as const;
