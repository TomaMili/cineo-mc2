import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify-icon/react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import useDebounce from "../../hooks/useDebounce";
import { searchMovies } from "../../services/apiTmdb";

const POSTER_BASE = "https://image.tmdb.org/t/p/w92"; // 92px posters

export default function SearchBar({ className = "" }) {
  const navigate = useNavigate();
  const location = useLocation();

  const inputRef = useRef(null);

  const [expanded, setExpanded] = useState(false);
  const [query, setQuery] = useState("");

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

  /* Collapse on escape */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    if (expanded) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded]);

  useEffect(() => {
    close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname + location.search]);

  return (
    <motion.div
      className={`relative ${className}`}
      animate={{ width: expanded ? "40%" : "3.5rem" }} /* 14px * 3.5 = 56px */
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
    >
      {!expanded && (
        <button
          onClick={open}
          className="w-14 h-14    flex items-center justify-center rounded-full cursor-pointer hover:bg-black/20  "
        >
          <Icon
            icon="jam:search"
            width="36"
            height="36"
            className="text-white stroke-black stroke-[0.5] "
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
            onBlur={() => !query && close() /* blur cancels if empty */}
            className="w-full h-14 pl-16 pr-12 rounded-full bg-black/70 text-lg text-siva-100 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-bordo-400"
          />
          <Icon
            icon="jam:search"
            width="32"
            height="32"
            className="absolute left-5 top-1/2 -translate-y-1/2 text-siva-100/75 pointer-events-none"
          />
          <Icon
            icon="mdi:close"
            width="22"
            height="22"
            onClick={close}
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer hover:opacity-80"
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
            className="absolute left-0 top-[calc(100%+0.5rem)] w-full max-h-[32rem] overflow-auto bg-[#0e1512]/95 backdrop-blur-lg rounded-lg shadow-2xl text-siva-100 z-50"
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
                    <span className="text-xs text-siva-100/50 ml-2 mt-0.5">
                      {movie.release_date?.slice(0, 4) || "—"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm mt-1">
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
                    <span className="text-xs text-siva-100/50 ml-1">
                      {(movie.vote_average / 2).toFixed(1)}/5
                    </span>
                  </div>
                  <p className="text-sm text-siva-100/70 line-clamp-2 mt-1">
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
    </motion.div>
  );
}
