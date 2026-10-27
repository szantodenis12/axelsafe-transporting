# CRM / lead pipeline

Website enquiries (transport quotes + carrier partnerships) → `/api/enquiries` → lead store → `/admin` CRM.

## Architecture

```
QuoteForm / CarrierForm (client)        src/components/forms/
   │  POST JSON  {type, …fields, source, utm, locale, website(honeypot)}
   ▼
POST /api/enquiries                     src/app/api/enquiries/route.ts
   honeypot → 200 (nothing stored) · rate limit → 429 · zod → 422
   │
   ▼
LeadRepository                          src/lib/leads/repository.ts  (driver chosen from env)
   ├─ SupabaseLeadRepository            src/lib/leads/drivers/supabase.ts  (service role, production)
   └─ LocalFileLeadRepository           src/lib/leads/drivers/local.ts     (.data/leads.json, dev only)
   │
   ├─ after(): Resend e-mail            src/lib/leads/notify.ts  (optional, never fails the write)
   ▼
/admin  (dashboard · leads list · lead detail)   src/app/admin/**  +  src/components/admin/**
   auth: src/proxy.ts (optimistic cookie check) + src/lib/admin/auth.ts (real check in every page/action)
```

Shared, client-safe code: `src/lib/leads/schema.ts` (zod schemas, statuses, field order, error codes) and `src/lib/leads/types.ts`. Everything else under `src/lib/leads` and `src/lib/admin` is server-only.

### Lead model

| column | notes |
|---|---|
| `type` | `quote` \| `carrier` |
| `status` | quote: `new → reviewing → quoted → won \| lost`; carrier: `new → reviewing → approved \| rejected`; both: `spam`. Enforced by a CHECK constraint and by the repository. |
| `company_name`, `contact_person`, `email`, `phone` | common columns (searchable) |
| `details` jsonb | type-specific fields, camelCase keys, validated by zod before insert |
| `consent_at` | timestamp of the GDPR checkbox |
| `source`, `utm`, `locale` | attribution from the browser (`location.pathname`, `utm_*`/`gclid`/`fbclid`) |
| `request_id` | server-generated UUID, returned as `requestId`; pushed to `dataLayer` as `event_id` |
| `ip_hash`, `user_agent` | sha256(salt:ip) — raw IPs are never stored |
| `assigned_to` | free text in v1 |

`lead_events` is append-only: `created`, `status_changed` (from/to + optional note), `note`, `assigned` — each with `author` + timestamp.

### API contract

`POST /api/enquiries` → `201 {ok, requestId}` · `400 bad_request` · `413` · `422 {error:"validation", fields:{name: code}}` · `429 rate_limited` (+ `Retry-After`) · `503 not_configured` · `500 server_error`.
Field codes: `required`, `email`, `consent`, `invalid`, `too_long` — the forms map them to `en.forms.errors`.

Rate limit: 5 submissions / 10 min per IP hash, in-memory. On serverless this is per instance and resets on cold start — a speed bump, not a guarantee. Move to Upstash Redis (`@upstash/ratelimit`) when traffic justifies it.

## Environment variables

See `.env.example`.

| var | required | purpose |
|---|---|---|
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | production | lead store. Service role bypasses RLS — server only, never `NEXT_PUBLIC_`. |
| `LEADS_DRIVER=local` | dev only | JSON file store at `.data/leads.json`. Ignored (with an error log) when `NODE_ENV=production`. |
| `ADMIN_PASSWORD` | for /admin | shared password (v1) |
| `ADMIN_SESSION_SECRET` | for /admin | HMAC key for the session cookie, ≥16 chars (`openssl rand -hex 32`) |
| `ADMIN_AUTHOR_NAME` | optional | author label on CRM events (default `admin`) |
| `IP_HASH_SALT` | optional | salt for IP hashing (falls back to `ADMIN_SESSION_SECRET`) |
| `RESEND_API_KEY`, `LEADS_NOTIFY_TO` | optional | new-lead e-mail; `LEADS_NOTIFY_FROM` must be a Resend-verified sender |

