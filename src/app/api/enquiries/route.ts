/**
 * POST /api/enquiries: single endpoint for every public form.
 * Body: { type: "quote" | "carrier" | "callback", mode?: "quick" (quote only), ...fields, source?, utm?, locale?, website? (honeypot) }
 *   quote            → full transport enquiry
 *   quote + "quick"  → Cerere rapidă (name, phone, from → to, note), stored as quote with details.mode = "quick"
 *   carrier          → carrier partnership (CUI, vehicle types[], CMR insurance, licence…)
 *   callback         → Vă sunăm noi (name, phone, preferred time)
 *
 *   201 { ok: true, requestId }
 *   400 { error: "bad_request" }          not JSON / no type
 *   422 { error: "validation", fields }   zod field codes
 *   429 { error: "rate_limited" }
 *   503 { error: "not_configured" }       no lead store driver
 *   500 { error: "server_error" }
 */
import { after, type NextRequest } from "next/server";
import { enquiryMetaSchema, fieldErrorsOf, formNameFor, formSchemaFor, isLeadType } from "@/lib/leads/schema";
import { requireLeadRepository } from "@/lib/leads/repository";
import { clientIpFrom, hashIp, rateLimit } from "@/lib/leads/request-meta";
import { notifyNewLead } from "@/lib/leads/notify";
import { leadFromWebForm, LeadsNotConfiguredError } from "@/lib/leads/types";

const MAX_BODY_BYTES = 64 * 1024;
const RATE = { limit: 5, windowMs: 10 * 60_000 };

const json = (body: unknown, status: number, headers?: HeadersInit) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

export async function POST(request: NextRequest) {
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) return json({ error: "bad_request" }, 413);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ error: "bad_request" }, 400);
  }
  if (!body || typeof body !== "object") return json({ error: "bad_request" }, 400);

  const meta = enquiryMetaSchema.safeParse(body);
  if (!meta.success || !isLeadType(meta.data.type)) return json({ error: "bad_request" }, 400);

  // Honeypot: humans never see the field. Pretend success, store nothing.
  if (meta.data.website) return json({ ok: true }, 200);

  const ipHash = await hashIp(clientIpFrom(request.headers));
  const rl = rateLimit(`enquiry:${ipHash}`, RATE);
  if (!rl.allowed) return json({ error: "rate_limited" }, 429, { "Retry-After": String(rl.retryAfterSeconds) });

  const form = formNameFor(meta.data.type, meta.data.mode);
  const parsed = formSchemaFor(form).safeParse(body);
  if (!parsed.success) return json({ error: "validation", fields: fieldErrorsOf(parsed.error) }, 422);

  const input = leadFromWebForm({ form, values: parsed.data } as Parameters<typeof leadFromWebForm>[0], {
    requestId: crypto.randomUUID(),
    source: meta.data.source,
    utm: meta.data.utm && Object.keys(meta.data.utm).length ? meta.data.utm : undefined,
    locale: meta.data.locale,
    ipHash,
    userAgent: request.headers.get("user-agent")?.slice(0, 500) ?? undefined,
  });

  try {
    const repo = await requireLeadRepository();
    const lead = await repo.create(input);
    after(() => notifyNewLead(lead));
    return json({ ok: true, requestId: lead.requestId }, 201);
  } catch (err) {
    if (err instanceof LeadsNotConfiguredError) {
      console.warn(`[leads] enquiry rejected, store not configured (${form})`);
      return json({ error: "not_configured" }, 503);
    }
    console.error(`[leads] create failed (${form}, request ${input.requestId}):`, err instanceof Error ? err.message : err);
    return json({ error: "server_error" }, 500);
  }
}
