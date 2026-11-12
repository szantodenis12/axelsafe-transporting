/**
 * Create or reset a CRM account (admin_users).
 *
 *   pnpm admin:user --email ramona@axelsafe-transporting.com --name "Ramona" [--role dispatcher|admin] [--password '…'] [--disable]
 *
 * - Same e-mail again = update (new password / name / role) → this is also the password reset.
 * - Without --password a strong random password is generated and printed once.
 * - --disable deactivates the account (it can no longer sign in; history keeps the name).
 * - Uses the same store as the site: SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY, else LEADS_DRIVER=local (.data/users.json).
 *   Reads .env.local / .env if present (variables already in the environment win).
 */
import { existsSync } from "node:fs";
import { randomBytes } from "node:crypto";
import path from "node:path";
import { parseArgs } from "node:util";
import { z } from "zod";

for (const file of [".env.local", ".env"]) {
  const p = path.join(process.cwd(), file);
  if (existsSync(p)) process.loadEnvFile(p);
}

const { values } = parseArgs({
  options: {
    email: { type: "string" },
    name: { type: "string" },
    role: { type: "string", default: "dispatcher" },
    password: { type: "string" },
    disable: { type: "boolean", default: false },
  },
});

const input = z
  .object({
    email: z.email("--email is required and must be a valid address").transform((v) => v.trim().toLowerCase()),
    name: z.string().trim().min(1, "--name is required").max(80),
    role: z.enum(["admin", "dispatcher"], "--role must be admin or dispatcher"),
    password: z.string().min(10, "--password must have at least 10 characters").max(200).optional(),
    disable: z.boolean(),
  })
  .safeParse(values);

if (!input.success) {
  console.error(input.error.issues.map((i) => `✗ ${i.message}`).join("\n"));
  console.error('\nUsage: pnpm admin:user --email name@company.com --name "Name" [--role dispatcher|admin] [--password …] [--disable]');
  process.exit(1);
}

async function main() {
  const { email, name, role, disable } = input.data!;
  const { hashPassword } = await import("../src/lib/admin/password");
  const { getUserRepository, getLeadStoreStatus } = await import("../src/lib/leads/repository");

  const users = await getUserRepository();
  const status = await getLeadStoreStatus();
  if (!users || !status.configured) {
    console.error(`✗ No store configured: ${status.configured ? "" : status.reason}`);
    process.exit(1);
  }

  const generated = !input.data!.password;
  const password = input.data!.password ?? randomBytes(15).toString("base64url");
  const user = await users.upsert({ email, name, role, passwordHash: await hashPassword(password), active: !disable });

  console.log(`✓ ${disable ? "Disabled" : "Saved"} ${user.role} ${user.name} <${user.email}> (id ${user.id}) in ${status.driver} store`);
  if (!disable && generated) console.log(`  Password (shown once, send it privately): ${password}`);
}

main().catch((err) => {
  console.error("✗", err instanceof Error ? err.message : err);
  process.exit(1);
});
