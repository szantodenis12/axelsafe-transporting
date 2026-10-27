"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type LanguageOption = { code: string; label: string; available: boolean };

/** EN · RO · ES — keeps the visitor on the same page when switching language. */
export function LanguageSwitcher({
  current,
  options,
  label,
  className = "",
}: {
  current: string;
  options: LanguageOption[];
  label: string;
  className?: string;
}) {
  const pathname = usePathname();
  const rest = pathname.split("/").slice(2).join("/");

  return (
    <nav aria-label={label} className={className}>
      <ul className="flex items-center rounded-full border border-line-strong bg-bg-2/50 p-1 backdrop-blur-md">
        {options.map((o) => {
          const active = o.code === current;
          const cls = `block rounded-full px-4 py-3 font-mono md:pointer-fine:px-2.5 md:pointer-fine:py-1.5 text-[0.6875rem] tracking-[0.08em] transition-colors duration-300 ${
            active ? "bg-ink/[0.1] text-ink" : "text-ink-2 hover:text-ink"
          }`;
          return (
            <li key={o.code}>
              {o.available && !active ? (
                <Link href={`/${o.code}${rest ? `/${rest}` : ""}`} hrefLang={o.code} lang={o.code} className={cls}>
                  {o.label}
                </Link>
              ) : (
                <span aria-current={active ? "true" : undefined} aria-disabled={!o.available || undefined} className={`${cls} ${!o.available ? "opacity-40" : ""}`}>
                  {o.label}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
