// src/features/watchlater/WatchLaterPage.jsx
import React, { useState, useEffect } from "react";
import useWatchLater from "../../hooks/useWatchLater";
import WatchLaterList from "../../features/watchlater/WatchLaterList";
import MoviePopup from "../../ui/MoviePopup";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify-icon/react";

export default function WatchLater() {
  const { data: fetched = [], isLoading } = useWatchLater();
  const [movies, setMovies] = useState([]);
  const [sort, setSort] = useState("genre"); // default to genre
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setMovies(fetched);
  }, [fetched]);

  if (isLoading) return <div className="text-white p-8">Loading…</div>;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    const t = document.createElement("div");
    t.innerText = "Link copied to the clipboard!";
    t.className =
      "fixed bottom-15 right-15 bg-bordo-500 text-white px-4 py-2 rounded shadow-lg";
    document.body.appendChild(t);
    setTimeout(() => document.body.removeChild(t), 1500);
  };

  const handleRemove = (m) =>
    setMovies((prev) => prev.filter((x) => x.id !== m.id));
  const handleMarkWatched = (m, rating) => {
    setMovies((prev) => prev.filter((x) => x.id !== m.id));
    // TODO: add to watched with rating
    return Promise.resolve();
  };
  const handleToggleWL = (m) =>
    setMovies((prev) =>
      prev.some((x) => x.id === m.id)
        ? prev.filter((x) => x.id !== m.id)
        : [...prev, m]
    );

  return (
    <div className="min-h-screen bg-black text-white pb-12">
      {/* tabs */}
      <div className="w-full mx-auto px-6 pt-6">
        <nav className="flex bg-gray-500/40 rounded-full overflow-hidden h-8">
          {[
            ["", "Watch later"],
            ["../watched", "Watched"],
            ["../collections", "Collections"],
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

      {/* share + sort */}
      <div className="w-full mx-auto flex justify-end items-center gap-4 mt-4 px-6">
        <button
          onClick={handleShare}
          className="bg-bordo-500 hover:bg-bordo-400 px-4 py-2 rounded flex items-center gap-2"
        >
          <Icon icon="gridicons:share" width="18" height="18" />
          <span>Share</span>
        </button>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-bordo-500 px-4 py-3 gap-2 rounded"
        >
          <option value="date">Date added</option>
          <option value="title">Title (A–Z)</option>
          <option value="genre">Genre (A–Z)</option>
        </select>
      </div>

      {/* grouped, scrollable rows */}
      <div className="w-full mx-auto mt-8 space-y-8 px-6  ">
        <WatchLaterList
          movies={movies}
          sortMode={sort}
          onSelect={setSelected}
          onRemove={handleRemove}
          onMarkWatched={handleMarkWatched}
          onToggleWL={handleToggleWL}
        />
      </div>

      <MoviePopup movie={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
