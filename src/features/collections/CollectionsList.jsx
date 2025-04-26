import React from "react";
import CollectionRow from "./CollectionRow";

export default function CollectionsList({
  collections,
  onRemoveMovie,
  onAddMovie,
}) {
  return (
    <>
      {collections.map((col) => (
        <CollectionRow
          key={col.id}
          collection={col}
          onRemoveMovie={onRemoveMovie}
          onAddMovie={onAddMovie}
        />
      ))}
    </>
  );
}
