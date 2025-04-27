import CollectionRow from "./CollectionRow";

export default function CollectionsList({
  collections,
  onRemoveMovie,
  onAddMovie,
  onDeleteCollection,
  onShareCollection,
}) {
  return (
    <>
      {collections.map((col) => (
        <CollectionRow
          key={col.id}
          collection={col}
          onRemoveMovie={onRemoveMovie}
          onAddMovie={onAddMovie}
          onDeleteCollection={onDeleteCollection}
          onShareCollection={onShareCollection}
        />
      ))}
    </>
  );
}
