import { companyData } from "@/content/companyData";

/** "production" only on the live deployment. Everything else is a preview. */
export const siteEnv = process.env.NEXT_PUBLIC_SITE_ENV === "production" ? "production" : "preview";
export const isPreview = siteEnv === "preview";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || companyData.siteUrl.value).replace(/\/$/, "");
