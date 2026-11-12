"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { actorOf, requireAdmin, type CurrentUser } from "@/lib/admin/auth";
import { lookupAnaf } from "@/lib/admin/anaf";
import { getUserRepository, requireLeadRepository } from "@/lib/leads/repository";
import { CARRIER_CHECKS, CURRENCIES, LEAD_STATUSES, LOST_REASONS } from "@/lib/leads/schema";
import { parseLocalDateTime } from "@/lib/leads/labels";
import { InvalidStatusError, LeadNotFoundError, LeadRuleError, LeadsNotConfiguredError, type Actor } from "@/lib/leads/types";

export type ActionState = { ok?: boolean; error?: string; at?: number };

const id = z.string().trim().min(1).max(64);

const statusInput = z.object({
  id,
  status: z.enum(LEAD_STATUSES),
  note: z.string().trim().max(2000).optional(),
  lostReason: z.enum(LOST_REASONS).optional().or(z.literal("").transform(() => undefined)),
  lostNote: z.string().trim().max(1000).optional(),
});

const noteInput = z.object({
  id,
  note: z.string().trim().min(1, "Scrie mai întâi o notă.").max(2000, "Nota poate avea cel mult 2000 de caractere."),
});

const assignInput = z.object({ id, userId: z.string().trim().max(64).optional() });

const followUpInput = z.object({
  id,
  intent: z.enum(["save", "clear"]).default("save"),
  at: z.string().trim().max(20).optional(),
  note: z.string().trim().max(500, "Maximum 500 de caractere.").optional(),
});

/** "1.250,50" / "1250.5" / "" → number | undefined; NaN → error */
const money = z
  .string()
  .trim()
  .max(20)
  .optional()
  .transform((v, ctx) => {
    if (!v) return undefined;
    const normalised = v.replace(/\s/g, "").replace(/\.(?=\d{3}(\D|$))/g, "").replace(",", ".");
    const n = Number(normalised);
    if (!Number.isFinite(n) || n < 0 || n > 10_000_000) {
      ctx.addIssue({ code: "custom", message: "Introduceți o sumă validă (ex. 1250 sau 1.250,50)." });
      return z.NEVER;
    }
    return Math.round(n * 100) / 100;
  });

const economicsInput = z.object({ id, offeredPrice: money, carrierCost: money, currency: z.enum(CURRENCIES).default("EUR") });

const checkInput = z.object({ id, key: z.enum(CARRIER_CHECKS), checked: z.enum(["1", "0"]) });

function describe(err: unknown): string {
  if (err instanceof LeadsNotConfiguredError) return "Stocarea cererilor nu este configurată.";
  if (err instanceof LeadNotFoundError) return "Această cerere nu mai există.";
  if (err instanceof InvalidStatusError) return "Această stare nu este validă pentru tipul de cerere.";
  if (err instanceof LeadRuleError) return err.message;
  console.error("[admin] action failed:", err instanceof Error ? err.message : err);
  return "A apărut o eroare. Încearcă din nou.";
}

function done(leadId: string): ActionState {
  revalidatePath("/admin", "layout");
  revalidatePath(`/admin/leads/${leadId}`);
  return { ok: true, at: Date.now() };
}

async function run(fn: (user: CurrentUser) => Promise<string>): Promise<ActionState> {
  const user = await requireAdmin();
  try {
    return done(await fn(user));
  } catch (err) {
    return { error: describe(err) };
  }
}

const formObject = (fd: FormData) => Object.fromEntries([...fd.entries()].filter(([, v]) => typeof v === "string"));

export async function changeStatusAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = statusInput.safeParse(formObject(formData));
  if (!parsed.success) {
    await requireAdmin();
    return { error: "Stare invalidă." };
  }
  const { id: leadId, status, note, lostReason, lostNote } = parsed.data;
  return run(async (user) => {
    const repo = await requireLeadRepository();
    await repo.updateStatus(leadId, { status, note, lostReason, lostNote }, actorOf(user));
    return leadId;
  });
}

export async function addNoteAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = noteInput.safeParse(formObject(formData));
  if (!parsed.success) {
    await requireAdmin();
    return { error: parsed.error.issues[0]?.message ?? "Notă invalidă." };
  }
  return run(async (user) => {
    const repo = await requireLeadRepository();
    await repo.addNote(parsed.data.id, parsed.data.note, actorOf(user));
    return parsed.data.id;
  });
}

