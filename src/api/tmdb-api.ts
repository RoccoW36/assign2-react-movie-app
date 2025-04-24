const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const fetchData = (url: string) => {
  return fetch(url)
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url}. Response status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("API fetch error:", error);
      throw error;
    });
};

// Movies
export const getMovies = (page: number) =>
  fetchData(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&page=${Math.min(page, 500)}`);

export const getUpcomingMovies = (page: number) =>
  fetchData(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${Math.min(page, 500)}`);

export const getNowPlayingMovies = (page: number) =>
  fetchData(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${Math.min(page, 500)}`);

export const getTopRatedMovies = (page: number) =>
  fetchData(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${Math.min(page, 500)}`);

export const getMovie = (id: string | number) =>
  fetchData(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);

export const getMovieImages = (id: string | number) =>
  fetchData(`${BASE_URL}/movie/${id}/images?api_key=${API_KEY}`).then((json) => json.posters);

export const getMovieReviews = (id: string | number) =>
  fetchData(`${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`).then((json) => json.results);

// Actors
export const getActor = (id: string | number) =>
  fetchData(`${BASE_URL}/person/${id}?api_key=${API_KEY}`);

export const getActorImages = (id: string | number) =>
  fetchData(`${BASE_URL}/person/${id}/images?api_key=${API_KEY}`);

export const getPopularActors = (page: number) =>
  fetchData(`${BASE_URL}/person/popular?api_key=${API_KEY}&language=en-US&page=${Math.min(page, 500)}`);

// TV Shows
export const getTVShows = (page: number) =>
  fetchData(`${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&page=${Math.min(page, 500)}`);

export const getAiringTodayTVShows = (page: number) =>
  fetchData(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}&language=en-US&page=${Math.min(page, 500)}`);

export const getTopRatedTVShows = (page: number = 1) =>
  fetchData(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=${Math.min(page, 500)}`);

export const getTVShow = (id: string | number) =>
  fetchData(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);

export const getTVShowImages = (id: string | number) =>
  fetchData(`${BASE_URL}/tv/${id}/images?api_key=${API_KEY}`).then((json) => json.posters);

export const getTVShowReviews = (id: string | number) =>
  fetchData(`${BASE_URL}/tv/${id}/reviews?api_key=${API_KEY}`).then((json) => json.results);

// Search
export const searchMovies = (query: string) =>
  fetchData(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1`);

export const searchActors = (query: string) =>
  fetchData(`${BASE_URL}/search/person?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1`);

export const searchTVShows = (query: string) =>
  fetchData(`${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US&page=1`);

export const getGenres = () =>
  fetchData(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`);

export const getCountries = () => {
  const url = `${BASE_URL}/configuration/countries?api_key=${API_KEY}&language=en-US`;
  console.log("Countries API URL:", url);
  return fetchData(url).then((data) => {
    console.log("Countries API Response:", data);
    return data;
  });
};
