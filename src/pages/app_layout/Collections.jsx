import { useState } from "react";
import TabNav from "../../ui/TabNav";
import Spinner from "../../ui/Spinner";
import ErrorNotice from "../../ui/ErrorNotice";
import CollectionsList from "../../features/collections/CollectionsList";
import NewCollectionModal from "../../features/collections/NewCollectionModal";
import {
  useAddMovieToCollection,
  useCollections,
  useCreateCollection,
  useDeleteCollection,
  useRemoveMovieFromCollection,
} from "../../hooks/useCollections";
import { Icon } from "@iconify-icon/react";

export default function Collections() {
  const userId = 1;
  const { data: collections = [], isLoading, isError } = useCollections(userId);
  const createCollection = useCreateCollection(userId);
  const deleteCollection = useDeleteCollection(userId);
  const addToCollection = useAddMovieToCollection(userId);
  const removeFromCollection = useRemoveMovieFromCollection(userId);

  const [showNew, setShowNew] = useState(false);

  if (!userId)
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <ErrorNotice title="Couldn't load Watched" message="No user" />
      </div>
    );
  if (isError)
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <ErrorNotice title="Couldn't load Watched" message={isError.message} />
      </div>
    );

  if (isLoading)
    return (
      <>
        <div className="w-full mx-auto px-6 pt-6">
          <TabNav
            tabs={[
              ["../watchlater", "Watch later"],
              ["../watched", "Watched"],
              ["", "Collections"],
            ]}
          />
        </div>
        <div className="h-screen -m-24 flex justify-center items-center">
          <Spinner size={46} />
        </div>
      </>
    );

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
          className="bg-bordo-500 hover:bg-bordo-400 px-4 py-2 rounded flex items-center gap-2 cursor-pointer"
        >
          <Icon icon="mdi:plus" /> New Collection
        </button>
      </div>

      <section className="px-6 my-8.5">
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
