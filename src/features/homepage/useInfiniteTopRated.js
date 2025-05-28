import { fetchTopRatedMovies } from "../../services/apiTmdb";
import useInfiniteCategory from "./useInfiniteCategory";

export default function useInfiniteTopRated() {
  return useInfiniteCategory(["topRated"], (page, signal) =>
    fetchTopRatedMovies(page, signal)
  );
}
