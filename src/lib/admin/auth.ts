/**
 * Admin auth — SERVER ONLY (reads cookies / env). The proxy does an optimistic cookie
 * check; every page, data function and server action MUST call `requireAdmin()` too.
 *
 * Two login modes:
 *   users     — at least one active row in admin_users: e-mail + password (scrypt), session subject = user id
 *   fallback  — no active users yet: the shared ADMIN_PASSWORD, session subject = "pw", author = ADMIN_AUTHOR_NAME
 * As soon as the first user exists the fallback password stops working (and fallback sessions are rejected).
 */
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import type { UserRole } from "@/lib/leads/schema";
import type { Actor } from "@/lib/leads/types";
import { getUserRepository } from "@/lib/leads/repository";
import { ADMIN_COOKIE, FALLBACK_SUBJECT, MIN_SECRET_LENGTH, readSessionToken, secretsMatch } from "./session";

if (typeof window !== "undefined") {
  throw new Error("lib/admin/auth must never be bundled for the browser");
}

export type CurrentUser = {
  /** admin_users.id; null for the shared-password fallback login. */
  id: string | null;
  name: string;
  email?: string;
  role: UserRole;
  fallback: boolean;
};

export type LoginMode = "users" | "fallback";

export type AdminConfig = { configured: true; mode: LoginMode } | { configured: false; missing: string[] };

export const sessionSecret = () => process.env.ADMIN_SESSION_SECRET?.trim();

/** Author label for the shared-password fallback login. */
export const fallbackAuthor = () => process.env.ADMIN_AUTHOR_NAME?.trim() || "admin";

/** Active CRM accounts (0 when no store is configured or the store is unreachable). */
async function activeUserCount(): Promise<number> {
  const users = await getUserRepository();
  if (!users) return 0;
  try {
    return await users.countActive();
  } catch (err) {
    // A broken store must not silently re-enable the shared password: treat as "users exist".
    console.error("[admin] user count failed:", err instanceof Error ? err.message : err);
    return 1;
  }
}

export async function getLoginMode(): Promise<LoginMode> {
  return (await activeUserCount()) > 0 ? "users" : "fallback";
}

export async function getAdminConfig(): Promise<AdminConfig> {
  const missing: string[] = [];
  const secret = sessionSecret();
  if (!secret) missing.push("ADMIN_SESSION_SECRET");
  else if (secret.length < MIN_SECRET_LENGTH) missing.push(`ADMIN_SESSION_SECRET (min ${MIN_SECRET_LENGTH} chars)`);
  const mode = await getLoginMode();
  if (mode === "fallback" && !process.env.ADMIN_PASSWORD?.trim()) {
    missing.push("ADMIN_PASSWORD (or create a user: pnpm admin:user)");
  }
  return missing.length ? { configured: false, missing } : { configured: true, mode };
}

/** Resolves the signed-in user once per request. Null = no valid session or account disabled. */
export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  // Session validity depends on the current time → must run at request time, never in a prerender.
  await connection();
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  const subject = await readSessionToken(token, sessionSecret());
  if (!subject) return null;

  if (subject === FALLBACK_SUBJECT) {
    if ((await getLoginMode()) !== "fallback") return null;
    return { id: null, name: fallbackAuthor(), role: "admin", fallback: true };
  }

  const users = await getUserRepository();
  if (!users) return null;
  try {
    const user = await users.getById(subject);
    if (!user || !user.active) return null;
    return { id: user.id, name: user.name, email: user.email, role: user.role, fallback: false };
  } catch (err) {
    console.error("[admin] session user lookup failed:", err instanceof Error ? err.message : err);
    return null;
  }
});

export async function hasAdminSession(): Promise<boolean> {
  return (await getCurrentUser()) !== null;
}

/** Redirects to the login page when there is no valid session. Call inside <Suspense>. */
export async function requireAdmin(nextPath?: string): Promise<CurrentUser> {
  const user = await getCurrentUser();
  if (user) return user;
  const next = nextPath && nextPath.startsWith("/admin") ? `?next=${encodeURIComponent(nextPath)}` : "";
  redirect(`/admin/login${next}`);
}

export const actorOf = (user: CurrentUser): Actor => ({ id: user.id, name: user.name });

export async function verifyFallbackPassword(input: string): Promise<boolean> {
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
