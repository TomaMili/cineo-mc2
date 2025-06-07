import MovieCard from "../../ui/MovieCard";
import { useRecentlyWatched } from "../watched/useWatched";
import { useCurrentUser } from "../../hooks/useAuth";

export default function RecentlyWatched() {
  const { profile } = useCurrentUser();
  const userId = profile?.id;

  const { data: movies = [], isLoading } = useRecentlyWatched(userId, 5);

  if (isLoading) return null;

  return (
    <section className="sm:w-xl md:w-3xl xl:w-5xl sm:mx-auto mt-22 pb-10 text-siva-100 px-4 sm:px-0">
      <h3 className="text-2xl sm:text-3xl font-normal mb-4 sm:mb-6 ">
        RECENTLY WATCHED
      </h3>

      <div className="flex flex-nowrap gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory xl:grid xl:gap-4 xl:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] xl:overflow-x-visible xl:snap-none min-w-full">
        {movies.map((m) => (
          <div className="flex-none snap-start w-36 xl:flex-auto xl:w-auto">
            <MovieCard key={m.id} movie={m} hideActions />
          </div>
        ))}
      </div>
    </section>
  );
}
