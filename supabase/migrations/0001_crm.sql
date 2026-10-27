-- ============================================================================
-- AXEL SAFE TRANSPORTING — website CRM, migration 0001
-- Tables: leads, lead_events. Service-role access only (RLS on, no policies).
--
-- Run in the Supabase SQL editor or with `supabase db push`.
--
-- Planned evolution (do NOT build yet — keep v1 small):
--   * companies / contacts tables; leads.company_id + leads.contact_id FKs.
--     Dedupe by VAT number / e-mail domain when a second enquiry arrives.
--   * users table mirrored from auth.users with a role (dispatcher | admin);
--     leads.assigned_to becomes a uuid FK, lead_events.author becomes a uuid.
--     RLS policies per role replace the service-role-only model.
--   * shipments table once a quote is "won" (route, carrier, CMR, dates).
--   * update_lead_status(lead_id, status, author, note) RPC so the status
--     change and its event are written in one transaction.
-- ============================================================================

create extension if not exists pgcrypto;

-- ───────────────────────── Enums ─────────────────────────
create type public.lead_type as enum ('quote', 'carrier');

-- One enum for both pipelines; the CHECK constraint below restricts per type.
--   quote:   new → reviewing → quoted → won | lost
--   carrier: new → reviewing → approved | rejected
--   both:    spam
create type public.lead_status as enum (
  'new', 'reviewing', 'quoted', 'won', 'lost', 'approved', 'rejected', 'spam'
);

create type public.lead_event_kind as enum ('created', 'status_changed', 'note', 'assigned');

-- ───────────────────────── leads ─────────────────────────
create table public.leads (
  id              uuid primary key default gen_random_uuid(),
  request_id      uuid not null unique,                    -- returned to the browser (analytics event_id)
  type            public.lead_type not null,
  status          public.lead_status not null default 'new',

  -- common contact columns (searchable / future FK targets)
  company_name    text not null check (char_length(company_name) between 1 and 160),
  contact_person  text not null check (char_length(contact_person) between 1 and 120),
  email           text not null check (char_length(email) between 3 and 254),
  phone           text not null check (char_length(phone) between 6 and 40),

  -- type-specific fields, validated by the app (zod) before insert
  --   quote:   pickupLocation, deliveryLocation, cargoDescription, weight?, pickupDate?, deliveryDate?, additional?
  --   carrier: country, fleetSize?, vehicleTypes, regions?, message?
  details         jsonb not null default '{}'::jsonb,
  consent_at      timestamptz not null default now(),      -- GDPR consent checkbox timestamp

  -- attribution / audit (no raw IP — sha256 with salt)
  source          text check (source is null or char_length(source) <= 300),
  utm             jsonb,
  locale          text check (locale is null or char_length(locale) <= 10),
  ip_hash         text check (ip_hash is null or char_length(ip_hash) = 64),
  user_agent      text check (user_agent is null or char_length(user_agent) <= 500),

  assigned_to     text check (assigned_to is null or char_length(assigned_to) <= 80),

  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),

  constraint leads_status_matches_type check (
    status = 'spam'
    or (type = 'quote'   and status in ('new', 'reviewing', 'quoted', 'won', 'lost'))
    or (type = 'carrier' and status in ('new', 'reviewing', 'approved', 'rejected'))
  )
);

comment on table  public.leads is 'Website enquiries (transport quotes + carrier partnerships). Service-role only.';
comment on column public.leads.details is 'Type-specific submitted fields (camelCase keys, validated by the app).';
comment on column public.leads.ip_hash is 'sha256(salt:ip) — never store a raw IP address.';

create index leads_created_at_idx   on public.leads (created_at desc);
create index leads_type_status_idx  on public.leads (type, status, created_at desc);
create index leads_email_idx        on public.leads (lower(email));
create index leads_company_idx      on public.leads (lower(company_name));
create index leads_assigned_idx     on public.leads (assigned_to) where assigned_to is not null;

-- ───────────────────────── lead_events ─────────────────────────
create table public.lead_events (
  id           uuid primary key default gen_random_uuid(),
  lead_id      uuid not null references public.leads (id) on delete cascade,
  kind         public.lead_event_kind not null,
  from_status  public.lead_status,
  to_status    public.lead_status,
  note         text check (note is null or char_length(note) <= 2000),
  author       text not null default 'system' check (char_length(author) between 1 and 80),
  created_at   timestamptz not null default now(),

  constraint lead_events_status_shape check (
    (kind = 'status_changed' and to_status is not null)
    or (kind = 'created' and to_status is not null)
    or (kind in ('note', 'assigned') and from_status is null and to_status is null)
  ),
  constraint lead_events_note_required check (kind <> 'note' or (note is not null and char_length(note) > 0))
);

comment on table public.lead_events is 'Append-only history: creation, status changes, internal notes, assignments.';

create index lead_events_lead_idx on public.lead_events (lead_id, created_at);

-- ───────────────────────── updated_at trigger ─────────────────────────
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger leads_set_updated_at
  before update on public.leads
  for each row execute function public.set_updated_at();

-- ───────────────────────── Security ─────────────────────────
-- RLS enabled with NO policies: anon and authenticated roles get nothing.
-- The app uses the service-role key server-side only (bypasses RLS).
alter table public.leads       enable row level security;
alter table public.lead_events enable row level security;

revoke all on table public.leads       from anon, authenticated;
revoke all on table public.lead_events from anon, authenticated;
