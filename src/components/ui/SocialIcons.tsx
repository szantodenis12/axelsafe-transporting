import { Ph } from "@/components/ui/Ph";
import { fact } from "@/content/companyData";

/** Brand marks (Lucide no longer ships brand logos) — monochrome, currentColor. */
const paths: Record<string, string> = {
  facebook:
    "M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1z",
  linkedin:
    "M6.9 8.7H3.8V20h3.1V8.7zM5.4 3.5a1.8 1.8 0 1 0 0 3.6 1.8 1.8 0 0 0 0-3.6zM20.2 13.6c0-3-.6-5.2-4.1-5.2-1.7 0-2.8.9-3.3 1.8h-.1V8.7H9.8V20h3.1v-5.6c0-1.5.3-2.9 2.1-2.9s1.8 1.7 1.8 3V20h3.1v-6.4z",
  instagram:
    "M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm4.9-8.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2zM20.9 8.2c-.1-1.4-.4-2.7-1.4-3.7s-2.3-1.3-3.7-1.4C14.3 3 9.7 3 8.2 3.1c-1.4.1-2.7.4-3.7 1.4S3.2 6.8 3.1 8.2C3 9.7 3 14.3 3.1 15.8c.1 1.4.4 2.7 1.4 3.7s2.3 1.3 3.7 1.4c1.5.1 6.1.1 7.6 0 1.4-.1 2.7-.4 3.7-1.4s1.3-2.3 1.4-3.7c.1-1.5.1-6.1 0-7.6zm-2 9.7c-.3.8-.9 1.4-1.7 1.7-1.2.5-4 .4-5.2.4s-4.1.1-5.2-.4c-.8-.3-1.4-.9-1.7-1.7-.5-1.2-.4-4-.4-5.2s-.1-4.1.4-5.2c.3-.8.9-1.4 1.7-1.7 1.2-.5 4-.4 5.2-.4s4.1-.1 5.2.4c.8.3 1.4.9 1.7 1.7.5 1.2.4 4 .4 5.2s.1 4.1-.4 5.2z",
};

export function SocialIcons({ className = "" }: { className?: string }) {
  const links = fact("social");
  return (
    <Ph k="social" as="ul" className={`flex items-center gap-2 ${className}`}>
      {links.map((s) => (
        <li key={s.network}>
          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`AXEL SAFE TRANSPORTING on ${s.label}`}
            className="grid h-11 w-11 place-items-center rounded-full border md:h-10 md:w-10 border-line-strong text-ink-2 transition-colors duration-300 hover:border-accent/60 hover:text-ink"
          >
            <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" fill="currentColor" aria-hidden="true">
              <path d={paths[s.network]} />
            </svg>
          </a>
        </li>
      ))}
    </Ph>
  );
}
