/**
 * Admin data access — every function re-verifies the session before touching the store
 * (defense in depth; the proxy is only an optimistic check). SERVER ONLY.
 */
import { cache } from "react";
import { getLeadRepository, getLeadStoreStatus, getUserRepository, type LeadStoreStatus } from "@/lib/leads/repository";
import type { AdminUser, LeadRepository, LeadStats } from "@/lib/leads/types";
import { requireAdmin, type CurrentUser } from "./auth";

if (typeof window !== "undefined") {
  throw new Error("lib/admin/data must never be bundled for the browser");
}

export type AdminStore = { repo: LeadRepository | null; status: LeadStoreStatus; user: CurrentUser };

/** Requires a valid admin session (redirects otherwise), then resolves the lead store. */
export async function adminStore(): Promise<AdminStore> {
  const user = await requireAdmin();
  const [repo, status] = await Promise.all([getLeadRepository(), getLeadStoreStatus()]);
  return { repo, status, user };
}

/** Active CRM users (for the assignment dropdown). Empty in fallback mode. */
export async function activeUsers(): Promise<AdminUser[]> {
  await requireAdmin();
  const users = await getUserRepository();
  if (!users) return [];
  try {
    return (await users.list()).filter((u) => u.active);
  } catch (err) {
    console.error("[admin] user list failed:", err instanceof Error ? err.message : err);
    return [];
  }
}

/**
 * Type/status counts, shared per request by the shell (nav badges) and the list filters.
 * Reads only `type` + `status`, so it stays cheap on every navigation.
 */
export const leadStats = cache(async (): Promise<LeadStats | null> => {
  const { repo } = await adminStore();
  return repo ? repo.stats() : null;
});

/* Formatting helpers: date/time from @/lib/leads/labels (single source), UI helpers from ./format. */
export { ageHours, formatAge, formatDate, formatDateTime, formatDay, formatDayShort, initials, leadFacts } from "./format";

/**
 * Request-time clock for admin server components (they always render after `connection()`
 * via requireAdmin, so reading the time is safe and one value is shared per page).
 */
export const requestNow = () => Date.now();
