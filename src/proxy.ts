/**
 * Optimistic auth check for the admin CRM. Scope is limited to /admin/* — public routes
 * are never touched. This is NOT the security boundary: every admin page, data function
 * and server action re-verifies the session (see src/lib/admin/auth.ts).
 */
import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, verifySessionToken } from "@/lib/admin/session";

const NOINDEX = "noindex, nofollow, noarchive";

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname === "/admin/login") {
    const res = NextResponse.next();
    res.headers.set("X-Robots-Tag", NOINDEX);
    return res;
  }

  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  const ok = await verifySessionToken(token, process.env.ADMIN_SESSION_SECRET?.trim());

  if (!ok) {
    const login = new URL("/admin/login", request.url);
    login.searchParams.set("next", `${pathname}${search}`);
    const res = NextResponse.redirect(login);
    res.headers.set("X-Robots-Tag", NOINDEX);
    return res;
  }

  const res = NextResponse.next();
  res.headers.set("X-Robots-Tag", NOINDEX);
  res.headers.set("Cache-Control", "private, no-store");
  return res;
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
