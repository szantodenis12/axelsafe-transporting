import type { LegalDoc, LegalBlock } from "@/content/legal/en";

/**
 * Quiet typographic layout for the legal drafts: title, visible review callout,
 * table of contents (sticky on desktop) and numbered sections.
 */
export function LegalDocument({ doc, reviewNote }: { doc: LegalDoc; reviewNote: string }) {
  return (
    <article className="relative">
      <header className="wrap pt-[calc(var(--header-h)+64px)] pb-14 md:pt-[calc(var(--header-h)+96px)] md:pb-20">
        <div className="grid-12 gap-y-8">
          <div className="col-span-12 lg:col-span-8">
            <h1 className="t-h1">
              <span className="mask-line">
                <span style={{ "--d": "0.18s" } as React.CSSProperties}>{doc.title}</span>
              </span>
            </h1>
            <p className="t-lead fade-up mt-7 max-w-[52ch]" style={{ "--d": "0.45s" } as React.CSSProperties}>
              {doc.description}
            </p>
            <p className="t-label fade-up mt-6 !normal-case !tracking-[0.02em] !text-ink-3" style={{ "--d": "0.55s" } as React.CSSProperties}>
              {doc.status}
            </p>
          </div>
        </div>

        <div
          role="note"
          className="fade-up mt-12 grid gap-4 rounded-[16px] border border-amber-200/30 bg-amber-200/[0.05] p-6 md:mt-16 md:grid-cols-[auto_1fr] md:items-start md:gap-8 md:p-7"
          style={{ "--d": "0.65s" } as React.CSSProperties}
        >
          <p className="t-label whitespace-nowrap !text-amber-100">Draft for legal review</p>
          <p className="t-small max-w-[70ch] !text-amber-50/85">{reviewNote}</p>
        </div>
      </header>

      <div className="wrap grid-12 gap-y-12 pb-[clamp(96px,12vw,180px)]">
        <nav aria-label="Contents" className="col-span-12 lg:col-span-3">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+40px)]">
            <p className="t-label">Contents</p>
            <ol className="mt-5 border-t border-line">
              {doc.sections.map((s, i) => (
                <li key={s.id} className="border-b border-line">
                  <a
                    href={`#${s.id}`}
                    className="flex items-baseline gap-4 py-3 text-[0.9375rem] text-ink-2 transition-colors hover:text-ink"
                  >
                    <span className="t-label w-6 shrink-0 !text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                    <span>{s.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <div className="col-span-12 lg:col-span-8 lg:col-start-5">
          {doc.sections.map((s, i) => (
            <section key={s.id} id={s.id} className="grid gap-y-5 border-t border-line py-10 scroll-mt-[calc(var(--header-h)+24px)] md:grid-cols-[4rem_1fr] md:py-14">
              <span className="t-label !text-ink-3">{String(i + 1).padStart(2, "0")}</span>
              <div className="min-w-0">
                <h2 className="t-h3">{s.title}</h2>
                <div className="mt-6 max-w-[66ch] space-y-5">
                  {s.blocks.map((b, j) => (
                    <Block key={j} block={b} />
                  ))}
                </div>
              </div>
            </section>
          ))}
          <div className="hairline" />
        </div>
      </div>
    </article>
  );
}

function Block({ block }: { block: LegalBlock }) {
  if (block.type === "p") return <p className="t-body">{mark(block.text)}</p>;
  if (block.type === "list")
    return (
      <ul className="space-y-3">
        {block.items.map((item) => (
          <li key={item} className="t-body flex gap-4">
            <span aria-hidden className="mt-[0.8em] h-px w-4 shrink-0 bg-accent/70" />
            <span>{mark(item)}</span>
          </li>
        ))}
      </ul>
    );
  return (
    <dl className="border-t border-line">
      {block.rows.map(([k, v]) => (
        <div key={k} className="grid gap-x-6 gap-y-1 border-b border-line py-3.5 sm:grid-cols-[minmax(0,13rem)_1fr]">
          <dt className="t-label !normal-case !tracking-[0.02em] !text-ink-3">{k}</dt>
          <dd className="t-small !text-ink">{mark(v)}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Highlights "[to be confirmed]" markers so reviewers can't miss them. */
function mark(text: string) {
  const parts = text.split(/(\[(?:to be confirmed|de confirmat|por confirmar)\])/g);
  if (parts.length === 1) return text;
  return parts.map((p, i) =>
    /^\[(to be confirmed|de confirmat|por confirmar)\]$/.test(p) ? (
      <mark key={i} className="rounded-[4px] bg-amber-200/15 px-1 py-0.5 font-mono text-[0.75em] tracking-[0.04em] text-amber-100">
        {p}
      </mark>
    ) : (
      p
    ),
  );
}
