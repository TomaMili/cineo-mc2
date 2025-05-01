import React, { useCallback } from "react";
import CollectionsPage from "../../features/collections/CollectionsPage";
import { handleShare } from "../../utils/share";
import {
  useCreateCollection,
  useDeleteCollection,
  useAddMovieToCollection,
  useRemoveMovieFromCollection,
} from "../../hooks/useCollections";

export default function Collections() {
  const userId = 1; // replace with real session

  const createCol = useCreateCollection(userId);
  const deleteCol = useDeleteCollection(userId);
  const addMovie = useAddMovieToCollection(userId);
  const removeMovie = useRemoveMovieFromCollection(userId);

  const onShareAll = useCallback(
    () =>
      handleShare(
        window.location.origin + "/collections",
        "All collections link copied!"
      ),
    []
  );
  const onCreateCollection = useCallback(
    (name) => createCol.mutate(name),
    [createCol]
  );
  const onDeleteCollection = useCallback(
    (col) => deleteCol.mutate(col.id),
    [deleteCol]
  );
  const onShareCollection = useCallback(
    (col) =>
      handleShare(
        window.location.origin + `/collections/${col.id}`,
        `"${col.name}" link copied!`
      ),
    []
  );
  const onAddMovieToCollection = useCallback(
    (collectionId, tmdbMovie) => addMovie.mutate({ collectionId, tmdbMovie }),
    [addMovie]
  );
  const onRemoveMovieFromCollection = useCallback(
    (collectionId, movieId) => removeMovie.mutate({ collectionId, movieId }),
    [removeMovie]
  );

  return (
    <CollectionsPage
      onShareAll={onShareAll}
      onCreateCollection={onCreateCollection}
      onDeleteCollection={onDeleteCollection}
      onShareCollection={onShareCollection}
      onAddMovie={onAddMovieToCollection}
      onRemoveMovie={onRemoveMovieFromCollection}
    />
  );
}
