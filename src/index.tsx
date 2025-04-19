import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";

import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage";
import MustWatchMoviesPage from "./pages/mustWatchMoviesPage"; // Import Must Watch Movies page
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from "./components/siteHeader";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import MoviesContextProvider from "./contexts/moviesContext";
import ActorsContextProvider from "./contexts/actorsContext";
import TVShowsContextProvider from "./contexts/tvShowsContext";
import AddMovieReviewPage from "./pages/addMovieReviewPage";
import PopularActorsPage from "./pages/popularActorsPage";
import ActorDetailsPage from "./pages/actorDetailsPage";
import FavouriteActorsPage from "./pages/favouriteActorsPage";
import SearchPage from "./pages/searchPage";
import TVShowsPage from "./pages/TVShowsPage";
import TVShowDetailsPage from "./pages/TVShowDetailsPage";
import FavouriteTVShowsPage from "./pages/favouriteTVShowsPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 600000,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <ActorsContextProvider>
            <TVShowsContextProvider>
              <Routes>
                {/* Home */}
                <Route path="/" element={<HomePage />} />

                {/* Movies */}
                <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
                <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
                <Route path="/movies/mustwatch" element={<MustWatchMoviesPage />} /> {/* Added route */}
                <Route path="/movies/:id" element={<MoviePage />} />

                {/* Reviews */}
                <Route path="/reviews/:id" element={<MovieReviewPage />} />
                <Route path="/reviews/form" element={<AddMovieReviewPage />} />

                {/* Actors */}
                <Route path="/actors" element={<PopularActorsPage />} />
                <Route path="/actors/:id" element={<ActorDetailsPage />} />
                <Route path="/actors/favourites" element={<FavouriteActorsPage />} />

                {/* TV Shows */}
                <Route path="/tv" element={<TVShowsPage />} />
                <Route path="/tv/:id" element={<TVShowDetailsPage />} />
                <Route path="/tv/favourites" element={<FavouriteTVShowsPage />} />

                {/* Search */}
                <Route path="/search" element={<SearchPage />} />

                {/* Catch-all */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </TVShowsContextProvider>
          </ActorsContextProvider>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
