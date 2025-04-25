import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify-icon/react";
import useWatched from "../../hooks/useWatched";
import WatchedList from "../../features/watched/WatchedList";

export default function Watched() {
  const { data: movies = [], isLoading } = useWatched();
  const [items, setItems] = useState([]);
  const [sort, setSort] = useState("date");

  // whenever the query returns, initialize our local list
  useEffect(() => {
    setItems(movies);
  }, [movies]);

  if (isLoading) return <div className="text-white p-8">Loading…</div>;

  const handleRemove = (movie) => {
    setItems((prev) => prev.filter((m) => m.id !== movie.id));
  };

  const handleShare = () => {
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
      <div className="max-w-4xl mx-auto px-6 pt-6">
        <nav className="flex bg-gray-500/40 rounded-full overflow-hidden h-8">
          {[
            ["../watchlater", "Watch later"],
            ["", "Watched"],
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

      <div className="max-w-4xl mx-auto flex justify-end items-center gap-4 mt-4 px-6">
        <button
          onClick={handleShare}
          className="bg-bordo-500 hover:bg-bordo-400 px-4 py-2 rounded flex items-center gap-2"
        >
          <Icon icon="gridicons:share" width="18" height="18" />
          Share
        </button>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-gray-800 text-white rounded px-3 py-1"
        >
          <option value="date">Date watched</option>
          <option value="title">Title (A–Z)</option>
          <option value="genre">Genre (A–Z)</option>
          <option value="rating">Rating (high-low)</option>
        </select>
      </div>

      <div className="max-w-4xl mx-auto mt-8 space-y-8 px-6">
        <WatchedList movies={items} sortMode={sort} onRemove={handleRemove} />{" "}
      </div>
    </div>
  );
}
