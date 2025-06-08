import supabase from "./supabase";

export async function getWatchRooms(ownerId) {
  const { data, error } = await supabase
    .from("watch_rooms")
    .select("id, name, created_at, room_type, movie_limit, expires_at, status")
    .eq("owner_id", ownerId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

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

export async function deleteWatchRoom(ownerId, roomId) {
  const { error } = await supabase
    .from("watch_rooms")
    .delete()
    .eq("owner_id", ownerId)
    .eq("id", roomId);

  if (error) throw error;
}

export async function getWatchRoomMovies(roomId) {
  const { data, error } = await supabase
    .from("watch_room_movies")
    .select(
      ` 
        user_id,
        added_at,
        movies!inner (
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

  return data.map(({ user_id, added_at, movies }) => ({
    user_id,
    id: movies.api_id,
    dbId: movies.id,
    title: movies.title,
    poster: movies.poster,
    genres: movies.genres,
    addedAt: added_at,
  }));
}

export async function addMovieToWatchRoom(userId, roomId, tmdbMovie) {
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

  const { error: joinErr } = await supabase
    .from("watch_room_movies")
    .upsert(
      { room_id: roomId, movie_id: movieRow.id, user_id: userId },
      { onConflict: "room_id,user_id,movie_id" }
    );

  if (joinErr) throw joinErr;

  return movieRow;
}

export async function removeMovieFromWatchRoom(roomId, movieId) {
  const { error } = await supabase
    .from("watch_room_movies")
    .delete()
    .eq("room_id", roomId)
    .eq("movie_id", movieId);

  if (error) throw error;
}
