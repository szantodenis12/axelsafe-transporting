import { Reveal } from "@/components/ui/Reveal";
import { MobileEyebrow } from "@/components/ui/MobileEyebrow";

type Stage = { title: string; paragraphs: readonly string[] };

/**
 * Vertical stage list with a sticky heading column on desktop.
 * Deliberately different from the homepage's horizontal timeline.
 */
export function StickyStages({ eyebrow, title, items }: { eyebrow?: string; title: string; items: readonly Stage[] }) {
  return (
    <section className="section-y">
      <div className="wrap grid-12 gap-y-14 max-md:gap-y-6">
        <div className="col-span-12 lg:col-span-5">
          <Reveal className="lg:sticky lg:top-[calc(var(--header-h)+48px)]">
            <MobileEyebrow>{eyebrow}</MobileEyebrow>
            <h2 className="t-h2 max-w-[16ch]">{title}</h2>
          </Reveal>
        </div>

        <ol className="col-span-12 lg:col-span-6 lg:col-start-7">
          {items.map((s, i) => (
            <Reveal as="li" key={s.title} className="grid grid-cols-[auto_1fr] gap-x-8 border-t border-line py-10 last:border-b max-md:gap-x-4 max-md:py-6 md:gap-x-14 md:py-14">
              <span
                aria-hidden
                className="text-[clamp(2.5rem,5vw,4.5rem)] leading-[0.9] font-light tracking-[-0.04em] text-ink-3/70 tabular-nums max-md:w-9 max-md:text-[1.5rem]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 pt-1 md:pt-2">
                <h3 className="t-h3">{s.title}</h3>
                <div className="mt-3 max-w-[50ch] space-y-3 md:mt-5 md:space-y-4">
                  {s.paragraphs.map((p) => (
                    <p key={p} className="t-body">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
