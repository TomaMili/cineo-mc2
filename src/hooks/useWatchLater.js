import { useQuery } from "@tanstack/react-query";
import { fetchMovieDetails } from "../services/apiTmdb";

const DUMMY_IDS = [
  497, 550, 299534, 278, 24428, 424, 240, 13, 27205, 155, 680, 603, 157336,
];

export default function useWatchLater() {
  return useQuery({
    queryKey: ["watchLater"],
    queryFn: async ({ signal }) => {
      // fetch details for each movie id in parallel
      const results = await Promise.all(
        DUMMY_IDS.map((id) => fetchMovieDetails(id, signal))
      );
      return results;
    },
    staleTime: 1000 * 60 * 5,
  });
}
