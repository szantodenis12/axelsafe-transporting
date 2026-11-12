-- ============================================================================
-- AXEL SAFE TRANSPORTING — website CRM, migration 0002 (CRM v2)
--
-- Additive and idempotent; safe to run on a database that already has 0001 and data.
-- No column is dropped, no row is rewritten except defaults for new columns.
--
--   * admin_users: per-user CRM accounts (scrypt hash), role admin | dispatcher
--   * lead type "callback" (Vă sunăm noi)
--   * leads: source_channel, assigned_user_id, created_by, first_response_at,
--            next_action_at/_note, offered_price / carrier_cost / currency,
--            lost_reason / lost_note, vat_number, phone_key (generated),
--            carrier_checks, anaf, approved_at
--   * company_name / email / phone / consent_at become nullable (quick quote,
--     callback and manually entered leads do not have all of them)
--   * lead_events: author_id + new event kinds
--
-- Note on enums: values added with ADD VALUE cannot be *used* in the same
-- transaction (Supabase SQL editor / db push run one transaction). The CHECK
-- constraints below therefore compare `type::text` / `kind::text`, which never
-- resolves the new enum labels at migration time.
-- ============================================================================

-- ───────────────────────── Enum values ─────────────────────────
alter type public.lead_type add value if not exists 'callback';

alter type public.lead_event_kind add value if not exists 'follow_up';
alter type public.lead_event_kind add value if not exists 'economics';
alter type public.lead_event_kind add value if not exists 'verification';
alter type public.lead_event_kind add value if not exists 'anaf_lookup';

