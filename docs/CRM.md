# CRM / lead pipeline (v2)

Website forms + leads entered by dispatch (phone, e-mail, WhatsApp, freight exchanges…) → one lead store → `/admin` CRM in Romanian, usable on a phone.

No TMS integration (QuickCargo) and no CSV export, on purpose.

## Architecture

```
Public forms (client)                      src/components/forms/
  QuoteForm          type quote           (full transport enquiry)
  QuickQuoteForm     type quote + mode "quick"   (Cerere rapidă: name, phone, from → to, note)
  CarrierForm        type carrier         (CUI, vehicle checkboxes, CMR yes/no, licence…)
  CallbackForm       type callback        (Vă sunăm noi: name, phone, preferred time)
  QuoteRequestTabs   contact page: tabs Solicitare completă / Cerere rapidă
   │  POST JSON  {type, mode?, …fields, source, utm, locale, website(honeypot)}
   ▼
POST /api/enquiries                        src/app/api/enquiries/route.ts
   honeypot → 200 (nothing stored) · rate limit → 429 · zod → 422 · leadFromWebForm()
   │
   ▼
LeadRepository / UserRepository            src/lib/leads/repository.ts   (driver chosen from env)
   ├─ Supabase (service role)              src/lib/leads/drivers/supabase.ts
   └─ Local JSON (dev only)                src/lib/leads/drivers/local.ts  (.data/leads.json + .data/users.json)
   │   Both drivers share the business rules in src/lib/leads/types.ts (planStatusChange, duplicates, carrier filter).
   │   `stats()` (type + status only) feeds the nav badges and filter counts; dashboard metrics use `all()`.
   ├─ after(): Resend e-mail               src/lib/leads/notify.ts  (Romanian, type + route + admin link; never fails the write)
   ▼
/admin  (Panou · Lead-uri listă/pipeline · Lead · Lead nou · Transportatori)
   src/app/admin/**  +  src/components/admin/**
   auth: src/proxy.ts (optimistic cookie check) + src/lib/admin/auth.ts (real check in every page/action)
   src/lib/admin/metrics.ts   dashboard numbers (pure functions, same for both drivers)
   src/lib/admin/anaf.ts      ANAF VAT web service lookup (server-only)
```

Labels have one source of truth: `src/lib/leads/labels.ts` (statuses, types, channels, lost reasons, vehicles, ro-RO / Europe/Bucharest date formatting such as `12 nov. 2026, 14:05` and `acum 4 min`). It is used by the CRM UI, the drivers' event notes and the notification e-mail. `src/lib/admin/format.ts` keeps only UI helpers (date-only fields, initials, one-line lead facts).

CRM UI: the restyled shell (`AdminChrome`: sidebar ≥ lg, top bar with a scrolling nav on phones), `admin.css` scoped to `.admin-root` (static navy background, no animations on lists), keyboard shortcuts (`Hotkeys`: j/k, Enter, /, g d, n, s, Esc) and copy buttons.

Client-safe shared code: `src/lib/leads/schema.ts` (zod schemas, enums, helpers), `src/lib/leads/labels.ts` (Romanian labels, Europe/Bucharest time helpers, money), `src/lib/leads/summary.ts`, `src/lib/leads/types.ts`. Everything else under `src/lib/leads` and `src/lib/admin` is server-only.

## Lead model

| column | notes |
|---|---|
| `type` | `quote` \| `carrier` \| `callback` |
| `status` | quote: `new → reviewing → quoted → won \| lost` · carrier: `new → reviewing → approved \| rejected` · callback: `new → reviewing → won \| lost` · all: `spam`. CHECK constraint + repository. UI labels: Nou, În lucru, Ofertat, Câștigat, Pierdut, Aprobat, Respins, Spam. |
| `company_name`, `contact_person`, `email`, `phone` | `company_name`, `email`, `phone` are nullable since 0002 (quick quote / callback / manual leads). CHECK: email or phone present. |
| `vat_number` | CUI / VAT number, normalised upper case without spaces (`RO39875222`). Required on the carrier form. |
| `details` jsonb | type-specific fields, zod-validated. quote: `mode` (`full`\|`quick`), `pickupLocation`, `deliveryLocation`, `cargoDescription?`, `weight?`, dates, `additional?` · carrier: `country`, `fleetSize?`, `vehicleTypes` (array of `curtainsider`\|`reefer`\|`mega`\|`other`; v1 rows hold a string), `cmrInsurance` (`yes`\|`no`), `licenceNumber?`, `regions?`, `message?` · callback: `preferredTime` (`any`\|`morning`\|`afternoon`\|`evening`), `note?` |
| `source_channel` | `site` (all web forms), `phone`, `email`, `whatsapp`, `exchange` (bursă), `referral`, `other` |
| `consent_at` | GDPR checkbox time; null for manual entries |
| `source`, `utm`, `locale`, `request_id`, `ip_hash`, `user_agent` | attribution / audit, same as v1 (no raw IPs) |
| `assigned_user_id` → `admin_users.id` | owner. `assigned_to` keeps the owner's display name (and v1 free-text values) |
| `created_by` → `admin_users.id` | manual entries |
| `first_response_at` | set on the first status change out of `new` or the first internal note |
| `next_action_at`, `next_action_note` | follow-up ("Următorul pas") |
| `offered_price`, `carrier_cost` numeric(12,2), `currency` (`EUR`\|`RON`) | margin = price − cost (shown live, summed on the dashboard per currency) |
| `lost_reason` (`price`, `no_truck`, `no_reply`, `deadline`, `other`), `lost_note` | required when status becomes `lost`; `other` also needs the note |
| `carrier_checks` jsonb | `{license, cmr, vehicleDocs, companyActive: {at, by, byId}}`. All four required before `approved` (repository rule + disabled option in the UI) |
| `anaf` jsonb | last ANAF snapshot (name, address, VAT status, inactive, registration status, insolvency flag, who/when) |
| `approved_at` | carrier approval time (dashboard "aprobați luna aceasta") |
| `phone_key` | generated: last 9 digits of the phone, for duplicate detection |

