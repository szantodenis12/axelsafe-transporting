/**
 * Password hashing for CRM accounts — scrypt (node:crypto), SERVER ONLY.
 * Format: `scrypt$<N>$<r>$<p>$<salt base64>$<hash base64>` (self-describing, so parameters can be raised later).
 * Also imported by scripts/create-admin-user.ts (plain Node, no Next.js).
 */
import { randomBytes, scrypt as scryptCb, timingSafeEqual, type ScryptOptions } from "node:crypto";

if (typeof window !== "undefined") {
  throw new Error("lib/admin/password must never be bundled for the browser");
}

const N = 16384;
const R = 8;
const P = 1;
const KEYLEN = 64;
export const MIN_PASSWORD_LENGTH = 10;

function scrypt(password: string, salt: Buffer, keylen: number, opts: ScryptOptions): Promise<Buffer> {
  return new Promise((resolve, reject) =>
    scryptCb(password.normalize("NFKC"), salt, keylen, { ...opts, maxmem: 64 * 1024 * 1024 }, (err, key) => (err ? reject(err) : resolve(key))),
  );
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const hash = await scrypt(password, salt, KEYLEN, { N, r: R, p: P });
  return `scrypt$${N}$${R}$${P}$${salt.toString("base64")}$${hash.toString("base64")}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split("$");
  if (parts.length !== 6 || parts[0] !== "scrypt") return false;
  const [, n, r, p, saltB64, hashB64] = parts;
  const expected = Buffer.from(hashB64, "base64");
  if (!expected.length) return false;
  try {
    const actual = await scrypt(password, Buffer.from(saltB64, "base64"), expected.length, { N: Number(n), r: Number(r), p: Number(p) });
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

/** A hash of a random password — compared against when the e-mail is unknown, so timing does not reveal accounts. */
let dummy: Promise<string> | undefined;
export const dummyHash = () => (dummy ??= hashPassword(randomBytes(18).toString("base64")));
