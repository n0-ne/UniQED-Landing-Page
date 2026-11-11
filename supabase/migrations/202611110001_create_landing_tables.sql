create extension if not exists pgcrypto;

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  visitor_id uuid not null,
  event_name text not null check (event_name in (
    'page_view',
    'sample_report_view',
    'qualification_submit',
    'price_view',
    'cta_click',
    'prelaunch_notice_view',
    'lead_submit'
  )),
  university text not null,
  report_variant text not null,
  price_variant text not null,
  source text not null default 'direct',
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  visitor_id uuid not null,
  contact_type text not null check (contact_type in ('email', 'phone')),
  contact_value text not null,
  contact_hash text not null unique,
  consent_version text not null,
  consented_at timestamptz not null,
  retention_until date not null,
  academy_status text not null check (academy_status in ('regular', 'independent', 'final-only')),
  qualified boolean not null,
  university text not null,
  report_variant text not null,
  price_variant text not null,
  source text not null default 'direct',
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  created_at timestamptz not null default now()
);

create index if not exists events_visitor_created_idx on public.events (visitor_id, created_at);
create index if not exists events_name_created_idx on public.events (event_name, created_at);
create index if not exists leads_qualified_created_idx on public.leads (qualified, created_at);

alter table public.events enable row level security;
alter table public.leads enable row level security;

revoke all on public.events from anon, authenticated;
revoke all on public.leads from anon, authenticated;

comment on table public.events is 'De-identified landing page funnel events.';
comment on table public.leads is 'Restricted launch notification contacts. Never expose to browser clients.';