If no store is configured, the API answers `503 not_configured`, the forms show the approved "not connected yet" message with direct contact links, and the admin shows a banner.

## Setup: Supabase

1. Create a project (EU region, e.g. Frankfurt).
2. SQL editor → run `supabase/migrations/0001_crm.sql` (or `supabase db push`).
3. Project settings → API: copy the URL and the **service_role** key into Vercel env vars (Production + Preview). Do not add the anon key — the app does not use it.
4. Redeploy. Submit a test enquiry, check it in `/admin`.

Tables have RLS enabled with **no policies**: the anon/authenticated roles cannot read or write anything; only the service role (server) can.

## Local development

```bash
cp .env.example .env.local
# in .env.local:
LEADS_DRIVER=local
ADMIN_PASSWORD=choose-something
ADMIN_SESSION_SECRET=$(openssl rand -hex 32)
pnpm dev
```

Leads land in `.data/leads.json` (add `.data/` to `.gitignore` — not done by this workstream because `.gitignore` is outside its file scope). Admin: `http://localhost:3000/admin`.

Quick API check:

```bash
curl -i -X POST localhost:3000/api/enquiries -H 'content-type: application/json' \
  -d '{"type":"carrier","companyName":"Test SRL","contactPerson":"A","email":"a@test.ro","phone":"0744000000","country":"RO","vehicleTypes":"curtainsider","consent":true}'
```

## Security notes

- **Admin auth v1** = one shared password. Session = HMAC-SHA256 signed token (`v1.<exp>.<nonce>.<sig>`) in an `httpOnly`, `secure` (prod), `sameSite=lax` cookie scoped to `/admin`, 12 h expiry. Password and signature comparisons are constant-time; login attempts are rate-limited (10 / 15 min per IP hash).
- `src/proxy.ts` only runs on `/admin*` and is an optimistic redirect. The real check is `requireAdmin()` in every admin page (inside `<Suspense>`, as Cache Components requires for `cookies()`), in `adminStore()` and in every server action.
- `/admin` is `noindex` via metadata and an `X-Robots-Tag` header; responses are `Cache-Control: private, no-store`.
- No raw IPs are stored; logs carry request IDs and status codes, not form contents.
- Honeypot field `website` is off-screen + `aria-hidden` + `tabIndex=-1`; hits get a fake `200` and are discarded.
- Forms never simulate success: the success panel renders only after a `201`.
- Server-only modules throw if evaluated in the browser; the service-role key is read from `process.env` on the server only.

## Analytics hook

After a `201`, forms push `{ event: "lead_submit", form: "quote" | "carrier", event_id: requestId }` to `window.dataLayer` (no PII). GTM can forward this to GA4 / Meta / Google Ads with `event_id` for deduplication.

## Roadmap

1. **Supabase Auth + roles** (`dispatcher`, `admin`): replace the shared password, `assigned_to` → user FK, `author` → user id, per-role RLS policies.
2. **Companies / contacts tables**: dedupe by VAT number / e-mail domain, link repeat enquiries; `shipments` once a quote is won.
3. **Transactional status RPC** (`update_lead_status`) so lead update + event insert are atomic; SQL view for stats.
4. **E-mail templates**: HTML notification + customer acknowledgement in the enquiry language.
5. **Offline conversions**: on `won` / `approved`, send Meta CAPI + Google Ads offline conversion using the stored `request_id` / `gclid` / `fbclid`.
6. **RO / ES locales**: schemas and the API are locale-agnostic (`locale` is stored); forms read labels via `getDictionary(locale)`, so adding `ro.ts` / `es.ts` and enabling the locale is enough.
7. **Durable rate limiting** (Upstash) and optional CAPTCHA (Turnstile) if spam appears.
