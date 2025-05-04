import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGenres } from "../../services/apiTmdb";
import { useRegistrationContext } from "./RegistrationContext";

export default function RegisterGenres() {
  const { data: all = [] } = useQuery({
    queryKey: ["tmdb-genres"],
    queryFn: ({ signal }) => fetchGenres(signal),
  });
  const { data, update } = useRegistrationContext();
  const { genres } = data;

  function toggle(id) {
    update({
      genres: genres.includes(id)
        ? genres.filter((g) => g !== id)
        : [...genres, id],
    });
  }

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("step-valid", { detail: genres.length > 0 })
    );
  }, [genres]);

  return (
    <div className="grid grid-cols-3 gap-3">
      {all.map((g) => (
        <button
          key={g.id}
          onClick={() => toggle(g.id)}
          className={`p-3 rounded border transition-all duration-300 cursor-pointer hover:bg-bordo-500/20  ${
            genres.includes(g.id)
              ? "border-bordo-500 bg-bordo-500/20"
              : "border-gray-600"
          }`}
        >
          {g.name}
        </button>
      ))}
    </div>
  );
}
