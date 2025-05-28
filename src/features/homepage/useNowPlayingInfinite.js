import { fetchNowPlayingMovies } from "../../services/apiTmdb";
import useInfiniteCategory from "./useInfiniteCategory";

export default function useNowPlayingInfinite() {
  return useInfiniteCategory(["nowPlaying"], (page, signal) =>
    fetchNowPlayingMovies(page, signal)
  );
}