`lead_events` (append-only): `created`, `status_changed`, `note`, `assigned`, `follow_up`, `economics`, `verification`, `anaf_lookup`, each with `author` (name) + `author_id` (user) + timestamp.

`admin_users`: `id`, `name`, `email` (unique, lower case), `role` (`admin`\|`dispatcher`), `password_hash` (scrypt, `scrypt$N$r$p$salt$hash`), `active`, `last_login_at`. RLS on, no policies, service role only. Roles are recorded but do not restrict anything yet (3-person team: everybody can claim, assign, approve).

### Migration 0002 (`supabase/migrations/0002_crm_v2.sql`)

Additive and idempotent (safe to re-run): adds enum values (`callback`, new event kinds), the `admin_users` table, the new lead columns, constraints and indexes; drops NOT NULL on `company_name`/`email`/`phone`/`consent_at`; re-creates the status/type and event-shape CHECKs. No column is dropped and no existing row changes except defaults for new columns (`source_channel = 'site'`, `carrier_checks = {}`).
New enum labels cannot be used inside the transaction that adds them, so the CHECKs compare `type::text` / `kind::text`. Tested on Postgres 16: 0001 → sample rows → 0002 (single transaction) → 0002 again.

## CRM features

- **Accounts**: e-mail + password per person; the session carries the user id; deactivated users are logged out on their next request. Events record the real author.
- **Assignment**: "Preiau" (claim) on the lead, assign dropdown, list filter Toate / Ale mele / Nealocate. Manual leads are assigned to their creator.
- **Pipeline**: `/admin/leads?view=board&type=quote|carrier|callback`, one column per status, status change from the card (lost asks for the reason inline).
- **Response time**: red badge on leads still `new` after 60 minutes (list, board, lead, dashboard banner). Dashboard: median first response, website leads of the last 30 days.
- **Follow-ups**: date/time (Europe/Bucharest) + note; dashboard "De făcut azi" and "Întârziate" (open leads only).
- **Quote economics**: offered price, carrier cost, currency, live margin; on quote and callback leads.
- **Carriers**: 4-item verification checklist with who/when; ANAF lookup; approve only with 4/4; `/admin/carriers` directory of approved carriers, filter by vehicle type and free text (route/region/country/company), tel / WhatsApp / e-mail buttons.
- **Lead nou** (`/admin/leads/new`): type, channel, contact, route / vehicles / preferred time, notes.
- **Lead detail**: tel:, `https://wa.me/<digits>` (07… numbers get the 40 prefix), mailto:; duplicates panel (same e-mail, same phone last 9 digits, same CUI with or without `RO`).
- **Dashboard**: open leads by status per type, new 7/30 days, conversion (won / (won + lost), quote + callback), won count + margin per currency, lost reasons, leads by channel, website leads by `utm_source`, median first response, carriers approved this month. Plain accessible bars (text values + decorative bar).

### ANAF lookup

`POST https://webservicesp.anaf.ro/api/PlatitorTvaRest/v9/tva`, body `[{"cui": 39875222, "data": "YYYY-MM-DD"}]`, no key (doc: `static.anaf.ro/static/10/Anaf/Informatii_R/Servicii_web/doc_WS_V9.txt`, checked 10.11.2026). Server-side only, 10 s timeout, max 1 request/second per instance, failures shown as a Romanian message (`ANAF nu răspunde acum…`). Foreign VAT numbers are refused (use VIES). The service has **no insolvency field**: the flag is derived from the registration status text / deregistration date, and the UI asks dispatch to confirm insolvency in the BPI (ONRC) before ticking "Firmă activă, fără insolvență". ANAF's cedilla s/t letters are normalised to the comma-below forms.

## API contract

`POST /api/enquiries` → `201 {ok, requestId}` · `400 bad_request` · `413` · `422 {error:"validation", fields:{name: code}}` · `429 rate_limited` (+ `Retry-After`) · `503 not_configured` · `500 server_error`.
Field codes: `required`, `email`, `consent`, `invalid`, `too_long` → `forms.errors` per locale.

