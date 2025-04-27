// src/features/watchlater/WatchLaterList.jsx
import React, { useMemo } from "react";
import WatchLaterItem from "./WatchLaterItem";

export default function WatchLaterList({
  movies,
  sortMode,
  onSelect,
  onRemove,
  onMarkWatched,
  onToggleWL,
}) {
  // group only if genre or title, else single group
  const groups = useMemo(() => {
    let arr = [...movies];
    if (sortMode === "title") {
      arr.sort((a, b) => a.title.localeCompare(b.title));
      return arr.reduce((acc, m) => {
        const letter = m.title[0].toUpperCase();
        (acc[letter] ||= []).push(m);
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
    // date added: one group with empty key
    return { "": arr };
  }, [movies, sortMode]);

  return (
    <section className="min-h-screen   px-6 xl:px-12 pb-32 text-white">
      {Object.entries(groups).map(([group, items]) => (
        <section key={group} className="mb-12">
          {group && (
            <h2 className="text-2xl font-bold text-white mb-4">{group}</h2>
          )}
          <div className="flex flex-wrap gap-6 ">
            {items.map((m) => (
              <WatchLaterItem
                key={m.id}
                movie={m}
                onSelect={onSelect}
                onRemove={onRemove}
                onMarkWatched={onMarkWatched}
                onToggleWL={onToggleWL}
              />
            ))}
          </div>
        </section>
      ))}
    </section>
  );
}
