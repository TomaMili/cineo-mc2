import MovieCard from "../../ui/MovieCard";
import { useRecentlyWatched } from "../../hooks/useWatched";

export default function RecentlyWatched() {
  const userId = 1;
  const { data: movies = [], isLoading } = useRecentlyWatched(userId, 4);

  if (isLoading) return null;

  return (
    <section className="max-w-6xl mx-auto mt-12 pb-10 text-white">
      <h3 className="text-3xl font-normal mb-6 ml-9">RECENTLY WATCHED</h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 justify-items-center">
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} hideActions />
        ))}
      </div>
    </section>
  );
}
