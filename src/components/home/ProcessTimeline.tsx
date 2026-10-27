"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { Pill } from "@/components/ui/Pill";
import { MobileEyebrow } from "@/components/ui/MobileEyebrow";

/**
 * Four-step timeline: one continuous line connecting the stages.
 * The line fills once when the timeline enters the viewport (CSS transition, no scroll scrubbing).
 */
export function ProcessTimeline({
  t,
  cta,
  aside,
}: {
  t: { eyebrow: string; title: string; text: string; steps: readonly { title: string; text: string }[] };
  cta: { href: string; label: string };
  aside?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.dataset.in = "true";
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="section-y relative overflow-hidden">
      <div aria-hidden className="depth-ring pointer-events-none absolute -left-[14vw] top-[8%]" data-speed="-0.1" data-speed-x="-0.04" />
      <div className="wrap relative">
        <div className="grid-12 items-end gap-y-6">
          <div className="col-span-12 lg:col-span-7" data-speed="0.06">
            <MobileEyebrow>{t.eyebrow}</MobileEyebrow>
            <h2 className="t-h2">{t.title}</h2>
          </div>
          <p className="t-lead col-span-12 lg:col-span-4 lg:col-start-9" data-speed="0.03">{t.text}</p>
        </div>

        <div ref={ref} className="timeline group/tl relative m-block mt-16 md:mt-14">
          {/* the continuous line: horizontal ≥lg, vertical below */}
          <div aria-hidden className="absolute left-[7px] top-2 bottom-2 w-px bg-line lg:left-0 lg:right-0 lg:top-[7px] lg:bottom-auto lg:h-px lg:w-auto">
            <span className="absolute inset-0 origin-top scale-y-0 bg-accent/80 transition-transform duration-[1.8s] ease-[var(--ease-in-out-quart)] group-data-[in=true]/tl:scale-y-100 lg:origin-left lg:scale-x-0 lg:scale-y-100 lg:group-data-[in=true]/tl:scale-x-100" />
          </div>
          <ol className="relative grid grid-cols-1 gap-12 max-md:gap-6 lg:grid-cols-4 lg:gap-8">
            {t.steps.map((s, i) => (
              <li key={s.title} className="relative pl-10 lg:pl-0 lg:pt-14 lg:pr-6">
                <span
                  aria-hidden
                  className="absolute left-0 top-1 grid h-[15px] w-[15px] place-items-center rounded-full border border-line-strong bg-bg transition-colors duration-700 group-data-[in=true]/tl:border-accent lg:top-0"
                  style={{ transitionDelay: `${300 + i * 380}ms` }}
                >
                  <span
                    className="h-[5px] w-[5px] scale-0 rounded-full bg-accent transition-transform duration-700 group-data-[in=true]/tl:scale-100"
                    style={{ transitionDelay: `${300 + i * 380}ms` }}
                  />
                </span>
                <span className="t-label">{String(i + 1).padStart(2, "0")}.</span>
                <h3 className="t-h3 mt-3">{s.title}</h3>
                <p className="t-small mt-3 max-w-[32ch]">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>

        {aside ? (
          <div className="m-block mt-14 md:mt-16" data-speed="0.04">
            {aside}
          </div>
        ) : (
          <div className="m-block mt-14 md:mt-16">
            <Pill href={cta.href} variant="ghost">
              {cta.label}
            </Pill>
          </div>
        )}
      </div>
    </section>
  );
}
