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
    if (sortMode === "title-desc") {
      arr.sort((a, b) => b.title.localeCompare(a.title));
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
    if (sortMode === "genre-desc") {
      arr.sort((a, b) => {
        const ga = a.genres?.[0]?.name || "";
        const gb = b.genres?.[0]?.name || "";
        return gb.localeCompare(ga) || b.title.localeCompare(a.title);
      });
      return arr.reduce((acc, m) => {
        push(acc, m.genres?.[0]?.name || "Other", m);
        return acc;
      }, {});
    }

    return { "": arr };
  }, [movies, sortMode]);

  return (
    <section className="min-h-screen  pb-32 text-siva-100">
      {Object.entries(groups).map(([groupKey, items]) => (
        <section key={groupKey} className="mb-12">
          {groupKey && (
            <h2 className="text-2xl lg:text-3xl font-normal text-siva-100 mb-4">
              {groupKey}
            </h2>
          )}

          <div className="flex gap-3 lg:gap-6 flex-nowrap sm:flex-wrap overflow-auto">
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
