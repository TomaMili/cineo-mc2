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
    onSuccess: () => qc.invalidateQueries(key(roomId)),
  });
}
