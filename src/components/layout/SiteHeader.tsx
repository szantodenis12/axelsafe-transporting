"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { setScrollLocked } from "@/lib/lenis";
import { LanguageSwitcher, type LanguageOption } from "./LanguageSwitcher";

type NavItem = { href: string; label: string };

export function SiteHeader({
  homeHref,
  items,
  cta,
  labels,
  locale,
  languages,
}: {
  homeHref: string;
  items: NavItem[];
  cta: { href: string; label: string };
  labels: { menu: string; close: string; language: string };
  locale: string;
  languages: LanguageOption[];
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // the menu belongs to the path it was opened on → navigating closes it without an effect
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (v: boolean | ((o: boolean) => boolean)) =>
    setOpenOn((typeof v === "function" ? v(open) : v) ? pathname : null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The menu button and overlay only exist below xl (1280px). If the viewport grows past it while the menu is open (DevTools
  // device emulation, rotating a tablet, resizing the window), close it: otherwise its scroll lock (html overflow hidden) would
  // stay on with no menu on screen and freeze the page.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const onChange = () => {
      if (mq.matches) setOpenOn(null);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    document.body.style.overflow = open ? "hidden" : ""; // iOS Safari ignores overflow:hidden on <html> alone
    setScrollLocked(open); // Lenis would otherwise keep scrolling the page behind the open menu
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      setScrollLocked(false);
    };
  }, [open]);

  const isActive = (h: string) => (h === homeHref ? pathname === h : pathname.startsWith(h));

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 -bottom-10 bg-gradient-to-b from-bg via-bg/80 max-md:via-bg/95 max-md:via-[62%] to-transparent transition-opacity duration-500 ${scrolled ? "opacity-100" : "opacity-0"}`}
      />
      <div className="wrap relative flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link href={homeHref} aria-label="AXEL SAFE TRANSPORTING — Home" className="relative z-10 rounded-md">
          <Logo />
        </Link>

        <nav aria-label="Main" className="absolute left-1/2 hidden -translate-x-1/2 xl:block">
          <ul
            className={`flex items-center gap-1 rounded-full border p-1.5 transition-colors duration-500 ${
              scrolled ? "border-line-strong bg-bg-2/70 backdrop-blur-md" : "border-line bg-bg-2/30 backdrop-blur-[2px]"
            }`}
          >
            {items.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-full px-4 py-2 text-[0.875rem] font-medium tracking-[-0.005em] transition-colors duration-300 ${
                      active ? "bg-ink/[0.09] text-ink" : "text-ink-2 hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="relative z-10 flex items-center gap-2">
          <LanguageSwitcher current={locale} options={languages} label={labels.language} className="hidden md:block" />
          <Link href={cta.href} className="pill pill-primary pill-sm hidden sm:inline-flex">
            <span>{cta.label}</span>
            <span className="pill-icon">
              <ArrowRight size={15} strokeWidth={1.6} aria-hidden />
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="grid h-11 w-11 place-items-center rounded-full border border-line-strong bg-bg-2/60 text-ink backdrop-blur xl:hidden"
          >
            {open ? <X size={18} strokeWidth={1.6} /> : <Menu size={18} strokeWidth={1.6} />}
            <span className="sr-only">{open ? labels.close : labels.menu}</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="fixed inset-0 top-0 z-0 overflow-y-auto overscroll-contain bg-bg/97 backdrop-blur-xl xl:hidden"
      >
        <nav
          aria-label="Mobile"
          onClick={(e) => (e.target as Element).closest("a") && setOpen(false)} // same-page #hash links do not change the path, so close explicitly
          className="wrap flex min-h-full flex-col pt-[calc(var(--header-h)+clamp(8px,3svh,32px))] pb-[max(2.5rem,env(safe-area-inset-bottom))]"
        >
          <ul className="flex flex-col border-t border-line">
            {[...items, { href: cta.href, label: cta.label }].map((item, i) => (
              <li key={item.href + i} className="border-b border-line">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="flex min-h-[56px] items-center justify-between py-[clamp(12px,2.6svh,20px)] text-[1.625rem] font-light tracking-[-0.02em] text-ink"
                >
                  {item.label}
                  <span className="t-label">{String(i + 1).padStart(2, "0")}</span>
                </Link>
              </li>
            ))}
          </ul>
          <LanguageSwitcher current={locale} options={languages} label={labels.language} className="mt-8 self-start" />
        </nav>
      </div>
    </header>
  );
}
