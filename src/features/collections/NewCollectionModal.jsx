// src/features/collections/NewCollectionModal.jsx
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@iconify-icon/react";
import MovieCarousel from "../../ui/MovieCarousel";
import usePopularMovies from "../../hooks/usePopularMovies";

export default function NewCollectionModal({
  initialName = "",
  onCreate,
  onCancel,
}) {
  const [name, setName] = useState(initialName);
  const [selectedIds, setSelectedIds] = useState([]);
  const { data } = usePopularMovies(1);

  const toggle = (id) =>
    setSelectedIds((ids) =>
      ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]
    );

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onCancel} />
      <div className="relative bg-siva-800 rounded-lg p-10  w-3/4 text-siva-100 z-10">
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 text-gray-400 hover:text-siva-100"
        >
          <Icon icon="gridicons:cross-circle" width="24" height="24" />
        </button>
        <h2 className="text-2xl mb-4 text-center">Create a collection</h2>
        <label className="block mb-4">
          <span>Collection name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full bg-gray-800 rounded px-3 py-2"
          />
        </label>
        <span className="block mb-2">Add movies:</span>
        {data && (
          <MovieCarousel
            slides={data.results}
            onClick={(m) => toggle(m.id)}
            hideActions
          />
        )}
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={() => onCreate(name, selectedIds)}
            className="px-4 py-2 rounded bg-bordo-500 hover:bg-bordo-400"
            disabled={!name.trim()}
          >
            Create
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
