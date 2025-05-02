import CollectionRow from "./CollectionRow";

export default function CollectionsList({
  collections,
  onDeleteCollection,
  onAddMovie,
  onRemoveMovie,
  onShareCollection,
}) {
  return (
    <>
      {collections.map((col) => (
        <CollectionRow
          key={col.id}
          collection={col}
          onDeleteCollection={onDeleteCollection}
          onAddMovie={onAddMovie}
          onRemoveMovie={onRemoveMovie}
          onShareCollection={onShareCollection}
        />
      ))}
    </>
  );
}
