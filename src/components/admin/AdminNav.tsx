"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import {
  BadgeCheck,
  Columns3,
  FileText,
  LayoutDashboard,
  ListChecks,
  PhoneCall,
  Plus,
  ShieldAlert,
  Truck,
  type LucideIcon,
} from "lucide-react";

export type NavCounts = {
  all: number;
  quoteNew: number;
  callbackNew: number;
  carrierNew: number;
  spam: number;
};

type Item = { key: string; href: string; label: string; icon: LucideIcon; count?: number; highlight?: boolean; groupStart?: boolean };

function itemsFor(counts?: NavCounts): Item[] {
  return [
    { key: "dashboard", href: "/admin", label: "Panou", icon: LayoutDashboard },
    { key: "quote", href: "/admin/leads?type=quote", label: "Cereri ofertă", icon: FileText, count: counts?.quoteNew, highlight: true },
    { key: "callback", href: "/admin/leads?type=callback", label: "Cereri de apel", icon: PhoneCall, count: counts?.callbackNew, highlight: true },
    { key: "carrier", href: "/admin/leads?type=carrier", label: "Transportatori (înscrieri)", icon: Truck, count: counts?.carrierNew, highlight: true },
    { key: "all", href: "/admin/leads", label: "Toate cererile", icon: ListChecks, count: counts?.all },
    { key: "spam", href: "/admin/leads?status=spam", label: "Spam", icon: ShieldAlert, count: counts?.spam },
    { key: "carriers", href: "/admin/carriers", label: "Transportatori aprobați", icon: BadgeCheck, groupStart: true },
    { key: "board", href: "/admin/leads?view=board&type=quote", label: "Pipeline", icon: Columns3 },
    { key: "new", href: "/admin/leads/new", label: "Lead nou", icon: Plus },
  ];
}

function NavList({ active, counts, orientation }: { active: string | null; counts?: NavCounts; orientation: "vertical" | "horizontal" }) {
  const vertical = orientation === "vertical";
  const links = itemsFor(counts).flatMap(({ key, href, label, icon: Icon, count, highlight, groupStart }) => {
    const isActive = active === key;
    const sep =
      groupStart && vertical ? <span key={`${key}-sep`} aria-hidden className="mx-4 my-2 h-px bg-line" /> : groupStart ? <span key={`${key}-sep`} aria-hidden className="mx-1 h-5 w-px shrink-0 bg-line-strong" /> : null;
    const link = (
      <Link
        key={key}
        href={href}
        aria-current={isActive ? "page" : undefined}
        className={`group inline-flex shrink-0 items-center gap-3 rounded-full text-[0.9375rem] font-medium tracking-[-0.005em] transition-colors duration-300 ${
          vertical ? "min-h-11 w-full px-4 py-2 leading-tight" : "h-10 whitespace-nowrap px-4"
        } ${isActive ? "bg-ink/[0.09] text-ink" : "text-ink-2 hover:bg-ink/[0.04] hover:text-ink"}`}
      >
        <Icon size={16} strokeWidth={1.5} aria-hidden className={isActive ? "text-accent" : "text-ink-3 group-hover:text-ink-2"} />
        <span className={vertical ? "min-w-0" : ""}>{label}</span>
        {typeof count === "number" && count > 0 ? (
          <span
            className={`tabular ${vertical ? "ml-auto" : ""} inline-grid h-5 min-w-5 place-items-center rounded-full px-1.5 font-mono text-[0.6875rem] ${
              highlight ? "border border-accent/40 bg-accent/10 text-accent" : "text-ink-3"
            }`}
            aria-label={highlight ? `${count} noi` : `${count}`}
          >
            {count}
          </span>
        ) : null}
      </Link>
    );
    return sep ? [sep, link] : [link];
  });
  if (vertical) return <nav aria-label="Administrare" className="flex flex-col gap-1">{links}</nav>;
  // same rounded-pill container as the public header nav
  return (
    <nav aria-label="Administrare" className="overflow-x-auto px-4 pb-3 [scrollbar-width:none]">
      <div className="inline-flex items-center gap-1 rounded-full border border-line-strong bg-bg-2/70 p-1.5">{links}</div>
    </nav>
  );
}

function NavInner({ counts, orientation }: { counts?: NavCounts; orientation: "vertical" | "horizontal" }) {
  const pathname = usePathname();
  const sp = useSearchParams();
  let active: string | null = null;
  if (pathname === "/admin") active = "dashboard";
  else if (pathname === "/admin/leads/new") active = "new";
  else if (pathname.startsWith("/admin/carriers")) active = "carriers";
  else if (pathname === "/admin/leads") {
    const type = sp.get("type");
    if (sp.get("view") === "board") active = "board";
    else if (sp.get("status") === "spam") active = "spam";
    else if (type === "quote" || type === "callback" || type === "carrier") active = type;
    else active = "all";
  }
  return <NavList active={active} counts={counts} orientation={orientation} />;
}

export function AdminNav({ counts, orientation = "vertical" }: { counts?: NavCounts; orientation?: "vertical" | "horizontal" }) {
  return (
    <Suspense fallback={<NavList active={null} counts={counts} orientation={orientation} />}>
      <NavInner counts={counts} orientation={orientation} />
    </Suspense>
  );
}
