// src/hooks/useWatchTogetherMovies.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "../hooks/useAuth";
import {
  getWatchTogetherMovies,
  addMovieToWatchTogether,
  removeMovieFromWatchTogether,
} from "../services/apiWatchTogether";

const key = (roomId) => ["watchtogether", roomId, "movies"];

export function useWatchTogetherMovies(roomId) {
  return useQuery({
    queryKey: key(roomId),
    enabled: !!roomId,
    queryFn: () => getWatchTogetherMovies(roomId),
    refetchInterval: 5000,
  });
}

export function useAddMovieToWatchTogether(roomId) {
  const qc = useQueryClient();
  const { profile } = useCurrentUser();
  const user_id = profile?.id;

  return useMutation({
    mutationFn: (vars) => addMovieToWatchTogether(roomId, { ...vars, user_id }),

    onMutate: async ({ movie_id, tmdbMovie }) => {
      await qc.cancelQueries(moviesKey(roomId));
      const previous = qc.getQueryData(moviesKey(roomId)) || [];
      qc.setQueryData(moviesKey(roomId), [
        ...previous,
        {
          room_id: +roomId,
          user_id,
          movie_id,
          movies: {
            poster: tmdbMovie.poster_path,
            title: tmdbMovie.title,
          },
        },
      ]);
      return { previous };
    },

    onError: (_err, _vars, context) => {
      qc.setQueryData(moviesKey(roomId), context.previous);
    },

    onSettled: () => {
      // na kraju obavezno refetch, da uskladimo sve
      qc.invalidateQueries(moviesKey(roomId));
    },
  });
}

export function useRemoveMovieFromWatchTogether(roomId) {
  const qc = useQueryClient();
  const { profile } = useCurrentUser();
  const user_id = profile?.id;

  return useMutation({
    mutationFn: (vars) =>
      removeMovieFromWatchTogether(roomId, { ...vars, user_id }),
    onSuccess: () => qc.invalidateQueries(moviesKey(roomId)),
  });
}
