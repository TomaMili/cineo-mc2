// src/services/apiTmdb.js
import supabase from "./supabase";

const BASE = "https://api.themoviedb.org/3";
const APIKEY = import.meta.env.VITE_TMDB_API_KEY;

function makeUrl(path, params = {}) {
  const url = new URL(`${BASE}/${path.replace(/^\//, "")}`);
  url.searchParams.set("api_key", APIKEY);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  return url;
}

async function fetchJson(url, signal) {
  const res = await fetch(url, { signal });
  if (!res.ok) {
    throw new Error(`TMDB ${res.status}: ${res.statusText}`);
  }
  return res.json();
}

/* ─────────── generic helpers ─────────── */

export function searchMovies(query, page = 1, signal) {
  return fetchJson(
    makeUrl("search/movie", {
      query,
      page,
      include_adult: false,
      language: "en-US",
    }),
    signal
  );
}

export function searchPeople(query, page = 1, signal) {
  return fetchJson(
    makeUrl("search/person", {
      query,
      page,
      include_adult: false,
      language: "en-US",
    }),
    signal
  );
}

export function fetchPersonDetails(id, signal) {
  return fetchJson(
    makeUrl(`person/${id}`, {
      append_to_response: "movie_credits,combined_credits,images",
      language: "en-US",
    }),
    signal
  );
}

export function fetchMovieDetails(id, signal) {
  return fetchJson(
    makeUrl(`movie/${id}`, {
      append_to_response: "credits,videos,images",
      language: "en-US",
    }),
    signal
  );
}

/* ─────────── paged TMDB lists ─────────── */

export const fetchPopularMovies = (page = 1, signal) =>
  fetchJson(makeUrl("movie/popular", { page, language: "en-US" }), signal);

export const fetchTopRatedMovies = (page = 1, signal) =>
  fetchJson(makeUrl("movie/top_rated", { page, language: "en-US" }), signal);

export const fetchNowPlayingMovies = (page = 1, signal) =>
  fetchJson(makeUrl("movie/now_playing", { page, language: "en-US" }), signal);

export const fetchUpcomingMovies = (page = 1, signal) =>
  fetchJson(makeUrl("movie/upcoming", { page, language: "en-US" }), signal);

export const fetchTrendingMovies = (
  window = "week", // "day" | "week"
  page = 1,
  signal
) =>
  fetchJson(
    makeUrl(`trending/movie/${window}`, { page, language: "en-US" }),
    signal
  );

/* classics = release date ≤ 1980-01-01 */
export const fetchClassicMovies = (page = 1, signal) =>
  fetchJson(
    makeUrl("discover/movie", {
      "primary_release_date.lte": "1980-01-01",
      sort_by: "vote_count.desc",
      include_adult: false,
      page,
      language: "en-US",
    }),
    signal
  );

/* discover by genre or cast/crew ----------------------------------------- */

export const discoverByGenre = (genreId, page = 1, signal) =>
  fetchJson(
    makeUrl("discover/movie", {
      with_genres: genreId,
      sort_by: "popularity.desc",
      include_adult: false,
      page,
      language: "en-US",
    }),
    signal
  );

export const discoverMovies = ({ cast, crew, genres, page = 1 }, signal) =>
  fetchJson(
    makeUrl("discover/movie", {
      with_cast: cast || undefined,
      with_crew: crew || undefined,
      with_genres: genres || undefined,
      include_adult: false,
      page,
      language: "en-US",
    }),
    signal
  );

/* misc single-movie helpers --------------------------------------------- */

export const fetchMovieRecommendations = (id, page = 1, s) =>
  fetchJson(
    makeUrl(`movie/${id}/recommendations`, { page, language: "en-US" }),
    s
  );

export const fetchMovieReviews = (id, page = 1, s) =>
  fetchJson(makeUrl(`movie/${id}/reviews`, { page, language: "en-US" }), s);

export const fetchMovieCredits = (id, s) =>
  fetchJson(makeUrl(`movie/${id}/credits`, { language: "en-US" }), s);

export const fetchMovieVideos = (id, s) =>
  fetchJson(makeUrl(`movie/${id}/videos`, { language: "en-US" }), s);

export const fetchMovieProviders = (id, region = "HR", s) =>
  fetchJson(makeUrl(`movie/${id}/watch/providers`), s).then(
    (j) => j.results?.[region] ?? null
  );

export const fetchAllMovieProviders = (region = "HR", s) =>
  fetchJson(makeUrl("watch/providers/movie", { watch_region: region }), s).then(
    (j) => j.results || []
  );

/* genres & utility ------------------------------------------------------- */

export const fetchGenres = (s) =>
  fetchJson(makeUrl("genre/movie/list", { language: "en-US" }), s).then(
    (j) => j.genres
  );

export function findDirector(credits) {
  const crew = credits?.crew ?? credits?.credits?.crew ?? credits ?? [];
  return crew.find((p) => p.job === "Director") || null;
}

/* upsert movie in Supabase --------------------------------------------- */
export async function upsertMovieFromTmdb(tmdbMovie) {
  const {
    id: api_id,
    title,
    overview,
    release_date,
    poster_path,
    backdrop_path,
  } = tmdbMovie;

  const record = {
    api_id,
    title,
    overview,
    release_date: release_date ? Number(release_date) : null,
    poster: poster_path,
    backdrop: backdrop_path,
  };

  const { error } = await supabase
    .from("movies")
    .upsert(record, { onConflict: "api_id" });
  if (error) throw error;
}

/* image helpers ---------------------------------------------------------- */

const IMG_BASE = "https://image.tmdb.org/t/p";

export const poster = (p, size = 780) =>
  p ? `${IMG_BASE}/w${size}${p}` : null;
export const backdrop = (p, size = 1280) =>
  p ? `${IMG_BASE}/w${size}${p}` : null;
export const profileImage = (p, size = 632) =>
  p ? `${IMG_BASE}/h${size}${p}` : null;
