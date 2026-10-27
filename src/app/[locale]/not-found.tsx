import { Pill } from "@/components/ui/Pill";
import { defaultLocale } from "@/lib/i18n";
import { href } from "@/lib/routes";

/** Rendered when notFound() is thrown inside the locale segment. No params are available here. */
export default function NotFound() {
  const locale = defaultLocale;
  return (
    <section className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[50%] bg-[radial-gradient(70%_90%_at_50%_100%,rgba(183,212,247,0.12),rgba(183,212,247,0.03)_45%,transparent_72%)]"
      />
      <div className="wrap flex min-h-[88svh] flex-col justify-end pb-[clamp(56px,9vh,120px)] pt-[calc(var(--header-h)+56px)]">
        <h1 className="t-h1 max-w-[16ch]">
          <span className="mask-line">
            <span style={{ "--d": "0.18s" } as React.CSSProperties}>This route doesn&rsquo;t exist.</span>
          </span>
        </h1>
        <p className="t-lead fade-up mt-7 max-w-[44ch]" style={{ "--d": "0.45s" } as React.CSSProperties}>
          The address may have changed or the link may be out of date.
        </p>
        <div className="fade-up mt-9 flex flex-wrap gap-3" style={{ "--d": "0.6s" } as React.CSSProperties}>
          <Pill href={href(locale, "home")}>Back to Home</Pill>
          <Pill href={href(locale, "contact")} variant="ghost" arrow="diag">
            Contact Us
          </Pill>
        </div>
      </div>
    </section>
  );
}
