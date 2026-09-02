-- fibbi market test · run this in Supabase SQL editor
-- Two tables: leads (email captures) + events (funnel analytics).
-- RLS: anonymous visitors can INSERT only. Nobody can read via the anon key.

create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null,
  source text not null,          -- 'restock' | 'waitlist'
  meta jsonb not null default '{}'::jsonb
);
create unique index if not exists leads_email_source_uniq
  on public.leads (lower(email), source);

create table if not exists public.events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  session_id uuid,
  event text not null,           -- page_view | add_to_cart | checkout_attempt | oos_shown | quiz_complete | pin_check | game_score
  path text,
  payload jsonb not null default '{}'::jsonb
);
create index if not exists events_event_idx on public.events (event, created_at);
create index if not exists events_session_idx on public.events (session_id);

alter table public.leads  enable row level security;
alter table public.events enable row level security;

create policy "anon insert leads"  on public.leads  for insert to anon with check (true);
create policy "anon insert events" on public.events for insert to anon with check (true);
-- no select policies on purpose: the public site can write, never read.

-- handy funnel view (run queries as service role / dashboard)
create or replace view public.funnel_daily as
select
  date_trunc('day', created_at) as day,
  count(*) filter (where event = 'page_view')        as page_views,
  count(distinct session_id) filter (where event = 'page_view') as sessions,
  count(*) filter (where event = 'add_to_cart')      as add_to_carts,
  count(*) filter (where event = 'checkout_attempt') as checkout_attempts,
  count(*) filter (where event = 'quiz_complete')    as quizzes
from public.events
group by 1 order by 1 desc;
