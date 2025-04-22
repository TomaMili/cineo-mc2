// src/features/profile/RecentlyWatched.jsx
import React from "react";
import { useQueries } from "@tanstack/react-query";
import { fetchMovieDetails } from "../../services/apiTmdb";
import MovieCard from "../../ui/MovieCard";

const RECENT_IDS = [858, 743, 200, 349]; // example TMDB IDs

export default function RecentlyWatched() {
  // fire off one query per ID
  const results = useQueries({
    queries: RECENT_IDS.map((id) => ({
      queryKey: ["movie", id],
      queryFn: ({ signal }) => fetchMovieDetails(id, signal),
      staleTime: 1000 * 60 * 5,
    })),
  });

  return (
    <section className="max-w-6xl mx-auto px-6 mt-12 text-white">
      <h3 className="text-2xl font-bold mb-6">RECENTLY WATCHED</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {results.map((q) => {
          if (q.isLoading || q.isError) return null; // skip until ready
          return (
            <MovieCard
              key={q.data.id}
              movie={q.data}
              onClick={() => {
                /* navigate to /movie/{q.data.id} */
              }}
              hideActions={true} // hide watch‑later/bookmark icons
            />
          );
        })}
      </div>
    </section>
  );
}
