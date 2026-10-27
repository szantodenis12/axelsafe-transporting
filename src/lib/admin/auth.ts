/**
 * Admin auth — SERVER ONLY (reads cookies / env). The proxy does an optimistic cookie
 * check; every page, data function and server action MUST call `requireAdmin()` too.
 */
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { ADMIN_COOKIE, MIN_SECRET_LENGTH, secretsMatch, verifySessionToken } from "./session";

if (typeof window !== "undefined") {
  throw new Error("lib/admin/auth must never be bundled for the browser");
}

export type AdminConfig = { configured: true } | { configured: false; missing: string[] };

export function getAdminConfig(): AdminConfig {
  const missing: string[] = [];
  if (!process.env.ADMIN_PASSWORD?.trim()) missing.push("ADMIN_PASSWORD");
  const secret = process.env.ADMIN_SESSION_SECRET?.trim();
  if (!secret) missing.push("ADMIN_SESSION_SECRET");
  else if (secret.length < MIN_SECRET_LENGTH) missing.push(`ADMIN_SESSION_SECRET (min ${MIN_SECRET_LENGTH} chars)`);
  return missing.length ? { configured: false, missing } : { configured: true };
}

export const sessionSecret = () => process.env.ADMIN_SESSION_SECRET?.trim();

/** Display name recorded as `author` on CRM events (v1 has a single shared login). */
export const adminAuthor = () => process.env.ADMIN_AUTHOR_NAME?.trim() || "admin";

export async function hasAdminSession(): Promise<boolean> {
  // Session validity depends on the current time → must run at request time, never in a prerender.
  await connection();
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  return verifySessionToken(token, sessionSecret());
}

/** Redirects to the login page when there is no valid session. Call inside <Suspense>. */
export async function requireAdmin(nextPath?: string): Promise<void> {
  if (await hasAdminSession()) return;
  const next = nextPath && nextPath.startsWith("/admin") ? `?next=${encodeURIComponent(nextPath)}` : "";
  redirect(`/admin/login${next}`);
}

export async function verifyAdminPassword(input: string): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD?.trim();
  if (!expected) return false;
  return secretsMatch(input, expected);
}

/** Only allow post-login redirects inside the admin area (no open redirects). */
export function safeAdminPath(candidate: unknown): string {
  if (typeof candidate !== "string") return "/admin";
  if (!candidate.startsWith("/admin") || candidate.startsWith("//") || candidate.includes("://")) return "/admin";
  if (candidate.startsWith("/admin/login")) return "/admin";
  return candidate;
}
