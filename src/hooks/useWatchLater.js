import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addToWatchLater,
  removeFromWatchLater,
} from "../services/apiWatchLater";
import { fetchMovieDetails } from "../services/apiTmdb";
import supabase from "../services/supabase";

/* ---------------------------------------------------------------------------
 * Shared query-key helper
 * ------------------------------------------------------------------------- */
const wlKey = (userId) => ["watch-later", userId];

/* ---------------------------------------------------------------------------
 * 1️⃣  Main list – fetch ids from DB, then details from TMDB
 * ------------------------------------------------------------------------- */
export function useWatchLater(userId) {
  return useQuery({
    queryKey: wlKey(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 min cache
    queryFn: async () => {
      /* step-A  fetch api_id + created_at */
      const { data, error } = await supabase
        .from("watch_later")
        .select("created_at, movies ( id, api_id )")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      /* step-B  fetch TMDB details in parallel */
      const details = await Promise.all(
        data.map(({ movies }) => fetchMovieDetails(movies.api_id))
      );

      /* step-C  preserve addedAt for “Date added” sort */
      return details.map((m, i) => ({
        ...m,
        dbId: data[i].movies.id,
        addedAt: data[i].created_at,
      }));
    },
  });
}

/* ---------------------------------------------------------------------------
 * 2️⃣  Mutations (unchanged except for centralised key)
 * ------------------------------------------------------------------------- */
export function useAddToWatchLater(userId) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (movie) => addToWatchLater(userId, movie),
    onSuccess: () => qc.invalidateQueries(wlKey(userId)),
  });
}

export function useRemoveFromWatchLater(userId) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (movieId) => removeFromWatchLater(userId, movieId),
    onSuccess: () => qc.invalidateQueries(wlKey(userId)),
  });
}

/* ---------------------------------------------------------------------------
 * 3️⃣  Convenience hooks for “bookmark” buttons
 * ------------------------------------------------------------------------- */
export function useIsInWatchLater(movieId, userId) {
  const { data: list = [] } = useWatchLater(userId);
  return list.some((m) => m.id === movieId);
}

export function useToggleWatchLater(userId) {
  const add = useAddToWatchLater(userId);
  const remove = useRemoveFromWatchLater(userId);
  const { data: list = [] } = useWatchLater(userId);

  return (movie, isSaved) => {
    if (isSaved) {
      let dbId = movie.dbId;
      if (!dbId) {
        const hit = list.find((m) => m.id === movie.id);
        dbId = hit?.dbId;
      }

      if (dbId) remove.mutate(dbId);
      // (optional) else toast “Couldn’t remove – try again”
    } else {
      add.mutate(movie);
    }
  };
}
