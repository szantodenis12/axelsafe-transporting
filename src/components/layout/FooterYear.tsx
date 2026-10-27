"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/**
 * Current year, computed in the browser. The server-rendered text (the year the page was built, passed in
 * as `fallback`) is the hydration snapshot, so there is no mismatch and no render-time `new Date()` in a
 * cached server component (Cache Components would reject that).
 */
export function FooterYear({ fallback }: { fallback: number }) {
  const year = useSyncExternalStore(
    noopSubscribe,
    () => new Date().getFullYear(),
    () => fallback,
  );
  return <>{year}</>;
}
