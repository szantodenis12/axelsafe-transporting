import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage, legalMetadata } from "@/components/pages/legalPage";
import { hasLocale } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[locale]/terms-of-use">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  return legalMetadata(locale, "terms");
}

export default async function Page({ params }: PageProps<"/[locale]/terms-of-use">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  return <LegalPage locale={locale} docKey="terms" />;
}
