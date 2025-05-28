import { fetchTrendingMovies } from "../../services/apiTmdb";
import useInfiniteCategory from "./useInfiniteCategory";

export default function useTrendingInfinite(timeWindow = "week") {
  return useInfiniteCategory(["trending", timeWindow], (page, signal) =>
    fetchTrendingMovies("week", page, signal).then((json) => ({
      ...json,
      page,
    }))
  );
}
