/**
 * Guide article ids and their localised URL slugs. Kept apart from the article text
 * so the language switcher (client) and next.config.ts can map URLs without loading the content.
 */
export const guideSlugs = {
  cmr: { en: "cmr-consignment-note", ro: "scrisoarea-de-transport-cmr", es: "carta-de-porte-cmr" },
  pricing: {
    en: "how-road-freight-prices-are-set",
    ro: "cum-se-formeaza-pretul-transportului-rutier",
    es: "como-se-forma-el-precio-del-transporte-por-carretera",
  },
  roles: {
    en: "freight-forwarder-carrier-freight-exchange",
    ro: "casa-de-expeditii-transportator-bursa-de-transport",
    es: "transitario-transportista-bolsa-de-cargas",
  },
} as const;

export type GuideId = keyof typeof guideSlugs;
export const guideIds = Object.keys(guideSlugs) as GuideId[];
