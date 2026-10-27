"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { btnChip } from "./ui";

/** Copies `value` to the clipboard; announces the result politely. Works on http (dev) via a textarea fallback. */
export function CopyButton({ value, label }: { value: string; label: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    let ok = false;
    try {
      await navigator.clipboard.writeText(value);
      ok = true;
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = value;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        ok = document.execCommand("copy");
        ta.remove();
      } catch {
        ok = false;
      }
    }
    setState(ok ? "copied" : "failed");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 1800);
  }

  return (
    <button type="button" onClick={copy} className={btnChip} aria-label={`Copiază ${label}`}>
      {state === "copied" ? <Check size={13} strokeWidth={2} className="text-[#8fcfbd]" aria-hidden /> : <Copy size={13} strokeWidth={1.6} aria-hidden />}
      <span aria-live="polite">{state === "copied" ? "Copiat" : state === "failed" ? "Eroare la copiere" : "Copiază"}</span>
    </button>
  );
}
