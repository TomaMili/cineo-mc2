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
    <section className="min-h-screen   pb-32 text-siva-100">
      {Object.entries(groups).map(([group, items]) => (
        <section key={group} className="mb-12 mt-2">
          {group && (
            <h2 className="text-3xl font-normal text-siva-100  mt-2 mb-4">
              {group}
            </h2>
          )}
          <div
            className="grid gap-6 gap-y-10
          grid-cols-2 min-[570px]:grid-cols-3 min-[770px]:grid-cols-4 min-[1100px]:grid-cols-5 min-[1400px]:grid-cols-6
          min-[1670px]:grid-cols-7 min-[1860px]:grid-cols-8 "
          >
            {items.map((m) => (
              <WatchedItem key={m.dbId} movie={m} onRemove={onRemove} />
            ))}
          </div>
        </section>
      ))}
    </section>
  );
}
