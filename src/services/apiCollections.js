import supabase from "./supabase";

export async function getCollections(userId) {
  const { data, error } = await supabase
    .from("collections")
    .select("id, name, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function createCollection(userId, { name }) {
  const { data, error } = await supabase
    .from("collections")
    .insert([{ user_id: userId, name }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteCollection(userId, { collectionId }) {
  const { error } = await supabase
    .from("collections")
    .delete()
    .eq("user_id", userId)
    .eq("id", collectionId);
  if (error) throw error;
}

export async function getCollectionMovies(userId, { collectionId }) {
  const { data, error } = await supabase
    .from("movies_collections")
    .select(
      `
      created_at,
      movies (
        id,
        api_id,
        title,
        poster,
        genres
      )
    `
    )
    .eq("collections_id", collectionId)
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data.map(({ created_at, movies }) => ({
    id: movies.api_id,
    dbId: movies.id,
    title: movies.title,
    poster: movies.poster,
    genres: movies.genres,
    addedAt: created_at,
  }));
}

export async function addMovieToCollection(
  userId,
  { collectionId, tmdbMovie }
) {
  const { data: row, error: up } = await supabase
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
  if (up) throw up;

  const { error: joinErr } = await supabase.from("movies_collections").insert([
    {
      collections_id: collectionId,
      movies_id: row.id,
    },
  ]);
  if (joinErr) throw joinErr;

  return row;
}

export async function removeMovieFromCollection(
  userId,
  { collectionId, movieId }
) {
  const { error } = await supabase
    .from("movies_collections")
    .delete()
    .eq("collections_id", collectionId)
    .eq("movies_id", movieId);
  if (error) throw error;
}
