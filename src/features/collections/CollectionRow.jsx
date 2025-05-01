// src/features/collections/CollectionRow.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify-icon/react";
import AddMovieCard from "./AddMovieCard";
import AddMovieModal from "./AddMovieModal";
import ConfirmRemoveModal from "../../ui/ConfirmRemoveModal.jsx";
import { useMoviePopup } from "../../context/MoviePopupContext";
import { poster } from "../../services/apiTmdb";

export default function CollectionRow({
  collection,
  onDeleteCollection,
  onAddMovie,
  onRemoveMovie,
  onShareCollection,
}) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { open } = useMoviePopup();

  // Are we in “detail” mode? i.e. has the parent passed a movies[]?
  const hasMovies = Array.isArray(collection.movies);

  // Index page: only render header
  if (!hasMovies) {
    return (
      <div className="flex items-center justify-between mb-4 px-4 py-2 bg-siva-700 rounded-lg">
        <Link
          to={`/collections/${collection.id}`}
          className="text-xl font-semibold hover:text-bordo-400"
        >
          {collection.name}
        </Link>
        <div className="flex gap-2">
          <button
            onClick={() => onShareCollection?.(collection)}
            title="Share collection"
            className="p-1 bg-bordo-500 rounded"
          >
            <Icon icon="gridicons:share" className="text-white" />
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            title="Delete collection"
            className="p-1 bg-red-600 rounded"
          >
            <Icon
              icon="material-symbols:delete-outline"
              className="text-white"
            />
          </button>
        </div>

        {showDeleteConfirm && (
          <ConfirmRemoveModal
            movie={{ title: collection.name }}
            listName="collection"
            onConfirm={() => {
              onDeleteCollection(collection.id);
              setShowDeleteConfirm(false);
            }}
            onCancel={() => setShowDeleteConfirm(false)}
          />
        )}
      </div>
    );
  }

  // Detail page: render grid of movies + add/remove controls
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-semibold mb-6">{collection.name}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {collection.movies.map((m) => (
          <div key={m.dbId} className="relative">
            <img
              src={poster(m.poster)}
              alt={m.title}
              className="w-full rounded-lg cursor-pointer object-cover transition-transform duration-200 hover:scale-105"
              onClick={() => open(m)}
            />
            <button
              onClick={() => onRemoveMovie(collection.id, m.dbId)}
              className="absolute top-2 right-2 bg-black/50 p-1 rounded-full hover:bg-red-600"
              title="Remove from collection"
            >
              <Icon icon="gridicons:cross-circle" className="text-white" />
            </button>
          </div>
        ))}

        {/* “Add Movie” card */}
        <AddMovieCard onClick={() => setShowAddModal(true)} />
      </div>

      {showAddModal && (
        <AddMovieModal
          alreadyAdded={collection.movies.map((m) => m.api_id)}
          onAdd={(ids) => {
            onAddMovie(collection.id, ids);
            setShowAddModal(false);
          }}
          onCancel={() => setShowAddModal(false)}
        />
      )}
    </div>
  );
}
