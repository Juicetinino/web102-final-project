-- Run this once in the Supabase SQL Editor (Project > SQL Editor > New query)

-- Add missing columns to posts
alter table posts
  add column if not exists upvotes integer not null default 0,
  add column if not exists category text not null default 'recommendation'
    check (category in ('recommendation', 'spoiler'));

-- Allow the app (using the public/anon key) to create, edit, and delete posts.
-- Ownership is enforced in the app itself (comparing the logged-in profile id
-- to posts.user_id), not by the database, since this is a simple pseudo-auth
-- setup rather than real Supabase Auth.
create policy "public insert on posts" on posts
  for insert to anon with check (true);
create policy "public update on posts" on posts
  for update to anon using (true) with check (true);
create policy "public delete on posts" on posts
  for delete to anon using (true);

-- Same for replies (comments)
create policy "public insert on replies" on replies
  for insert to anon with check (true);
create policy "public update on replies" on replies
  for update to anon using (true) with check (true);
create policy "public delete on replies" on replies
  for delete to anon using (true);
