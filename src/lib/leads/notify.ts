/**
 * Optional e-mail notification for new website leads via the Resend REST API (plain fetch, no SDK).
 * Active only when RESEND_API_KEY and LEADS_NOTIFY_TO are set. Never throws: a failed
 * e-mail must not fail the lead write. Written in Romanian for the dispatch team.
 */
import { companyData } from "@/content/companyData";
import { siteUrl } from "@/lib/site";
import { CALLBACK_TIME_LABEL, CHANNEL_LABEL, TYPE_LABEL } from "./labels";
import { leadSummary, vehicleLabels } from "./summary";
import { leadTitle, type Lead } from "./types";

if (typeof window !== "undefined") {
  throw new Error("leads/notify must never be bundled for the browser");
}

export function isNotifyConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.LEADS_NOTIFY_TO);
}

function typeLine(lead: Lead) {
  if (lead.type === "quote" && lead.details.mode === "quick") return "Cerere rapidă de ofertă";
  return TYPE_LABEL[lead.type];
}

/** Summary without the "cerere rapidă" suffix (the type line already says it). */
const shortSummary = (lead: Lead) =>
  lead.type === "quote" ? `${lead.details.pickupLocation} → ${lead.details.deliveryLocation}` : leadSummary(lead);

function detailLines(lead: Lead): [string, string | undefined][] {
  if (lead.type === "quote") {
    const d = lead.details;
    return [
      ["Rută", `${d.pickupLocation} → ${d.deliveryLocation}`],
      ["Marfă", d.cargoDescription],
      ["Greutate / unități", d.weight],
      ["Data încărcării", d.pickupDate],
      ["Data livrării", d.deliveryDate],
      [d.mode === "quick" ? "Notă" : "Alte cerințe", d.additional],
    ];
  }
  if (lead.type === "callback") {
    return [["Când să sunăm", CALLBACK_TIME_LABEL[lead.details.preferredTime] ?? lead.details.preferredTime]];
  }
  const d = lead.details;
  return [
    ["CUI / cod TVA", lead.vatNumber],
    ["Țara", d.country],
    ["Vehicule", vehicleLabels(lead).join(", ")],
    ["Nr. vehicule", d.fleetSize],
    ["Asigurare CMR", d.cmrInsurance === "yes" ? "Da (declarat)" : d.cmrInsurance === "no" ? "Nu" : undefined],
    ["Licență transport", d.licenceNumber],
    ["Zone / rute", d.regions],
    ["Mesaj", d.message],
  ];
}

function renderText(lead: Lead, adminUrl: string) {
  const lines: string[] = [
    `${typeLine(lead)}: ${shortSummary(lead)}`,
    `Deschide în CRM: ${adminUrl}`,
    "",
    `Firmă:     ${lead.companyName ?? "necompletat"}`,
    `Persoană:  ${lead.contactPerson}`,
    `Telefon:   ${lead.phone ?? "necompletat"}`,
    `E-mail:    ${lead.email ?? "necompletat"}`,
    `Canal:     ${CHANNEL_LABEL[lead.sourceChannel]}`,
    "",
  ];
  for (const [label, value] of detailLines(lead)) {
    if (!value) continue;
    lines.push(`${label}:`, value, "");
  }
  if (lead.source) lines.push(`Pagina: ${lead.source}`);
  if (lead.utm && Object.keys(lead.utm).length) lines.push(`UTM: ${JSON.stringify(lead.utm)}`);
  lines.push(`ID cerere: ${lead.requestId}`);
  lines.push("", "Promisiunea noastră: primul răspuns în mai puțin de o oră.");
  return lines.join("\n");
}

export async function notifyNewLead(lead: Lead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEADS_NOTIFY_TO;
  if (!apiKey || !to) return;

  const from = process.env.LEADS_NOTIFY_FROM?.trim() || `AXEL SAFE Website <no-reply@${companyData.domain.value}>`;
  const base = siteUrl;
  const adminUrl = `${base}/admin/leads/${lead.id}`;
  const subject = `[Site] ${typeLine(lead)}: ${leadTitle(lead)} · ${shortSummary(lead)}`.slice(0, 200);

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map((s) => s.trim()).filter(Boolean),
        ...(lead.email ? { reply_to: lead.email } : {}),
        subject,
        text: renderText(lead, adminUrl),
        headers: { "X-Entity-Ref-ID": lead.requestId },
      }),
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) {
      // Log status only: the body may echo PII.
      console.error(`[leads] notify failed: Resend responded ${res.status} (request ${lead.requestId})`);
    }
  } catch (err) {
    console.error(`[leads] notify failed (request ${lead.requestId}):`, err instanceof Error ? err.message : "unknown error");
  }
}
