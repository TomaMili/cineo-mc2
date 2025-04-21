import supabase from "./supabase";

/**
 * Dohvati osnovne user profile podatke.
 */
export async function fetchUserProfile(userId) {
  const { data, error } = await supabase
    .from("users")
    .select("username, avatar_url, subscription_plan")
    .eq("id", userId)
    .single();
  if (error) throw error;
  return data;
}

/**
 * Dohvati korisničke preference (žanrovi i glumci).
 */
export async function fetchUserPreferences(userId) {
  const [{ data: genres, error: errG }, { data: actors, error: errA }] =
    await Promise.all([
      supabase.from("user_genres").select("genres(name)").eq("user_id", userId),
      supabase.from("user_actors").select("actors(name)").eq("user_id", userId),
    ]);
  if (errG || errA) throw errG || errA;
  return {
    genres: genres.map((r) => r.genres.name),
    actors: actors.map((r) => r.actors.name),
  };
}

/**
 * Dohvati zadnja 4 pogledana filma s poster URL-om.
 */
export async function fetchRecentWatched(userId) {
  const { data, error } = await supabase
    .from("watched")
    .select(
      `
      movie_id:movies (
        id, title, poster_url
      )
    `
    )
    .eq("user_id", userId)
    .order("watched_at", { ascending: false })
    .limit(4);
  if (error) throw error;
  return data.map((r) => ({
    movie: r.movie_id,
  }));
}

/**
 * Prebroji koliko je filmova korisnik pogledao.
 */
export async function fetchWatchedCount(userId) {
  const { count, error } = await supabase
    .from("watched")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId);
  if (error) throw error;
  return count;
}
