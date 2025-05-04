import { fetchTopRatedMovies } from "../../services/apiTmdb";
import useInfiniteCategory from "./useInfiniteCategory";

export default function useInfiniteTopRated() {
  return useInfiniteCategory("top-rated", fetchTopRatedMovies);
}
