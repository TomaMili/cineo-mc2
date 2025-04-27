import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import CollectionsList from "./CollectionsList";
import NewCollectionModal from "./NewCollectionModal";
import { Icon } from "@iconify-icon/react";
import useCollections from "../../hooks/useCollections";

export default function CollectionsPage({
  collections,
  onRemoveMovie,
  onAddMovie,
  onDeleteCollection,
  onShareCollection,
  onCreateCollection,
  onShareAll,
}) {
  const [showNew, setShowNew] = useState(false);

  return (
    <div className="min-h-screen text-white pb-12">
      {/* Tabs */}
      <div className="w-full mx-auto px-6 pt-6">
        <nav className="flex bg-gray-500/40 rounded-full overflow-hidden h-8">
          {[
            ["../watchlater", "Watch later"],
            ["../watched", "Watched"],
            ["", "Collections"],
          ].map(([to, label]) => (
            <NavLink
              key={to}
              to={to}
              end={to === ""}
              className={({ isActive }) =>
                `flex-1 text-center leading-8 transition-colors ${
                  isActive
                    ? "bg-bordo-500 text-white"
                    : "text-gray-300 hover:bg-bordo-400 hover:text-white"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Actions */}
      <div className="w-full mx-auto flex justify-end items-center gap-4 mt-4 px-6">
        <button
          onClick={onShareAll}
          className="bg-bordo-500 hover:bg-bordo-400 px-4 py-2 rounded flex items-center gap-2"
        >
          <Icon icon="gridicons:share" width="18" height="18" />
          <span>Share all collections</span>
        </button>
        <button
          onClick={() => setShowNew(true)}
          className="bg-bordo-500 hover:bg-bordo-400 px-4 py-2 rounded flex items-center gap-2"
        >
          <Icon icon="mdi:plus" width="18" height="18" />
          <span>New collection</span>
        </button>
      </div>
      <section className="min-h-screen px-6 xl:px-12 pb-32 text-white">
        {/* Carousels */}
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
