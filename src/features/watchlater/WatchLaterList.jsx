import { useMemo } from "react";
import WatchLaterItem from "./WatchLaterItem";

/**
 * @param {Object[]}  movies       – array of movie rows (already sorted by the parent)
 * @param {"date"|"title"|"genre"} sortMode
 * @param {Function}  onSelect     – (movie) => void
 * @param {Function}  onAdd        – (movieObj) => void            (optimistic toggle, optional)
 * @param {Function}  onRemove     – (movieId)  => void            (react-query mutation)
 */
export default function WatchLaterList({
  movies,
  sortMode,
  onSelect,
  onAdd,
  onRemove,
}) {
  /* ---------------------------------------------------------------------------
   *  Build display groups
   *    • Title  ➜  “A”, “B”, …            (first letter)
   *    • Genre  ➜  “Action”, “Comedy”, …  (first genre name or "Other")
   *    • Date   ➜  one big bucket (“”)    (already ordered by parent)
   * ------------------------------------------------------------------------- */
  const groups = useMemo(() => {
    // cloning because we *may* resort locally
    const arr = [...movies];

    // Helpers
    const push = (acc, key, movie) => {
      (acc[key] ||= []).push(movie);
    };

    // --- group by first letter of title -------------------------------------------------
    if (sortMode === "title") {
      arr.sort((a, b) => a.title.localeCompare(b.title));
      return arr.reduce((acc, movie) => {
        const letter = movie.title?.[0]?.toUpperCase() || "#";
        push(acc, letter, movie);
        return acc;
      }, {});
    }

    // --- group by first genre name ------------------------------------------------------
    if (sortMode === "genre") {
      arr.sort((a, b) => {
        const ga = a.genres?.[0]?.name || "";
        const gb = b.genres?.[0]?.name || "";
        return ga.localeCompare(gb) || a.title.localeCompare(b.title);
      });
      return arr.reduce((acc, movie) => {
        const g = movie.genres?.[0]?.name || "Other";
        push(acc, g, movie);
        return acc;
      }, {});
    }

    // --- date (default) –- no extra grouping -------------------------------------------
    return { "": arr };
  }, [movies, sortMode]);

  /* ---------------------------------------------------------------------------
   *  Render
   * ------------------------------------------------------------------------- */
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
                /*  confirm-modal passes a *movie object* back.
                    We forward its id to the mutation hook.            */
                onRemove={(m) => onRemove(m.id)}
                onToggleWL={onAdd}
              />
            ))}
          </div>
        </section>
      ))}
    </section>
  );
}
