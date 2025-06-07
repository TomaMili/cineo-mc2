import { useMemo } from "react";
import WatchedItem from "./WatchedItem";

export default function WatchedList({ movies, sortMode, onRemove }) {
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
    <section className="min-h-screen pb-32 text-siva-100">
      {Object.entries(groups).map(([group, items]) => (
        <section key={group} className="mb-12 mt-2 ">
          {group && (
            <h2 className="text-2xl lg:text-3xl font-normal text-siva-100  mt-2 mb-4">
              {group}
            </h2>
          )}
          <div className="flex flex-nowrap gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory sm:grid sm:gap-4 sm:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] sm:overflow-x-visible sm:snap-none min-w-full ">
            {items.map((m) => (
              <div className="flex-none snap-start w-36 sm:flex-auto sm:w-auto">
                <WatchedItem key={m.dbId} movie={m} onRemove={onRemove} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </section>
  );
}
