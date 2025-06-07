// src/services/apiWatchTogether.js
import supabase from "./supabase";

/* ─────────────── ROOMS ────────────────────────────────────────────── */

/** Get all rooms owned by this user, newest first */
export async function getWatchRooms(ownerId) {
  const { data, error } = await supabase
    .from("watch_rooms")
    .select("id, name, created_at, room_type, movie_limit, expires_at, status")
    .eq("owner_id", ownerId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Create a new room.
 * `roomType` must be "Random" or "Generate".
 * `expiresAt` must be an ISO timestamp string.
 */
export async function createWatchRoom({
  ownerId,
  name,
  roomType,
  expiresAt,
  movieLimit = 2,
}) {
  const { data, error } = await supabase
    .from("watch_rooms")
    .insert([
      {
        owner_id: ownerId,
        name,
        room_type: roomType,
        expires_at: expiresAt,
        movie_limit: movieLimit,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/** Delete one room you own */
export async function deleteWatchRoom(ownerId, roomId) {
  const { error } = await supabase
    .from("watch_rooms")
    .delete()
    .eq("owner_id", ownerId)
    .eq("id", roomId);

  if (error) throw error;
}

/* ─────────── MOVIES INSIDE A ROOM ─────────────────────────────────── */

export async function getWatchRoomMovies(roomId) {
  const { data, error } = await supabase
    .from("watch_room_movies")
    .select(
      `
        added_at,
        movies (
          id,
          api_id,
          title,
          poster,
          genres
        )
      `
    )
    .eq("room_id", roomId)
    .order("added_at", { ascending: false });

  if (error) throw error;

  // flatten to simpler objects
  return data.map(({ added_at, movies }) => ({
    id: movies.api_id,
    dbId: movies.id,
    title: movies.title,
    poster: movies.poster,
    genres: movies.genres,
    addedAt: added_at,
  }));
}

/**
 * Upsert TMDB movie into `movies`, then add it to given room.
 * `tmdbMovie` is the raw TMDB response you already have.
 */
export async function addMovieToWatchRoom(userId, roomId, tmdbMovie) {
  // 1. Upsert into master table
  const { data: movieRow, error: upErr } = await supabase
    .from("movies")
    .upsert(
      {
        api_id: tmdbMovie.id,
        title: tmdbMovie.title,
        poster: tmdbMovie.poster_path,
        genres: tmdbMovie.genres,
      },
      { onConflict: "api_id" }
    )
    .select("id")
    .single();

  if (upErr) throw upErr;

  // 2. Join movie to room
  const { error: joinErr } = await supabase.from("watch_room_movies").insert([
    {
      room_id: roomId,
      movie_id: movieRow.id,
      user_id: userId,
    },
  ]);

  if (joinErr) throw joinErr;

  return movieRow; // { id: <movies.id> }
}

/** Remove movie from room (who removes it doesn’t matter) */
export async function removeMovieFromWatchRoom(roomId, movieId) {
  const { error } = await supabase
    .from("watch_room_movies")
    .delete()
    .eq("room_id", roomId)
    .eq("movie_id", movieId);

  if (error) throw error;
}
