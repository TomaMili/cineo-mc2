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

    arr.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
    return arr.reduce((acc, m) => {
      const d = new Date(m.addedAt);
      const today = new Date();
      const label =
        d.toDateString() === today.toDateString()
          ? "Today"
          : `${d.getDate()}. ${d.toLocaleString("default", { month: "long" })}`;
      (acc[label] ||= []).push(m);
      return acc;
    }, {});
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

          <div className="flex flex-nowrap gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory sm:grid sm:gap-4 sm:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] sm:overflow-x-visible sm:snap-none min-w-full">
            {items.map((movie) => (
              <div
                key={movie.id}
                className="flex-none snap-start w-36 sm:flex-auto sm:w-auto"
              >
                <WatchLaterItem
                  key={movie.id}
                  movie={movie}
                  onSelect={onSelect}
                  onToggleWL={onToggleWL}
                />
              </div>
            ))}
          </div>
        </section>
      ))}
    </section>
  );
}
