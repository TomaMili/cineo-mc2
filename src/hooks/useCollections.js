import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCollections,
  createCollection,
  deleteCollection,
  getCollectionMovies,
  addMovieToCollection,
  removeMovieFromCollection,
} from "../services/apiCollections";

const colsKey = (userId) => ["collections", userId];
const moviesKey = (userId, collectionId) => [
  "collections",
  userId,
  "movies",
  collectionId,
];

export function useCollections(userId) {
  return useQuery({
    queryKey: colsKey(userId),
    enabled: !!userId,
    queryFn: () => getCollections(userId),
  });
}

export function useCreateCollection(userId) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars) => createCollection(userId, vars),
    onSuccess: () => qc.invalidateQueries(colsKey(userId)),
  });
}

export function useDeleteCollection(userId) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars) => deleteCollection(userId, vars),
    onSuccess: () => qc.invalidateQueries(colsKey(userId)),
  });
}

export function useCollectionMovies(userId, collectionId) {
  return useQuery({
    queryKey: moviesKey(userId, collectionId),
    enabled: !!userId && !!collectionId,
    queryFn: () => getCollectionMovies(userId, { collectionId }),
  });
}

export function useAddMovieToCollection(userId) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars) => addMovieToCollection(userId, vars),
    onSuccess: (_, vars) =>
      qc.invalidateQueries(moviesKey(userId, vars.collectionId)),
  });
}

export function useRemoveMovieFromCollection(userId) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars) => removeMovieFromCollection(userId, vars),
    onSuccess: (_, vars) =>
      qc.invalidateQueries(moviesKey(userId, vars.collectionId)),
  });
}
