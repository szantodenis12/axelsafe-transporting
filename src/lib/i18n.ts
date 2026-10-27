import { en, type Dictionary } from "@/content/copy/en";
import { ro } from "@/content/copy/ro";
import { es } from "@/content/copy/es";

/**
 * Route-based i18n: every public page lives under /{locale}/…
 * Enabled: en, ro, es (contract scope). To add a language: create content/copy/<code>.ts
 * (type Dictionary) + content/legal/<code>.ts, then add the code here — routes, sitemap and hreflang follow.
 */
export const locales = ["en", "ro", "es"] as const;
export const plannedLocales = ["en", "ro", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeLabels: Record<(typeof plannedLocales)[number], string> = {
  en: "EN",
  ro: "RO",
  es: "ES",
};

export const hreflang: Record<Locale, string> = { en: "en", ro: "ro", es: "es" };

const dictionaries: Record<Locale, Dictionary> = { en, ro, es };

export const hasLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];
