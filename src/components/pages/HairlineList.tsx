/** Hairline-separated rows with a small mono index — the inner pages' replacement for bullets. Rows are compact on phones (.m-row). */
export function HairlineList({
  items,
  numbered = true,
  className = "",
  rowClassName = "py-4",
}: {
  items: readonly string[];
  numbered?: boolean;
  className?: string;
  rowClassName?: string;
}) {
  return (
    <ul className={`border-t border-line ${className}`}>
      {items.map((item, i) => (
        <li key={item} className={`m-row flex items-baseline gap-5 border-b border-line ${rowClassName}`}>
          {numbered ? (
            <span className="t-label w-6 shrink-0 !text-ink-3">{String(i + 1).padStart(2, "0")}</span>
          ) : (
            <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-accent/70" />
          )}
          <span className="t-body !text-ink">{item}</span>
        </li>
      ))}
    </ul>
  );
}
