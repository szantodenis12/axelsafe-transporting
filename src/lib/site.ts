import { companyData } from "@/content/companyData";

/** "production" only on the live deployment. Everything else is a preview. */
export const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV === "production" ? "production" : "preview";
export const isPreview = siteEnv === "preview";

/** NEXT_PUBLIC_SITE_URL may be set without a scheme ("x.vercel.app"); an unusable value falls back to the domain. */
function resolveSiteUrl(raw: string | undefined): string {
  const value = raw?.trim();
  if (value) {
    try {
      return new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`).origin;
    } catch {
      console.warn("[site] NEXT_PUBLIC_SITE_URL is not a valid URL, using the company domain.");
    }
  }
  return companyData.siteUrl.value.replace(/\/$/, "");
}

export const siteUrl = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
