import supabase from "./supabase";

export const ACHIEVEMENT_DEFINITIONS = [
  {
    key: "first_movie",
    title: "First Movie",
    desc: "Add your first movie",
    test: (rows) => rows.length >= 1,
  },
  {
    key: "five_watched",
    title: "Casual Viewer",
    desc: "Watch 5 movies",
    test: (rows) => rows.length >= 5,
  },
  {
    key: "ten_watched",
    title: "Movie Buff",
    desc: "Watch 10 movies",
    test: (rows) => rows.length >= 10,
  },
  {
    key: "fifty_watched",
    title: "Cinephile",
    desc: "Watch 50 movies",
    test: (rows) => rows.length >= 50,
  },
  {
    key: "hundred_watched",
    title: "Century Club",
    desc: "Watch 100 movies",
    test: (rows) => rows.length >= 100,
  },
  {
    key: "critic",
    title: "Critic",
    desc: "Leave 20 ratings",
    test: (rows) => rows.filter((r) => r.user_rating != null).length >= 20,
  },
  {
    key: "reviewer",
    title: "Reviewer",
    desc: "Leave 50 ratings",
    test: (rows) => rows.filter((r) => r.user_rating != null).length >= 50,
  },
  {
    key: "watch_again",
    title: "Watch Again",
    desc: "Re-watch a movie",
    test: (rows) => {
      const counts = {};
      for (let r of rows) {
        counts[r.movie_id] = (counts[r.movie_id] || 0) + 1;
        if (counts[r.movie_id] >= 2) return true;
      }
      return false;
    },
  },
  {
    key: "classic_collector",
    title: "Classic Collector",
    desc: "Watch 5 movies released before 1980",
    test: (rows) =>
      rows.filter((r) => {
        const year = r.movies?.release_date;
        return year && year < 1980;
      }).length >= 5,
  },
  {
    key: "animated_admirer",
    title: "Animated Admirer",
    desc: "Watch 5 animated films",
    test: (rows) =>
      rows.filter((r) =>
        (r.movies?.genres ?? []).some((g) => g.name === "Animation")
      ).length >= 5,
  },
  {
    key: "documentarian",
    title: "Documentarian",
    desc: "Watch 3 documentaries",
    test: (rows) =>
      rows.filter((r) =>
        (r.movies?.genres ?? []).some((g) => g.name === "Documentary")
      ).length >= 3,
  },
  {
    key: "marathon_master",
    title: "Marathon Master",
    desc: "Watch 10 movies in a single day",
    test: (rows) => {
      const byDay = {};
      for (let r of rows) {
        const d = new Date(r.created_at).toDateString();
        byDay[d] = (byDay[d] || 0) + 1;
        if (byDay[d] >= 10) return true;
      }
      return false;
    },
  },
  {
    key: "binge_king",
    title: "Binge King",
    desc: "Watch 5 movies in a single day",
    test: (rows) => {
      const byDay = {};
      for (let r of rows) {
        const d = new Date(r.created_at).toDateString();
        byDay[d] = (byDay[d] || 0) + 1;
        if (byDay[d] >= 5) return true;
      }
      return false;
    },
  },
  {
    key: "early_bird",
    title: "Early Bird",
    desc: "Watch a movie before 6 AM",
    test: (rows) => rows.some((r) => new Date(r.created_at).getHours() < 6),
  },
  {
    key: "night_owl",
    title: "Night Owl",
    desc: "Watch a movie after midnight",
    test: (rows) =>
      rows.some((r) => {
        const h = new Date(r.created_at).getHours();
        return h >= 0 && h < 4;
      }),
  },
  {
    key: "genre_collector",
    title: "Genre Collector",
    desc: "Watch every genre available",
    test: (rows) => {
      const seen = new Set();
      rows.forEach((r) =>
        (r.movies?.genres ?? []).forEach((g) => seen.add(g.name))
      );
      // pick a realistic threshold, or fetch all genres from TMDB…
      return seen.size >= 10;
    },
  },
  {
    key: "actor_fan",
    title: "Actor Fan",
    desc: "Watch 5 movies starring the same actor",
    test: (rows) => {
      const cnt = {};
      for (let r of rows) {
        (r.movies?.actors ?? []).forEach((a) => {
          cnt[a.name] = (cnt[a.name] || 0) + 1;
          if (cnt[a.name] >= 5) return true;
        });
      }
      return false;
    },
  },
  {
    key: "director_spotlight",
    title: "Director Spotlight",
    desc: "Watch 5 movies by the same director",
    test: (rows) => {
      const cnt = {};
      for (let r of rows) {
        (r.movies?.directors ?? []).forEach((d) => {
          cnt[d.name] = (cnt[d.name] || 0) + 1;
          if (cnt[d.name] >= 5) return true;
        });
      }
      return false;
    },
  },
  {
    key: "watch_weekends",
    title: "Weekend Warrior",
    desc: "Watch on 3 different weekends",
    test: (rows) => {
      const weekends = new Set();
      for (let r of rows) {
        const dt = new Date(r.created_at);
        const day = dt.getDay(); // 0=Sun,6=Sat
        if (day === 0 || day === 6) {
          const wk = `${dt.getFullYear()}-${dt.getMonth()}-W${Math.ceil(
            dt.getDate() / 7
          )}`;
          weekends.add(wk);
        }
      }
      return weekends.size >= 3;
    },
  },
];

export async function getUserAchievements(userId) {
  const { data, error } = await supabase
    .from("achivements")
    .select("achivement_name, date_achieved")
    .eq("user_id", userId);
  if (error) throw error;
  return data;
}

export async function completeAchievement(userId, key) {
  const { data, error } = await supabase
    .from("achivements")
    .insert({ user_id: userId, achivement_name: key })
    .single();
  if (error) throw error;
  return data;
}

export async function syncAchievements(userId) {
  const { data: watchedRows, error: wErr } = await supabase
    .from("watched")
    .select(
      `
      created_at,
      user_rating,
      movie_id,
      movies (
        title,
        poster,
        backdrop,
        release_date,
        genres,
        actors,
        directors
      )
    `
    )
    .eq("users_id", userId);

  if (wErr) throw wErr;

  const done = new Set(
    (await getUserAchievements(userId)).map((r) => r.achivement_name)
  );

  for (let def of ACHIEVEMENT_DEFINITIONS) {
    if (!done.has(def.key) && def.test(watchedRows)) {
      await completeAchievement(userId, def.key);
    }
  }
  return null;
}
