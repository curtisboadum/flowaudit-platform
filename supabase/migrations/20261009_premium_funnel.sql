-- Server-only access: the application uses the service-role key, never browser Supabase.
alter table public.crm_leads enable row level security;
alter table public.sdr_events add column if not exists event_id text;
create unique index if not exists sdr_events_event_id_key on public.sdr_events(event_id);
create table if not exists public.fa_rate_limits (
  key text primary key,
  window_start timestamptz not null,
  hits integer not null default 1
);
alter table public.fa_rate_limits enable row level security;
create or replace function public.fa_take_rate_limit(p_key text, p_max integer)
returns boolean language plpgsql security definer set search_path = public as $$
declare n integer; boundary timestamptz := date_trunc('minute',now());
begin
  insert into public.fa_rate_limits(key,window_start,hits) values(p_key,boundary,1)
  on conflict(key) do update set
    hits = case when fa_rate_limits.window_start=boundary then fa_rate_limits.hits+1 else 1 end,
    window_start=boundary returning hits into n;
  -- Small probabilistic cleanup, never stores raw IPs.
  if random()<0.01 then delete from public.fa_rate_limits where window_start<now()-interval '1 day'; end if;
  return n<=least(greatest(p_max,1),200);
end $$;
revoke all on function public.fa_take_rate_limit(text,integer) from public,anon,authenticated;
grant execute on function public.fa_take_rate_limit(text,integer) to service_role;
