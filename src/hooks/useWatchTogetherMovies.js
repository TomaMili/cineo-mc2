// src/hooks/useWatchTogetherMovies.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "./useAuth";
import {
  getWatchRooms,
  getWatchRoomMovies,
  addMovieToWatchRoom,
  removeMovieFromWatchRoom,
} from "../services/apiWatchTogether";

/* ─────────────── query keys ─────────────── */

const roomsKey = (ownerId) => ["watchRooms", ownerId];
const roomMoviesKey = (roomId) => ["watchRoomMovies", roomId];

/* ─────────────── rooms (owner ⇒ list) ───── */

export function useWatchRooms(ownerId) {
  return useQuery({
    queryKey: roomsKey(ownerId),
    enabled: !!ownerId,
    queryFn: () => getWatchRooms(ownerId),
  });
}

/* ─────────────── movies in one room ─────── */

export function useWatchRoomMovies(roomId) {
  return useQuery({
    queryKey: roomMoviesKey(roomId),
    enabled: !!roomId,
    queryFn: () => getWatchRoomMovies(roomId),
    // optional: poll room every 5 s while it’s open
    refetchInterval: 5000,
  });
}

/* ─────────────── add movie mutation ─────── */

export function useAddMovieToWatchRoom(roomId) {
  const qc = useQueryClient();
  const { profile } = useCurrentUser();
  const userId = profile?.id;

  return useMutation({
    mutationFn: (tmdbMovie) => {
      if (!userId) throw new Error("User ID not available");
      return addMovieToWatchRoom(userId, roomId, tmdbMovie);
    },
    onSuccess: () => qc.invalidateQueries(roomMoviesKey(roomId)),
  });
}

/* ─────────────── remove movie mutation ──── */

export function useRemoveMovieFromWatchRoom(roomId) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (movieId) => removeMovieFromWatchRoom(roomId, movieId),
    onSuccess: () => qc.invalidateQueries(roomMoviesKey(roomId)),
  });
}
