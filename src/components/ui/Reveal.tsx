"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

/**
 * Lightweight scroll reveal — one IntersectionObserver per element, CSS does the motion.
 * Use sparingly: section headings and blocks, never every paragraph.
 */
export function Reveal({
  as: Tag = "div",
  children,
  delay = 0,
  variant,
  early = false,
  className = "",
  ...rest
}: {
  as?: ElementType;
  children: ReactNode;
  delay?: number;
  variant?: "fade";
  /** reveal as soon as the element touches the viewport edge (used where a section slides up over another) */
  early?: boolean;
  className?: string;
} & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.in = "true";
          io.disconnect();
        }
      },
      { rootMargin: early ? "0px 0px 6% 0px" : "0px 0px -12% 0px", threshold: early ? 0 : 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [early]);

  return (
    <Tag
      ref={ref}
      data-reveal={variant ?? ""}
      className={className}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
