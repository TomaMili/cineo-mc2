import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useCollections from "../../hooks/useCollections";
import usePopularMovies from "../../hooks/usePopularMovies";
import { useMoviePopup } from "../../context/MoviePopupContext";
import { Icon } from "@iconify-icon/react";
import AddMovieCard from "./AddMovieCard";
import AddMovieModal from "./AddMovieModal";

export default function CollectionDetail() {
  const { id } = useParams();
  const { data: cols = [], isLoading } = useCollections();
  const [showAddModal, setShowAddModal] = useState(false);
  const { open } = useMoviePopup();

  const { data: popularData, isLoading: loadingPopular } = usePopularMovies(1);

  if (isLoading || loadingPopular)
    return <div className="text-white p-8">Loading…</div>;

  const col = cols.find((c) => c.id === id);
  if (!col) return <div className="text-white p-8">Not found</div>;

  const movies = popularData?.results ?? [];

  const handleAddMovies = (movieIds) => {
    alert(`Dodaj filmove s ID-evima: ${movieIds.join(", ")}`);
    setShowAddModal(false);
  };

  return (
    <section className="min-h-screen bg-black text-white pb-12 pt-24 px-6 xl:px-12">
      <h1 className="text-4xl font-semibold mb-6">{col.name}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div key={movie.id} className="group relative">
            {/* Poster hover */}
            <div className="overflow-hidden rounded-lg aspect-[2/3]">
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : "/placeholder.jpg"
                }
                alt={movie.title}
                className="w-full h-full object-cover transition-all duration-300 ease-out group-hover:blur-[3px] group-hover:scale-105"
                style={{ cursor: "pointer" }}
                onClick={() => open(movie)}
              />
            </div>
            {/* Title popup */}
            <button
              onClick={() => open(movie)}
              className="mt-2 text-sm font-medium text-white line-clamp-1 text-left hover:underline transition-all w-full"
              title={movie.title}
            >
              {movie.title}
            </button>
            {/* Share button */}
            <div className="mt-2 flex items-center justify-end text-sm text-white">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    window.location.origin + `/movie/${movie.id}`
                  );
                  const t = document.createElement("div");
                  t.innerText = "Link copied!";
                  t.className =
                    "fixed bottom-4 right-4 bg-bordo-500 text-white px-4 py-2 rounded shadow-lg";
                  document.body.appendChild(t);
                  setTimeout(() => document.body.removeChild(t), 1500);
                }}
                className="text-gray-300 hover:text-white"
                aria-label="Share movie"
              >
                <Icon icon="gridicons:share" width="18" height="18" />
              </button>
            </div>
          </div>
        ))}
        {/* AddMovieCard na kraju */}
        <AddMovieCard onClick={() => setShowAddModal(true)} />
      </div>
      {showAddModal && (
        <AddMovieModal
          onAdd={handleAddMovies}
          onCancel={() => setShowAddModal(false)}
          alreadyAdded={movies.map((m) => m.id)}
        />
      )}
    </section>
  );
}
