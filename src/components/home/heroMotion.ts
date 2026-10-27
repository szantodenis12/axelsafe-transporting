/**
 * Which hero experience a screen gets. Decided by ORIENTATION (aspect), not width alone:
 *  - desktop scene  → landscape screens at least 768 × 620 (laptops, desktops, tablets held sideways)
 *  - mobile scene   → portrait screens of any width (phones, tablets held upright, narrow desktop windows) and
 *                     small landscape screens ≥ 480 px tall
 *  - static stack   → reduced motion, no JS, and landscape phones (< 480 px tall)
 * The two scene queries are mutually exclusive, so exactly one gsap.matchMedia context is ever active.
 */
const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const DESKTOP_SCENE_QUERY = `(min-width: 768px) and (min-height: 620px) and (orientation: landscape) and ${MOTION_OK}`;
export const MOBILE_SCENE_QUERY = `(min-height: 480px) and ${MOTION_OK} and (not ((min-width: 768px) and (min-height: 620px) and (orientation: landscape)))`;

type NavExtras = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
};

/** Low-end / data-saving device: the mobile scene drops the flow animation and the minor-road layer (reveal stays). */
export function isLiteDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  const n = navigator as NavExtras;
  if (n.connection?.saveData) return true;
  if (typeof n.hardwareConcurrency === "number" && n.hardwareConcurrency > 0 && n.hardwareConcurrency <= 4) return true;
  if (typeof n.deviceMemory === "number" && n.deviceMemory <= 4) return true;
  return false;
}

/** True when either scene (desktop or mobile) is — or could become — active: used to gate lazy work. */
export function sceneMayRun(): boolean {
  return window.matchMedia(DESKTOP_SCENE_QUERY).matches || window.matchMedia(MOBILE_SCENE_QUERY).matches;
}
