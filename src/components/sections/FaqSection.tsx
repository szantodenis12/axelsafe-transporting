import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/lib/seo";

type Item = { q: string; a: string };

/**
 * FAQ: sticky heading column (+ optional CTA) beside numbered accordion cards, plus FAQPage JSON-LD built from the same
 * items, so the visible answers and the structured data can never drift apart.
 */
export function FaqSection({
  title,
  items,
  id = "faq",
  cta,
}: {
  title: string;
  items: readonly Item[];
  id?: string;
  /** optional action under the heading (existing, already translated label + link) */
  cta?: { href: string; label: string };
}) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    // overflow-clip (not hidden): the decorative ring is still cut off, but position:sticky keeps working
    <section id={id} className="section-y relative scroll-mt-[var(--header-h)] overflow-clip">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((i) => ({
            "@type": "Question",
            name: i.q,
            acceptedAnswer: { "@type": "Answer", text: i.a },
          })),
        }}
      />
      <div aria-hidden className="depth-ring pointer-events-none absolute -right-[16vw] top-[6%]" data-speed="-0.09" data-speed-x="0.04" />
      <div className="wrap grid-12 relative gap-y-10">
        <div className="col-span-12 lg:col-span-4">
          <Reveal className="lg:sticky lg:top-[calc(var(--header-h)+40px)]">
            <p className="t-label mb-4 flex items-center gap-3 md:mb-6">
              <span className="text-accent">{pad(1)}</span>
              <span aria-hidden className="h-px w-8 bg-line-strong" />
              <span>{pad(items.length)}</span>
            </p>
            <h2 className="t-h2 max-w-[12ch]">{title}</h2>
            {cta && (
              <div className="mt-6 md:mt-10">
                <Pill href={cta.href} variant="ghost">
                  {cta.label}
                </Pill>
              </div>
            )}
          </Reveal>
        </div>
        <div className="col-span-12 lg:col-span-8">
          <FaqAccordion items={items} />
        </div>
      </div>
    </section>
  );
}
