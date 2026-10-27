/**
 * Site-wide ambient background — sits behind every page (fixed, -z-10).
 * Slow drifting light fields + faint road-like curves with light travelling along them
 * (the hero's network motif) + fine grain. Transform/opacity/dashoffset only → compositor-cheap.
 * Fully static under prefers-reduced-motion (global rule in globals.css).
 */
const curves = [
  "M-60 720 C 260 610, 420 760, 720 640 S 1180 470, 1660 560",
  "M-80 300 C 240 380, 520 210, 860 300 S 1320 420, 1680 260",
  "M120 960 C 300 760, 640 820, 900 700 S 1380 600, 1700 760",
  "M-40 120 C 320 180, 600 60, 980 150 S 1400 80, 1680 140",
  "M400 -40 C 520 220, 760 380, 1040 460 S 1400 700, 1560 960",
];

/** The light travels ~100 px/s: stepping it at 30 fps (3 px per step) is indistinguishable on a 1.3 px hairline, but every step
 *  re-rasters the full-viewport lines layer, so 30 steps/s instead of one per display frame (60-144) cuts that GPU cost by 2-5x. */
const FLOW_FPS = 30;

export function AmbientBackground() {
  return (
    <div aria-hidden="true" className="ambient pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="ambient-orb ambient-orb-a" />
      <div className="ambient-orb ambient-orb-b" />
      <div className="ambient-orb ambient-orb-c" />
      <svg className="ambient-lines absolute inset-0 h-full w-full" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
        <g fill="none" strokeLinecap="round">
          {curves.map((d, i) => (
            <path key={`b${i}`} d={d} stroke="#B7D4F7" strokeOpacity="0.05" strokeWidth="1" />
          ))}
          {curves.map((d, i) => (
            <path
              key={`f${i}`}
              d={d}
              pathLength={1}
              className="ambient-flow"
              stroke="#B7D4F7"
              strokeOpacity="0.3"
              strokeWidth="1.3"
              style={{ animationDelay: `${i * -3.7}s`, animationDuration: `${16 + i * 3}s`, animationTimingFunction: `steps(${(16 + i * 3) * FLOW_FPS}, end)` }}
            />
          ))}
        </g>
      </svg>
      <div className="ambient-grain absolute inset-0" />
    </div>
  );
}
