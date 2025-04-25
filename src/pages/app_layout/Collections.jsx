import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import MovieCard from "../../ui/MovieCard";
import { Icon } from "@iconify-icon/react";

export default function Collections() {
  const [showModal, setShowModal] = useState(false);
  const dummyCols = [
    {
      name: "Christmas Movies",
      movies: [
        { id: 7, title: "Brutalist", poster_path: "/brutalist.jpg" },
        { id: 8, title: "Home Alone", poster_path: "/homealone.jpg" },
      ],
    },
    {
      name: "Sci-Fi Favorites",
      movies: [
        { id: 9, title: "Dune: Part Two", poster_path: "/dune2.jpg" },
        { id: 10, title: "Blade Runner", poster_path: "/blade.jpg" },
      ],
    },
  ];

  const handleShareAll = () => {
    navigator.clipboard.writeText(window.location.href);
    const t = document.createElement("div");
    t.innerText = "Link copied to the clipboard!";
    t.className =
      "fixed bottom-15 right-15 bg-bordo-500 text-white px-4 py-2 rounded border border-bordo-400 shadow-lg";
    document.body.appendChild(t);
    setTimeout(() => document.body.removeChild(t), 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white pb-12">
      <div className="max-w-4xl mx-auto pt-6">
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

      <div className="max-w-4xl mx-auto flex justify-end gap-4 mt-4 px-6">
        <button
          onClick={handleShareAll}
          className="bg-bordo-500 hover:bg-bordo-400 px-4 py-2 rounded flex items-center gap-2 cursor-pointer"
        >
          <Icon
            icon="gridicons:share"
            width="18"
            height="18"
            className="text-white"
          />
          <span>Share all collections</span>
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="bg-bordo-500 hover:bg-red-700 px-4 py-2 rounded"
        >
          + New collection
        </button>
      </div>

      <div className="max-w-4xl mx-auto space-y-12 mt-6 px-6">
        {dummyCols.map((col) => (
          <div key={col.name}>
            <h3 className="text-2xl font-bold mb-2">{col.name}</h3>
            <div className="flex gap-4 mb-4">
              <button className="bg-bordo-500 hover:bg-red-700 px-3 py-1 rounded">
                🗑 Delete
              </button>
              <button className="bg-bordo-500 hover:bg-red-700 px-3 py-1 rounded">
                🔗 Share
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {col.movies.map((m) => (
                <div key={m.id} className="relative">
                  <MovieCard
                    movie={m}
                    onWatchLater={() => {}}
                    onBookmark={() => {}}
                    onClick={() => {}}
                  />
                  <button className="absolute top-2 right-2 bg-black/50 rounded-full w-6 h-6 flex items-center justify-center text-white">
                    ×
                  </button>
                </div>
              ))}
              <div className="border border-gray-600 rounded-lg w-40 h-60 flex items-center justify-center text-gray-500 text-4xl cursor-pointer hover:bg-bordo-500 hover:text-white transition-colors hover:border-white">
                ＋
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center">
          <div className="bg-gray-900 rounded-lg p-8 w-96">
            <h2 className="text-2xl text-white mb-4">Create a collection</h2>
            <input
              placeholder="Collection name"
              className="w-full mb-4 p-2 rounded bg-gray-800 text-white"
            />
            {/* here you’d render your MovieCard carousel/search to add */}
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-bordo-500 hover:bg-red-700 w-full py-2 rounded"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
