import { isPreview } from "@/lib/site";
import type { CompanyData } from "@/content/companyData";
import { companyData } from "@/content/companyData";
import type { ElementType, ReactNode } from "react";

/**
 * Wraps content that renders a companyData fact. When the fact is a [PLACEHOLDER]
 * and this is a preview build, it adds a data-ph marker so the dev badge can highlight it.
 * Visitors never see a label; production builds are blocked while placeholders remain.
 */
export function Ph({
  k,
  children,
  as: Tag = "span",
  className,
}: {
  k: keyof CompanyData;
  children: ReactNode;
  as?: ElementType;
  className?: string;
}) {
  const marked = isPreview && companyData[k].status === "placeholder";
  return (
    <Tag className={className} {...(marked ? { "data-ph": k, title: companyData[k].note } : {})}>
      {children}
    </Tag>
  );
}
