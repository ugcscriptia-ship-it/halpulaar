-- Schéma Supabase pour Halpulaar (CLAUDE.md §6).
-- Appliquer dans l'éditeur SQL de Supabase.

create table if not exists public.user_progress (
  user_id        uuid primary key references auth.users(id) on delete cascade,
  xp             integer     not null default 0,
  streak         integer     not null default 0,
  last_active    timestamptz,
  completed_nodes text[]     not null default '{}',
  updated_at     timestamptz not null default now()
);

alter table public.user_progress enable row level security;

drop policy if exists "Lecture propre"   on public.user_progress;
drop policy if exists "Insertion propre" on public.user_progress;
drop policy if exists "Mise à jour propre" on public.user_progress;

create policy "Lecture propre" on public.user_progress
  for select using (auth.uid() = user_id);

create policy "Insertion propre" on public.user_progress
  for insert with check (auth.uid() = user_id);

create policy "Mise à jour propre" on public.user_progress
  for update using (auth.uid() = user_id);
