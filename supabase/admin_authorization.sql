-- ADNOV admin authorization migration
-- Run manually in the Supabase SQL Editor after creating the authorized Auth user.

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default timezone('utc'::text, now())
);

alter table public.admin_users enable row level security;

create or replace function public.is_adnov_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
  );
$$;

revoke all on function public.is_adnov_admin() from public;
grant execute on function public.is_adnov_admin() to authenticated;

-- Remove broad authenticated enquiry access. Anonymous INSERT remains unchanged.
drop policy if exists "Allow authenticated staff to view enquiries" on public.enquiries;
drop policy if exists "Allow authenticated staff to update enquiries" on public.enquiries;
drop policy if exists "Allow admins to view enquiries" on public.enquiries;
drop policy if exists "Allow admins to update enquiries" on public.enquiries;
drop policy if exists "Allow admins to delete enquiries" on public.enquiries;

create policy "Allow admins to view enquiries"
on public.enquiries
for select
to authenticated
using (public.is_adnov_admin());

create policy "Allow admins to update enquiries"
on public.enquiries
for update
to authenticated
using (public.is_adnov_admin())
with check (public.is_adnov_admin());

create policy "Allow admins to delete enquiries"
on public.enquiries
for delete
to authenticated
using (public.is_adnov_admin());

-- Example only. Replace with the UUID shown in Supabase Authentication > Users.
-- insert into public.admin_users (user_id) values ('00000000-0000-0000-0000-000000000000') on conflict do nothing;
