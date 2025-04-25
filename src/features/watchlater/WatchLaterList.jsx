// src/features/watchlater/WatchLaterList.jsx
import React, { useMemo } from "react";
import WatchLaterItem from "./WatchLaterItem";

export default function WatchLaterList({ movies, sortMode, ...handlers }) {
  const groups = useMemo(() => {
    let arr = [...movies];
    if (sortMode === "title") {
      arr.sort((a, b) => a.title.localeCompare(b.title));
      return arr.reduce((acc, m) => {
        const L = m.title[0].toUpperCase();
        (acc[L] ||= []).push(m);
        return acc;
      }, {});
    }
    if (sortMode === "genre") {
      arr.sort((a, b) => {
        const ga = a.genres?.[0]?.name || "";
        const gb = b.genres?.[0]?.name || "";
        return ga.localeCompare(gb) || a.title.localeCompare(b.title);
      });
      return arr.reduce((acc, m) => {
        const g = m.genres?.[0]?.name || "Other";
        (acc[g] ||= []).push(m);
        return acc;
      }, {});
    }
    return { "": arr };
  }, [movies, sortMode]);

  return (
    <>
      {Object.entries(groups).map(([group, items]) => (
        <div key={group}>
          {group && (
            <h2 className="text-2xl font-bold text-white mb-4">{group}</h2>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {items.map((m) => (
              <WatchLaterItem key={m.id} movie={m} {...handlers} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
