/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "../../hooks/useDebounce";
import { searchPeople, fetchGenres } from "../../services/apiTmdb";
import TagButton from "../../ui/TagButton";

export default function SearchPeopleInput({
  type,
  selected,
  onSelect,
  className,
}) {
  const [q, setQ] = useState("");
  const [deb, setDeb] = useState("");
  useDebounce(() => setDeb(q.trim()), 300, [q]);

  const { data: tmdbGenres = [] } = useQuery({
    queryKey: ["tmdb-genres"],
    queryFn: ({ signal }) => fetchGenres(signal),
    staleTime: 1000 * 60 * 60 * 24,
  });

  let raw = [];

  if (type === "Genres") {
    raw = tmdbGenres
      .map((g) => g.name)
      .filter((name) => name.toLowerCase().includes(deb.toLowerCase()));
  } else {
    const { data: peoplePage } = useQuery({
      queryKey: ["peopleSearch", type, deb],
      queryFn: ({ signal }) => searchPeople(deb, 1, signal),
      enabled: deb.length >= 2,
      staleTime: 5 * 60 * 1000,
    });

    raw = (peoplePage?.results || [])
      .filter((p) =>
        type === "Directors"
          ? p.known_for_department === "Directing" ||
            p.known_for_department === "Production"
          : p.known_for_department === "Acting"
      )
      .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
      .map((p) => p.name);
  }

  const suggestions = Array.from(new Set(raw)).slice(0, 6);

  return (
    <div className={className}>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={`Search ${type.toLowerCase()}…`}
        className="w-full border-1 border-siva-300 mb-2 rounded bg-siva-700/50 py-2 px-4 transition-all duration-300 text-sm placeholder-siva-400 focus:outline-none focus:ring-2 focus:ring-bordo-400"
      />

      <div className="grid gap-2 sm:grid-cols-3 h-26 overflow-y-scroll px-10 py-2">
        {suggestions.length > 0
          ? suggestions.map((s) => (
              <TagButton
                key={s}
                label={s}
                active={selected.includes(s)}
                onToggle={() => onSelect(s)}
                className="flex-1 min-w-[6rem]"
              />
            ))
          : deb.length >= 2 && (
              <p className="text-siva-300 text-sm">No matches</p>
            )}
      </div>
    </div>
  );
}
