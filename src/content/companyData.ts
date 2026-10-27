/**
 * SINGLE SOURCE OF TRUTH for every business fact shown on the site.
 *
 *   verified(value, source)    → confirmed by the client / official registers
 *   placeholder(value, note)   → [PLACEHOLDER] realistic prototype data, NOT a company fact
 *
 * Rules
 * - Never hardcode a business fact in a component — read it from here.
 * - Every placeholder must be replaced with verified data or removed before launch.
 *   `pnpm check:placeholders` lists them; a production build (SITE_ENV=production) fails while any remain.
 * - In preview builds placeholders render normally; the dev badge (bottom-left) can highlight them.
 */

export type FactStatus = "verified" | "placeholder";
export type Fact<T> = {
  value: T;
  status: FactStatus;
  /** verified: where it was confirmed. placeholder: what must be asked from the client. */
  note: string;
};

const verified = <T>(value: T, source: string): Fact<T> => ({ value, status: "verified", note: source });
const placeholder = <T>(value: T, note: string): Fact<T> => ({
  value,
  status: "placeholder",
  note: `[PLACEHOLDER] ${note}`,
});

export const companyData = {
  /* ───────────── Legal identity — verified (ORC certificate + ANAF, 22.10.2026) ───────────── */
  legalName: verified("AXEL SAFE TRANSPORTING S.R.L.", "ORC certificate 22.10.2026"),
  brandName: verified("AXEL SAFE TRANSPORTING", "client brief"),
  established: verified(2018, "ORC certificate"),
  registrationNumber: verified("J2018001382267", "ORC certificate"),
  vatNumber: verified("RO39875222", "ANAF — VAT payer"),
  caen: verified("Road Freight Transport — CAEN 4941", "ORC certificate"),
  registeredOffice: verified(
    {
      street: "Bld. Libertății, Bl. 14, Sc. 1, Ap. 14",
      city: "Reghin",
      county: "Mureș County",
      postalCode: "545300",
      country: "Romania",
    },
    "ORC certificate",
  ),
  domain: verified("axelsafe-transporting.com", "domain registered 29.07.2026"),
  siteUrl: verified("https://axelsafe-transporting.com", "domain"),

  /* ───────────── Contact — confirmed by the client via Tiberiu (WhatsApp, 22.10.2026) ───────────── */
  email: verified("office@axelsafe-transporting.com", "client, 22.10.2026 — office address"),
  phone: verified(
    { display: "+40 759 419 010", href: "tel:+40759419010" },
    "client, 22.10.2026 — sent together with office@ (pairing assumed from message order)",
  ),
  transportEmail: verified("transport@axelsafe-transporting.com", "client, 22.10.2026 — transport / dispatch address"),
  transportPhone: verified(
    { display: "+40 728 743 509", href: "tel:+40728743509" },
    "client, 22.10.2026 — sent together with transport@ (pairing assumed from message order)",
  ),
  carrierEmail: placeholder(
    "transport@axelsafe-transporting.com",
    "assumed carriers write to transport@ — confirm",
  ),
  businessHours: placeholder("Monday – Friday, 08:00 – 17:00 (EET)", "confirm office hours"),
  responseTime: placeholder("within 2 business hours", "confirm a realistic response time — or remove"),
  social: placeholder(
    [
      { network: "facebook", label: "Facebook", url: "https://www.facebook.com/axelsafetransporting" },
      { network: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/company/axel-safe-transporting" },
      { network: "instagram", label: "Instagram", url: "https://www.instagram.com/axelsafetransporting" },
    ] as const,
    "social pages not created yet (EDH scope: Facebook + LinkedIn) — replace with the real URLs or remove",
  ),

  /* ───────────── Operations ───────────── */
  coverage: verified(["All of Europe"], "client, 22.10.2026: „TOATA EUROPA”"),
  transportTypes: verified(
    [
      { title: "Curtainsider trailers", short: "Curtainsider", text: "Tautliner equipment for palletised and general cargo, loadable from the side, rear or top." },
      { title: "Refrigerated trailers", short: "Refrigerated", text: "Temperature-controlled transport for goods that must stay within a set temperature range." },
      { title: "Mega trailers", short: "Mega", text: "Increased internal height for high-volume, lightweight cargo." },
    ],
    "client, 22.10.2026: „PRELATA, FRIG, MEGA” (descriptions = standard equipment definitions)",
  ),
  /** Typical European semi-trailer figures for the equipment explorer — industry norms, not carrier guarantees. */
  equipmentSpecs: placeholder(
    {
      curtainsider: { length: 13.6, pallets: 33, payload: 24, height: 2.7, volume: 90, temperature: "" },
      refrigerated: { length: 13.4, pallets: 33, payload: 22, height: 2.6, volume: 86, temperature: "−25 °C to +25 °C" },
      mega: { length: 13.6, pallets: 33, payload: 24, height: 3.0, volume: 100, temperature: "" },
    },
    "typical industry figures — confirm with the client / partner carriers before launch",
  ),
  /** Client is early-stage: works with partner organisers, building its own client base → no sectors to show. */
  industries: verified([] as string[], "client, 22.10.2026 — no own client base yet; do not publish sectors"),
  stats: placeholder(
    [
      { value: "150+", label: "independent carrier partners" },
      { value: "2 h", label: "typical first response" },
    ],
    "operational metrics — replace with verified numbers or remove",
  ),

  /* ───────────── Trust — all [PLACEHOLDER]; must be verified or removed before launch ───────────── */
  insurance: placeholder(
    "Freight forwarder liability insurance",
    "confirm whether the company holds forwarder liability insurance (insurer + cover) — otherwise remove",
  ),
  memberships: placeholder([] as string[], "transport platforms / associations (e.g. TimoCom, UNTRR) — confirm or leave empty"),
  carrierVerification: placeholder(
    [
      "Valid company registration and EU Community Licence",
      "Proof of active CMR insurance",
      "Vehicle and trailer documents matching the requested equipment",
      "References or previous cooperation history",
    ],
    "confirm the carrier vetting procedure",
  ),
  carrierConditions: placeholder(
    [
      { title: "Agreed terms per shipment", text: "Rate, loading window and documents are confirmed in writing before every transport." },
      { title: "Payment terms", text: "Payment within 30 days of receiving the invoice and signed CMR." },
      { title: "Clear point of contact", text: "One coordinator for each shipment, from loading to proof of delivery." },
    ],
    "confirm payment terms and cooperation conditions for carriers",
  ),
} as const;

export type CompanyData = typeof companyData;

/** Plain value accessor — components should use this, never `.value` chains on unknown keys. */
export const fact = <K extends keyof CompanyData>(key: K): CompanyData[K]["value"] => companyData[key].value;
export const isPlaceholder = <K extends keyof CompanyData>(key: K) => companyData[key].status === "placeholder";

/** Lists every unresolved placeholder — used by the dev badge and the pre-launch check. */
export function listPlaceholders() {
  return (Object.keys(companyData) as (keyof CompanyData)[])
    .filter((k) => companyData[k].status === "placeholder")
    .map((k) => ({ key: k, note: companyData[k].note }));
}
