import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify-icon/react";
import useWatched from "../../hooks/useWatched";
import WatchedList from "../../features/watched/WatchedList";
import { handleShare } from "../../utils/share";

export default function Watched() {
  const { data: movies = [], isLoading } = useWatched();
  const [items, setItems] = useState([]);
  const [sort, setSort] = useState("date");

  useEffect(() => {
    setItems(movies);
  }, [movies]);

  if (isLoading) return <div className="text-white p-8">Loading…</div>;

  const handleRemove = (movie) => {
    setItems((prev) => prev.filter((m) => m.id !== movie.id));
  };

  const handleShareClick = () =>
    handleShare(
      window.location.href,
      "WATCHED list link copied to the clipboard!"
    );

  return (
    <div className="min-h-screen bg-siva-800 text-white pb-12">
      <div className="w-full mx-auto px-6 pt-6">
        <TabNav
          tabs={[
            ["", "Watch later"],
            ["../watched", "Watched"],
            ["../collections", "Collections"],
          ]}
        />
      </div>

      <div className="w-full mx-auto flex justify-end items-center gap-4 mt-4 px-6">
        <button
          onClick={handleShareClick}
          className="bg-bordo-500 hover:bg-bordo-400 px-4 py-2 rounded flex items-center gap-2"
        >
          <Icon icon="gridicons:share" width="18" height="18" />
          <span>Share</span>
        </button>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-bordo-500 px-4 py-3 gap-2 rounded "
        >
          <option value="date">Date watched</option>
          <option value="title">Title (A–Z)</option>
          <option value="genre">Genre (A–Z)</option>
          <option value="rating">Rating (high-low)</option>
        </select>
      </div>

      {/* list */}
      <div className="w-full mx-auto mt-8 space-y-8 px-6">
        <WatchedList movies={items} sortMode={sort} onRemove={handleRemove} />
      </div>
    </div>
  );
}
