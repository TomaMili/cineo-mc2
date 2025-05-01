import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import CollectionsList from "./CollectionsList";
import NewCollectionModal from "./NewCollectionModal";
import { Icon } from "@iconify-icon/react";
import useCollections from "../../hooks/useCollections";
import TabNav from "../../ui/TabNav";
import ErrorNotice from "../../ui/ErrorNotice";
import Spinner from "../../ui/Spinner";

export default function CollectionsPage({
  onRemoveMovie,
  onAddMovie,
  onDeleteCollection,
  onShareCollection,
  onCreateCollection,
  onShareAll,
}) {
  const { data: collections = [], isLoading, isError } = useCollections();

  const [showNew, setShowNew] = useState(false);

  // const session = useSession();
  // const userId = session?.user?.id;
  const userId = 1; // TODO: replace with real session

  if (!userId)
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <ErrorNotice title="Couldn't load Collections" message="No user" />
      </div>
    );
  if (isError)
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <ErrorNotice title="Couldn't load Collections" message="Error 404" />
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
    <div className="min-h-screen text-siva-100 pb-12">
      <div className="w-full mx-auto px-6 pt-6">
        <TabNav
          tabs={[
            ["../watchlater", "Watch later"],
            ["../watched", "Watched"],
            ["", "Collections"],
          ]}
        />
      </div>

      <div className="w-full mx-auto flex justify-end items-center gap-4 mt-4 px-6 text-white">
        <button
          onClick={onShareAll}
          className="bg-bordo-500 hover:bg-bordo-400 px-4 py-2 rounded flex items-center gap-2 cursor-pointer transition-colors duration-200"
        >
          <Icon icon="gridicons:share" width="18" height="18" />
          <span>Share all collections</span>
        </button>
        <button
          onClick={() => setShowNew(true)}
          className="bg-bordo-500 hover:bg-bordo-400 px-4 py-2 rounded flex items-center gap-2 cursor-pointer transition-colors duration-200"
        >
          <Icon icon="mdi:plus" width="18" height="18" />
          <span>New collection</span>
        </button>
      </div>
      <section className="min-h-screen px-6 xl:px-12 pb-32 text-siva-100">
        <div className="w-full mx-auto mt-8 space-y-12 px-6">
          <CollectionsList
            collections={collections}
            onRemoveMovie={onRemoveMovie}
            onAddMovie={onAddMovie}
            onDeleteCollection={onDeleteCollection}
            onShareCollection={onShareCollection}
          />
        </div>
        {showNew && (
          <NewCollectionModal
            onCreate={onCreateCollection}
            onCancel={() => setShowNew(false)}
          />
        )}
      </section>
      <Outlet />
    </div>
  );
}
