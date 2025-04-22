const BASE = "https://api.themoviedb.org/3";
const APIKEY = import.meta.env.VITE_TMDB_API_KEY;

/**
 * Internal helper – attaches the API‑key + extra params and returns a URL.
 */
function makeUrl(path, params = {}) {
  const url = new URL(`${BASE}/${path.replace(/^\//, "")}`);
  url.searchParams.set("api_key", APIKEY);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  return url;
}

/**
 * Internal helper – fetch + basic error handling.
 */
async function fetchJson(url, abortSignal) {
  const res = await fetch(url, { signal: abortSignal });
  if (!res.ok) {
    const msg = `TMDB error ${res.status}: ${res.statusText}`;
    throw new Error(msg);
  }
  return res.json();
}

/* --------------------------------------------------------------------------
   Endpoints
   -------------------------------------------------------------------------- */
export function searchMovies(query, page = 1, abortSignal) {
  return fetchJson(
    makeUrl("search/movie", {
      query,
      page,
      include_adult: false,
      language: "en-US",
    }),
    abortSignal
  );
}

export function fetchPopularMovies(page = 1, abortSignal) {
  return fetchJson(
    makeUrl("movie/popular", { page, language: "en-US" }),
    abortSignal
  );
}

export function fetchMovieDetails(movieId, abortSignal) {
  return fetchJson(
    makeUrl(`movie/${movieId}`, {
      append_to_response: "credits,videos,images",
      language: "en-US",
    }),
    abortSignal
  );
}

export function fetchTrending(window = "week", abortSignal) {
  return fetchJson(makeUrl(`trending/movie/${window}`), abortSignal);
}

/* --------------------------------------------------------------------------
   ▸ Image helpers (poster / backdrop)
   -------------------------------------------------------------------------- */
const IMG_BASE = "https://image.tmdb.org/t/p";

/**
 * Build a poster URL (sizes: 92, 154, 185, 342, 500, 780, original)
 */
export const poster = (path, size = 342) =>
  path ? `${IMG_BASE}/w${size}${path}` : null;

/**
 * Build a backdrop URL (sizes: 300, 780, 1280, original)
 */
export const backdrop = (path, size = 780) =>
  path ? `${IMG_BASE}/w${size}${path}` : null;

/* --------------------------------------------------------------------------
   ▸ Usage example (React‑Query):
   --------------------------------------------------------------------------
   import { useQuery } from "@tanstack/react-query";
   import { searchMovies } from "../services/apiTmdb";

   const { data } = useQuery(["search", q], ({ signal }) =>
     searchMovies(q, 1, signal)
   );
-------------------------------------------------------------------------- */

/**
 * Search for a person by name.
 * e.g. useQuery(["persons", q], ({ signal }) => searchPeople(q, 1, signal))
 */
export function searchPeople(query, page = 1, abortSignal) {
  return fetchJson(
    makeUrl("search/person", {
      query,
      page,
      include_adult: false,
      language: "en-US",
    }),
    abortSignal
  );
}

/**
 * Fetch detailed person info (bio, profile_path, etc.).
 * append_to_response can include movie_credits, combined_credits, images, etc.
 */
export function fetchPersonDetails(personId, abortSignal) {
  return fetchJson(
    makeUrl(`person/${personId}`, {
      append_to_response: "movie_credits,combined_credits,images",
      language: "en-US",
    }),
    abortSignal
  );
}

/**
 * Build a profile image URL (available sizes: 45, 185, 632, original)
 */
export const profileImage = (path, size = 185) =>
  path ? `${IMG_BASE}/w${size}${path}` : null;
