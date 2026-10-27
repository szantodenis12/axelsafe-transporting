"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

/**
 * Keyboard shortcuts for daily use. Ignored while typing in a field.
 *  list:   j / k (or ↓ ↑ when a row is focused) move between rows · Enter opens · / focuses search · g d → dashboard
 *  detail: n focus note · s focus status note · Esc or l back to the list
 */
export function Hotkeys({ mode }: { mode: "list" | "detail" }) {
  const router = useRouter();

  useEffect(() => {
    let lastG = 0;

    const rows = () => Array.from(document.querySelectorAll<HTMLElement>("[data-row-link]"));
    const focusRow = (delta: 1 | -1) => {
      const list = rows();
      if (!list.length) return;
      const i = list.indexOf(document.activeElement as HTMLElement);
      const next = i === -1 ? (delta === 1 ? 0 : list.length - 1) : Math.min(list.length - 1, Math.max(0, i + delta));
      list[next].focus();
      list[next].scrollIntoView({ block: "nearest" });
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      const typing = Boolean(target?.closest("input, textarea, select, [contenteditable='true']"));
      if (typing) {
        if (e.key === "Escape") (target as HTMLElement).blur();
        return;
      }

      if (e.key === "g") {
        lastG = Date.now();
        return;
      }
      if (e.key === "d" && Date.now() - lastG < 900) {
        router.push("/admin");
        return;
      }

      if (mode === "list") {
        const onRow = Boolean(target?.hasAttribute("data-row-link"));
        if (e.key === "j" || (e.key === "ArrowDown" && onRow)) {
          e.preventDefault();
          focusRow(1);
        } else if (e.key === "k" || (e.key === "ArrowUp" && onRow)) {
          e.preventDefault();
          focusRow(-1);
        } else if (e.key === "/") {
          e.preventDefault();
          document.getElementById("f-q")?.focus();
        }
      } else {
        if (e.key === "n") {
          e.preventDefault();
          document.getElementById("lead-note")?.focus();
        } else if (e.key === "s") {
          e.preventDefault();
          document.getElementById("lead-status-note")?.focus();
        } else if (e.key === "Escape" || e.key === "l") {
          router.push("/admin/leads");
        }
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode, router]);

  return null;
}
