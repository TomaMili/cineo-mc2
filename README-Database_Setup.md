# Database setup (Supabase)

1. **Create a new Supabase project**
   – Sign in at [app.supabase.com](https://app.supabase.com) and click **New Project**.
   – Choose a name/region, set an initial DB password, and wait for provisioning to finish.

2. **Open the SQL Editor ▸ New Query** and run the schema below (feel free to tweak names or add indexes):

   -- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.achivements (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  date_achieved timestamp with time zone NOT NULL DEFAULT now(),
  achivement_name character varying,
  user_id bigint,
  CONSTRAINT achivements_pkey PRIMARY KEY (id),
  CONSTRAINT achivements_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE TABLE public.collections (
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id bigint NOT NULL,
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
  name character varying,
  CONSTRAINT collections_pkey PRIMARY KEY (id),
  CONSTRAINT collections_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE TABLE public.movies (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
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
  api_id bigint UNIQUE,
  fetched_at timestamp with time zone DEFAULT now(),
  CONSTRAINT movies_pkey PRIMARY KEY (id)
);
CREATE TABLE public.movies_collections (
  movies_id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  collections_id bigint NOT NULL,
  CONSTRAINT movies_collections_pkey PRIMARY KEY (movies_id, collections_id),
  CONSTRAINT movies_collections_collections_id_fkey FOREIGN KEY (collections_id) REFERENCES public.collections(id),
  CONSTRAINT movies_collections_movies_id_fkey FOREIGN KEY (movies_id) REFERENCES public.movies(id)
);
CREATE TABLE public.users (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  username text,
  platforms json,
  plan text,
  favourite_actors json,
  favourite_genres json,
  profile_id uuid NOT NULL DEFAULT gen_random_uuid() UNIQUE,
  CONSTRAINT users_pkey PRIMARY KEY (id),
  CONSTRAINT users_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES auth.users(id)
);
CREATE TABLE public.watch_later (
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  user_id bigint NOT NULL,
  movie_id bigint NOT NULL,
  CONSTRAINT watch_later_pkey PRIMARY KEY (user_id, movie_id),
  CONSTRAINT watch_later_movie_id_fkey FOREIGN KEY (movie_id) REFERENCES public.movies(id),
  CONSTRAINT watchlist_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE TABLE public.watch_room_members (
  room_id bigint NOT NULL,
  user_id bigint NOT NULL,
  is_ready boolean NOT NULL DEFAULT false,
  joined_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT watch_room_members_pkey PRIMARY KEY (room_id, user_id),
  CONSTRAINT watch_room_members_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.watch_rooms(id),
  CONSTRAINT watch_room_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE TABLE public.watch_room_movies (
  room_id bigint NOT NULL,
  user_id bigint NOT NULL,
  movie_id bigint NOT NULL,
  added_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT watch_room_movies_pkey PRIMARY KEY (room_id, user_id, movie_id),
  CONSTRAINT watch_room_movies_movie_id_fkey FOREIGN KEY (movie_id) REFERENCES public.movies(id),
  CONSTRAINT watch_room_movies_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id),
  CONSTRAINT watch_room_movies_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.watch_rooms(id)
);
CREATE TABLE public.watch_room_results (
  room_id bigint NOT NULL,
  result_type text NOT NULL CHECK (result_type = ANY (ARRAY['Random'::text, 'Generate'::text])),
  picked_movie bigint,
  picked_list ARRAY,
  accepted_at timestamp with time zone,
  CONSTRAINT watch_room_results_pkey PRIMARY KEY (room_id),
  CONSTRAINT watch_room_results_picked_movie_fkey FOREIGN KEY (picked_movie) REFERENCES public.movies(id),
  CONSTRAINT watch_room_results_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.watch_rooms(id)
);
CREATE TABLE public.watch_rooms (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  name text NOT NULL,
  owner_id bigint NOT NULL,
  room_type text NOT NULL CHECK (room_type = ANY (ARRAY['Random'::text, 'Generate'::text])),
  movie_limit smallint NOT NULL DEFAULT 2 CHECK (movie_limit >= 1 AND movie_limit <= 5),
  expires_at timestamp with time zone NOT NULL,
  status text NOT NULL DEFAULT 'draft'::text CHECK (status = ANY (ARRAY['draft'::text, 'active'::text, 'awaiting_accept'::text, 'final'::text, 'cancelled'::text])),
  CONSTRAINT watch_rooms_pkey PRIMARY KEY (id),
  CONSTRAINT watch_rooms_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES public.users(id)
);
CREATE TABLE public.watched (
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  users_id bigint NOT NULL,
  movie_id bigint NOT NULL,
  user_rating smallint,
  CONSTRAINT watched_pkey PRIMARY KEY (users_id, movie_id),
  CONSTRAINT watched_users_id_fkey FOREIGN KEY (users_id) REFERENCES public.users(id),
  CONSTRAINT watched_movie_id_fkey FOREIGN KEY (movie_id) REFERENCES public.movies(id)
);

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
