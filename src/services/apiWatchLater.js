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
    api_id: full.id, // UNIQUE
    title: full.title,
    overview: full.overview,
    release_date: full.release_date
      ? Number(full.release_date.slice(0, 4))
      : null,
    poster: full.poster_path,
    backdrop: full.backdrop_path,
    tagline: full.tagline,
    duration: full.runtime, // minutes
    imdb_rating: full.vote_average ? full.vote_average / 2 : null,
    genres: full.genres, // JSON[]
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
 * Add a movie to the user's Watch-Later list
 */
export async function addToWatchLater(userId, tmdbMovie) {
  const movieRow = await upsertMovie(tmdbMovie);
  const { error } = await supabase
    .from("watch_later")
    .insert({ user_id: userId, movie_id: movieRow.id });
  if (error) throw error;
  return movieRow;
}

/**
 * Remove a movie from the user's Watch-Later list
 */
export async function removeFromWatchLater(userId, movieId) {
  const { error } = await supabase
    .from("watch_later")
    .delete()
    .eq("user_id", userId)
    .eq("movie_id", movieId);
  if (error) throw error;
}
