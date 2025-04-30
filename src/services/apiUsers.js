import supabase from "./supabase";

/* ──────────────────────────────────────────────────────────────
 * basic list + single row (unchanged)
 * ──────────────────────────────────────────────────────────── */
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
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function getUserProfile(id) {
  /* A. user row --------------------------------------------------------- */
  const { data: user, error: userErr } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();
  if (userErr) throw userErr;

  /* B. simple counts ---------------------------------------------------- */
  const { count: watchLaterCount } = await supabase
    .from("watch_later")
    .select("*", { count: "exact", head: true })
    .eq("user_id", id);

  const { count: watchedCount } = await supabase
    .from("watched")
    .select("*", { count: "exact", head: true })
    .eq("users_id", id);

  /* C. fetch watched rows ---------------------------------------------- */
  const { data: watchedRows, error: wErr } = await supabase
    .from("watched")
    .select(
      `
            created_at,
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

  /* D. build maps & stats ---------------------------------------------- */
  const actorMap = new Map(); // name → { n , img }
  const directorMap = new Map(); // name → { n , img }
  const movieMap = new Map(); // title → { n , poster , backdrop } // title → { n , poster }

  const genreMap = new Map(); // name → n
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

    /* genre */
    const g = m.genres?.[0]?.name ?? "Other";
    genreMap.set(g, (genreMap.get(g) || 0) + 1);

    /* activity 7-day */
    const when = new Date(row.created_at);
    if (when >= weekStart) {
      const dayKey = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][
        when.getDay()
      ];
      const dayMap = activity.get(dayKey);
      dayMap.set(g, (dayMap.get(g) || 0) + 1);
    }

    /* actors */
    m.actors?.forEach((a) => {
      const obj = actorMap.get(a.name) || { n: 0, img: a.profile_path };
      obj.n += 1;
      if (!obj.img && a.profile_path) obj.img = a.profile_path;
      actorMap.set(a.name, obj);
    });

    /* directors */
    m.directors?.forEach((d) => {
      const obj = directorMap.get(d.name) || { n: 0, img: d.profile_path };
      obj.n += 1;
      if (!obj.img && d.profile_path) obj.img = d.profile_path;
      directorMap.set(d.name, obj);
    });

    /* movie frequency */
    const mv = movieMap.get(m.title) || {
      n: 0,
      poster: m.poster,
      backdrop: m.backdrop,
    };
    mv.n += 1;
    if (!mv.backdrop && m.backdrop) mv.backdrop = m.backdrop;
    movieMap.set(m.title, mv);
  });

  /* E. pick favourites -------------------------------------------------- */
  const pick = (map) => [...map].sort((a, b) => b[1].n - a[1].n)[0] ?? [];
  const [favActor, actObj] = pick(actorMap);
  const [favDirector, dirObj] = pick(directorMap);
  const [favMovie, movObj] =
    [...movieMap].sort((a, b) => b[1].n - a[1].n)[0] ?? [];

  /* donut + activity arrays -------------------------------------------- */
  const palette = [
    "#DC2626",
    "#FBBF24",
    "#6B21A8",
    "#1D4ED8",
    "#059669",
    "#EA580C",
    "#D946EF",
    "#14B8A6",
    "#F43F5E",
    "#52525B",
    "#B91C1C",
    "#F59E0B",
    "#7C3AED",
    "#2563EB",
    "#047857",
    "#C2410C",
    "#A21CAF",
    "#0E7490",
    "#BE123C",
    "#374151",
  ];
  const colorOf = (name) => {
    if (name === "Other") return "#9CA3AF";
    let h = 0;
    for (let i = 0; i < name.length; i++)
      h = (h + name.charCodeAt(i)) % palette.length;
    return palette[h];
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

  /* avatar public URL --------------------------------------------------- */
  let avatarUrl = null;
  if (user.avatar) {
    const {
      data: { publicUrl },
    } = supabase.storage.from("avatars").getPublicUrl(user.avatar);
    avatarUrl = publicUrl;
  }

  /* return -------------------------------------------------------------- */
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

/* ──────────────────────────────────────────────────────────────
 * helper to update username / avatar / prefs
 * ──────────────────────────────────────────────────────────── */
export async function updateUser(id, patch) {
  const { data, error } = await supabase
    .from("users")
    .update(patch)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}
