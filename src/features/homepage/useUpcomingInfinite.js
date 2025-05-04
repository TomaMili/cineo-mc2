import { fetchUpcomingMovies } from "../../services/apiTmdb";
import useInfiniteCategory from "./useInfiniteCategory";

export default function useUpcomingInfinite() {
  return useInfiniteCategory("upcoming", fetchUpcomingMovies);
}
