# Database setup (Supabase)

1. **Create a new Supabase project**
   – Sign in at [app.supabase.com](https://app.supabase.com) and click **New Project**.
   – Choose a name/region, set an initial DB password, and wait for provisioning to finish.

2. **Open the SQL Editor ▸ New Query** and run the schema below (feel free to tweak names or add indexes):

  ```sql
-- USERS
create table users (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  username text,
  platforms json,
  plan text,
  favourite_actors json,
  favourite_genres json,
  profile_id uuid not null default gen_random_uuid() unique,
  foreign key (profile_id) references auth.users(id)
);

-- MOVIES
create table movies (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  title text,
  overview text,
  release_date smallint,
  genres json,
  actors json,
  directors json,
  poster text,
  backdrop text,
  trailer text,
  platforms json,
  writers json,
  imdb_rating real,
  user_rating smallint,
  duration bigint,
  tagline text,
  api_id bigint unique,
  fetched_at timestamptz default now()
);

-- WATCHED / WATCH LATER
create table watched (
  created_at timestamptz not null default now(),
  users_id bigint not null,
  movie_id bigint not null,
  user_rating smallint,
  primary key (users_id, movie_id),
  foreign key (users_id) references users(id),
  foreign key (movie_id) references movies(id)
);

create table watch_later (
  created_at timestamptz not null default now(),
  user_id bigint not null,
  movie_id bigint not null,
  primary key (user_id, movie_id),
  foreign key (user_id) references users(id),
  foreign key (movie_id) references movies(id)
);

-- COLLECTIONS
create table collections (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  user_id bigint not null,
  name text,
  foreign key (user_id) references users(id)
);

create table movies_collections (
  movies_id bigint generated always as identity,
  created_at timestamptz not null default now(),
  collections_id bigint not null,
  primary key (movies_id, collections_id),
  foreign key (movies_id) references movies(id),
  foreign key (collections_id) references collections(id)
);

-- ACHIEVEMENTS
create table achivements (
  id bigint generated always as identity primary key,
  date_achieved timestamptz not null default now(),
  achivement_name varchar,
  user_id bigint,
  foreign key (user_id) references users(id)
);

-- WATCH TOGETHER ROOMS
create table watch_rooms (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null,
  owner_id bigint not null,
  room_type text not null check (room_type in ('Random', 'Generate')),
  movie_limit smallint not null default 2 check (movie_limit between 1 and 5),
  expires_at timestamptz not null,
  status text not null default 'draft' check (status in ('draft', 'active', 'awaiting_accept', 'final', 'cancelled')),
  foreign key (owner_id) references users(id)
);

create table watch_room_members (
  room_id bigint not null,
  user_id bigint not null,
  is_ready boolean not null default false,
  joined_at timestamptz not null default now(),
  primary key (room_id, user_id),
  foreign key (room_id) references watch_rooms(id),
  foreign key (user_id) references users(id)
);

create table watch_room_movies (
  room_id bigint not null,
  user_id bigint not null,
  movie_id bigint not null,
  added_at timestamptz not null default now(),
  primary key (room_id, user_id, movie_id),
  foreign key (room_id) references watch_rooms(id),
  foreign key (user_id) references users(id),
  foreign key (movie_id) references movies(id)
);

create table watch_room_results (
  room_id bigint primary key,
  result_type text not null check (result_type in ('Random', 'Generate')),
  picked_movie bigint,
  picked_list json[],
  accepted_at timestamptz,
  foreign key (room_id) references watch_rooms(id),
  foreign key (picked_movie) references movies(id)
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
