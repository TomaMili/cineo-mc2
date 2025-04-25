import React, { useMemo } from "react";
import WatchedItem from "./WatchedItem";

export default function WatchedList({ movies, sortMode }) {
  const groups = useMemo(() => {
    let arr = [...movies];
    if (sortMode === "rating") {
      arr.sort((a, b) => (b.userRating || 0) - (a.userRating || 0));
      return { "": arr };
    }
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
    // default: by watchedDate descending, grouped by day label
    arr.sort((a, b) => new Date(b.watchedDate) - new Date(a.watchedDate));
    return arr.reduce((acc, m) => {
      const d = new Date(m.watchedDate);
      const today = new Date();
      let label =
        d.toDateString() === today.toDateString()
          ? "Today"
          : `${d.getDate()}. ${d.toLocaleString("default", { month: "long" })}`;
      (acc[label] ||= []).push(m);
      return acc;
    }, {});
  }, [movies, sortMode]);

  return (
    <>
      {Object.entries(groups).map(([group, items]) => (
        <div key={group}>
          {group && <h2 className="text-2xl font-bold mb-4">{group}</h2>}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {items.map((m) => (
              <WatchedItem key={m.id} movie={m} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
