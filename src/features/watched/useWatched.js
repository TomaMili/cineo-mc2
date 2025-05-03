import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addToWatched, removeFromWatched } from "../../services/apiWatched";
import { fetchMovieDetails } from "../../services/apiTmdb";
import supabase from "../../services/supabase";

const key = (userId) => ["watched", userId];

export function useWatched(userId) {
  return useQuery({
    queryKey: key(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("watched")
        .select("created_at, user_rating, movies ( id, api_id )")
        .eq("users_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      const details = await Promise.all(
        data.map(({ movies }) => fetchMovieDetails(movies.api_id))
      );

      return details.map((m, i) => ({
        ...m,
        dbId: data[i].movies.id,
        addedAt: data[i].created_at,
        userRating: data[i].user_rating,
      }));
    },
  });
}

export function useAddToWatched(userId) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ movie, rating }) => addToWatched(userId, movie, rating),
    onSuccess: () => qc.invalidateQueries(key(userId)),
  });
}

export function useRemoveFromWatched(userId) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (dbId) => removeFromWatched(userId, dbId),
    onSuccess: () => qc.invalidateQueries(key(userId)),
  });
}

export function useIsWatched(movieId, userId) {
  const { data: list = [] } = useWatched(userId);
  return list.some((m) => m.id === movieId);
}

export function useToggleWatched(userId) {
  const add = useAddToWatched(userId);
  const remove = useRemoveFromWatched(userId);
  const { data: list = [] } = useWatched(userId);

  return (movie, isWatched, rating = null) => {
    if (isWatched) {
      const hit = list.find((m) => m.id === movie.id);
      if (hit) remove.mutate(hit.dbId);
    } else {
      add.mutate({ movie, rating });
    }
  };
}

export function useRecentlyWatched(userId, limit = 4) {
  return useQuery({
    queryKey: ["recently-watched", userId, limit],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("watched")
        .select("created_at, movies ( id, api_id )")
        .eq("users_id", userId)
        .order("created_at", { ascending: false })
        .limit(limit);

      if (error) throw error;

      const details = await Promise.all(
        data.map(({ movies }) => fetchMovieDetails(movies.api_id))
      );

      return details;
    },
    staleTime: 5 * 60 * 1000,
  });
}
