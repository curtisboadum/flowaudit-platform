-- Personalized demo routing for watch_links.
-- Applied to Supabase project pdhrjhrmzsbkwfbixodj on 2026-10-26.
-- The table keeps practice_name for older SDR callers; company_name is canonical.

begin;

alter table public.watch_links add column if not exists company_name text;
alter table public.watch_links add column if not exists demo_id text;
alter table public.watch_links add column if not exists email text;
alter table public.watch_links add column if not exists campaign text;
alter table public.watch_links add column if not exists link_ref text;
alter table public.watch_links add column if not exists trade text;
alter table public.watch_links add column if not exists approved_by text;
alter table public.watch_links add column if not exists measurement_off_at timestamptz;

update public.watch_links
set company_name = coalesce(nullif(company_name, ''), nullif(practice_name, ''))
where company_name is null or company_name = '';

-- The one active legacy link at migration time was the SDR home-services token.
update public.watch_links
set trade = 'electrical',
    demo_id = 'smart-street',
    campaign = 'sdr-home-services',
    link_ref = 'sdr-david-martin-35899716'
where lead_id = 'david-martin-35899716'
  and revoked_at is null;

-- Any other active legacy row gets the safe home-services default, never roof-leak.
update public.watch_links
set trade = coalesce(trade, 'home-services'),
    demo_id = coalesce(demo_id, 'smart-street'),
    campaign = coalesce(campaign, 'sdr-home-services'),
    link_ref = coalesce(link_ref, 'sdr-' || lead_id)
where revoked_at is null
  and demo_id is null
  and practice_name !~* 'dental|dentist|orthodont|endodont|periodont';

-- Revoked dental rows keep a null demo_id; the page 404s them.

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'watch_links_demo_id_check'
  ) then
    alter table public.watch_links
      add constraint watch_links_demo_id_check
      check (demo_id is null or demo_id in ('routine','urgent','roof-leak','smart-street','agile-tech'));
  end if;
end $$;

create unique index if not exists watch_links_link_ref_key on public.watch_links(link_ref);
create index if not exists watch_links_lead_active_idx
  on public.watch_links(lead_id) where revoked_at is null;

commit;