/** Resolve an assignee id to an Actor (must be an active user). */
async function assignee(userId: string | undefined): Promise<Actor | null> {
  if (!userId) return null;
  const users = await getUserRepository();
  const u = users ? await users.getById(userId) : null;
  if (!u || !u.active) throw new LeadRuleError("Utilizatorul ales nu există sau este dezactivat.");
  return { id: u.id, name: u.name };
}

export async function assignAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = assignInput.safeParse(formObject(formData));
  if (!parsed.success) {
    await requireAdmin();
    return { error: "Responsabil invalid." };
  }
  return run(async (user) => {
    const repo = await requireLeadRepository();
    await repo.assign(parsed.data.id, await assignee(parsed.data.userId || undefined), actorOf(user));
    return parsed.data.id;
  });
}

/** "Preiau": assign the lead to the signed-in user. */
export async function claimAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = z.object({ id }).safeParse(formObject(formData));
  if (!parsed.success) {
    await requireAdmin();
    return { error: "Lead invalid." };
  }
  return run(async (user) => {
    if (!user.id) throw new LeadRuleError("„Preiau” funcționează doar cu un cont personal (nu cu parola comună).");
    const repo = await requireLeadRepository();
    await repo.assign(parsed.data.id, actorOf(user), actorOf(user));
    return parsed.data.id;
  });
}

export async function followUpAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = followUpInput.safeParse(formObject(formData));
  if (!parsed.success) {
    await requireAdmin();
    return { error: parsed.error.issues[0]?.message ?? "Date invalide." };
  }
  const { id: leadId, intent, at, note } = parsed.data;
  let iso: string | null = null;
  if (intent === "save") {
    iso = at ? parseLocalDateTime(at) : null;
    if (!iso) {
      await requireAdmin();
      return { error: "Alegeți data și ora pentru următorul pas." };
    }
  }
  return run(async (user) => {
    const repo = await requireLeadRepository();
    await repo.setFollowUp(leadId, iso, intent === "save" ? note ?? null : null, actorOf(user));
    return leadId;
  });
}

export async function economicsAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = economicsInput.safeParse(formObject(formData));
  if (!parsed.success) {
    await requireAdmin();
    return { error: parsed.error.issues[0]?.message ?? "Sume invalide." };
  }
  const { id: leadId, ...economics } = parsed.data;
  return run(async (user) => {
    const repo = await requireLeadRepository();
    const result = await repo.get(leadId);
    if (!result) throw new LeadNotFoundError(leadId);
    if (result.lead.type === "carrier") throw new LeadRuleError("Prețurile se completează pe cererile de la clienți, nu pe transportatori.");
    await repo.setEconomics(leadId, economics, actorOf(user));
    return leadId;
  });
}

export async function checkAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = checkInput.safeParse(formObject(formData));
  if (!parsed.success) {
    await requireAdmin();
    return { error: "Verificare invalidă." };
  }
  return run(async (user) => {
    const repo = await requireLeadRepository();
    const result = await repo.get(parsed.data.id);
    if (!result) throw new LeadNotFoundError(parsed.data.id);
    if (result.lead.type !== "carrier") throw new LeadRuleError("Verificările se fac doar pentru transportatori.");
    if (result.lead.status === "approved" && parsed.data.checked === "0") {
      throw new LeadRuleError("Transportatorul este aprobat. Schimbați întâi statusul, apoi debifați.");
    }
    await repo.setCheck(parsed.data.id, parsed.data.key, parsed.data.checked === "1", actorOf(user));
    return parsed.data.id;
  });
}

const ANAF_ERRORS = {
  invalid_cui: "CUI-ul nu are un format valid.",
  foreign: "ANAF verifică doar firme din România. Pentru cod de TVA străin folosiți VIES.",
  not_found: "ANAF nu a găsit acest CUI.",
  unavailable: "Serviciul ANAF nu răspunde acum. Încercați din nou peste câteva minute.",
} as const;

export async function anafLookupAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = z.object({ id }).safeParse(formObject(formData));
  if (!parsed.success) {
    await requireAdmin();
    return { error: "Lead invalid." };
  }
  const user = await requireAdmin();
  try {
    const repo = await requireLeadRepository();
    const result = await repo.get(parsed.data.id);
    if (!result) throw new LeadNotFoundError(parsed.data.id);
    if (!result.lead.vatNumber) return { error: "Lead-ul nu are CUI completat." };
    const anaf = await lookupAnaf(result.lead.vatNumber);
    if (!anaf.ok) return { error: ANAF_ERRORS[anaf.error] };
    await repo.saveAnaf(parsed.data.id, { ...anaf.snapshot, checkedBy: user.name }, actorOf(user));
    return done(parsed.data.id);
  } catch (err) {
    return { error: describe(err) };
  }
}
