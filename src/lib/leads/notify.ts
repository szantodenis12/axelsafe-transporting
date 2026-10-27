/**
 * Optional e-mail notification for new leads via the Resend REST API (plain fetch, no SDK).
 * Active only when RESEND_API_KEY and LEADS_NOTIFY_TO are set. Never throws — a failed
 * e-mail must not fail the lead write.
 */
import { companyData } from "@/content/companyData";
import type { Lead } from "./types";

const LABELS: Record<string, string> = {
  pickupLocation: "Pickup location",
  deliveryLocation: "Delivery location",
  cargoDescription: "Cargo description",
  weight: "Weight / loading units",
  pickupDate: "Preferred pickup date",
  deliveryDate: "Preferred delivery date",
  additional: "Additional requirements",
  country: "Country of registration",
  fleetSize: "Number of vehicles",
  vehicleTypes: "Vehicle types",
  regions: "Operating regions / routes",
  message: "Additional information",
};

export function isNotifyConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.LEADS_NOTIFY_TO);
}

function renderText(lead: Lead, adminUrl: string | null) {
  const lines: string[] = [
    `New ${lead.type === "quote" ? "transport quote request" : "carrier partnership enquiry"}`,
    "",
    `Company:        ${lead.companyName}`,
    `Contact person: ${lead.contactPerson}`,
    `Email:          ${lead.email}`,
    `Phone:          ${lead.phone}`,
    "",
  ];
  for (const [key, value] of Object.entries(lead.details)) {
    if (value === undefined || value === null || value === "") continue;
    lines.push(`${LABELS[key] ?? key}:`);
    lines.push(String(value));
    lines.push("");
  }
  if (lead.source) lines.push(`Source page: ${lead.source}`);
  if (lead.utm && Object.keys(lead.utm).length) lines.push(`UTM: ${JSON.stringify(lead.utm)}`);
  lines.push(`Request ID: ${lead.requestId}`);
  if (adminUrl) lines.push(`Open in CRM: ${adminUrl}`);
  return lines.join("\n");
}

export async function notifyNewLead(lead: Lead): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEADS_NOTIFY_TO;
  if (!apiKey || !to) return;

  const from = process.env.LEADS_NOTIFY_FROM?.trim() || `AXEL SAFE Website <no-reply@${companyData.domain.value}>`;
  const base = (process.env.NEXT_PUBLIC_SITE_URL || companyData.siteUrl.value).replace(/\/$/, "");
  const adminUrl = `${base}/admin/leads/${lead.id}`;
  const subject = `[Website] ${lead.type === "quote" ? "Quote request" : "Carrier enquiry"} — ${lead.companyName}`;

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map((s) => s.trim()).filter(Boolean),
        reply_to: lead.email,
        subject,
        text: renderText(lead, adminUrl),
        headers: { "X-Entity-Ref-ID": lead.requestId },
      }),
      signal: controller.signal,
    });
    clearTimeout(timer);
    if (!res.ok) {
      // Log status only — the body may echo PII.
      console.error(`[leads] notify failed: Resend responded ${res.status} (request ${lead.requestId})`);
    }
  } catch (err) {
    console.error(`[leads] notify failed (request ${lead.requestId}):`, err instanceof Error ? err.message : "unknown error");
  }
}
