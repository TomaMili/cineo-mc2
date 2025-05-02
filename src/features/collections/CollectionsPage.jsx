// src/features/collections/CollectionsPage.jsx
import React, { useState } from "react";
import TabNav from "../../ui/TabNav";
import Spinner from "../../ui/Spinner";
import ErrorNotice from "../../ui/ErrorNotice";
import CollectionsList from "./CollectionsList";
import NewCollectionModal from "./NewCollectionModal";
import {
  useAddMovieToCollection,
  useCollections,
  useCreateCollection,
  useDeleteCollection,
  useRemoveMovieFromCollection,
} from "../../hooks/useCollections";
import { Icon } from "@iconify-icon/react";

export default function CollectionsPage() {
  const userId = 1;
  const { data: collections = [], isLoading, isError } = useCollections(userId);
  const createCollection = useCreateCollection(userId);
  const deleteCollection = useDeleteCollection(userId);
  const addToCollection = useAddMovieToCollection(userId);
  const removeFromCollection = useRemoveMovieFromCollection(userId);

  const [showNew, setShowNew] = useState(false);

  if (!userId) return <ErrorNotice title="No user" message="Please log in." />;
  if (isError) return <ErrorNotice title="Load failed" />;
  if (isLoading) return <Spinner size={48} />;

  return (
    <div className="min-h-screen  text-siva-100 pb-12">
      <div className="px-6 pt-6">
        <TabNav
          tabs={[
            ["../watchlater", "Watch later"],
            ["../watched", "Watched"],
            ["", "Collections"],
          ]}
        />
      </div>

      <div className="flex justify-end gap-4 mt-4 px-6">
        <button
          onClick={() => setShowNew(true)}
          className="bg-bordo-500 hover:bg-bordo-400 px-4 py-2 rounded flex items-center gap-2"
        >
          <Icon icon="mdi:plus" /> New Collection
        </button>
      </div>

      <section className="px-6 my-8">
        <CollectionsList
          collections={collections}
          onCreateCollection={(name) => createCollection.mutate({ name })}
          onDeleteCollection={(colId) =>
            deleteCollection.mutate({ collectionId: colId })
          }
          onAddMovie={(collectionId, tmdbMovie) =>
            addToCollection.mutate({ collectionId, tmdbMovie })
          }
          onRemoveMovie={(collectionId, movieDbId) =>
            removeFromCollection.mutate({ collectionId, movieDbId })
          }
        />
      </section>

      {showNew && (
        <NewCollectionModal
          onCreate={(name) => {
            createCollection.mutate({ name });
            setShowNew(false);
          }}
          onCancel={() => setShowNew(false)}
        />
      )}
    </div>
  );
}
