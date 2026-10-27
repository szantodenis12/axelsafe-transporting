import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage, legalMetadata } from "@/components/pages/legalPage";
import { hasLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[locale]/privacy-policy">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  return legalMetadata(locale, "privacy");
}

export default async function Page({ params }: PageProps<"/[locale]/privacy-policy">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  return <LegalPage locale={locale} docKey="privacy" />;
}
