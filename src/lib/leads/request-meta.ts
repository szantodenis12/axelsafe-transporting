/**
 * Request metadata helpers for the enquiry API: IP hashing (never store a raw IP)
 * and a best-effort in-memory rate limiter. Web Crypto only — works in any runtime.
 */

const encoder = new TextEncoder();

function toHex(bytes: ArrayBuffer) {
  return Array.from(new Uint8Array(bytes), (b) => b.toString(16).padStart(2, "0")).join("");
}

/** First hop of x-forwarded-for, else x-real-ip, else "unknown". */
export function clientIpFrom(headers: Headers): string {
  const xff = headers.get("x-forwarded-for");
  if (xff) {
    const first = xff.split(",")[0]?.trim();
    if (first) return first;
  }
  return headers.get("x-real-ip")?.trim() || "unknown";
}

/** sha256(salt:ip) — the salt makes offline reversal of hashed IPs impractical. */
export async function hashIp(ip: string): Promise<string> {
  const salt = process.env.IP_HASH_SALT?.trim() || process.env.ADMIN_SESSION_SECRET?.trim() || "axelsafe-dev-salt";
  if (salt === "axelsafe-dev-salt" && process.env.NODE_ENV === "production") {
    console.warn("[leads] IP_HASH_SALT is not set — using a weak default salt.");
  }
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(`${salt}:${ip}`));
  return toHex(digest);
}

/* ───────────────────────── Rate limiting ─────────────────────────
 * In-memory fixed window per key. On serverless this is per-instance and resets on
 * cold start, so treat it as a speed bump, not a guarantee. Roadmap: Upstash Redis.
 */

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();
let lastSweep = 0;

export type RateLimitResult = { allowed: boolean; remaining: number; retryAfterSeconds: number };

export function rateLimit(key: string, { limit, windowMs }: { limit: number; windowMs: number }): RateLimitResult {
  const now = Date.now();
  if (now - lastSweep > 60_000) {
    for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
    lastSweep = now;
  }
  let bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    bucket = { count: 0, resetAt: now + windowMs };
    buckets.set(key, bucket);
  }
  bucket.count += 1;
  const allowed = bucket.count <= limit;
  return {
    allowed,
    remaining: Math.max(0, limit - bucket.count),
    retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000),
  };
}
