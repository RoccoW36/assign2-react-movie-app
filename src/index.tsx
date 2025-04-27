import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";

import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage";
import MustWatchMoviesPage from "./pages/mustWatchMoviesPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import NowPlayingMoviesPage from "./pages/nowplayingMoviesPage";  
import TopRatedMoviesPage from "./pages/topratedMoviesPage";  
import AiringTodayTVShowsPage from "./pages/airingtodayTVShowsPage";
import TopRatedTVShowsPage from "./pages/topratedTVShowsPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from "./components/siteHeader";
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
import MustWatchTVShowsPage from "./pages/mustWatchTVShowsPage";
import AddTVShowReviewPage from "./pages/addTVShowReviewPage";
import FantasyMoviesPage from "./pages/fantasyMoviesPage";
import { FantasyMoviesContextProvider } from "./contexts/fantasyMoviesContext";
import AddFantasyMoviePage from "./pages/addFantasyMoviePage";
import FantasyMovieDetailsPage from "./pages/fantasyMovieDetailsPage";
import AuthContextProvider from "./contexts/authContext";

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
            <FantasyMoviesContextProvider>
            <AuthContextProvider>
              <Routes>

                <Route path="/" element={<HomePage />} />

                {/* Movie Routes */}
                <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
                <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
                <Route path="/movies/nowplaying" element={<NowPlayingMoviesPage />} />  
                <Route path="/movies/toprated" element={<TopRatedMoviesPage />} />  
                <Route path="/movies/mustwatch" element={<MustWatchMoviesPage />} />
                <Route path="/movies/:id" element={<MoviePage />} />

                {/* Review Routes */}
                <Route path="/reviews/:id" element={<MovieReviewPage />} />
                <Route path="/reviews/form" element={<AddMovieReviewPage />} />
                <Route path="/tvreviews/form" element={<AddTVShowReviewPage />} />

                {/* Actor Routes */}
                <Route path="/actors" element={<PopularActorsPage />} />
                <Route path="/actors/:id" element={<ActorDetailsPage />} />
                <Route path="/actors/favourites" element={<FavouriteActorsPage />} />

                {/* TV Show Routes */}
                <Route path="/tv" element={<TVShowsPage />} />
                <Route path="/tv/airingtoday" element={<AiringTodayTVShowsPage />} />
                <Route path="/tv/toprated" element={<TopRatedTVShowsPage />} />
                <Route path="/tv/:id" element={<TVShowDetailsPage />} />
                <Route path="/tv/favourites" element={<FavouriteTVShowsPage />} />
                <Route path="/tv/mustwatch" element={<MustWatchTVShowsPage />} />

                {/* Search Route */}
                <Route path="/search" element={<SearchPage />} />

                {/* Fantasy Movies Routes */}
                <Route path="/movies/fantasy" element={<FantasyMoviesPage />} />
                <Route path="/movies/fantasy/new" element={<AddFantasyMoviePage />} />
                <Route path="/movies/fantasy/:id" element={<FantasyMovieDetailsPage />} />

                {/* Default Redirect */}
                <Route path="*" element={<Navigate to="/" />} />

              </Routes>
              </AuthContextProvider>
              </FantasyMoviesContextProvider>
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
