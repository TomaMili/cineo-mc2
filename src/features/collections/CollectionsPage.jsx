import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import CollectionsList from "./CollectionsList";
import NewCollectionModal from "./NewCollectionModal";
import { Icon } from "@iconify-icon/react";
import useCollections from "../../hooks/useCollections";

export default function CollectionsPage() {
  const { data: collections = [], isLoading } = useCollections();
  const [showNew, setShowNew] = useState(false);

  if (isLoading) return <div className="text-white p-8">Loading…</div>;

  return (
    <div className="min-h-screen bg-black text-white pb-12">
      {/* Tabs */}
      <div className="max-w-4xl mx-auto px-6 pt-6">
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
      <div className="max-w-4xl mx-auto flex justify-end items-center gap-4 mt-4 px-6">
        <button
          onClick={() => navigator.clipboard.writeText(window.location.href)}
          className="bg-bordo-500 hover:bg-bordo-400 px-4 py-2 rounded flex items-center gap-2"
        >
          <Icon icon="gridicons:share" width="18" height="18" />
          <span>Share all</span>
        </button>
        <button
          onClick={() => setShowNew(true)}
          className="bg-bordo-500 hover:bg-bordo-400 px-4 py-2 rounded flex items-center gap-2"
        >
          <Icon icon="mdi:plus" width="18" height="18" />
          <span>New collection</span>
        </button>
      </div>

      {/* Carousels */}
      <div className="max-w-4xl mx-auto mt-8 space-y-12 px-6">
        <CollectionsList
          collections={collections}
          onRemoveMovie={(colId, movieId) => {
            // just filter out locally (for demo)
            console.log(`Remove ${movieId} from ${colId}`);
          }}
          onAddMovie={(colId) => {
            console.log("Add movie to", colId);
          }}
        />
      </div>

      {showNew && (
        <NewCollectionModal
          onCreate={(name, ids) => {
            console.log("create", name, ids);
            setShowNew(false);
          }}
          onCancel={() => setShowNew(false)}
        />
      )}

      {/* nested routes if you choose to render `<Outlet/>` here */}
      <Outlet />
    </div>
  );
}
