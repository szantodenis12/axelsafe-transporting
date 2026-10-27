import type Lenis from "lenis";

/**
 * Shared handle on the page's Lenis instance (null while Lenis is not running: reduced motion, touch devices,
 * before the dynamic import has resolved, and always in /admin). Components that lock scroll or scroll to an
 * element go through this so they work with and without Lenis.
 */
let instance: Lenis | null = null;

export const getLenis = () => instance;
export const setLenis = (next: Lenis | null) => {
  instance = next;
};

/** Scroll lock for overlays (mobile menu). Safe to call when Lenis is not running. */
export function setScrollLocked(locked: boolean) {
  if (!instance) return;
  if (locked) instance.stop();
  else instance.start();
}

/** Centre `el` in the viewport: eased through Lenis when it runs, the browser's smooth scroll otherwise. */
export function scrollElementToCenter(el: HTMLElement) {
  if (instance && !instance.isStopped) {
    instance.scrollTo(el, { offset: -(window.innerHeight / 2 - el.getBoundingClientRect().height / 2) });
    return;
  }
  el.scrollIntoView?.({ block: "center", behavior: "smooth" });
}
