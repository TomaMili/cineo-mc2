// src/features/homepage/useRecommendationsForUser.js
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

  // build a quick lookup for things you’ve already seen
  const watchedIds = new Set(watched.map((m) => m.id));

  return useQuery({
    // re-fetch whenever your watched list length changes
    queryKey: ["recommendations", userId, watched.length],
    enabled: !!userId,
    queryFn: async ({ signal }) => {
      let pool = [];

      if (watched.length > 0) {
        // ── 1) When you have watched movies, get their TMDB recs ──
        const recLists = await Promise.all(
          watched.map((m) =>
            fetchMovieRecommendations(m.id, 1, signal).then((r) => r.results)
          )
        );
        pool = recLists.flat();
      } else {
        // ── 2) Fallback: use favorite actors & genres ────────────
        const favGenres = profile?.favourite_genres ?? [];
        const favActors = profile?.favourite_actors ?? [];

        // A) Top 10 credits per actor, by vote_average
        const actorLists = await Promise.all(
          favActors.map(async (actor) => {
            // if actor is a name (string), search TMDB for their ID
            let personId = actor;
            if (typeof actor === "string") {
              const result = await searchPeople(actor, 1, signal);
              personId = result.results?.[0]?.id;
            }
            if (!personId) return [];
            // now fetch details and pick top‐rated credits
            const person = await fetchPersonDetails(personId, signal);
            return (person.combined_credits.cast || [])
              .filter((c) => c.release_date)
              .sort((a, b) => b.vote_average - a.vote_average)
              .slice(0, 10);
          })
        );

        // B) Top 10 films per genre, by vote_average (only well-rated)
        const genreLists = await Promise.all(
          favGenres.map((genreId) =>
            discoverMovies({ genres: genreId, page: 1 }, signal).then((res) =>
              res.results
                .filter((m) => m.vote_count >= 50) // skip obscure low-vote
                .sort((a, b) => b.vote_average - a.vote_average)
                .slice(0, 10)
            )
          )
        );

        pool = [...actorLists.flat(), ...genreLists.flat()];
      }

      // ── 3) filter out any you’ve already watched ─────────────
      const filtered = pool.filter((m) => !watchedIds.has(m.id));

      // ── 4) count occurrences & dedupe ───────────────────────
      const map = new Map();
      filtered.forEach((m) => {
        const existing = map.get(m.id);
        if (existing) existing.count += 1;
        else map.set(m.id, { ...m, count: 1 });
      });

      // ── 5) sort by (count desc) then (popularity desc) ──────
      return Array.from(map.values()).sort((a, b) => {
        if (b.count !== a.count) return b.count - a.count;
        return (b.popularity || 0) - (a.popularity || 0);
      });
    },
  });
}
