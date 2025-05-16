import { useQuery } from "@tanstack/react-query";
import {
  fetchMovieRecommendations,
  discoverMovies,
  fetchPersonDetails,
  searchPeople,
} from "../../services/apiTmdb";
import { useWatched } from "../watched/useWatched";
import { useCurrentUser } from "../../hooks/useAuth";

export default function useRecommendationsForUser(userId) {
  const { profile } = useCurrentUser();
  const { data: watched = [] } = useWatched(userId);

  const watchedIds = new Set(watched.map((m) => m.id));

  return useQuery({
    queryKey: ["recommendations", userId, watched.length],
    enabled: !!userId,
    queryFn: async ({ signal }) => {
      let pool = [];

      if (watched.length > 0) {
        const recLists = await Promise.all(
          watched.map((m) =>
            fetchMovieRecommendations(m.id, 1, signal).then((r) => r.results)
          )
        );
        pool = recLists.flat();
      } else {
        const favGenres = profile?.favourite_genres ?? [];
        const favActors = profile?.favourite_actors ?? [];

        const actorLists = await Promise.all(
          favActors.map(async (actor) => {
            let personId = actor;
            if (typeof actor === "string") {
              const result = await searchPeople(actor, 1, signal);
              personId = result.results?.[0]?.id;
            }
            if (!personId) return [];
            const person = await fetchPersonDetails(personId, signal);
            return (person.combined_credits.cast || [])
              .filter((c) => c.release_date)
              .sort((a, b) => b.vote_average - a.vote_average)
              .slice(0, 10);
          })
        );

        const genreLists = await Promise.all(
          favGenres.map((genreId) =>
            discoverMovies({ genres: genreId, page: 1 }, signal).then((res) =>
              res.results
                .filter((m) => m.vote_count >= 50)
                .sort((a, b) => b.vote_average - a.vote_average)
                .slice(0, 10)
            )
          )
        );

        pool = [...actorLists.flat(), ...genreLists.flat()];
      }

      const filtered = pool.filter((m) => !watchedIds.has(m.id));

      const map = new Map();
      filtered.forEach((m) => {
        const existing = map.get(m.id);
        if (existing) existing.count += 1;
        else map.set(m.id, { ...m, count: 1 });
      });

      return Array.from(map.values()).sort((a, b) => {
        if (b.count !== a.count) return b.count - a.count;
        return (b.popularity || 0) - (a.popularity || 0);
      });
    },
  });
}
