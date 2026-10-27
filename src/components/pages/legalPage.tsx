import type { Metadata } from "next";
import { LegalDocument } from "@/components/pages/LegalDocument";
import { breadcrumbJsonLd } from "@/components/pages/breadcrumbs";
import { companyData } from "@/content/companyData";
import { legalDocs as legalEn } from "@/content/legal/en";
import { legalDocs as legalRo } from "@/content/legal/ro";
import { legalDocs as legalEs } from "@/content/legal/es";

const legalByLocale = { en: legalEn, ro: legalRo, es: legalEs } as const;
import { getDictionary, type Locale } from "@/lib/i18n";
import { JsonLd, pageMetadata } from "@/lib/seo";

type LegalKey = keyof typeof legalEn;

/** Shared metadata builder for the three legal routes (titles built inline, indexable). */
export function legalMetadata(locale: Locale, key: LegalKey): Metadata {
  const doc = legalByLocale[locale][key];
  return pageMetadata(locale, key, {
    title: `${doc.title} | ${companyData.brandName.value}`,
    description: doc.description,
  });
}

export function LegalPage({ locale, docKey }: { locale: Locale; docKey: LegalKey }) {
  const doc = legalByLocale[locale][docKey];
  const t = getDictionary(locale);
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(locale, [{ key: docKey, name: doc.title }])} />
      <LegalDocument doc={doc} reviewNote={t.legal.reviewNote} />
    </>
  );
}
