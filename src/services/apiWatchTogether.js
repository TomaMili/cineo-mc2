// src/services/apiWatchTogether.js
import supabase from "./supabase";
import { upsertMovieFromTmdb } from "./apiTmdb";

export async function getWatchTogetherMovies(roomId) {
  const { data, error } = await supabase
    .from("watch_room_movies")
    .select("*, movies(*)")
    .eq("room_id", roomId);
  if (error) throw error;
  return data;
}

export async function addMovieToWatchTogether(
  roomId,
  { movie_id, tmdbMovie, user_id }
) {
  if (tmdbMovie) {
    await upsertMovieFromTmdb(tmdbMovie);
  }
  const { data, error } = await supabase
    .from("watch_room_movies")
    .insert([{ room_id: roomId, user_id, movie_id }]);
  if (error) throw error;
  return data;
}

export async function removeMovieFromWatchTogether(
  roomId,
  { movie_id, user_id }
) {
  const { data, error } = await supabase
    .from("watch_room_movies")
    .delete()
    .match({ room_id: roomId, user_id, movie_id });
  if (error) throw error;
  return data;
}
