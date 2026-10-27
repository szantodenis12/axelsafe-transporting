/**
 * Admin session token — HMAC-SHA256 signed, Web Crypto only (runs in proxy and server).
 * Token format: `v1.<expiresAtMs>.<nonce>.<hexSignature>`; payload = `v1.<exp>.<nonce>`.
 *
 * v1 = one shared password → one anonymous admin identity. v2 = Supabase Auth + roles.
 */

export const ADMIN_COOKIE = "axel_admin_session";
export const ADMIN_COOKIE_PATH = "/admin";
export const SESSION_TTL_MS = 12 * 60 * 60 * 1000;
export const MIN_SECRET_LENGTH = 16;

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

export async function createSessionToken(secret: string, now = Date.now()): Promise<{ token: string; expiresAt: Date }> {
  const exp = now + SESSION_TTL_MS;
  const nonce = toHex(crypto.getRandomValues(new Uint8Array(12)).buffer);
  const payload = `v1.${exp}.${nonce}`;
  const sig = await sign(payload, secret);
  return { token: `${payload}.${sig}`, expiresAt: new Date(exp) };
}

export async function verifySessionToken(token: string | undefined, secret: string | undefined, nowMs?: number): Promise<boolean> {
  if (!token || !secret || secret.length < MIN_SECRET_LENGTH) return false;
  const parts = token.split(".");
  if (parts.length !== 4 || parts[0] !== "v1") return false;
  const [, expStr, nonce, sig] = parts;
  const exp = Number(expStr);
  const now = nowMs ?? Date.now(); // evaluated only once a token is actually present
  if (!Number.isFinite(exp) || exp <= now || exp > now + SESSION_TTL_MS + 60_000) return false;
  if (!/^[0-9a-f]{24}$/.test(nonce) || !/^[0-9a-f]{64}$/.test(sig)) return false;
  const expected = await sign(`v1.${expStr}.${nonce}`, secret);
  return timingSafeEqualString(sig, expected);
}
