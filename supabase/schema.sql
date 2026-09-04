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

-- ─────────────────────────────────────────────────────────────────────────────
-- v2 · richer visitor detail (safe to re-run)
-- ─────────────────────────────────────────────────────────────────────────────

-- stable id from the fibbi_vid first-party cookie (survives sessions, 1 year)
alter table public.events add column if not exists visitor_id uuid;
create index if not exists events_visitor_idx on public.events (visitor_id);

-- one row per tab-session: cookie profile + first-touch attribution + device
create table if not exists public.visits (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  visitor_id uuid not null,
  session_id uuid not null,
  visit_no int,                  -- 1 = brand new, 2+ = returning
  first_seen timestamptz,        -- when the cookie was first set
  referrer text,
  landing text,
  utm jsonb not null default '{}'::jsonb,
  device jsonb not null default '{}'::jsonb
);
create index if not exists visits_visitor_idx on public.visits (visitor_id);
create unique index if not exists visits_session_uniq on public.visits (session_id);

alter table public.visits enable row level security;
drop policy if exists "anon insert visits" on public.visits;
create policy "anon insert visits" on public.visits for insert to anon with check (true);

-- session scorecard: who they are + what they did
create or replace view public.session_detail as
select
  v.created_at,
  v.visitor_id,
  v.session_id,
  v.visit_no,
  v.first_seen,
  v.referrer,
  v.landing,
  v.utm ->> 'utm_source'          as utm_source,
  v.utm ->> 'utm_campaign'        as utm_campaign,
  v.device ->> 'tz'               as timezone,
  (v.device ->> 'mobile')::bool   as is_mobile,
  v.device ->> 'viewport'         as viewport,
  v.device ->> 'net'              as connection,
  count(e.*)                                              as events,
  count(*) filter (where e.event = 'click')               as clicks,
  count(*) filter (where e.event = 'page_view')           as page_views,
  max((e.payload ->> 'depth')::int)                       as max_scroll_pct,
  sum((e.payload ->> 'dwell_ms')::int)                    as dwell_ms,
  bool_or(e.event = 'add_to_cart')                        as added_to_cart,
  bool_or(e.event = 'checkout_attempt')                   as tried_checkout
from public.visits v
left join public.events e on e.session_id = v.session_id
group by 1,2,3,4,5,6,7,8,9,10,11,12,13;

-- what people actually click, ranked
create or replace view public.click_map as
select
  path,
  payload ->> 'label' as label,
  payload ->> 'href'  as href,
  count(*)            as clicks,
  count(distinct visitor_id) as visitors
from public.events
where event = 'click'
group by 1,2,3 order by clicks desc;

