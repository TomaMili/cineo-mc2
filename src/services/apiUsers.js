import supabase from "./supabase";

export async function getUsers() {
  let query = supabase.from("users").select("*", { count: "exact" });

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Users could not be loaded");
  }

  return { data, count };
}

export async function getUserByID(id) {
  let query = supabase
    .from("users")
    .select("*", { count: "exact" })
    .eq("id", id)
    .single();

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Users could not be loaded");
  }

  return { data, count };
}

export async function addToWatchLater(userID, movieID) {
  let query = supabase
    .from("watch_later")
    .insert([{ user_id: userID, movie_id: movieID }])
    .select();

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Users could not be loaded");
  }

  return data;
}
