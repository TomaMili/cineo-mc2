# Database setup (Supabase)

1. **Create a new Supabase project**
   – Sign in at [app.supabase.com](https://app.supabase.com) and click **New Project**.
   – Choose a name/region, set an initial DB password, and wait for provisioning to finish.

2. **Open the SQL Editor ▸ New Query** and run the schema below (feel free to tweak names or add indexes):

   ```sql
   -- Users & profiles
   create table users (
     id uuid primary key default uuid_generate_v4(),
     email text unique not null,
     username text unique not null,
     favourite_genres jsonb,
     favourite_actors jsonb,
     platforms jsonb,
     plan text default 'free',
     avatar text,
     created_at timestamptz default now()
   );

   -- Movies pulled from TMDB
   create table movies (
     id bigint generated always as identity primary key,
     api_id integer unique not null,
     title text not null,
     overview text,
     release_date date,
     poster text,
     backdrop text,
     tagline text,
     duration integer,
     imdb_rating numeric,
     genres jsonb,
     actors jsonb,
     directors jsonb
   );

   -- Watched & watch-later relations
   create table watched (
     id bigint generated always as identity primary key,
     user_id uuid references users(id) on delete cascade,
     movie_id bigint references movies(id) on delete cascade,
     user_rating numeric,
     created_at timestamptz default now()
   );

   create table watch_later (
     id bigint generated always as identity primary key,
     user_id uuid references users(id) on delete cascade,
     movie_id bigint references movies(id) on delete cascade,
     created_at timestamptz default now()
   );

   -- Collections (many-to-many)
   create table collections (
     id bigint generated always as identity primary key,
     user_id uuid references users(id) on delete cascade,
     name text not null,
     created_at timestamptz default now()
   );

   create table movies_collections (
     movie_id bigint references movies(id) on delete cascade,
     collection_id bigint references collections(id) on delete cascade,
     primary key (movie_id, collection_id)
   );

   -- Achievements / gamification
   create table achievements (
     id bigint generated always as identity primary key,
     user_id uuid references users(id) on delete cascade,
     achievement_name text not null,
     date_achieved timestamptz default now()
   );
   ```

3. **Enable Row Level Security** on each table (Settings ▸ Auth ▸ Enable RLS) and add policies, e.g.:

   ```sql
   -- Allow a logged-in user to manage their own watched list
   create policy "Users manage own watched"
   on watched for all
   using (auth.uid() = user_id);
   ```

4. **Grab your credentials**
   – Project URL → `VITE_SUPABASE_URL`
   – `anon` public key → `VITE_SUPABASE_ANON_KEY`

5. **(Optional) Storage**
   – Create a **bucket** called `avatars` if you want profile-picture uploads.
   – Grant public read or write a policy with `storage.object.access`.

---
