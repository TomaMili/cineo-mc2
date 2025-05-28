import { fetchClassicMovies } from "../../services/apiTmdb";
import useInfiniteCategory from "./useInfiniteCategory";

export default function useInfiniteClassics() {
  return useInfiniteCategory(["classics"], (page, signal) =>
    fetchClassicMovies(page, signal)
  );
}
