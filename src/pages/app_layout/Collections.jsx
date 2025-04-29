import React from "react";
import CollectionsPage from "../../features/collections/CollectionsPage";
import { handleShare } from "../../utils/share";

export default function Collections() {
  const onShareAll = () =>
    handleShare(
      window.location.origin + "/collections",
      "Collections link copied to the clipboard!"
    );

  const onCreateCollection = (name, movieIds) =>
    alert(`Create "${name}" with movies ${movieIds.join(", ")}`);
  const onDeleteCollection = (col) => alert(`Delete collection ${col.name}`);
  const onShareCollection = (col) => alert(`Share collection ${col.name}`);
  const onAddMovie = (colId) => alert(`Add movie to collection ${colId}`);
  const onRemoveMovie = (colId, movieId) =>
    alert(`Remove movie ${movieId} from collection ${colId}`);

  return (
    <CollectionsPage
      onShareAll={onShareAll}
      onCreateCollection={onCreateCollection}
      onDeleteCollection={onDeleteCollection}
      onShareCollection={onShareCollection}
      onAddMovie={onAddMovie}
      onRemoveMovie={onRemoveMovie}
    />
  );
}
