import React from "react";
import CollectionsPage from "../../features/collections/CollectionsPage";
import useCollections from "../../hooks/useCollections";

export default function Collections() {
  const { data: collections = [], isLoading, isError } = useCollections();

  if (isLoading) return <div className="text-white p-8">Loading…</div>;
  if (isError) return <div className="text-white p-8">Failed to load.</div>;

  // handlers
  const onShareAll = () => {
    navigator.clipboard.writeText(window.location.origin + "/collections");
    const t = document.createElement("div");
    t.innerText = "Collections link copied to the clipboard!";
    t.className =
      "fixed bottom-4 right-4 bg-bordo-500 text-white px-4 py-2 rounded shadow-lg";
    document.body.appendChild(t);
    setTimeout(() => document.body.removeChild(t), 1500);
  };
  const onCreateCollection = (name, movieIds) =>
    alert(`Create "${name}" with movies ${movieIds.join(", ")}`);
  const onDeleteCollection = (col) => alert(`Delete collection ${col.name}`);
  const onShareCollection = (col) => alert(`Share collection ${col.name}`);
  const onAddMovie = (colId) => alert(`Add movie to collection ${colId}`);
  const onRemoveMovie = (colId, movieId) =>
    alert(`Remove movie ${movieId} from collection ${colId}`);

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
