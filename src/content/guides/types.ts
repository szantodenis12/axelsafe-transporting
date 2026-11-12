import type { GuideId } from "./slugs";

/** A paragraph, or a bulleted list. */
export type GuideBlock = string | { readonly list: readonly string[] };

export type Guide = {
  readonly title: string;
  /** Meta description + index card excerpt. */
  readonly description: string;
  readonly lead: string;
  readonly sections: readonly { readonly heading: string; readonly body: readonly GuideBlock[] }[];
  readonly cta: { readonly title: string; readonly text: string; readonly label: string };
};

/** Same shape in every locale: the Record forces all three articles to exist. */
export type GuidesContent = {
  readonly index: { readonly titleLines: readonly string[]; readonly text: string; readonly read: string };
  readonly ui: { readonly contents: string; readonly allGuides: string; readonly updated: string };
  /** ISO date shown on the article and used in the Article JSON-LD. */
  readonly published: string;
  readonly articles: Readonly<Record<GuideId, Guide>>;
};
