import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetails } from "../services/apiTmdb";

// same dummy ids as watch-later
const DUMMY_IDS = [
  497, 550, 299534, 278, 24428, 424, 240, 13, 27205, 155, 680, 603, 157336,
];

function randomDateWithinLastWeek() {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 7);
  const d = new Date(now);
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

export default function useWatched() {
  return useQuery({
    queryKey: ["watched"],
    queryFn: async ({ signal }) => {
      const details = await Promise.all(
        DUMMY_IDS.map((id) => fetchMovieDetails(id, signal))
      );
      // attach watchedDate and userRating
      return details.map((m) => ({
        ...m,
        watchedDate: randomDateWithinLastWeek(),
        userRating: Math.random() < 0.5 ? Math.ceil(Math.random() * 5) : null,
      }));
    },
    staleTime: 1000 * 60 * 5,
  });
}
