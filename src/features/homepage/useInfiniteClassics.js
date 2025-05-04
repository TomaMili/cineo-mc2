import { fetchClassicMovies } from "../../services/apiTmdb";
import useInfiniteCategory from "./useInfiniteCategory";

export default function useInfiniteClassics() {
  return useInfiniteCategory("classics", fetchClassicMovies);
}
