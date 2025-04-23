import { useQueries } from "@tanstack/react-query";
import { fetchMovieDetails } from "../../services/apiTmdb";
import MovieCard from "../../ui/MovieCard";
import { useNavigate } from "react-router-dom";

const RECENT_IDS = [858, 743, 200, 349]; // example TMDB IDs

export default function RecentlyWatched() {
  const results = useQueries({
    queries: RECENT_IDS.map((id) => ({
      queryKey: ["movie", id],
      queryFn: ({ signal }) => fetchMovieDetails(id, signal),
      staleTime: 1000 * 60 * 5,
    })),
  });

  const navigate = useNavigate();

  return (
    <section className="max-w-6xl mx-auto mt-12 pb-10 text-white">
      <h3 className="text-3xl font-normal mb-6 ml-9">RECENTLY WATCHED</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 justify-items-center">
        {results.map((movie) => {
          if (movie.isLoading || movie.isError) return null; // skip until ready
          return (
            <MovieCard
              key={movie.data.id}
              movie={movie.data}
              onClick={() => navigate(`/movie/${movie.data.id}`)}
              hideActions={true} // hide watch‑later/bookmark icons
            />
          );
        })}
      </div>
    </section>
  );
}
