import React from "react";
import CollectionsPage from "../../features/collections/CollectionsPage";
import useCollections from "../../hooks/useCollections";

export default function Collections() {
  const { data: collections = [], isLoading, isError } = useCollections();

  if (isLoading) return <div className="text-white p-8">Loading…</div>;
  if (isError) return <div className="text-white p-8">Failed to load.</div>;

  // stub handlers for now
  const onShareAll = () => alert("Share all collections");
  const onCreateCollection = (name, movieIds) =>
    alert(`Create "${name}" with movies ${movieIds.join(", ")}`);
  const onDeleteCollection = (col) => alert(`Delete collection ${col.name}`);
  const onShareCollection = (col) => alert(`Share collection ${col.name}`);
  const onAddMovie = (col, movie) =>
    alert(`Add movie ${movie.title} to ${col.name}`);
  const onRemoveMovie = (col, movie) =>
    alert(`Remove movie ${movie.title} from ${col.name}`);

  return (
    <CollectionsPage
      collections={collections}
      onShareAll={onShareAll}
      onCreateCollection={onCreateCollection}
      onDeleteCollection={onDeleteCollection}
      onShareCollection={onShareCollection}
      onAddMovie={onAddMovie}
      onRemoveMovie={onRemoveMovie}
    />
  );
}
