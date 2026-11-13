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
  caen: verified("4941, Road freight transport", "ORC certificate"),
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
  carrierEmail: verified(
    "office@axelsafe-transporting.com",
    "discovery call 10.11.2026 — all enquiries centralised via office@ (transport@ is being renamed)",
  ),
  businessHours: verified("24/7", "discovery call 10.11.2026: „non-stop, 24 din 24, 7 din 7”"),
  responseTime: verified("We usually reply to requests in under an hour.", "discovery call 10.11.2026: quote in 2–3 minutes once details are in, „sub o oră”"),
  languages: verified(["Romanian", "English", "Spanish"], "discovery call 10.11.2026"),
  social: placeholder(
    [
      { network: "facebook", label: "Facebook", url: "https://www.facebook.com/axelsafetransporting" },
      { network: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/company/axel-safe-transporting" },
      { network: "instagram", label: "Instagram", url: "https://www.instagram.com/axelsafetransporting" },
    ] as const,
    "social pages not created yet (EDH scope: Facebook + LinkedIn) — replace with the real URLs or remove",
  ),

  /* ───────────── Operations ───────────── */
  coverage: verified(["All of Europe", "United Kingdom"], "client 22.10.2026 + discovery call 10.11.2026 (UK added; Switzerland excluded)"),
  transportTypes: verified(
    [
      { title: "Curtainsider semi-trailer (Tautliner)", short: "Curtainsider", text: "Used for general and palletised cargo. It can be loaded from the side, the rear or the top." },
      { title: "Refrigerated semi-trailer", short: "Refrigerated", text: "Used for goods that need a controlled temperature. We check that the equipment and the requested temperature conditions are available before the shipment is confirmed." },
      { title: "Mega semi-trailer", short: "Mega", text: "Used for goods that need more internal height than a standard semi-trailer. Dimensions and loading capacity are confirmed according to the vehicle available." },
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
  stats: verified(
    [
      { value: "~100", label: "shipments organised per month" },
      { value: "30+", label: "independent carrier partners" },
      { value: "< 1 h", label: "typical first response" },
    ],
    "discovery call 10.11.2026",
  ),

  /* ───────────── Trust — all [PLACEHOLDER]; must be verified or removed before launch ───────────── */
  /** NEVER publish the insured amount (Roland, 10.11.2026). Only „the cargo is insured”. */
  insurance: verified("The cargo is insured.", "discovery call 10.11.2026 — amount confidential, never shown"),
  memberships: verified([] as string[], "discovery call 10.11.2026 — no memberships to show"),
  carrierVerification: verified(
    [
      "Legal registration of the company and the EU Community Licence.",
      "Valid CMR insurance, confirmed with the insurer.",
      "Vehicle and semi-trailer documents.",
      "The company's legal status, including an insolvency check.",
    ],
    "discovery call 10.11.2026",
  ),
  carrierConditions: verified(
    [
      { title: "Agreed terms per shipment", text: "Rate, loading window and documents are confirmed in writing before every transport." },
      { title: "Payment terms", text: "The payment term is agreed in writing before each transport." },
      { title: "Clear point of contact", text: "One coordinator for each shipment, from loading to proof of delivery." },
    ],
    "discovery call 10.11.2026 — real terms 35/50 days, deliberately not published",
  ),
  /** "What you get" block on the for-carriers page (verified items). */
  carrierBenefits: verified(
    [
      { title: "Access to transport requests", text: "We organise around 100 shipments a month, with regular work on the Romania–Spain route." },
      { title: "Commercial terms confirmed in writing", text: "Rates, payment terms and operational requirements are set before each shipment is confirmed." },
      { title: "Dedicated coordination", text: "You have one point of contact for the information needed to run the shipment, from loading to confirmation of delivery." },
      { title: "24/7 dispatch", text: "Our team is always available for communication and coordination." },
      { title: "Long-term cooperation", text: "We are looking for partners with whom we can build stable business relationships, depending on capacity, routes and the requests available." },
    ],
    "discovery call 10.11.2026 (24/7 dispatch, ~100 shipments/month, mostly RO–ES, payment term per transport, coordinator per shipment)",
  ),
  carrierOffer: verified(
    [] as { title: string; text: string }[],
    "Roland 13.11.2026 — removed from the carriers page copy",
  ),
  whatsapp: placeholder({ number: "40759419010" }, "confirm the WhatsApp number with the client"),
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
