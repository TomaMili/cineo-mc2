import axios from "axios";

// 1) Kreiramo instancu s baznim URL‑om i zadanim parametrima
const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "e303e64f81fcc0803e597e9d36e813d3",
    language: "en-US",
  },
});

// 2) Export funkcija za različite endpoint‑e

/**
 * Dohvati popularne filmove
 * @param {number} page
 * @returns Promise<{ page:number, results: Array, total_pages:number, total_results:number }>
 */
export function fetchPopularMovies(page = 1) {
  return tmdb
    .get("/movie/popular", { params: { page } })
    .then((res) => res.data);
}

/**
 * Search filmova po nazivu
 * @param {string} query
 * @param {number} page
 * @returns Promise<…>
 */
export function searchMovies(query, page = 1) {
  return tmdb
    .get("/search/movie", { params: { query, page } })
    .then((res) => res.data);
}

/**
 * Dohvati detalje o jednom filmu
 * @param {number} movieId
 * @returns Promise<…>
 */
export function fetchMovieDetails(movieId) {
  return tmdb.get(`/movie/${movieId}`).then((res) => res.data);
}
