"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminConfig, safeAdminPath, sessionSecret, verifyFallbackPassword } from "@/lib/admin/auth";
import { dummyHash, verifyPassword } from "@/lib/admin/password";
import { ADMIN_COOKIE, ADMIN_COOKIE_PATH, createSessionToken, FALLBACK_SUBJECT } from "@/lib/admin/session";
import { getUserRepository } from "@/lib/leads/repository";
import { clientIpFrom, hashIp, rateLimit } from "@/lib/leads/request-meta";

export type LoginState = {
  error?: "invalid" | "missing" | "not_configured" | "rate_limited" | "server";
  /** Echoed back so the field is not wiped after a failed attempt (React resets the form). */
  email?: string;
};

const cookieBase = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: ADMIN_COOKIE_PATH,
};

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const config = await getAdminConfig();
  if (!config.configured) return { error: "not_configured" };

  const ipHash = await hashIp(clientIpFrom(await headers()));
  const rl = rateLimit(`admin-login:${ipHash}`, { limit: 10, windowMs: 15 * 60_000 });
  if (!rl.allowed) return { error: "rate_limited", email: String(formData.get("email") ?? "").slice(0, 254) };

  const password = String(formData.get("password") ?? "");
  const email = String(formData.get("email") ?? "").trim().toLowerCase().slice(0, 254);
  let subject: string;

  if (config.mode === "users") {
    if (!email || !password) return { error: "missing", email };
    const users = await getUserRepository();
    if (!users) return { error: "not_configured" };
    let user;
    try {
      user = await users.getByEmailWithHash(email);
    } catch (err) {
      console.error("[admin] login lookup failed:", err instanceof Error ? err.message : err);
      return { error: "server", email };
    }
    // Always run scrypt so response time does not reveal whether the e-mail exists.
    const ok = await verifyPassword(password, user?.passwordHash ?? (await dummyHash()));
    if (!user || !user.active || !ok) return { error: "invalid", email };
    subject = user.id;
    users.touchLogin(user.id).catch(() => undefined);
  } else {
    if (!password) return { error: "missing" };
    if (!(await verifyFallbackPassword(password))) return { error: "invalid" };
    subject = FALLBACK_SUBJECT;
  }

  const { token, expiresAt } = await createSessionToken(sessionSecret()!, subject);
  (await cookies()).set(ADMIN_COOKIE, token, { ...cookieBase, expires: expiresAt });

  redirect(safeAdminPath(formData.get("next")));
}

export async function logoutAction(): Promise<void> {
  (await cookies()).set(ADMIN_COOKIE, "", { ...cookieBase, maxAge: 0 });
  redirect("/admin/login");
}
