import { useMemo } from "react";
import WatchLaterItem from "./WatchLaterItem";

export default function WatchLaterList({
  movies,
  sortMode,
  onSelect,
  onToggleWL,
}) {
  const groups = useMemo(() => {
    const arr = [...movies];
    const push = (acc, key, m) => (acc[key] ||= []).push(m);

    if (sortMode === "title") {
      arr.sort((a, b) => a.title.localeCompare(b.title));
      return arr.reduce((acc, m) => {
        push(acc, m.title?.[0]?.toUpperCase() || "#", m);
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
        push(acc, m.genres?.[0]?.name || "Other", m);
        return acc;
      }, {});
    }

    return { "": arr };
  }, [movies, sortMode]);

  return (
    <section className="min-h-screen px-6 xl:px-12 pb-32 text-white">
      {Object.entries(groups).map(([groupKey, items]) => (
        <section key={groupKey} className="mb-12">
          {groupKey && (
            <h2 className="text-2xl font-bold text-white mb-4">{groupKey}</h2>
          )}

          <div className="flex flex-wrap gap-6">
            {items.map((movie) => (
              <WatchLaterItem
                key={movie.id}
                movie={movie}
                onSelect={onSelect}
                onToggleWL={onToggleWL}
              />
            ))}
          </div>
        </section>
      ))}
    </section>
  );
}
