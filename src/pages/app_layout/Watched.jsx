import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import MovieCard from "../../ui/MovieCard";
import { Icon } from "@iconify-icon/react";

export default function Watched() {
  const [sort, setSort] = useState("date");
  const dummy = [
    { id: 4, title: "Brutalist", poster_path: "/brutalist.jpg" },
    { id: 5, title: "Catch Me If You Can", poster_path: "/catchme.jpg" },
    { id: 6, title: "Titanic", poster_path: "/titanic.jpg" },
  ];

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
      <div className="max-w-4xl mx-auto pt-6">
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
          className="bg-bordo-500 hover:bg-bordo-400 px-4 py-2 rounded flex items-center gap-2 cursor-pointer"
        >
          <Icon
            icon="gridicons:share"
            width="18"
            height="18"
            className="text-white"
          />
          <span>Share</span>
        </button>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-gray-800 text-white rounded px-3 py-1"
        >
          <option value="date">Date watched</option>
          <option value="rating_low_high">Rating (low–high)</option>
          <option value="rating_high_low">Rating (high–low)</option>
        </select>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4 px-6">Your Watched</h2>
      <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 px-6">
        {dummy.map((m) => (
          <MovieCard
            key={m.id}
            movie={m}
            onWatchLater={() => {}}
            onBookmark={() => {}}
            onClick={() => {}}
          />
        ))}
      </div>
    </div>
  );
}
