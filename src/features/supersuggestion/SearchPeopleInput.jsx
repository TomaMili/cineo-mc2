import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useDebounce from "../../hooks/useDebounce";
import { searchPeople } from "../../services/apiTmdb";
import TagButton from "../../ui/TagButton";

export default function SearchPeopleInput({ visible, onSelect, selected }) {
  const [q, setQ] = useState("");
  const [debounced, setDeb] = useState("");

  /* your hook fires a callback → write value into local state */
  useDebounce(() => setDeb(q.trim()), 300, [q]);

  const { data } = useQuery({
    queryKey: ["peopleSearch", debounced],
    queryFn: ({ signal }) => searchPeople(debounced, 1, signal),
    enabled: visible && debounced.length >= 2,
    staleTime: 300_000,
  });

  if (!visible) return null;

  return (
    <>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search by name…"
        className="w-full mb-3 rounded bg-siva-700/60 py-2.5 px-4 text-sm
                   placeholder-siva-300 focus:outline-none
                   focus:ring-2 focus:ring-bordo-400"
      />

      {(data?.results ?? []).slice(0, 5).map((p) => (
        <TagButton
          key={p.id}
          label={p.name}
          active={selected.includes(p.name)}
          onToggle={() => onSelect(p.name)}
        />
      ))}
    </>
  );
}
