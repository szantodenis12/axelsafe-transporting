/**
 * Picks the lead store driver from the environment. SERVER ONLY.
 *
 *   SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY     → Supabase (production)
 *   LEADS_DRIVER=local  (NODE_ENV !== production) → .data/leads.json + .data/users.json (dev only)
 *   otherwise                                     → not configured
 *
 * The CRM user store (admin_users) always uses the same driver as the leads.
 */
import { LeadsNotConfiguredError, type LeadRepository, type UserRepository } from "./types";

if (typeof window !== "undefined") {
  throw new Error("leads/repository must never be bundled for the browser");
}

export type LeadStoreStatus =
  | { configured: true; driver: "supabase" | "local" }
  | { configured: false; driver: "none"; reason: string };

let instance: LeadRepository | null | undefined;
let users: UserRepository | null | undefined;
let status: LeadStoreStatus | undefined;

async function resolve(): Promise<void> {
  if (status) return;
  const url = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  const isProd = process.env.NODE_ENV === "production";

  if (url && key) {
    const { SupabaseLeadRepository, SupabaseUserRepository, supabaseClient } = await import("./drivers/supabase");
    const db = supabaseClient(url, key);
    instance = new SupabaseLeadRepository(db);
    users = new SupabaseUserRepository(db);
    status = { configured: true, driver: "supabase" };
    return;
  }

  if (process.env.LEADS_DRIVER === "local") {
    if (isProd) {
      console.error("[leads] LEADS_DRIVER=local is ignored in production — configure Supabase.");
      instance = null;
      users = null;
      status = { configured: false, driver: "none", reason: "LEADS_DRIVER=local is not allowed in production" };
      return;
    }
    const { LocalFileLeadRepository, LocalFileUserRepository } = await import("./drivers/local");
    instance = new LocalFileLeadRepository();
    users = new LocalFileUserRepository();
    status = { configured: true, driver: "local" };
    return;
  }

  instance = null;
  users = null;
  status = {
    configured: false,
    driver: "none",
    reason: "Set SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (or LEADS_DRIVER=local in development)",
  };
}

/** `null` when no driver is configured. */
export async function getLeadRepository(): Promise<LeadRepository | null> {
  await resolve();
  return instance ?? null;
}

/** Throws LeadsNotConfiguredError when no driver is configured. */
export async function requireLeadRepository(): Promise<LeadRepository> {
  const repo = await getLeadRepository();
  if (!repo) throw new LeadsNotConfiguredError(status && !status.configured ? status.reason : undefined);
  return repo;
}

/** CRM user accounts — `null` when no store is configured (then only the ADMIN_PASSWORD fallback works). */
export async function getUserRepository(): Promise<UserRepository | null> {
  await resolve();
  return users ?? null;
}

export async function getLeadStoreStatus(): Promise<LeadStoreStatus> {
  await resolve();
  return status!;
}
