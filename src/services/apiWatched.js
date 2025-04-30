import supabase from "./supabase";

async function upsertMovie(tmdb) {
  const payload = {
    api_id: tmdb.id,
    title: tmdb.title,
    overview: tmdb.overview,
    release_date: tmdb.release_date ? +tmdb.release_date.slice(0, 4) : null,
    poster: tmdb.poster_path,
    backdrop: tmdb.backdrop_path,
    tagline: tmdb.tagline,
    duration: tmdb.runtime,
    imdb_rating: tmdb.vote_average ? tmdb.vote_average / 2 : null,
    genres: tmdb.genres,
  };

  const { data, error } = await supabase
    .from("movies")
    .upsert(payload, { onConflict: "api_id" }) // api_id is UNIQUE
    .select()
    .single();

  if (error) throw error;
  return data; // has local id
}

/* ──────────────────────────────────────────────────────────────────
 * 2.  Add / update "watched" row  (unique per user+movie)
 * ────────────────────────────────────────────────────────────────── */
export async function addToWatched(userId, tmdbMovie, rating = null) {
  const movieRow = await upsertMovie(tmdbMovie);

  const { error } = await supabase.from("watched").upsert(
    {
      users_id: userId,
      movie_id: movieRow.id,
      user_rating: rating,
      created_at: new Date().toISOString(), // refresh timestamp
    },
    {
      onConflict: "users_id,movie_id",
      ignoreDuplicates: false, // force update of rating
    }
  );

  if (error) throw error;
  return movieRow; // return local movie row
}

/* ──────────────────────────────────────────────────────────────────
 * 3.  Remove row (unchanged)
 * ────────────────────────────────────────────────────────────────── */
export async function removeFromWatched(userId, movieDbId) {
  const { error } = await supabase
    .from("watched")
    .delete()
    .eq("users_id", userId)
    .eq("movie_id", movieDbId);

  if (error) throw error;
}
