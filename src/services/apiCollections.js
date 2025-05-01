import supabase from "./supabase";

/** 1️⃣ Fetch all collections for a user */
export async function getCollections(userId) {
  const { data, error } = await supabase
    .from("collections")
    .select("id, name, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

/** 2️⃣ Create a new collection */
export async function createCollection(userId, { name }) {
  const { data, error } = await supabase
    .from("collections")
    .insert([{ user_id: userId, name }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

/** 3️⃣ Delete a collection */
export async function deleteCollection(userId, { collectionId }) {
  const { error } = await supabase
    .from("collections")
    .delete()
    .eq("user_id", userId)
    .eq("id", collectionId);
  if (error) throw error;
}

/** 4️⃣ Fetch one collection’s movies */
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
    // TMDB id for the popup/card
    id: movies.api_id,
    // keep your DB PK so you can delete by it
    dbId: movies.id,
    title: movies.title,
    poster: movies.poster,
    genres: movies.genres,
    addedAt: created_at,
  }));
}

/** 5️⃣ Upsert movie + add to collection */
export async function addMovieToCollection(
  userId,
  { collectionId, tmdbMovie }
) {
  // 1) upsert into `movies`
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

  // 2) insert into join table (no user_id here!)
  const { error: joinErr } = await supabase.from("movies_collections").insert([
    {
      collections_id: collectionId,
      movies_id: row.id,
    },
  ]);
  if (joinErr) throw joinErr;

  return row;
}

/** 6️⃣ Remove a movie from a collection */
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
