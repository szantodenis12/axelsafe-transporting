import { MessageCircle } from "lucide-react";
import { Ph } from "@/components/ui/Ph";
import { fact } from "@/content/companyData";

/**
 * Floating WhatsApp shortcut (public pages only — admin has its own root layout).
 * Bottom-right, inside the safe-area insets. In preview builds it sits above the compact PREVIEW badge (also
 * bottom-right, z-80) so they never overlap; the Next dev indicator lives bottom-left. No backdrop-filter, 48px target.
 */
export function WhatsAppButton({ label, message, raised }: { label: string; message: string; raised: boolean }) {
  const { number } = fact("whatsapp");
  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  return (
    <Ph k="whatsapp" className={`fixed z-[70] right-[max(1rem,env(safe-area-inset-right))] ${
        raised
          ? "bottom-[calc(max(0.75rem,env(safe-area-inset-bottom))+44px)] sm:bottom-[calc(1rem+48px)]"
          : "bottom-[max(1rem,env(safe-area-inset-bottom))] md:bottom-6"
      }`}>
      <a
        href={url}
        target="_blank"
        rel="noopener"
        aria-label={label}
        title={label}
        className="grid h-12 w-12 place-items-center rounded-full border border-line-strong bg-ink text-bg shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:-translate-y-0.5"
      >
        <MessageCircle size={22} strokeWidth={1.7} aria-hidden />
      </a>
    </Ph>
  );
}
