// src/features/collections/AddMovieModal.jsx
import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@iconify-icon/react";
import useDebounce from "../../hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { searchMovies, fetchMovieDetails } from "../../services/apiTmdb";

const POSTER_BASE = "https://image.tmdb.org/t/p/w342";

export default function AddMovieModal({
  alreadyAdded = [], // array of TMDB ids
  onAdd, // (ids: number[]) => void
  onCancel, // () => void
}) {
  const modalRef = useRef(null),
    inputRef = useRef(null);

  // 1) Search input + debounce
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  useDebounce(() => setDebounced(query.trim()), 350, [query]);

  // 2) React-Query fetch
  const { data, isFetching } = useQuery({
    queryKey: ["tmdb-search", debounced],
    queryFn: ({ signal }) => searchMovies(debounced, 1, signal),
    enabled: debounced.length > 0,
    staleTime: 1000 * 60 * 5,
  });
  const results = data?.results ?? [];

  // 3) Close on Escape or click-outside
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onCancel();
    const onClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onCancel();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClickOutside);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClickOutside);
    };
  }, [onCancel]);

  // 4) Autofocus
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/70" />

      {/* modal */}
      <div
        ref={modalRef}
        className="relative z-10 bg-siva-800 rounded-lg p-6 text-white w-11/12 max-w-3xl"
      >
        {/* close */}
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 text-siva-300 hover:text-white"
        >
          <Icon icon="gridicons:cross-circle" width={24} />
        </button>

        <h2 className="text-2xl mb-4">Search &amp; add a movie</h2>

        {/* search input */}
        <div className="relative mb-6">
          <Icon
            icon="jam:search"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-siva-100/60"
            width={20}
            height={20}
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a title…"
            className="w-full pl-12 pr-4 py-2 bg-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-bordo-400"
          />
          {isFetching && (
            <Icon
              icon="mingcute:loading-fill"
              className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-siva-100/60"
              width={18}
              height={18}
            />
          )}
        </div>

        {/* results */}
        <div className="grid grid-cols-4 gap-4 max-h-[500px] overflow-auto">
          {debounced && results.length === 0 && !isFetching && (
            <p className="col-span-4 text-center text-siva-200">No results.</p>
          )}

          {results.map((m) => {
            const taken = alreadyAdded.includes(m.id);
            return (
              <div
                key={m.id}
                onClick={async () => {
                  console.log("Clicked:", m.id);
                  if (taken) return;
                  try {
                    const full = await fetchMovieDetails(m.id);
                    onAdd(full); // ← pass the whole TMDB payload
                  } catch (err) {
                    console.error(err);
                  }
                }}
                className={`
                  w-full h-60 rounded-lg overflow-hidden relative cursor-pointer
                  transition-transform ${
                    taken ? "opacity-40 pointer-events-none" : "hover:scale-105"
                  }
                `}
              >
                <img
                  src={
                    m.poster_path
                      ? POSTER_BASE + m.poster_path
                      : "/placeholder.jpg"
                  }
                  alt={m.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-xs text-white text-center py-1">
                  {m.title}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>,
    document.body
  );
}
