import { useQuery } from "@tanstack/react-query";
import { fetchMovieRecommendations } from "../../services/apiTmdb";
import { useWatched } from "../watched/useWatched";

export default function useRecommendationsForUser(userId) {
  const { data: watched = [] } = useWatched(userId);

  return useQuery({
    queryKey: ["recommendations", userId],
    enabled: userId != null && watched.length > 0,
    queryFn: async ({ signal }) => {
      // 1 Get each watched movie's recs
      const recLists = await Promise.all(
        watched.map((m) =>
          fetchMovieRecommendations(m.id, 1, signal).then(
            (json) => json.results
          )
        )
      );
      const raw = recLists.flat();

      // 2 Build a set of watched titles to filter out sequels/rematches
      const watchedTitles = watched.map((m) =>
        m.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, " ")
          .trim()
      );

      // 3 Filter out anything whose title includes a watched title
      const filtered = raw.filter((rec) => {
        const t = rec.title.toLowerCase();
        return !watchedTitles.some((wt) => t.includes(wt));
      });

      // 4 Count occurrences & dedupe
      const map = new Map();
      filtered.forEach((rec) => {
        const existing = map.get(rec.id);
        if (existing) {
          existing.count += 1;
        } else {
          map.set(rec.id, { ...rec, count: 1 });
        }
      });

      // 5 Convert back to array and sort by (count desc, popularity desc)
      const sorted = Array.from(map.values()).sort((a, b) => {
        if (b.count !== a.count) return b.count - a.count;
        // fallback: TMDB popularity (or use vote_average)
        return (b.popularity || 0) - (a.popularity || 0);
      });

      return sorted;
    },
  });
}
