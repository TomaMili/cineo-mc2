const BASE = "https://api.themoviedb.org/3";
const APIKEY = import.meta.env.VITE_TMDB_API_KEY;

function makeUrl(path, params = {}) {
  const url = new URL(`${BASE}/${path.replace(/^\//, "")}`);
  url.searchParams.set("api_key", APIKEY);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  return url;
}

async function fetchJson(url, abortSignal) {
  const res = await fetch(url, { signal: abortSignal });
  if (!res.ok) {
    const msg = `TMDB error ${res.status}: ${res.statusText}`;
    throw new Error(msg);
  }
  return res.json();
}

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

const IMG_BASE = "https://image.tmdb.org/t/p";

// 92, 154, 185, 342, 500, 780, original
export const poster = (path, size = 780) =>
  path ? `${IMG_BASE}/w${size}${path}` : null;

// 300, 780, 1280, original
export const backdrop = (path, size = 1280) =>
  path ? `${IMG_BASE}/w${size}${path}` : null;

// 45, 185, 632, original
export const profileImage = (path, size = 632) =>
  path ? `${IMG_BASE}/h${size}${path}` : null;

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

export function fetchPersonDetails(personId, abortSignal) {
  return fetchJson(
    makeUrl(`person/${personId}`, {
      append_to_response: "movie_credits,combined_credits,images",
      language: "en-US",
    }),
    abortSignal
  );
}

export function fetchMovieRecommendations(movieId, page = 1, abortSignal) {
  return fetchJson(
    makeUrl(`movie/${movieId}/recommendations`, {
      page,
      language: "en-US",
    }),
    abortSignal
  );
}

export function fetchMovieReviews(movieId, page = 1, abortSignal) {
  return fetchJson(
    makeUrl(`movie/${movieId}/reviews`, { page, language: "en-US" }),
    abortSignal
  );
}

export const fetchMovieCredits = (movieId, abortSignal) =>
  fetchJson(
    makeUrl(`movie/${movieId}/credits`, { language: "en-US" }),
    abortSignal
  );

export const fetchMovieVideos = (movieId, abortSignal) =>
  fetchJson(
    makeUrl(`movie/${movieId}/videos`, { language: "en-US" }),
    abortSignal
  );

export function findDirector(credits) {
  if (!credits) return null;

  const crewArray = Array.isArray(credits)
    ? credits
    : credits.crew ?? credits?.credits?.crew ?? [];

  return crewArray.find((person) => person.job === "Director") || null;
}

export function fetchMovieProviders(movieId, region = "HR", abortSignal) {
  return fetchJson(
    makeUrl(`movie/${movieId}/watch/providers`),
    abortSignal
  ).then((json) => json.results?.[region] ?? null);
}

export function fetchAllMovieProviders(region = "HR", signal) {
  // This hits the same “watch/providers/movie” endpoint, but without tying it to a movie ID
  return fetchJson(
    makeUrl(`watch/providers/movie?watch_region=${region}`),
    signal
  ).then((json) => {
    // json.results is an array of providers
    return json.results || [];
  });
}

export async function fetchGenres(signal) {
  const json = await fetchJson(
    makeUrl("genre/movie/list", { language: "en-US" }),
    signal
  );
  return json.genres;
}

export function discoverMovies({ cast, crew, genres, page = 1 }, signal) {
  const params = { page, language: "en-US", include_adult: false };
  if (cast) params.with_cast = cast;
  if (crew) params.with_crew = crew;
  if (genres) params.with_genres = genres;
  return fetchJson(makeUrl("discover/movie", params), signal);
}
