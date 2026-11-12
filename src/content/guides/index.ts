import type { Locale } from "@/lib/i18n";
import { guidesEn } from "./en";
import { guidesEs } from "./es";
import { guidesRo } from "./ro";
import type { GuidesContent } from "./types";

export { guideIds, guideSlugs, type GuideId } from "./slugs";
export type { Guide, GuideBlock, GuidesContent } from "./types";

const guides: Record<Locale, GuidesContent> = { en: guidesEn, ro: guidesRo, es: guidesEs };

export const getGuides = (locale: Locale): GuidesContent => guides[locale];
