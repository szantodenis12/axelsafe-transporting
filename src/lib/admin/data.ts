/**
 * Admin data access — every function re-verifies the session before touching the store
 * (defense in depth; the proxy is only an optimistic check). SERVER ONLY.
 */
import { getLeadRepository, getLeadStoreStatus, type LeadStoreStatus } from "@/lib/leads/repository";
import type { LeadRepository } from "@/lib/leads/types";
import { requireAdmin } from "./auth";

if (typeof window !== "undefined") {
  throw new Error("lib/admin/data must never be bundled for the browser");
}

export type AdminStore = { repo: LeadRepository | null; status: LeadStoreStatus };

/** Requires a valid admin session (redirects otherwise), then resolves the lead store. */
export async function adminStore(): Promise<AdminStore> {
  await requireAdmin();
  const [repo, status] = await Promise.all([getLeadRepository(), getLeadStoreStatus()]);
  return { repo, status };
}

/* Formatting helpers live in ./format (client-safe); re-exported for existing imports. */
export { ageHours, formatAge, formatDate, formatDateTime, formatDay, formatDayShort, initials, leadFacts } from "./format";
