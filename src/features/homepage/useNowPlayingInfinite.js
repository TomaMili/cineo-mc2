import { fetchNowPlaying } from "../../services/apiTmdb";
import useInfiniteCategory from "./useInfiniteCategory";

export default function useNowPlayingInfinite() {
  return useInfiniteCategory("now-playing", fetchNowPlaying);
}
