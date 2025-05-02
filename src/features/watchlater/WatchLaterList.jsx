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
            <h2 className="text-3xl font-normal text-siva-100 mb-4">
              {groupKey}
            </h2>
          )}

          <div
            className="grid gap-6 gap-y-10
          grid-cols-2 min-[570px]:grid-cols-3 min-[770px]:grid-cols-4 min-[1100px]:grid-cols-5 min-[1400px]:grid-cols-6
          min-[1670px]:grid-cols-7 min-[1860px]:grid-cols-8"
          >
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
