/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify-icon/react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useDebounce from "../../hooks/useDebounce";
import { searchMovies } from "../../services/apiTmdb";

const POSTER_BASE = "https://image.tmdb.org/t/p/w92";

export default function SearchBar({ className = "" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const inputRef = useRef(null);

  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState("");

  const [isMobile, setIsMobile] = useState(
    window.matchMedia("(max-width: 788px)").matches
  );
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 788px)");
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (expanded) {
      document.documentElement.style.overflowX = "hidden";
    } else {
      document.documentElement.style.overflowX = "";
    }
    return () => {
      document.documentElement.style.overflowX = "";
    };
  }, [expanded]);

  const open = () => {
    setExpanded(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  };
  const close = () => {
    setExpanded(false);
    setQuery("");
  };

  const [debounced, setDebounced] = useState("");
  useDebounce(() => setDebounced(query.trim()), 350, [query]);

  const { data, isFetching } = useQuery({
    queryKey: ["tmdb-search", debounced],
    queryFn: ({ signal }) => searchMovies(debounced, 1, signal),
    enabled: expanded && debounced.length > 0,
    staleTime: 1000 * 60 * 5,
  });

  const results = (data?.results ?? [])
    .filter((m) => m.poster_path)
    .slice(0, 3);

  const onSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    navigate(`/browse?query=${encodeURIComponent(trimmed)}`);
    close();
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    if (expanded) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded]);

  useEffect(() => {
    close();
  }, [location.pathname, location.search]);

  const iconLeftClass = expanded && isMobile ? "left-4" : "left-5";
  const iconRightClass = "right-4";

  const computedWidth = expanded
    ? isMobile
      ? "calc(100% - 2rem)"
      : "min(40rem, 100vw - 2rem)"
    : "3.5rem";

  const positionClass = "fixed top-4 right-4";

  return (
    <div
      className={`${positionClass} z-10 origin-right transition-[width] duration-300 ease-out ${className}`}
      style={{ width: computedWidth }}
    >
      {!expanded && (
        <button
          onClick={open}
          className="w-full h-14 flex items-center justify-center rounded-full cursor-pointer hover:bg-black/20 transition"
        >
          <Icon
            icon="jam:search"
            width="36"
            height="36"
            className="text-white"
          />
        </button>
      )}

      {expanded && (
        <form onSubmit={onSubmit} className="relative">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search movies, shows…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onBlur={() => !query && close()}
            className={`
              w-full
              h-14
              ${isMobile ? "bg-black" : "bg-black/70"}
              text-lg text-white placeholder-white/40
              rounded-full
              pl-16 pr-12
              focus:outline-none focus:ring-2 focus:ring-bordo-400
            `}
          />

          <Icon
            icon="jam:search"
            width="32"
            height="32"
            className={`absolute ${iconLeftClass} top-1/2 -translate-y-1/2
                        text-white/75 pointer-events-none`}
          />
          <Icon
            icon="mdi:close"
            width="22"
            height="22"
            onClick={close}
            className={`absolute ${iconRightClass} top-1/2 -translate-y-1/2
                        cursor-pointer hover:opacity-80 text-white/80`}
          />
        </form>
      )}

      <AnimatePresence>
        {expanded && results.length > 0 && query && (
          <motion.ul
            key="dropdown"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-[calc(100%+0.5rem)]
                       w-full max-h-[32rem] overflow-auto
                       bg-[#0e1512]/95 backdrop-blur-lg
                       rounded-lg shadow-2xl text-white z-50"
          >
            {results.map((movie) => (
              <li
                key={movie.id}
                className="flex gap-3 p-4 hover:bg-white/5 cursor-pointer"
                onMouseDown={() => navigate(`/movie/${movie.id}`)}
              >
                {movie.poster_path ? (
                  <img
                    src={`${POSTER_BASE}${movie.poster_path}`}
                    alt="poster"
                    className="w-16 h-24 object-cover rounded-md flex-shrink-0"
                  />
                ) : (
                  <div className="w-16 h-24 bg-white/10 rounded-md" />
                )}

                <div className="flex flex-col flex-1">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold leading-snug line-clamp-1">
                      {movie.title}
                    </h3>
                    <span className="text-xs text-white/50 ml-2 mt-0.5">
                      {movie.release_date?.slice(0, 4) || "—"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm mt-1 text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon
                        key={i}
                        icon={
                          movie.vote_average / 2 >= i + 1
                            ? "mdi:star"
                            : movie.vote_average / 2 >= i + 0.5
                            ? "mdi:star-half-full"
                            : "mdi:star-outline"
                        }
                        width="16"
                        height="16"
                      />
                    ))}
                    <span className="text-xs text-white/50 ml-1">
                      {(movie.vote_average / 2).toFixed(1)}/5
                    </span>
                  </div>
                  <p className="text-sm text-white/70 line-clamp-2 mt-1">
                    {movie.overview}
                  </p>
                </div>
              </li>
            ))}
            <li className="text-center border-t border-white/10">
              <button
                className="w-full py-3 font-medium hover:bg-white/5 cursor-pointer"
                onMouseDown={() =>
                  navigate(`/browse?query=${encodeURIComponent(query.trim())}`)
                }
              >
                Show More
              </button>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>

      {isFetching && expanded && (
        <Icon
          icon="mingcute:loading-fill"
          width="20"
          height="20"
          className="absolute right-6 top-1/2 -translate-y-1/2 animate-spin text-siva-100/70"
        />
      )}
    </div>
  );
}
