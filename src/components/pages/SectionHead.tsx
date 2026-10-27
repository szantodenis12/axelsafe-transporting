import { Reveal } from "@/components/ui/Reveal";
import { MobileEyebrow } from "@/components/ui/MobileEyebrow";

/** Heading used at the top of most inner-page sections. On phones the section's eyebrow ("01 / WHO WE ARE") sits above it (docs/MOBILE.md). */
export function SectionHead({
  eyebrow,
  plainEyebrow = false,
  title,
  titleLines,
  as: Tag = "h2",
  className = "",
  titleClassName = "t-h2 max-w-[16ch]",
}: {
  eyebrow?: string;
  /** drop the "NN / " index of the eyebrow on phones (pages without one running numbering) */
  plainEyebrow?: boolean;
  title?: string;
  titleLines?: readonly string[];
  as?: "h2" | "h3";
  className?: string;
  titleClassName?: string;
}) {
  return (
    <Reveal className={className} data-speed="0.05">
      <MobileEyebrow plain={plainEyebrow}>{eyebrow}</MobileEyebrow>
      <Tag className={titleClassName}>
        {titleLines
          ? titleLines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))
          : title}
      </Tag>
    </Reveal>
  );
}
