import supabase from "./supabase";

export async function signUpWithProfile({
  email,
  password,
  username,
  genres = [],
  platforms = [],
  actors = [],
  plan = null,
}) {
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { username } },
  });
  if (signUpError) throw signUpError;
  const user = signUpData.user;
  if (!user?.id) throw new Error("No user id from auth.signUp");

  const { data: profile, error: profileError } = await supabase
    .from("users")
    .insert([
      {
        profile_id: user.id,
        username,
        favourite_genres: genres,
        platforms,
        favourite_actors: actors,
        plan,
      },
    ])
    .select(
      "id, profile_id, username, platforms, plan, favourite_actors, favourite_genres"
    )
    .single();
  if (profileError) throw profileError;

  return { authUser: user, profile };
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function getCurrentUser() {
  const {
    data: { session },
    error: sessionErr,
  } = await supabase.auth.getSession();
  if (sessionErr) throw sessionErr;
  if (!session) return null;

  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();
  if (userErr) throw userErr;
  return user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function updateCurrentUser(patch) {
  const authUpdate = {};
  if (patch.password) authUpdate.password = patch.password;
  if (patch.fullName) authUpdate.data = { fullName: patch.fullName };

  let authData = null;
  if (Object.keys(authUpdate).length) {
    const { data, error } = await supabase.auth.updateUser(authUpdate);
    if (error) throw error;
    authData = data;
  }

  const profileUpdate = {};
  if (patch.username !== undefined) profileUpdate.username = patch.username;
  if (patch.platforms !== undefined) profileUpdate.platforms = patch.platforms;
  if (patch.plan !== undefined) profileUpdate.plan = patch.plan;
  if (patch.favourite_actors !== undefined)
    profileUpdate.favourite_actors = patch.favourite_actors;
  if (patch.favourite_genres !== undefined)
    profileUpdate.favourite_genres = patch.favourite_genres;

  let profileData = null;
  if (Object.keys(profileUpdate).length) {
    const { data, error } = await supabase
      .from("users")
      .update(profileUpdate)
      .eq("profile_id", authData.user.id)
      .select(
        "id,profile_id,username,platforms,plan,favourite_actors,favourite_genres"
      )
      .single();
    if (error) throw error;
    profileData = data;
  }

  return {
    authUser: authData?.user ?? null,
    profile: profileData,
  };
}
