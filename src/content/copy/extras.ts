import type { Locale } from "@/lib/i18n";
import { roExtra } from "./roExtra";
import { enExtra } from "./enExtra";
import { esExtra } from "./esExtra";

export type PageExtras = {
  contact: { officeHeading: string; transportHeading: string };
  vetting: { checkTitles: readonly string[] };
  howWeWork: { finalCta: { titleLines: readonly string[]; text: string; cta: string } };
  about: { workStyle: { eyebrow: string; title: string; paragraphs: readonly string[] } };
};

const all: Record<Locale, PageExtras> = { ro: roExtra, en: enExtra, es: esExtra };
export const getExtras = (locale: Locale): PageExtras => all[locale];
