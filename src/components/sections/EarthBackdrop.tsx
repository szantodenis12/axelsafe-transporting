import Image from "next/image";
import { ParallaxLayer } from "@/components/ui/Parallax";

/** Smoothstep alpha 0 -> 1 over the image box's first 50% (same easing as ParallaxLayer's feathers). */
const IMAGE_FEATHER =
  "linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(0,0,0,0.028) 5%,rgba(0,0,0,0.104) 10%,rgba(0,0,0,0.216) 15%,rgba(0,0,0,0.352) 20%,rgba(0,0,0,0.5) 25%,rgba(0,0,0,0.648) 30%,rgba(0,0,0,0.784) 35%,rgba(0,0,0,0.896) 40%,rgba(0,0,0,0.972) 45%,#000 50%)";

const VEIL =
  "linear-gradient(180deg,rgba(6,11,22,0) 0%,rgba(6,11,22,0.06) 15%,rgba(6,11,22,0.2) 32%,rgba(6,11,22,0.28) 46%,rgba(6,11,22,0.2) 62%,rgba(6,11,22,0.08) 78%,rgba(6,11,22,0.02) 90%,rgba(6,11,22,0) 100%)";

/** Page navy: first half (alpha 0 -> 0.5) of ONE smoothstep spanning 14rem; the footer (.site-footer in globals.css) carries the second half
 *  (0.5 -> 1), so the lines-hiding backdrop is continuous across the section boundary and only starts below the planet horizon. */
const NAVY_RISE =
  "linear-gradient(180deg,rgba(6,11,22,0.000) 0%,rgba(6,11,22,0.011) 13%,rgba(6,11,22,0.043) 25%,rgba(6,11,22,0.092) 38%,rgba(6,11,22,0.156) 50%,rgba(6,11,22,0.232) 63%,rgba(6,11,22,0.316) 75%,rgba(6,11,22,0.407) 88%,rgba(6,11,22,0.500) 100%)";

/**
 * The Earth-curvature backdrop of a closing section, with every edge eased so it never shows a straight line or a tone step:
 * the image dissolves in from the top and out into the footer, the legibility veil is zero at both ends, and the navy rise at the
 * bottom hands over to the footer. Put it as the first child of a `relative isolate overflow-hidden` section that also carries
 * the `final-cta` class (that class is what continues the navy ramp in the footer). Use it for ANY closing section; never give
 * such a section a border-t or an opaque gradient start.
 */
export function EarthBackdrop({ objectPosition = "object-[50%_35%]" }: { objectPosition?: string }) {
  return (
    <>
      <ParallaxLayer className="-z-20" feather="bothLate" amount={18} zoom={0.08}>
        {/* own eased top feather: this box starts at 16%, so its straight top edge (and the image's bluer sky against the
            page navy) used to show as a lighter rectangle with a hard bottom/top line partway up the section */}
        <div className="absolute inset-x-0 top-[16%] -bottom-[6%]" style={{ maskImage: IMAGE_FEATHER, WebkitMaskImage: IMAGE_FEATHER }}>
          <Image src="/media/earth-curvature.jpg" alt="" fill quality={80} sizes="100vw" className={`object-cover ${objectPosition}`} />
        </div>
      </ParallaxLayer>
      {/* legibility veil: zero at both ends (a non-zero end here was a hard-edged band against the footer), eased in between */}
      <div className="absolute inset-0 -z-10" style={{ backgroundImage: VEIL }} />
      {/* navy backdrop (first half of the smoothstep, hands over to the footer): hides the fixed ambient road curves below the planet
          horizon with no edge. Static gradient, no repaint cost. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[7rem]" style={{ backgroundImage: NAVY_RISE }} />
    </>
  );
}
