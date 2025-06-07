import supabase from "./supabase";

export async function getUsers() {
  const { data, error, count } = await supabase
    .from("users")
    .select("*", { count: "exact" });

  if (error) throw error;
  return { data, count };
}

export async function getUserByID(id) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("profile_id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function getUserProfile(id) {
  const { data: user, error: userErr } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();
  if (userErr) throw userErr;

  const { count: watchLaterCount } = await supabase
    .from("watch_later")
    .select("*", { count: "exact", head: true })
    .eq("user_id", id);

  const { count: watchedCount } = await supabase
    .from("watched")
    .select("*", { count: "exact", head: true })
    .eq("users_id", id);

  const { data: watchedRows, error: wErr } = await supabase
    .from("watched")
    .select(
      `
            created_at,
            user_rating,
              movies (
              title,
              poster,
              genres,
              actors,
              directors
            )
          `
    )
    .eq("users_id", id);
  if (wErr) throw wErr;

  const actorMap = new Map();
  const directorMap = new Map();
  const movieMap = new Map();

  const genreMap = new Map();
  const activity = new Map(
    ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => [d, new Map()])
  );
  const weekStart = (() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() - 6);
    return d;
  })();

  watchedRows.forEach((row) => {
    const m = row.movies;

    const g = m.genres?.[0]?.name ?? "Other";
    genreMap.set(g, (genreMap.get(g) || 0) + 1);

    const when = new Date(row.created_at);
    if (when >= weekStart) {
      const dayKey = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
        when.getDay()
      ];
      const dayMap = activity.get(dayKey);
      dayMap.set(g, (dayMap.get(g) || 0) + 1);
    }

    m.actors?.forEach((a) => {
      const obj = actorMap.get(a.name) || { n: 0, img: a.profile_path };
      obj.n += 1;
      if (!obj.img && a.profile_path) obj.img = a.profile_path;
      actorMap.set(a.name, obj);
    });

    m.directors?.forEach((d) => {
      const obj = directorMap.get(d.name) || { n: 0, img: d.profile_path };
      obj.n += 1;
      if (!obj.img && d.profile_path) obj.img = d.profile_path;
      directorMap.set(d.name, obj);
    });

    const mv = movieMap.get(m.title) || {
      n: 0,
      poster: m.poster,
      backdrop: m.backdrop,
    };
    mv.n += 1;
    if (!mv.backdrop && m.backdrop) mv.backdrop = m.backdrop;
    movieMap.set(m.title, mv);
  });

  const pick = (map) => [...map].sort((a, b) => b[1].n - a[1].n)[0] ?? [];
  const [favActor, actObj] = pick(actorMap);
  const [favDirector, dirObj] = pick(directorMap);
  const rated = watchedRows
    .filter((r) => r.user_rating != null)
    .sort((a, b) => b.user_rating - a.user_rating);
  let favMovie, movObj;
  if (rated.length) {
    favMovie = rated[0].movies.title;
    movObj = {
      n: rated[0].user_rating,
      poster: rated[0].movies.poster || rated[0].movies.backdrop,
    };
  } else {
    [favMovie, movObj] = [...movieMap].sort((a, b) => b[1].n - a[1].n)[0] ?? [];
  }

  const palette = [
    "#b91c1c", // muted red (bordo-400)
    "#d97706", // burnt orange
    "#b45309", // earthy amber
    "#a16207", // mustard
    "#15803d", // muted emerald
    "#0f766e", // desaturated teal
    "#2563eb", // softened blue
    "#1e40af", // royal blue
    "#6d28d9", // deep purple
    "#7c3aed", // muted violet
    "#9333ea", // dusty grape
    "#c026d3", // dusty pink-purple
    "#db2777", // antique rose
    "#e11d48", // crimson red
    "#881337", // dark burgundy
    "#6b7280", // slate gray
    "#52525b", // deep gray
    "#374151", // onyx
    "#3f3f46", // charcoal gray
    "#171717", // near-black
  ];

  const colorOf = (name) => {
    if (name === "Other") return "#9CA3AF";

    let hash = 5381;
    for (let i = 0; i < name.length; i++) {
      hash = (hash * 33) ^ name.charCodeAt(i);
    }
    const index = Math.abs(hash) % palette.length;
    return palette[index];
  };

  const donutData = [...genreMap].map(([name, value]) => ({
    name,
    value,
    fill: colorOf(name),
  }));

  const activityData = [...activity].map(([day, map]) => {
    const obj = { day };
    map.forEach((v, g) => {
      obj[g] = v;
    });
    return obj;
  });

  let avatarUrl = null;
  if (user.avatar) {
    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(user.avatar);
    avatarUrl = publicUrl;
  }

  return {
    ...user,
    watchLaterCount,
    watchedCount,
    donutData,
    activityData,
    favActor,
    favActorCount: actObj?.n ?? 0,
    favActorImg: actObj?.img ?? null,
    favDirector,
    favDirectorCount: dirObj?.n ?? 0,
    favDirectorImg: dirObj?.img ?? null,
    favMovie,
    favMovieCount: movObj?.n ?? 0,
    favMoviePoster: movObj?.poster || movObj?.backdrop || null,
    avatarUrl,
  };
}
export async function updateUser(userId, patch) {
  const { data, error } = await supabase
    .from("users")
    .update(patch)
    .eq("id", userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}