-- ───────────────────────── admin_users ─────────────────────────
create table if not exists public.admin_users (
  id             uuid primary key default gen_random_uuid(),
  name           text not null check (char_length(name) between 1 and 80),
  -- stored lower-case; unique constraint (not just an index) so upsert(on_conflict=email) works
  email          text not null unique check (char_length(email) between 3 and 254 and email = lower(email)),
  role           text not null default 'dispatcher' check (role in ('admin', 'dispatcher')),
  -- scrypt$<N>$<r>$<p>$<salt b64>$<hash b64> — written by scripts/create-admin-user.ts
  password_hash  text not null check (password_hash like 'scrypt$%'),
  active         boolean not null default true,
  last_login_at  timestamptz,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

comment on table public.admin_users is 'CRM accounts (dispatchers / admins). Service-role only; password hashes never leave the server.';

drop trigger if exists admin_users_set_updated_at on public.admin_users;
create trigger admin_users_set_updated_at
  before update on public.admin_users
  for each row execute function public.set_updated_at();

alter table public.admin_users enable row level security;
revoke all on table public.admin_users from anon, authenticated;

-- ───────────────────────── leads: relax columns ─────────────────────────
-- Quick quotes / callbacks have no company or e-mail; manual leads may have no phone or consent.
-- Existing CHECKs (char_length …) still apply when a value is present (NULL passes a CHECK).
alter table public.leads alter column company_name drop not null;
alter table public.leads alter column email        drop not null;
alter table public.leads alter column phone        drop not null;
alter table public.leads alter column consent_at   drop not null;

-- ───────────────────────── leads: new columns ─────────────────────────
alter table public.leads add column if not exists source_channel    text not null default 'site';
alter table public.leads add column if not exists assigned_user_id  uuid references public.admin_users (id) on delete set null;
alter table public.leads add column if not exists created_by        uuid references public.admin_users (id) on delete set null;
alter table public.leads add column if not exists first_response_at timestamptz;
alter table public.leads add column if not exists next_action_at    timestamptz;
alter table public.leads add column if not exists next_action_note  text;
alter table public.leads add column if not exists offered_price     numeric(12, 2);
alter table public.leads add column if not exists carrier_cost      numeric(12, 2);
alter table public.leads add column if not exists currency          text;
alter table public.leads add column if not exists lost_reason       text;
alter table public.leads add column if not exists lost_note         text;
alter table public.leads add column if not exists vat_number        text;
alter table public.leads add column if not exists carrier_checks    jsonb not null default '{}'::jsonb;
alter table public.leads add column if not exists anaf              jsonb;
alter table public.leads add column if not exists approved_at       timestamptz;
-- Last 9 digits of the phone: "0744 123 456" = "+40 744 123 456". Used for duplicate detection.
alter table public.leads add column if not exists phone_key text
  generated always as (nullif(right(regexp_replace(coalesce(phone, ''), '[^0-9]', '', 'g'), 9), '')) stored;

comment on column public.leads.assigned_to      is 'Owner display name (denormalised; v1 rows only have this). The owner is assigned_user_id.';
comment on column public.leads.assigned_user_id is 'Owner (admin_users.id). "Preiau" sets it to the current user.';
comment on column public.leads.first_response_at is 'First status change out of new, or first internal note.';
comment on column public.leads.carrier_checks   is '{license|cmr|vehicleDocs|companyActive: {at, by, byId}} — all four required before approved.';
comment on column public.leads.anaf             is 'Last ANAF VAT web service (v9) snapshot for vat_number.';

-- ───────────────────────── leads: constraints ─────────────────────────
alter table public.leads drop constraint if exists leads_source_channel_check;
alter table public.leads add  constraint leads_source_channel_check
  check (source_channel in ('site', 'phone', 'email', 'whatsapp', 'exchange', 'referral', 'other'));

alter table public.leads drop constraint if exists leads_currency_check;
alter table public.leads add  constraint leads_currency_check check (currency is null or currency in ('EUR', 'RON'));

alter table public.leads drop constraint if exists leads_money_check;
alter table public.leads add  constraint leads_money_check
  check ((offered_price is null or offered_price >= 0) and (carrier_cost is null or carrier_cost >= 0));

alter table public.leads drop constraint if exists leads_lost_reason_check;
alter table public.leads add  constraint leads_lost_reason_check
  check (lost_reason is null or lost_reason in ('price', 'no_truck', 'no_reply', 'deadline', 'other'));

alter table public.leads drop constraint if exists leads_text_lengths_check;
alter table public.leads add  constraint leads_text_lengths_check check (
  (next_action_note is null or char_length(next_action_note) <= 500)
  and (lost_note is null or char_length(lost_note) <= 1000)
  and (vat_number is null or char_length(vat_number) between 2 and 20)
);

-- A lead must have at least one way to reach the person.
alter table public.leads drop constraint if exists leads_contactable_check;
alter table public.leads add  constraint leads_contactable_check check (email is not null or phone is not null);

-- Status per type, now including callback (new → reviewing → won | lost, spam).
alter table public.leads drop constraint if exists leads_status_matches_type;
alter table public.leads add  constraint leads_status_matches_type check (
  status = 'spam'
  or (type::text = 'quote'    and status in ('new', 'reviewing', 'quoted', 'won', 'lost'))
  or (type::text = 'carrier'  and status in ('new', 'reviewing', 'approved', 'rejected'))
  or (type::text = 'callback' and status in ('new', 'reviewing', 'won', 'lost'))
);

-- ───────────────────────── leads: indexes ─────────────────────────
create index if not exists leads_assigned_user_idx on public.leads (assigned_user_id, created_at desc);
create index if not exists leads_next_action_idx   on public.leads (next_action_at) where next_action_at is not null;
create index if not exists leads_phone_key_idx     on public.leads (phone_key) where phone_key is not null;
create index if not exists leads_vat_idx           on public.leads (vat_number) where vat_number is not null;
create index if not exists leads_channel_idx       on public.leads (source_channel, created_at desc);
create index if not exists leads_approved_carriers_idx on public.leads (approved_at desc) where status = 'approved';

-- ───────────────────────── lead_events ─────────────────────────
alter table public.lead_events add column if not exists author_id uuid references public.admin_users (id) on delete set null;

-- 0001 only allowed note/assigned without statuses; the new kinds behave the same way.
alter table public.lead_events drop constraint if exists lead_events_status_shape;
alter table public.lead_events add  constraint lead_events_status_shape check (
  (kind::text in ('status_changed', 'created') and to_status is not null)
  or (kind::text not in ('status_changed', 'created') and from_status is null and to_status is null)
);

create index if not exists lead_events_author_idx on public.lead_events (author_id) where author_id is not null;

-- RLS stays on with no policies (set in 0001); only the service role reads/writes.
