import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@iconify-icon/react";
import MovieCarousel from "../../ui/MovieCarousel";
import usePopularMovies from "../../hooks/usePopularMovies";

export default function AddMovieModal({ onAdd, onCancel, alreadyAdded = [] }) {
  const { data, isLoading } = usePopularMovies(1);
  const [selectedIds, setSelectedIds] = useState([]);

  const toggle = (id) =>
    setSelectedIds((ids) =>
      ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]
    );

  if (isLoading)
    return createPortal(
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
        <div className="bg-gray-900 text-white rounded-lg p-8">Loading…</div>
      </div>,
      document.body
    );

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onCancel} />
      <div className="relative bg-gray-900 rounded-lg p-6 max-w-xl w-full text-white z-10">
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <Icon icon="gridicons:cross-circle" width="28" height="28" />
        </button>
        <h2 className="text-2xl mb-4">Add movies to collection</h2>
        <span className="block mb-2">Select movies to add:</span>
        {data && (
          <MovieCarousel
            slides={data.results.map((m) => ({
              ...m,
              isSelected: selectedIds.includes(m.id),
              isDisabled: alreadyAdded.includes(m.id),
            }))}
            hideActions
            onClick={(movie) => {
              if (alreadyAdded.includes(movie.id)) return;
              toggle(movie.id);
            }}
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
            onClick={() => onAdd(selectedIds)}
            className="px-4 py-2 rounded bg-bordo-500 hover:bg-bordo-400"
            disabled={selectedIds.length === 0}
          >
            Add
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
