"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Pill, ArrowLink } from "@/components/ui/Pill";
import { EarthFrame, REGHIN } from "./EarthFrame";
import { DESKTOP_SCENE_QUERY, MOBILE_SCENE_QUERY, isLiteDevice } from "./heroMotion";

gsap.registerPlugin(ScrollTrigger);
// Touch browsers resize the viewport whenever the URL bar collapses; the mobile scene is sized in svh/lvh and must not re-measure on that.
ScrollTrigger.config({ ignoreMobileResize: true });

type Props = {
  hero: {
    eyebrow: string;
    titleLines: readonly string[];
    text: string;
    primary: { href: string; label: string };
    secondary: { href: string; label: string };
    micro: readonly string[];
  };
  intro: {
    eyebrow: string;
    title: string;
    paragraphs: readonly string[];
    emphasis: string;
    cta: { href: string; label: string };
  };
  originLabel: string;
  networkPanel: ReactNode;
};

/** Ambient loop sources, best first. Only used if the device reports power-efficient (hardware) decoding; otherwise the last entry. */
const VIDEO_SOURCES = [
  { src: "/media/earth-loop-1440.av1.mp4", type: 'video/mp4; codecs="av01.0.12M.08"', w: 2560, h: 1440 },
  { src: "/media/earth-loop-1440.hevc.mp4", type: 'video/mp4; codecs="hvc1.1.6.L150.B0"', w: 2560, h: 1440 },
  { src: "/media/earth-loop-1080.h264.mp4", type: "", w: 1920, h: 1080 },
] as const;

/** Camera move of the network phase: focal point (frame %) → screen point (viewport %), at scale S.
 *  The frame is LAID OUT at its final zoomed size (S × cover, via --cam) and animated from scale 1/S up to 1, so the
 *  composited layer is rasterised at the zoomed resolution and the end state is sharp (a layer rastered small and then
 *  scaled up with a transform would be soft). */
const CAM = { fx: 0.7, fy: 0.64, tx: 0.555, ty: 0.47, scale: 1.5 };

/** Timeline times (see the tl below) that gate the traffic-flow animation: mounted from FLOW_ON, running between
 *  FLOW_RUN (its fade-in starts) and FLOW_END (the exit dim is well on its way). */
const FLOW = { on: 0.4, run: 0.52, end: 1.3 };
/** Freeze the flow while the camera is being scrubbed (it resumes FLOW_SETTLE seconds after the timeline stops moving). */
const PAUSE_FLOW_WHILE_SCRUBBING = false;
const FLOW_SETTLE = 0.18;

/**
 * MOBILE / TABLET-PORTRAIT SCENE (data-motion="mobile"). Same registered frame, same transform-only reveal, re-staged for a
 * portrait screen. Timeline unit = 160 svh of scroll (stage = 420 svh = 2×1.6 + 1 overlap screen; m5 density pass: was 500 svh / 200 svh). The text and the bright
 * network never share screen space: the intro is read over the dimmed photograph, the roads light up only once it has left.
 *   0.00–0.12 hero copy leaves        0.02–0.72 camera push: Europe slice → Reghin at the very bottom of the screen (pose A)
 *   0.28–0.46 intro text over the dimmed, heavily scrimmed photo (Reghin and the network are below the text)
 *   0.84–0.92 intro leaves  → 0.80–1.20 roads light up outward from Reghin while 0.80–1.10 the camera drifts up and west
 *   along the E60 corridor (pose B)   1.00–1.16 network panel rises as a bottom sheet
 *   1.36–2.00 exit: panel out fast, scene dims at once, next section rises over it (from 1.5)
 * The frame is laid out at its final zoom (--cam, computed per screen so it still COVERS the viewport when Reghin sits at
 * pose B) and scaled 1/S → 1, exactly like the desktop scene.
 */
const MOBILE = {
  startFx: 0.74, // frame fraction under the screen centre at the start (limb + Central Europe)
  poseA: { tx: 0.5, ty: 0.94 },
  poseB: { tx: 0.54, ty: 0.38 },
  minScale: 1.5,
  maxScale: 2.3,
  label: 1.3,
  total: 2.0,
  flow: { on: 0.8, run: 0.88, end: 1.75 },
};

