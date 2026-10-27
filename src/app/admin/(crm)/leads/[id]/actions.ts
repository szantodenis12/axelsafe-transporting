"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { adminAuthor, requireAdmin } from "@/lib/admin/auth";
import { requireLeadRepository } from "@/lib/leads/repository";
import { LEAD_STATUSES } from "@/lib/leads/schema";
import { InvalidStatusError, LeadNotFoundError, LeadsNotConfiguredError } from "@/lib/leads/types";

export type ActionState = { ok?: boolean; error?: string; at?: number };

const id = z.string().trim().min(1).max(64);

const statusInput = z.object({
  id,
  status: z.enum(LEAD_STATUSES),
  note: z.string().trim().max(2000).optional(),
});

const noteInput = z.object({
  id,
  note: z.string().trim().min(1, "Scrie mai întâi o notă.").max(2000, "Nota poate avea cel mult 2000 de caractere."),
});

const assignInput = z.object({
  id,
  assignee: z.string().trim().max(80).optional(),
});

function describe(err: unknown): string {
  if (err instanceof LeadsNotConfiguredError) return "Stocarea cererilor nu este configurată.";
  if (err instanceof LeadNotFoundError) return "Această cerere nu mai există.";
  if (err instanceof InvalidStatusError) return "Această stare nu este validă pentru tipul de cerere.";
  console.error("[admin] action failed:", err instanceof Error ? err.message : err);
  return "A apărut o eroare. Încearcă din nou.";
}

function done(leadId: string): ActionState {
  revalidatePath("/admin", "layout");
  revalidatePath(`/admin/leads/${leadId}`);
  return { ok: true, at: Date.now() };
}

export async function changeStatusAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = statusInput.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "Stare invalidă." };
  try {
    const repo = await requireLeadRepository();
    await repo.updateStatus(parsed.data.id, parsed.data.status, adminAuthor(), parsed.data.note);
    return done(parsed.data.id);
  } catch (err) {
    return { error: describe(err) };
  }
}

export async function addNoteAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = noteInput.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Notă invalidă." };
  try {
    const repo = await requireLeadRepository();
    await repo.addNote(parsed.data.id, parsed.data.note, adminAuthor());
    return done(parsed.data.id);
  } catch (err) {
    return { error: describe(err) };
  }
}

export async function assignAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = assignInput.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "Responsabil invalid." };
  try {
    const repo = await requireLeadRepository();
    await repo.assign(parsed.data.id, parsed.data.assignee || null, adminAuthor());
    return done(parsed.data.id);
  } catch (err) {
    return { error: describe(err) };
  }
}
