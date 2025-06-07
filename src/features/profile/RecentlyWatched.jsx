import MovieCard from "../../ui/MovieCard";
import { useRecentlyWatched } from "../watched/useWatched";
import { useCurrentUser } from "../../hooks/useAuth";

export default function RecentlyWatched() {
  const { profile } = useCurrentUser();
  const userId = profile?.id;

  const { data: movies = [], isLoading } = useRecentlyWatched(userId, 4);

  if (isLoading) return null;

  return (
    <section className="sm:max-w-6xl mx-auto mt-22 pb-10 text-siva-100">
      <h3 className="text-2xl sm:text-3xl font-normal mb-4 sm:mb-6 ml-4 sm:ml-9">
        RECENTLY WATCHED
      </h3>

      <div className="flex justify-around gap-3 px-4 sm:px-0 lg:gap-6 flex-nowrap sm:flex-wrap overflow-auto">
        {movies.map((m) => (
          <div>
            <MovieCard key={m.id} movie={m} hideActions />
          </div>
        ))}
      </div>
    </section>
  );
}
