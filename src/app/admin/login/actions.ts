"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { getAdminConfig, safeAdminPath, sessionSecret, verifyAdminPassword } from "@/lib/admin/auth";
import { ADMIN_COOKIE, ADMIN_COOKIE_PATH, createSessionToken } from "@/lib/admin/session";
import { clientIpFrom, hashIp, rateLimit } from "@/lib/leads/request-meta";

export type LoginState = { error?: "invalid" | "missing" | "not_configured" | "rate_limited" };

const cookieBase = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: ADMIN_COOKIE_PATH,
};

export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  if (!getAdminConfig().configured) return { error: "not_configured" };

  const ipHash = await hashIp(clientIpFrom(await headers()));
  const rl = rateLimit(`admin-login:${ipHash}`, { limit: 10, windowMs: 15 * 60_000 });
  if (!rl.allowed) return { error: "rate_limited" };

  const password = String(formData.get("password") ?? "");
  if (!password) return { error: "missing" };
  if (!(await verifyAdminPassword(password))) return { error: "invalid" };

  const { token, expiresAt } = await createSessionToken(sessionSecret()!);
  (await cookies()).set(ADMIN_COOKIE, token, { ...cookieBase, expires: expiresAt });

  redirect(safeAdminPath(formData.get("next")));
}

export async function logoutAction(): Promise<void> {
  (await cookies()).set(ADMIN_COOKIE, "", { ...cookieBase, maxAge: 0 });
  redirect("/admin/login");
}
