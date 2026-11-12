/**
 * ANAF public VAT web service (synchronous, v9): SERVER ONLY, no key needed.
 *
 *   POST https://webservicesp.anaf.ro/api/PlatitorTvaRest/v9/tva
 *   body: [{ "cui": 12345678, "data": "YYYY-MM-DD" }]   (max 100 CUIs, max 1 request / second)
 *   200 { cod, message, found: [{ date_generale, inregistrare_scop_Tva, stare_inactiv, … }], notFound: [] }
 *
 * Source: https://static.anaf.ro/static/10/Anaf/Informatii_R/Servicii_web/doc_WS_V9.txt (checked 10.11.2026).
 * The service has no insolvency field; we flag it from the registration status text and the UI says
 * insolvency must still be confirmed manually (BPI / ONRC).
 */
import type { AnafSnapshot } from "@/lib/leads/types";

if (typeof window !== "undefined") {
  throw new Error("lib/admin/anaf must never be bundled for the browser");
}

const ENDPOINT = "https://webservicesp.anaf.ro/api/PlatitorTvaRest/v9/tva";
const TIMEOUT_MS = 10_000;

export type AnafResult =
  | { ok: true; snapshot: Omit<AnafSnapshot, "checkedBy"> }
  | { ok: false; error: "invalid_cui" | "foreign" | "not_found" | "unavailable" };

/** "RO 12345678" / "12345678" → "12345678". Foreign VAT numbers (DE…, ES…) → "foreign". */
export function anafCui(vat: string): string | "foreign" | null {
  const v = vat.toUpperCase().replace(/[\s.\-/]/g, "");
  const m = /^(RO)?(\d{2,10})$/.exec(v);
  if (m) return m[2];
  if (/^[A-Z]{2}/.test(v)) return "foreign";
  return null;
}

/* ANAF asks for max 1 request / second per client: serialise calls within this instance. */
let gate: Promise<unknown> = Promise.resolve();
let lastCall = 0;
function throttled<T>(fn: () => Promise<T>): Promise<T> {
  const run = gate.then(async () => {
    const wait = lastCall + 1100 - Date.now();
    if (wait > 0) await new Promise((r) => setTimeout(r, wait));
    lastCall = Date.now();
    return fn();
  });
  gate = run.catch(() => undefined);
  return run;
}

/** ANAF returns s/t with cedilla (U+015F, U+0163); Romanian uses comma-below (U+0219, U+021B). */
const fixDiacritics = (v: string) =>
  v.replace(/\u015f/g, "\u0219").replace(/\u015e/g, "\u0218").replace(/\u0163/g, "\u021b").replace(/\u0162/g, "\u021a");
const s = (v: unknown) => (typeof v === "string" && v.trim() ? fixDiacritics(v.trim()) : undefined);
const b = (v: unknown) => v === true || v === "true";

const INSOLVENCY_RE = /INSOLV|FALIMENT|REORGANIZ|LICHIDAR|DIZOLV|RADIER|RADIAT/i;

type AnafFound = {
  date_generale?: Record<string, unknown>;
  inregistrare_scop_Tva?: { scpTVA?: unknown; perioade_TVA?: Array<Record<string, unknown>> | Record<string, unknown> };
  stare_inactiv?: Record<string, unknown>;
};

export async function lookupAnaf(vat: string, today = new Date()): Promise<AnafResult> {
  const cui = anafCui(vat);
  if (cui === "foreign") return { ok: false, error: "foreign" };
  if (!cui) return { ok: false, error: "invalid_cui" };

  const date = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Bucharest" }).format(today); // YYYY-MM-DD

  let json: { found?: AnafFound[]; notFound?: unknown[] };
  try {
    json = await throttled(async () => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
      try {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify([{ cui: Number(cui), data: date }]),
          signal: controller.signal,
          cache: "no-store",
        });
        // Unknown CUIs come back as HTTP 404 with {"found":[],"notFound":[cui]} (observed 10.11.2026).
        if (res.status === 404) return { found: [], notFound: [cui] };
        if (!res.ok) throw new Error(`ANAF responded ${res.status}`);
        return (await res.json()) as { found?: AnafFound[]; notFound?: unknown[] };
      } finally {
        clearTimeout(timer);
      }
    });
  } catch (err) {
    console.error("[anaf] lookup failed:", err instanceof Error ? err.message : "unknown error");
    return { ok: false, error: "unavailable" };
  }

  const found = json.found?.[0];
  if (!found?.date_generale) return { ok: false, error: "not_found" };

  const g = found.date_generale;
  const tva = found.inregistrare_scop_Tva;
  const periods = Array.isArray(tva?.perioade_TVA) ? tva.perioade_TVA : tva?.perioade_TVA ? [tva.perioade_TVA] : [];
  const inactive = found.stare_inactiv ?? {};
  const registrationStatus = s(g.stare_inregistrare);
  const deregisteredAt = s(inactive.dataRadiere);

  return {
    ok: true,
    snapshot: {
      cui,
      name: s(g.denumire) ?? "necunoscut",
      address: s(g.adresa) ?? "necunoscut",
      regCom: s(g.nrRegCom),
      caen: s(g.cod_CAEN),
      registrationStatus,
      registeredAt: s(g.data_inregistrare),
      vatPayer: b(tva?.scpTVA),
      vatSince: s(periods[0]?.data_inceput_ScpTVA),
      inactive: b(inactive.statusInactivi),
      inactiveSince: s(inactive.dataInactivare),
      deregisteredAt,
      insolvencyFlag: Boolean(deregisteredAt) || INSOLVENCY_RE.test(registrationStatus ?? ""),
      eInvoice: typeof g.statusRO_e_Factura === "boolean" ? g.statusRO_e_Factura : undefined,
      checkedAt: new Date().toISOString(),
    },
  };
}
