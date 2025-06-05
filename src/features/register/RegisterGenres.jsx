import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchGenres } from "../../services/apiTmdb";
import { useRegistrationContext } from "./RegistrationContext";

import { Icon } from "@iconify-icon/react";

const GENRE_ICONS = {
  28: "mdi:sword-cross", // Action
  12: "mdi:map-marker-distance", // Adventure
  16: "mdi:animation-play-outline", // Animation
  35: "mdi:emoticon-excited-outline", // Comedy
  80: "mdi:police-badge-outline", // Crime
  99: "mdi:video-vintage", // Documentary
  18: "mdi:drama-masks", // Drama
  10751: "mdi:home-heart", // Family
  14: "mdi:magic-staff", // Fantasy
  36: "mdi:bank", // History
  27: "mdi:ghost", // Horror
  10402: "mdi:music", // Music
  9648: "mdi:magnify", // Mystery
  10749: "mdi:heart", // Romance
  878: "mdi:atom-variant", // Science‑Fiction
  10770: "mdi:television-classic", // TV‑Movie
  53: "mdi:pulse", // Thriller
  10752: "mdi:tank", // War
  37: "mdi:train", // Western
};

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
    <div
      className="
        flex flex-wrap justify-center gap-4
        max-h-[65vh] overflow-auto
        px-1 py-2
      "
    >
      {all.map((g) => {
        const selected = genres.includes(g.id);
        return (
          <button
            key={g.id}
            onClick={() => toggle(g.id)}
            className={`
              flex flex-col items-center gap-2 p-3 rounded-lg border
              cursor-pointer transition-all duration-300 ease-out
              hover:scale-103 hover:bg-bordo-500/20
              ${
                selected
                  ? "border-bordo-500 bg-bordo-500/20"
                  : "border-gray-600"
              } w-3/7 sm:w-1/3 lg:w-1/4 xl:w-1/5     
            `}
            aria-pressed={selected}
          >
            <span
              className={`
                flex items-center justify-center w-10 h-10 rounded-full text-2xl
                transition-colors
                ${selected ? "bg-bordo-500 text-white" : "bg-white text-black"}
              `}
            >
              <Icon
                icon={GENRE_ICONS[g.id] || "mdi:movie-open-outline"}
                width={24}
                height={24}
              />
            </span>
            {/* label */}
            <span className="text-center text-sm font-medium tracking-wide">
              {g.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
