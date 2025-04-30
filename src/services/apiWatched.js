import supabase from "./supabase";
import { fetchMovieDetails } from "./apiTmdb";

/**
 * Map a TMDB movie object into our `movies` table format,
 * fetching full details if needed to include credits with images.
 */
async function mapMovieForDB(tmdb) {
  let full = tmdb;
  if (!tmdb.credits || !Array.isArray(tmdb.credits.cast)) {
    full = await fetchMovieDetails(tmdb.id);
  }
  return {
    api_id: full.id,
    title: full.title,
    overview: full.overview,
    release_date: full.release_date
      ? Number(full.release_date.slice(0, 4))
      : null,
    poster: full.poster_path,
    backdrop: full.backdrop_path,
    tagline: full.tagline,
    duration: full.runtime,
    imdb_rating: full.vote_average ? full.vote_average / 2 : null,
    genres: full.genres,
    actors: full.credits?.cast
      ?.slice(0, 10)
      .map(({ id, name, profile_path }) => ({ id, name, profile_path })),
    directors: full.credits?.crew
      ?.filter((p) => p.job === "Director")
      .map(({ id, name, profile_path }) => ({ id, name, profile_path })),
    writers: full.credits?.crew
      ?.filter((p) => p.job === "Writer")
      .map(({ id, name }) => ({ id, name })),
  };
}

/**
 * Upsert a movie row, returning the DB record (including generated id).
 */
export async function upsertMovie(tmdbMovie) {
  const row = await mapMovieForDB(tmdbMovie);
  const { data, error } = await supabase
    .from("movies")
    .upsert(row, { onConflict: "api_id" })
    .select()
    .single();
  if (error) throw error;
  return data;
}

/**
 * Add a movie to the user's Watched list, with optional rating.
 */
export async function addToWatched(userId, tmdbMovie, rating = null) {
  const movieRow = await upsertMovie(tmdbMovie);
  const { error } = await supabase.from("watched").insert([
    {
      users_id: userId,
      movie_id: movieRow.id,
      user_rating: rating,
    },
  ]);
  if (error && error.code !== "23505") throw error;
  return movieRow;
}

/**
 * Remove a movie from the user's Watched list
 */
export async function removeFromWatched(userId, movieDbId) {
  const { error } = await supabase
    .from("watched")
    .delete()
    .eq("users_id", userId)
    .eq("movie_id", movieDbId);
  if (error) throw error;
}