/**
 * Homepage cinematic stage — GEOGRAPHY → CONNECTION, as one continuous shot.
 *
 * Default markup = stacked layout (hero, then intro + a static network figure) for phones,
 * reduced motion and no-JS. On capable screens data-motion="on" turns the stage into a sticky
 * scene: the camera pushes into Europe, the principal road network lights up outward from
 * Reghin (pixel-registered to the photograph), traffic flows along the corridors.
 */
export function HeroStage({ hero, intro, originLabel, networkPanel }: Props) {
  const stageRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoGate = useRef({ allow: true, ready: false });

  // Ambient video at rest: only when motion is welcome and the connection isn't constrained.
  // The scroll timeline (below) pauses it once it has faded out / scrolled away and resumes it on the way back.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce || saveData) return;
    const gate = videoGate.current;
    let cancelled = false;
    let loading = false;
    const onPlaying = () => (v.dataset.ready = "true");
    v.addEventListener("playing", onPlaying);

    const load = async () => {
      if (loading || gate.ready) return;
      loading = true;
      // Prefer a codec the device decodes power-efficiently (hardware); AV1 only if it qualifies, else 1080p H.264.
      let src = VIDEO_SOURCES[VIDEO_SOURCES.length - 1].src;
      const mc = navigator.mediaCapabilities;
      if (mc?.decodingInfo) {
        for (const c of VIDEO_SOURCES) {
          if (!c.type) break;
          try {
            const r = await mc.decodingInfo({
              type: "file",
              video: { contentType: c.type, width: c.w, height: c.h, bitrate: 6_000_000, framerate: 30 },
            });
            if (r.supported && r.powerEfficient) {
              src = c.src;
              break;
            }
          } catch {
            /* try next */
          }
        }
      }
      if (cancelled) return;
      v.src = src;
      gate.ready = true;
      if (gate.allow && mq.matches) v.play().catch(() => {});
    };

    // Only the desktop scene plays the video; phones / portrait tablets get the crisp still (16:9 video would be upscaled
    // inside the registered frame). The scene can change live (DevTools device emulation, rotation, resizing the window),
    // so follow it: start (once) when the desktop scene turns on, pause + hide the video when it turns off.
    const mq = window.matchMedia(DESKTOP_SCENE_QUERY);
    const sync = () => {
      if (mq.matches) {
        // reload mid-page: don't start decoding a video nobody can see
        gate.allow = window.scrollY < window.innerHeight * 0.25;
        if (!gate.ready) void load();
        else if (gate.allow) v.play().catch(() => {});
      } else {
        v.pause();
        delete v.dataset.ready;
      }
    };
    mq.addEventListener("change", sync);
    sync();

    return () => {
      cancelled = true;
      mq.removeEventListener("change", sync);
      v.removeEventListener("playing", onPlaying);
      v.pause();
    };
  }, []);

  useEffect(() => {
    const stage = stageRef.current;
    const frame = frameRef.current;
    if (!stage || !frame) return;
    const mm = gsap.matchMedia();

    mm.add(DESKTOP_SCENE_QUERY, () => {
      stage.dataset.motion = "on";
      // everything earth-related is scoped to the VISIBLE frame (the stacked layout's static copy has the same hooks)
      const f = gsap.utils.selector(frame);
      const q = gsap.utils.selector(stage);
      const root = document.documentElement;

      // the frame's layout box is the zoomed (final) size; the CSS reads --cam for width and label size
      frame.style.setProperty("--cam", String(CAM.scale));

      // camera target computed from the frame's untransformed box (= its final, scale-1 box) → robust to any viewport
      const cam = () => {
        const prev = frame.style.transform;
        frame.style.transform = "none";
        const r = frame.getBoundingClientRect();
        frame.style.transform = prev;
        return {
          x: CAM.tx * window.innerWidth - r.left - CAM.fx * r.width,
          y: CAM.ty * window.innerHeight - r.top - CAM.fy * r.height,
        };
      };
      let target = cam();
      // Which part of the frame is on screen while the traffic flow runs (final camera pose ± the exit drift ± a margin), as
      // fractions of the frame. RoadsFlow strokes only the corridors that touch it: the dash pattern restarts per subpath, so the
      // look is identical, but the dashed re-stroke (the one repaint that runs during the hold) covers roughly half the path.
      const flowHost = frame.querySelector<HTMLElement>("[data-net-flow]");
      const publishFlowWindow = () => {
        if (!flowHost) return;
        const prev = frame.style.transform;
        frame.style.transform = "none";
        const r = frame.getBoundingClientRect();
        frame.style.transform = prev;
        const m = 0.06;
        const win = [
          -(r.left + target.x) / r.width - m,
          -(r.top + target.y) / r.height - m,
          (window.innerWidth - r.left - target.x) / r.width + m,
          (window.innerHeight - r.top - target.y + window.innerHeight * 0.06) / r.height + m,
        ];
        flowHost.dataset.win = win.map((n) => n.toFixed(3)).join(",");
      };
      publishFlowWindow();
      // Reghin in the frame's own (untransformed) pixels, and the centre of the oversized net box (= Reghin, side 3 × frame
      // width) — cached, so no layout read happens while scrolling
      let ox = 0;
      let oy = 0;
      let cn = 0;
      const measure = () => {
        const w = frame.offsetWidth;
        ox = (REGHIN.x / 100) * w;
        oy = (REGHIN.y / 100) * (w * 9) / 16;
        cn = 1.5 * w;
      };
      measure();

      const net = frame.querySelector<HTMLElement>("[data-net]")!;
      const netInner = frame.querySelector<HTMLElement>("[data-net-inner]")!;

      // start state = the old unzoomed framing (final box shrunk to 1/S, anchored at its top-left)
      gsap.set(frame, { transformOrigin: "0 0", x: 0, y: 0, scale: 1 / CAM.scale });
      gsap.set(q("[data-intro]"), { autoAlpha: 0, y: 40 });
      gsap.set(q("[data-panel]"), { autoAlpha: 0, y: 20 });
      gsap.set(q("[data-indicator-fill]"), { scaleY: 0 });
      gsap.set(q("[data-exit-dim]"), { opacity: 0 });

      // Network reveal = scale the (statically masked, oversized, Reghin-centred) wrapper while counter-scaling its content.
      // The mask is black to 55% / clear at 85% of the half-side (1.5 W) → black radius 0.825 W·sc, clear at 1.275 W·sc, so
      // sc must reach REVEAL_MAX = 1.3 for the black core (1.07 W) to cover the whole frame (farthest corner = 0.92 W).
      // Per frame: two transforms + one opacity, no mask / custom-property invalidation, no repaint.
      const REVEAL_MIN = 0.08;
      const REVEAL_MAX = 1.3;
      const reveal = { v: 0 };
      const applyReveal = () => {
        const sc = REVEAL_MIN + (REVEAL_MAX - REVEAL_MIN) * reveal.v;
        // scale about the box centre (Reghin) with transform-origin 0 0:  x = C·(1−s)   (inner: about Reghin, 1/s)
        gsap.set(net, { x: cn * (1 - sc), y: cn * (1 - sc), scale: sc, opacity: Math.min(1, reveal.v * 6) });
        gsap.set(netInner, { x: ox * (1 - 1 / sc), y: oy * (1 - 1 / sc), scale: 1 / sc });
      };
      gsap.set([net, netInner], { transformOrigin: "0 0" });
      applyReveal();

      // ── traffic flow gating: DOM writes only when the state actually changes ──
      const flowEl = f<HTMLElement>("[data-net-flow]")[0];
      let flowOn = false;
      let flowRun = false;
      let scrubbing = false;
      let lastT = 0; // timeline time at the last update
      const syncFlow = () => {
        if (!flowEl) return;
        const t = lastT;
        const on = t >= FLOW.on && t <= FLOW.end + 0.1;
        const run = on && t >= FLOW.run && t <= FLOW.end && !(PAUSE_FLOW_WHILE_SCRUBBING && scrubbing);
        if (on !== flowOn) flowEl.dataset.on = String((flowOn = on));
        if (run !== flowRun) flowEl.dataset.run = String((flowRun = run));
      };
      const settle = gsap.delayedCall(FLOW_SETTLE, () => {
        scrubbing = false;
        syncFlow();
      });
      settle.pause();
      const onTick = (t: number) => {
        lastT = t;
        scrubbing = true;
        settle.restart(true);
        syncFlow();
      };

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        onUpdate() {
          onTick(this.time());
        },
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.3, // Lenis already eases the wheel; 0.5 on top made the camera lag behind the page
          invalidateOnRefresh: true,
          onRefreshInit: () => {
            target = cam();
            publishFlowWindow();
            measure();
            applyReveal();
          },
        },
      });

      tl
        // hero copy leaves, the ambient video hands over to the (registered) still
        .to(q("[data-hero]"), { autoAlpha: 0, y: -60, duration: 0.14, ease: "power1.in" }, 0)
        .to(f("[data-earth-video]"), { autoAlpha: 0, duration: 0.06 }, 0.01)
        // one continuous camera move into Europe
        .fromTo(
          frame,
          { x: 0, y: 0, scale: 1 / CAM.scale },
          { x: () => target.x, y: () => target.y, scale: 1, duration: 0.6, ease: "power2.inOut", immediateRender: false },
          0.02,
        )
        .to(f("[data-net-shade]"), { opacity: 0.45, duration: 0.3 }, 0.18)
        .to(q("[data-left-shade]"), { opacity: 1, duration: 0.25 }, 0.2)
        // the network lights up outward from Reghin
        .to(reveal, { v: 1, duration: 0.46, ease: "power1.inOut", onUpdate: applyReveal }, 0.24)
        .to(f("[data-net-labels]"), { opacity: 1, duration: 0.12 }, 0.5)
        .to(f("[data-net-flow]"), { opacity: 0.75, duration: 0.14 }, 0.52)
        // editorial section + information panel
        .to(q("[data-intro]"), { autoAlpha: 1, y: 0, duration: 0.16, ease: "power2.out" }, 0.34)
        .to(q("[data-indicator-fill]"), { scaleY: 1, duration: 0.5 }, 0.38)
        .to(q("[data-panel]"), { autoAlpha: 1, y: 0, duration: 0.12, ease: "power2.out" }, 0.62)
        // ── exit phase (1.0 → 1.5): the next section (.home-rise) slides up over the pin while the scene
        // dims, its copy drifts up and fades, and the earth drifts the other way — transform/opacity only
        .to(q("[data-exit-dim]"), { opacity: 0.85, duration: 0.45, ease: "power1.in" }, 1.02)
        .to(q("[data-panel]"), { autoAlpha: 0, y: -50, duration: 0.24, ease: "power1.in" }, 1.0)
        .to(q("[data-intro]"), { autoAlpha: 0, y: -90, duration: 0.32, ease: "power1.in" }, 1.02)
        .to(frame, { y: () => target.y - window.innerHeight * 0.06, duration: 0.5 }, 1.0)
        .to({}, { duration: 0.0001 }, 1.5); // pin the timeline length to the exit phase

      // Video: decode only while it can be seen (first ~25% of a viewport of scrolling).
      const v = videoRef.current;
      const gate = videoGate.current;
      const videoST = ScrollTrigger.create({
        trigger: stage,
        start: "top top",
        end: () => "+=" + window.innerHeight * 0.25,
        // (onLeave/onEnterBack rather than onToggle: isActive is false again when back at exactly scroll 0)
        onLeave: () => {
          gate.allow = false;
          if (v && gate.ready) v.pause();
        },
        onEnterBack: () => {
          gate.allow = true;
          if (v && gate.ready) v.play().catch(() => {});
        },
      });

      // The hero hides the ambient layer: keep its animations idle until the stage has left the viewport.
      const ambientST = ScrollTrigger.create({
        trigger: stage,
        start: "top top",
        end: "bottom top",
        onLeave: () => delete root.dataset.heroActive,
        onEnterBack: () => (root.dataset.heroActive = "true"),
      });
      if (window.scrollY < stage.offsetHeight) root.dataset.heroActive = "true";

      // layout height changed (400svh stage + overlap) → recompute every trigger on the page
      ScrollTrigger.refresh();

      return () => {
        videoST.kill();
        ambientST.kill();
        settle.kill();
        if (flowEl) {
          delete flowEl.dataset.on;
          delete flowEl.dataset.run;
        }
        delete flowHost?.dataset.win;
        frame.style.removeProperty("--cam");
        delete root.dataset.heroActive;
        delete stage.dataset.motion;
        gsap.set(frame, { clearProps: "transform" });
        gsap.set([net, netInner], { clearProps: "transform,opacity,transformOrigin" });
        // (the video effect above pauses / resumes the video when the desktop scene turns off / on)
        // back to the stacked layout: re-measure everything that sits below
        requestAnimationFrame(() => ScrollTrigger.refresh());
      };
    });

    // ───────────────────────── mobile / portrait scene ─────────────────────────
    mm.add(MOBILE_SCENE_QUERY, () => {
      const earth = frame.parentElement as HTMLElement; // .hero-earth: 100 lvh tall, clips the frame
      const lite = isLiteDevice();
      stage.dataset.motion = "mobile";
      if (lite) stage.dataset.lite = "true";
      const f = gsap.utils.selector(frame);
      const q = gsap.utils.selector(stage);
      const root = document.documentElement;
      const net = frame.querySelector<HTMLElement>("[data-net]")!;
      const netInner = frame.querySelector<HTMLElement>("[data-net-inner]")!;

      // the always-visible height (svh): browser toolbars never cover it, so every screen position is expressed in it
      const probe = document.createElement("div");
      probe.style.cssText = "position:fixed;left:0;top:0;width:0;height:100svh;visibility:hidden;pointer-events:none";
      stage.appendChild(probe);

      let sv = 0;
      let poseA = { x: 0, y: 0 };
      let poseB = { x: 0, y: 0 };
      let startScale = 1 / MOBILE.minScale;
      let ox = 0;
      let oy = 0;
      let cn = 0;
      let revealMax = 0.3;
      const REVEAL_MIN = 0.02;

      const geometry = () => {
        const cw = earth.clientWidth;
        const ch = earth.clientHeight; // lvh
        sv = Math.min(probe.offsetHeight || ch, ch);
        const coverH = Math.max((cw * 9) / 16, ch);
        const fy = REGHIN.y / 100;
        const fx = REGHIN.x / 100;
        // zoom needed so that, with Reghin at pose B, the frame still reaches the bottom of the screen (no seam under the sheet)
        const need = (ch - MOBILE.poseB.ty * sv) / (1 - fy);
        const S = Math.min(MOBILE.maxScale, Math.max(MOBILE.minScale, (need / coverH) * 1.03));
        startScale = 1 / S;
        frame.style.setProperty("--cam", String(S));
        frame.style.setProperty("--lab", String(MOBILE.label));
        // untransformed (final) box relative to the clipping container → robust to any viewport / orientation
        const prev = frame.style.transform;
        frame.style.transform = "none";
        const r = frame.getBoundingClientRect();
        const c = earth.getBoundingClientRect();
        frame.style.transform = prev;
        const left0 = r.left - c.left;
        const top0 = r.top - c.top;
        // keep the frame covering the container horizontally: Reghin cannot sit further left than this
        const minTx = (cw - (1 - fx) * r.width) / cw;
        const pose = (tx: number, ty: number) => ({
          x: Math.max(tx, minTx + 0.001) * cw - left0 - fx * r.width,
          y: ty * sv - top0 - fy * r.height,
        });
        poseA = pose(MOBILE.poseA.tx, MOBILE.poseA.ty);
        poseB = pose(Math.min(MOBILE.poseB.tx, 1 - 168 / cw), MOBILE.poseB.ty); // leaves room for the origin label
        ox = fx * r.width;
        oy = fy * r.height;
        cn = 1.5 * r.width;
        // the mask's solid core (0.825 × half-side of the oversized box) must cover the farthest visible corner from Reghin
        const far = Math.max(
          ...[
            [0, 0],
            [cw, 0],
            [0, ch],
            [cw, ch],
          ].flatMap(([px, py]) => [poseA, poseB].map((p) => Math.hypot(px - (left0 + p.x + ox), py - (top0 + p.y + oy)))),
        );
        revealMax = Math.max(0.12, (far / (0.825 * 1.5 * r.width)) * 1.06);
        // The part of the frame (as fractions) that is ever on screen while the flow runs: RoadsFlow only strokes the corridors
        // that touch it, so the dashed re-stroke is a fraction of the full-network path (this is what keeps the flow affordable)
        const rh = r.height;
        const seen = [poseA, poseB, { x: poseB.x, y: poseB.y - sv * 0.05 }].map((p) => ({
          x0: -(left0 + p.x) / r.width,
          x1: (cw - left0 - p.x) / r.width,
          y0: -(top0 + p.y) / rh,
          y1: (ch - top0 - p.y) / rh,
        }));
        const m = 0.04;
        const win = [
          Math.min(...seen.map((v) => v.x0)) - m,
          Math.min(...seen.map((v) => v.y0)) - m,
          Math.max(...seen.map((v) => v.x1)) + m,
          Math.max(...seen.map((v) => v.y1)) + m,
        ];
        const host = frame.querySelector<HTMLElement>("[data-net-flow]");
        if (host && !lite) host.dataset.win = win.map((n) => n.toFixed(3)).join(",");
      };
      geometry();

      const reveal = { v: 0 };
      const applyReveal = () => {
        const sc = REVEAL_MIN + (revealMax - REVEAL_MIN) * reveal.v;
        gsap.set(net, { x: cn * (1 - sc), y: cn * (1 - sc), scale: sc, opacity: Math.min(1, reveal.v * 6) });
        gsap.set(netInner, { x: ox * (1 - 1 / sc), y: oy * (1 - 1 / sc), scale: 1 / sc });
      };
      gsap.set([net, netInner], { transformOrigin: "0 0" });
      applyReveal();

      gsap.set(frame, { transformOrigin: "0 0", x: 0, y: 0, scale: startScale });
      gsap.set(q("[data-intro]"), { autoAlpha: 0, y: 32 });
      gsap.set(q("[data-panel]"), { autoAlpha: 0, y: 36 });
      gsap.set(q("[data-exit-dim]"), { opacity: 0 });

      // traffic flow (skipped entirely on lite devices): DOM writes only when the state changes
      const flowEl = lite ? undefined : f<HTMLElement>("[data-net-flow]")[0];
      let flowOn = false;
      let flowRun = false;
      // runs for as long as the network is on screen, scrolling or not (it is only stepped at 10 fps to keep it cheap)
      const syncFlow = (t: number) => {
        if (!flowEl) return;
        const on = t >= MOBILE.flow.on && t <= MOBILE.flow.end + 0.1;
        const run = on && t >= MOBILE.flow.run && t <= MOBILE.flow.end;
        if (on !== flowOn) flowEl.dataset.on = String((flowOn = on));
        if (run !== flowRun) flowEl.dataset.run = String((flowRun = run));
      };

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        onUpdate() {
          syncFlow(this.time());
        },
        scrollTrigger: {
          trigger: stage,
          start: "top top",
          end: () => "+=" + Math.max(1, stage.offsetHeight - sv),
          scrub: 0.35,
          invalidateOnRefresh: true,
          onRefreshInit: () => {
            geometry();
            applyReveal();
          },
        },
      });

      tl.to(q("[data-hero]"), { autoAlpha: 0, y: -48, duration: 0.12, ease: "power1.in" }, 0)
        .fromTo(
          frame,
          { x: 0, y: 0, scale: () => startScale },
          { x: () => poseA.x, y: () => poseA.y, scale: 1, duration: 0.7, ease: "power2.inOut", immediateRender: false },
          0.02,
        )
        .to(f("[data-net-shade]"), { opacity: 0.4, duration: 0.3 }, 0.16)
        .to(q("[data-left-shade]"), { opacity: 1, duration: 0.22 }, 0.14)
        .to(q("[data-scrim]"), { opacity: 0.12, duration: 0.3 }, 0.12) // the hero-copy scrim gives way to the map
        // editorial text over the dimmed photograph (the roads are not lit yet) …
        .to(q("[data-intro]"), { autoAlpha: 1, y: 0, duration: 0.18, ease: "power2.out" }, 0.28)
        // … it leaves, the roads light up outward from Reghin and the camera drifts up and west along the corridor
        .to(q("[data-intro]"), { autoAlpha: 0, y: -50, duration: 0.08, ease: "power1.in" }, 0.84)
        .to(reveal, { v: 1, duration: 0.4, ease: "power1.inOut", onUpdate: applyReveal }, 0.8)
        .to(frame, { x: () => poseB.x, y: () => poseB.y, duration: 0.3, ease: "power1.inOut" }, 0.8)
        .to(q("[data-left-shade]"), { opacity: 0, duration: 0.18, ease: "power1.inOut" }, 0.9)
        .to(f("[data-net-labels]"), { opacity: 1, duration: 0.12 }, 0.98)
        .to(f("[data-net-flow]"), { opacity: 0.7, duration: 0.14 }, 0.9)
        .to(q("[data-panel]"), { y: 0, duration: 0.16, ease: "power2.out" }, 1.04)
        .to(q("[data-panel]"), { autoAlpha: 1, duration: 0.08, ease: "none" }, 1.06)
        // exit: the panel clears fast and the map dims under the incoming section, so nothing fades muddily over bright roads
        .to(q("[data-panel]"), { autoAlpha: 0, y: -30, duration: 0.1, ease: "power1.in" }, 1.36)
        .to(q("[data-exit-dim]"), { opacity: 0.92, duration: 0.36, ease: "power2.out" }, 1.34)
        .to(frame, { y: () => poseB.y - sv * 0.05, duration: 0.55 }, 1.4)
        .to({}, { duration: 0.0001 }, MOBILE.total);

      const ambientST = ScrollTrigger.create({
        trigger: stage,
        start: "top top",
        end: "bottom top",
        onLeave: () => delete root.dataset.heroActive,
        onEnterBack: () => (root.dataset.heroActive = "true"),
      });
      if (window.scrollY < stage.offsetHeight) root.dataset.heroActive = "true";

      ScrollTrigger.refresh();

      return () => {
        ambientST.kill();
        probe.remove();
        if (flowEl) {
          delete flowEl.dataset.on;
          delete flowEl.dataset.run;
        }
        frame.style.removeProperty("--cam");
        frame.style.removeProperty("--lab");
        delete frame.querySelector<HTMLElement>("[data-net-flow]")?.dataset.win;
        delete root.dataset.heroActive;
        delete stage.dataset.motion;
        delete stage.dataset.lite;
        gsap.set(frame, { clearProps: "transform" });
        gsap.set([net, netInner], { clearProps: "transform,opacity,transformOrigin" });
        requestAnimationFrame(() => ScrollTrigger.refresh());
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={stageRef} className="hero-stage relative" aria-label={hero.titleLines.join(" ")}>
      <div className="hero-pin relative">
        {/* ── Earth + network layer (one registered frame) ── */}
        <div className="hero-earth pointer-events-none absolute inset-x-0 top-0 h-svh overflow-hidden">
          <EarthFrame
            frameRef={frameRef}
            videoRef={videoRef}
            originLabel={originLabel}
            priority
            className="stage-frame"
          />
          {/* z-order inside .hero-earth (isolated): frame → static scrim → left shade → mobile wash → exit dim */}
          <div data-scrim className="hero-scrim absolute inset-0" />
          <div
            data-left-shade
            className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,11,22,0.94)_0%,rgba(6,11,22,0.8)_28%,rgba(6,11,22,0.15)_50%,rgba(6,11,22,0)_62%)] opacity-0"
          />
          <div data-wash className="absolute inset-0 bg-bg/45 md:hidden" />
          <div data-exit-dim className="absolute inset-0 bg-bg opacity-0" />
        </div>

        {/* ── 01 Hero ── */}
        <div data-hero className="hero-block relative flex h-svh min-h-[600px] flex-col">
          <div className="wrap flex flex-1 flex-col justify-end pb-[clamp(40px,8vh,96px)] pt-[calc(var(--header-h)+40px)]">
            <h1 className="t-display">
              {hero.titleLines.map((line, i) => (
                <span key={line} className="mask-line sm:whitespace-nowrap">
                  <span style={{ "--d": `${0.18 + i * 0.12}s` } as React.CSSProperties}>{line}</span>
                </span>
              ))}
            </h1>
            <p className="t-lead fade-up mt-7 max-w-[46ch] md:mt-9" style={{ "--d": "0.55s" } as React.CSSProperties}>
              {hero.text}
            </p>
            <div className="fade-up mt-9 flex flex-wrap items-center gap-3" style={{ "--d": "0.35s" } as React.CSSProperties}>
              <Pill href={hero.primary.href}>{hero.primary.label}</Pill>
              <Pill href={hero.secondary.href} variant="ghost" arrow="diag">
                {hero.secondary.label}
              </Pill>
            </div>
            <div
              className="fade-up mt-[clamp(40px,8vh,88px)] flex items-center justify-between gap-6 border-t border-line pt-5"
              style={{ "--d": "0.8s" } as React.CSSProperties}
            >
              <ul className="t-label flex flex-wrap gap-x-6 gap-y-2">
                {hero.micro.map((m, i) => (
                  <li key={m} className="flex items-center gap-6">
                    {i > 0 && <span aria-hidden className="hidden h-px w-5 bg-line-strong sm:block" />}
                    {m}
                  </li>
                ))}
              </ul>
              <span className="t-label hidden items-center gap-3 md:flex" aria-hidden>
                Scroll
                <span className="relative h-8 w-px overflow-hidden bg-line">
                  <span className="scroll-cue absolute inset-x-0 top-0 h-1/2 bg-accent" />
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* ── 02 Intro + network information ── */}
        <div className="intro-block relative">
          <div className="wrap grid-12 h-full content-center items-center gap-y-12 py-[clamp(64px,8vw,120px)]">
            <div data-intro className="relative col-span-12 md:col-span-6 lg:col-span-5">
              <div className="absolute -left-[clamp(14px,2vw,32px)] top-1 bottom-1 hidden w-px bg-line md:block" aria-hidden>
                <span data-indicator-fill className="absolute inset-0 origin-top bg-accent/70" />
              </div>
              <h2 className="t-h2 max-w-[14ch]">{intro.title}</h2>
              <div className="mt-8 max-w-[44ch] space-y-5">
                {intro.paragraphs.map((p) => (
                  <p key={p} className="t-body">
                    {p}
                  </p>
                ))}
                <p className="pt-1 text-[1.1875rem] leading-snug font-normal tracking-[-0.012em] text-ink">{intro.emphasis}</p>
              </div>
              <div className="mt-9">
                <ArrowLink href={intro.cta.href}>{intro.cta.label}</ArrowLink>
              </div>
            </div>

            {/* static network figure — only in the stacked (non-motion) layout */}
            <div className="static-figure relative col-span-12 aspect-[4/3] overflow-hidden rounded-[22px] border border-line md:col-span-6 lg:col-span-7">
              <EarthFrame originLabel={originLabel} revealed style={{ width: "250%", left: "-125%", top: "-74%" }} />
            </div>

            <div data-panel className="network-panel col-span-12">
              {networkPanel}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
