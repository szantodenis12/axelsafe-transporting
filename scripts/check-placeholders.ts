/**
 * Pre-launch guard for prototype data.
 *
 * - Lists every [PLACEHOLDER] fact in companyData.ts and every "[PLACEHOLDER]" marker in src/content.
 * - Preview builds: prints a warning and continues.
 * - Production builds (NEXT_PUBLIC_SITE_ENV=production): exits 1 → the build fails until all are resolved.
 *
 * Runs automatically before `pnpm build` (prebuild). Manual: `pnpm check:placeholders`.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { listPlaceholders } from "../src/content/companyData";

const production = process.env.NEXT_PUBLIC_SITE_ENV === "production";

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : /\.(ts|tsx|json|md)$/.test(name) ? [p] : [];
  });
}

const facts = listPlaceholders();
const markers = walk("src/content")
  .filter((f) => !f.endsWith("companyData.ts"))
  .flatMap((f) =>
    readFileSync(f, "utf8")
      .split("\n")
      .map((line, i) => ({ f, line: i + 1, text: line.trim() }))
      .filter((l) => l.text.includes("[PLACEHOLDER]")),
  );

const total = facts.length + markers.length;
const color = production ? "\x1b[31m" : "\x1b[33m";
const reset = "\x1b[0m";

if (total === 0) {
  console.log("✓ No placeholders — content is launch-ready.");
  process.exit(0);
}

console.log(`${color}${production ? "✗ BLOCKED" : "⚠ PREVIEW"}: ${total} unverified placeholder item(s).${reset}`);
for (const p of facts) console.log(`  companyData.${p.key} — ${p.note}`);
for (const m of markers) console.log(`  ${m.f}:${m.line} — ${m.text.slice(0, 110)}`);

if (production) {
  console.log(`${color}Replace each item with verified data or remove it before a production build.${reset}`);
  process.exit(1);
}
console.log("Preview build continues. Placeholders are highlighted via the PREVIEW badge.");
