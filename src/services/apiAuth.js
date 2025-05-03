import supabase from "./supabase";

export async function signUpWithProfile({ email, password, username }) {
  // 1) create auth user
  const {
    data: { user },
    error: signUpError,
  } = await supabase.auth.signUp({
    email,
    password,
  });
  if (signUpError) throw signUpError;

  if (!user?.id) {
    throw new Error("No user id returned by supabase.auth.signUp");
  }

  // 2) create public.users row, linking to auth.users via profile_id
  const { data: profile, error: profileError } = await supabase
    .from("users") // your public.users table
    .insert([
      {
        profile_id: user.id,
        username,
        platforms: [], // you can pass any other initial fields here
        plan: null,
        favourite_actors: [],
        favourite_genres: [],
      },
    ])
    .single();

  if (profileError) {
    // optionally roll back auth user?
    throw profileError;
  }

  return { authUser: user, profile };
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName }) {
  // 1. Update password OR fullName
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  const { data: updatedUser, error: error2 } = await supabase.auth.updateUser({
    data,
  });

  if (error2) throw new Error(error2.message);
  return updatedUser;
}
