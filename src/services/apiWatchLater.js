import supabase from "./supabase";

// src/services/apiWatchLater.js
function mapMovieForDB(tmdb) {
  return {
    /* columns that actually exist */
    api_id: tmdb.id, // UNIQUE
    title: tmdb.title,
    overview: tmdb.overview,
    release_date: tmdb.release_date // ↳ smallint YEAR?
      ? Number(tmdb.release_date.slice(0, 4))
      : null,
    poster: tmdb.poster_path,
    backdrop: tmdb.backdrop_path,
    tagline: tmdb.tagline,
    duration: tmdb.runtime, // minutes
    imdb_rating: tmdb.vote_average
      ? tmdb.vote_average / 2 // 0-10 ➜ 0-5
      : null,
    genres: tmdb.genres, // JSON[]
    actors: tmdb.credits?.cast
      ?.slice(0, 10) // JSON[]
      .map(({ id, name }) => ({ id, name })),
    directors: tmdb.credits?.crew
      ?.filter((p) => p.job === "Director")
      .map(({ id, name }) => ({ id, name })),
    writers: tmdb.credits?.crew
      ?.filter((p) => p.job === "Writer")
      .map(({ id, name }) => ({ id, name })),
    /* leave out id & created_at – DB handles those */
  };
}

export async function upsertMovie(tmdbMovie) {
  const prepared = mapMovieForDB(tmdbMovie);

  const { data, error } = await supabase
    .from("movies")
    .upsert(prepared, { onConflict: "api_id" })
    .select()
    .single();

  if (error) throw error;
  return data; // ← row incl. generated `id`
}

export async function addToWatchLater(userId, movie) {
  //  cache / update the movie itself
  const movieRow = await upsertMovie(movie);

  //  connect the movie to the user
  const { error } = await supabase
    .from("watch_later")
    .insert([{ user_id: userId, movie_id: movieRow.id }]);

  if (error) throw error;
  return movieRow; // handy for optimistic updates
}

export async function removeFromWatchLater(userId, movieId) {
  const { error } = await supabase
    .from("watch_later")
    .delete()
    .eq("user_id", userId)
    .eq("movie_id", movieId);

  if (error) throw error;
}
