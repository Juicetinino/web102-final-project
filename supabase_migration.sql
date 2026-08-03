-- Run this once in the Supabase SQL Editor (Project > SQL Editor > New query).
-- Safe to re-run: every statement either uses IF NOT EXISTS or drops the
-- policy first, so running this twice won't error.

-- Add missing columns to posts
alter table posts
  add column if not exists upvotes integer not null default 0,
  add column if not exists category text not null default 'recommendation'
    check (category in ('recommendation', 'spoiler'));

-- Allow the app (using the public/anon key) to read, create, edit, and delete
-- posts and replies. Ownership is enforced in the app itself (comparing the
-- logged-in profile id to posts.user_id / replies.user_id), not by the
-- database, since this is a simple pseudo-auth setup rather than real
-- Supabase Auth.

drop policy if exists "public select on posts" on posts;
create policy "public select on posts" on posts
  for select to anon using (true);

drop policy if exists "public insert on posts" on posts;
create policy "public insert on posts" on posts
  for insert to anon with check (true);

drop policy if exists "public update on posts" on posts;
create policy "public update on posts" on posts
  for update to anon using (true) with check (true);

drop policy if exists "public delete on posts" on posts;
create policy "public delete on posts" on posts
  for delete to anon using (true);

drop policy if exists "public select on replies" on replies;
create policy "public select on replies" on replies
  for select to anon using (true);

drop policy if exists "public insert on replies" on replies;
create policy "public insert on replies" on replies
  for insert to anon with check (true);

drop policy if exists "public update on replies" on replies;
create policy "public update on replies" on replies
  for update to anon using (true) with check (true);

drop policy if exists "public delete on replies" on replies;
create policy "public delete on replies" on replies
  for delete to anon using (true);

-- profiles: needed for account creation (insert) and login (select).
-- The app never updates or deletes a profile, so no policies for those.

drop policy if exists "public select on profiles" on profiles;
create policy "public select on profiles" on profiles
  for select to anon using (true);

drop policy if exists "public insert on profiles" on profiles;
create policy "public insert on profiles" on profiles
  for insert to anon with check (true);