```bash
B=localhost:3000/api/enquiries; H='content-type: application/json'
curl -i -X POST $B -H "$H" -d '{"type":"quote","mode":"quick","contactPerson":"Maria","phone":"0744 123 456","pickupLocation":"Oradea","deliveryLocation":"Valencia","consent":true}'
curl -i -X POST $B -H "$H" -d '{"type":"callback","contactPerson":"Andrei","phone":"0755 000 111","preferredTime":"morning","consent":true}'
curl -i -X POST $B -H "$H" -d '{"type":"carrier","companyName":"Test SRL","vatNumber":"RO12345678","contactPerson":"A","email":"a@test.ro","phone":"0744000000","country":"RO","vehicleTypes":["curtainsider","mega"],"cmrInsurance":"yes","consent":true}'
```

Rate limit: 5 submissions / 10 min per IP hash, in-memory (per serverless instance). Admin login: 10 attempts / 15 min per IP hash.

## Environment variables

| var | required | purpose |
|---|---|---|
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | production | lead + user store. Service role bypasses RLS: server only, never `NEXT_PUBLIC_`. |
| `LEADS_DRIVER=local` | dev only | `.data/leads.json` + `.data/users.json`. Ignored in production. |
| `ADMIN_SESSION_SECRET` | yes | HMAC key for the session cookie, ≥16 chars (`openssl rand -hex 32`). Changing it logs everybody out. |
| `ADMIN_PASSWORD` | bootstrap only | shared password, accepted **only while no active user exists** |
| `ADMIN_AUTHOR_NAME` | optional | author name for the fallback login (default `admin`) |
| `IP_HASH_SALT` | optional | salt for IP hashing (falls back to `ADMIN_SESSION_SECRET`) |
| `RESEND_API_KEY`, `LEADS_NOTIFY_TO`, `LEADS_NOTIFY_FROM` | optional | new-lead e-mail for every website form |

v2 adds no variables; `ADMIN_PASSWORD` changed meaning (fallback).

## Setup: Supabase

1. Create a project (EU region, e.g. Frankfurt).
2. SQL editor → run `0001_crm.sql`, then `0002_crm_v2.sql` (or `supabase db push`).
3. Project settings → API: URL + **service_role** key into the Vercel environment variables (Production + Preview). No anon key.
4. Create the accounts (below), redeploy, submit a test enquiry, check `/admin`.

## Creating dispatcher accounts

Runs against the same store as the site (reads `.env.local` / `.env`; for production put the Supabase URL + service-role key in the environment of the machine running it):

```bash
pnpm admin:user --email ramona@axelsafe-transporting.com --name "Ramona" --role dispatcher
#   → prints a generated password once; send it privately
pnpm admin:user --email ramona@axelsafe-transporting.com --name "Ramona" --password 'new-long-password'   # reset
pnpm admin:user --email ramona@axelsafe-transporting.com --name "Ramona" --disable                        # deactivate
pnpm admin:user --email roland@… --name "Roland" --role admin
```

Same e-mail = update (that is the reset). Passwords: min. 10 characters. As soon as one active account exists, the shared `ADMIN_PASSWORD` stops working.

## Local development

```bash
cp .env.example .env.local     # LEADS_DRIVER=local, ADMIN_SESSION_SECRET=$(openssl rand -hex 32), ADMIN_PASSWORD=…
pnpm admin:user --email you@example.com --name "Test" --role admin
pnpm dev                       # http://127.0.0.1:3000/admin
```

## Security notes

- Session token `v2.<exp>.<userId|pw>.<nonce>.<hmac>`, `httpOnly`, `secure` in prod, `sameSite=lax`, path `/admin`, 12 h. The proxy only checks the signature; every page/action resolves the user and checks `active` (and that fallback sessions are only valid while no users exist). v1 tokens are rejected (everyone signs in again once).
- Passwords: scrypt (N=16384, r=8, p=1, 16-byte salt), constant-time compare; unknown e-mails still run scrypt (no account enumeration by timing).
- `/admin` is `noindex` and `Cache-Control: private, no-store`. RLS on every table with no policies.
- Honeypot, rate limits, no raw IPs, forms never fake success: unchanged from v1.

## Analytics hook

After a `201`, forms push `{ event: "lead_submit", form: "quote" | "quote_quick" | "carrier" | "callback", event_id: requestId }` to `window.dataLayer` (no PII).

## Roadmap

1. Transactional status RPC (status + event in one statement) and an SQL view for the dashboard once volume grows (now computed in JS over the latest 5.000 leads).
2. Offline conversions on `won` (Meta CAPI / Google Ads) using `request_id`, `gclid`, `fbclid`.
3. Role rules if needed (e.g. only admins approve carriers or reassign other people's leads).
4. Durable rate limiting (Upstash) / Turnstile if spam appears.
5. Supabase Auth (magic link / 2FA) instead of the custom password table, if the team grows.
