import { fetchTrendingMovies } from "../../services/apiTmdb";
import useInfiniteCategory from "./useInfiniteCategory";

export default function useTrendingInfinite() {
  return useInfiniteCategory("trending-week", (page, signal) =>
    fetchTrendingMovies("week", signal).then((json) => ({ ...json, page }))
  );
}
