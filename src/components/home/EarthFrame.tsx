import Image from "next/image";
import type { CSSProperties, ReactNode, Ref } from "react";
import overlay from "@/content/generated/hero-overlay.json";
import { RoadsFlow } from "./RoadsFlow";
import { RoadLayer } from "./RoadLayer";

/**
 * The hero photograph and the European road network in ONE coordinate space.
 *
 * earth-hero.jpg is a render of NASA Black Marble through a known orbital camera;
 * scripts in ASSETS_HIGGSFIELD/build_roads_overlay.py project Natural Earth roads through
 * the same camera, so every SVG layer here is pixel-registered to the photograph.
 * Any transform applied to this frame moves photo + roads + labels together.
 */
export const REGHIN = overlay.cities.find((c) => c.origin)!;

/* Reveal geometry, as % of the frame (aspect 16:9 → height = 9/16 width). The net box is a square of side 3W centred on
   Reghin; the inner (road) layer is the frame rectangle positioned back where the frame sits inside that square. */
const NET_SIDE = 3; // × frame width
const FRAME_ASPECT = 9 / 16;
const NET_BOX: CSSProperties = {
  width: `${NET_SIDE * 100}%`,
  left: `calc(${REGHIN.x}% - ${(NET_SIDE / 2) * 100}%)`,
  top: `calc(${REGHIN.y}% - ${((NET_SIDE / 2) / FRAME_ASPECT) * 100}%)`,
};
const NET_INNER: CSSProperties = {
  width: `${100 / NET_SIDE}%`,
  height: `${(100 * FRAME_ASPECT) / NET_SIDE}%`,
  left: `${50 - REGHIN.x / NET_SIDE}%`,
  top: `${50 - (REGHIN.y * FRAME_ASPECT) / NET_SIDE}%`,
};

const LABEL_CITIES = new Set(["Reghin", "Budapest", "Vienna", "Munich", "Milan", "Paris", "Rotterdam", "Hamburg", "Warsaw", "Bucharest", "Barcelona"]);
const LABEL_EROADS = new Set(["E60", "E70", "E81", "E75", "E65", "E40", "E30", "E80"]);

export function EarthFrame({
  frameRef,
  videoRef,
  originLabel,
  style,
  className = "",
  priority = false,
  revealed = false,
  children,
}: {
  frameRef?: Ref<HTMLDivElement>;
  videoRef?: Ref<HTMLVideoElement>;
  originLabel: string;
  style?: CSSProperties;
  className?: string;
  priority?: boolean;
  /** static rendering (mobile / reduced motion): network fully visible, no animation hooks needed */
  revealed?: boolean;
  /** extra layers in frame coordinates (e.g. a highlighted route) */
  children?: ReactNode;
}) {
  return (
    <div
      ref={frameRef}
      data-earth
      className={`earth-frame absolute aspect-[16/9] ${className}`}
      style={{ ...style, ...(revealed ? ({ "--reveal": "160%" } as CSSProperties) : null) }}
    >
      <Image
        src="/media/earth-hero.jpg"
        alt=""
        fill
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        quality={90}
        /* the hero frame is laid out at its FINAL zoomed size (1.5 × cover, up to ~2× viewport width) → ask for the largest source */
        sizes={videoRef ? "(min-width: 768px) 200vw, 260vw" : "(min-width: 768px) 180vw, 260vw"}
        className="object-cover"
      />
      {videoRef && (
        /* the wrapper is what the scroll timeline fades (opacity only); the video keeps its own CSS fade-in */
        <div data-earth-video className="net-layer absolute inset-0">
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-[1.6s] data-[ready=true]:opacity-100"
          />
        </div>
      )}

      {/* network shade: darkens the planet so the roads read */}
      <div data-net-shade className={`net-layer absolute inset-0 bg-bg ${revealed ? "opacity-40" : "opacity-0"}`} />

      {/* road network — revealed outward from Reghin.
          [data-net] is an OVERSIZED square (3 × frame width) centred exactly on Reghin, carrying a STATIC radial mask whose
          feather ends well inside the box (so a box edge can never show). The timeline scales [data-net] about its centre
          while counter-scaling [data-net-inner] (frame-sized, placed back over the frame) about Reghin, so the soft disc
          sweeps outward and the roads themselves never move (transform-only, no repaint). */}
      <div data-net className="net-reveal absolute aspect-square" style={NET_BOX}>
        <div data-net-inner className="net-inner absolute" style={NET_INNER}>
          <RoadLayer kind="minor" mode={revealed ? "view" : "scene"} />
          <RoadLayer kind="major" mode={revealed ? "view" : "scene"} />
          {/* traffic flow: inline SVG on its own composited layer, animated only while the network is on screen (see RoadsFlow) */}
          <RoadsFlow
            mode={videoRef ? "scroll" : "view"}
            className={`net-layer absolute inset-0 ${revealed ? "opacity-70" : "opacity-0"}`}
          />
        </div>
      </div>

      {/* nodes + labels (HTML so text stays crisp). The hero frame is laid out at its zoomed size (--cam × cover), so
          label boxes are scaled by --cam (or --lab, the mobile scene's own cap) to keep the on-screen size they had when the whole frame was transform-scaled. */}
      <div data-net-labels className={`net-layer absolute inset-0 ${revealed ? "" : "opacity-0"}`} aria-hidden="true">
        {overlay.cities
          .filter((c) => LABEL_CITIES.has(c.name))
          .map((c) => (
            <span key={c.name} className="absolute" style={{ left: `${c.x}%`, top: `${c.y}%`, scale: "var(--lab, var(--cam, 1))", transformOrigin: "0 0" }}>
              {c.origin ? (
                <>
                  <span className="net-origin-pulse absolute -left-[14px] -top-[14px] h-7 w-7 rounded-full border border-accent/60" />
                  <span className="absolute -left-[4px] -top-[4px] h-2 w-2 rounded-full bg-ink shadow-[0_0_14px_4px_rgba(183,212,247,0.55)]" />
                  <span className="absolute left-3 -top-[7px] whitespace-nowrap font-mono text-[0.6rem] tracking-[0.16em] text-ink uppercase">
                    {originLabel}
                  </span>
                </>
              ) : (
                <>
                  <span className="absolute -left-[2.5px] -top-[2.5px] h-[5px] w-[5px] rounded-full border border-accent bg-bg" />
                  <span className="absolute left-2 -top-[14px] whitespace-nowrap font-mono text-[0.5rem] tracking-[0.16em] text-ink-2 uppercase">
                    {c.name}
                  </span>
                </>
              )}
            </span>
          ))}
        {overlay.eroads
          .filter((e) => LABEL_EROADS.has(e.name))
          .map((e) => (
            <span
              key={e.name}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-[3px] border border-accent/45 bg-bg/80 px-[3px] py-px font-mono text-[0.45rem] leading-none tracking-[0.06em] text-accent"
              style={{ left: `${e.x}%`, top: `${e.y}%`, scale: "var(--lab, var(--cam, 1))" }}
            >
              {e.name}
            </span>
          ))}
      </div>
      {children}
    </div>
  );
}
