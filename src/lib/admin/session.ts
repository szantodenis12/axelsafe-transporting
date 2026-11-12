/**
 * Admin session token — HMAC-SHA256 signed, Web Crypto only (runs in proxy and server).
 *
 * Token format (v2): `v2.<expiresAtMs>.<subject>.<nonce>.<hexSignature>`; payload = everything before the signature.
 *   subject = admin_users.id (uuid) for per-user logins, or "pw" for the shared ADMIN_PASSWORD fallback.
 * v1 tokens (no subject) are no longer accepted — users simply sign in again.
 */

export const ADMIN_COOKIE = "axel_admin_session";
export const ADMIN_COOKIE_PATH = "/admin";
export const SESSION_TTL_MS = 12 * 60 * 60 * 1000;
export const MIN_SECRET_LENGTH = 16;
/** Subject used by the shared-password fallback login. */
export const FALLBACK_SUBJECT = "pw";

const encoder = new TextEncoder();

const toHex = (buf: ArrayBuffer) => Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");

async function hmacKey(secret: string, usage: KeyUsage[]) {
  return crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, usage);
}

async function sign(payload: string, secret: string) {
  const key = await hmacKey(secret, ["sign"]);
  return toHex(await crypto.subtle.sign("HMAC", key, encoder.encode(payload)));
}

/** Constant-time string comparison (both inputs are hashed/hex, so length leaks nothing useful). */
export function timingSafeEqualString(a: string, b: string): boolean {
  const ab = encoder.encode(a);
  const bb = encoder.encode(b);
  let diff = ab.length ^ bb.length;
  const n = Math.max(ab.length, bb.length);
  for (let i = 0; i < n; i++) diff |= (ab[i] ?? 0) ^ (bb[i] ?? 0);
  return diff === 0;
}

/** Hash both sides before comparing so lengths are equal and the compare is constant-time. */
export async function secretsMatch(provided: string, expected: string): Promise<boolean> {
  const [a, b] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(provided)),
    crypto.subtle.digest("SHA-256", encoder.encode(expected)),
  ]);
  return timingSafeEqualString(toHex(a), toHex(b));
}

const SUBJECT_RE = /^(pw|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})$/;

export async function createSessionToken(
  secret: string,
  subject: string,
  now = Date.now(),
): Promise<{ token: string; expiresAt: Date }> {
  if (!SUBJECT_RE.test(subject)) throw new Error("Invalid session subject");
  const exp = now + SESSION_TTL_MS;
  const nonce = toHex(crypto.getRandomValues(new Uint8Array(12)).buffer);
  const payload = `v2.${exp}.${subject}.${nonce}`;
  const sig = await sign(payload, secret);
  return { token: `${payload}.${sig}`, expiresAt: new Date(exp) };
}

/** Returns the session subject (user id or "pw") when the token is valid, else null. */
export async function readSessionToken(token: string | undefined, secret: string | undefined, nowMs?: number): Promise<string | null> {
  if (!token || !secret || secret.length < MIN_SECRET_LENGTH) return null;
  const parts = token.split(".");
  if (parts.length !== 5 || parts[0] !== "v2") return null;
  const [, expStr, subject, nonce, sig] = parts;
  const exp = Number(expStr);
  const now = nowMs ?? Date.now(); // evaluated only once a token is actually present
  if (!Number.isFinite(exp) || exp <= now || exp > now + SESSION_TTL_MS + 60_000) return null;
  if (!SUBJECT_RE.test(subject) || !/^[0-9a-f]{24}$/.test(nonce) || !/^[0-9a-f]{64}$/.test(sig)) return null;
  const expected = await sign(`v2.${expStr}.${subject}.${nonce}`, secret);
  return timingSafeEqualString(sig, expected) ? subject : null;
}

/** Signature/expiry check only (used by the optimistic proxy). Account state is checked server-side. */
export async function verifySessionToken(token: string | undefined, secret: string | undefined, nowMs?: number): Promise<boolean> {
  return (await readSessionToken(token, secret, nowMs)) !== null;
}
