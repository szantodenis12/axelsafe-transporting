"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { actorOf, requireAdmin } from "@/lib/admin/auth";
import { requireLeadRepository } from "@/lib/leads/repository";
import { manualLeadSchema } from "@/lib/leads/schema";
import { leadFromManual, LeadsNotConfiguredError } from "@/lib/leads/types";

export type ManualLeadState = { error?: string; fields?: Record<string, string>; values?: Record<string, string | string[]> };

export async function createManualLeadAction(_prev: ManualLeadState, formData: FormData): Promise<ManualLeadState> {
  const user = await requireAdmin();

  const raw: Record<string, string | string[]> = {};
  for (const [k, v] of formData.entries()) {
    if (typeof v !== "string") continue;
    if (k === "vehicleTypes") raw[k] = [...((raw[k] as string[] | undefined) ?? []), v];
    else raw[k] = v;
  }

  const parsed = manualLeadSchema.safeParse(raw);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "_form");
      if (!(key in fields)) fields[key] = issue.code === "invalid_type" ? "Câmp obligatoriu." : issue.message;
    }
    return { error: "Verifică câmpurile marcate.", fields, values: raw };
  }

  let leadId: string;
  try {
    const repo = await requireLeadRepository();
    const lead = await repo.create(leadFromManual(parsed.data, crypto.randomUUID(), actorOf(user)));
    leadId = lead.id;
  } catch (err) {
    if (err instanceof LeadsNotConfiguredError) return { error: "Stocarea cererilor nu este configurată.", values: raw };
    console.error("[admin] manual lead failed:", err instanceof Error ? err.message : err);
    return { error: "Cererea nu a putut fi salvată. Încearcă din nou.", values: raw };
  }

  revalidatePath("/admin", "layout");
  redirect(`/admin/leads/${leadId}`);
}
