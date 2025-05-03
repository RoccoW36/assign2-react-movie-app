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
import FantasyMoviesPage from "./pages/fantasyMoviesPage";
import { FantasyMoviesContextProvider } from "./contexts/fantasyMoviesContext";
import AddFantasyMoviePage from "./pages/addFantasyMoviePage";
import FantasyMovieDetailsPage from "./pages/fantasyMovieDetailsPage";
import AuthContextProvider from "./contexts/authContext";
import LoginPage from "./pages/loginPage";
import SignUpPage from "./pages/signUpPage";
import PrivateRoute from "./components/privateRoute"; 
import MyMovieReviewsPage from "./pages/myMovieReviewsPage";
import { MovieReviewsProvider } from "./contexts/moviereviewsContext";

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
      <AuthContextProvider>
        <BrowserRouter>
          <SiteHeader />
          <MoviesContextProvider>
            <ActorsContextProvider>
              <TVShowsContextProvider>
                <FantasyMoviesContextProvider>
                  <MovieReviewsProvider>
                    <Routes>
                      <Route path="/" element={<HomePage />} />

                      {/* Public Movie Routes */}
                      <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
                      <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
                      <Route path="/movies/nowplaying" element={<NowPlayingMoviesPage />} />
                      <Route path="/movies/toprated" element={<TopRatedMoviesPage />} />
                      <Route path="/movies/mustwatch" element={<MustWatchMoviesPage />} />
                      <Route path="/movies/:id" element={<MoviePage />} />

                      {/* Public Review Routes */}
                      <Route path="/reviews/:id" element={<MovieReviewPage />} />

                      {/* Public Actor Routes */}
                      <Route path="/actors" element={<PopularActorsPage />} />
                      <Route path="/actors/:id" element={<ActorDetailsPage />} />
                      <Route path="/actors/favourites" element={<FavouriteActorsPage />} />

                      {/* Public TV Show Routes */}
                      <Route path="/tv" element={<TVShowsPage />} />
                      <Route path="/tv/airingtoday" element={<AiringTodayTVShowsPage />} />
                      <Route path="/tv/toprated" element={<TopRatedTVShowsPage />} />
                      <Route path="/tv/:id" element={<TVShowDetailsPage />} />
                      <Route path="/tv/favourites" element={<FavouriteTVShowsPage />} />
                      <Route path="/tv/mustwatch" element={<MustWatchTVShowsPage />} />

                      {/* Public Search Route */}
                      <Route path="/search" element={<SearchPage />} />

                      {/* Fantasy Movies: Publicly Viewable */}
                      <Route path="/movies/fantasy" element={<FantasyMoviesPage />} />

                      {/* Private Routes: Only signed-in users can access */}
                      <Route path="/movies/fantasy/new" element={<PrivateRoute><AddFantasyMoviePage /></PrivateRoute>} />
                      <Route path="/movies/fantasy/:id" element={<PrivateRoute><FantasyMovieDetailsPage /></PrivateRoute>} />
                      <Route path="/reviews" element={<PrivateRoute><MyMovieReviewsPage /></PrivateRoute>} />
                      <Route path="/reviews/form" element={<PrivateRoute><AddMovieReviewPage /></PrivateRoute>} />

                      {/* Authentication Routes */}
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/signup" element={<SignUpPage />} />

                      {/* Default Redirect */}
                      <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                  </MovieReviewsProvider>
                </FantasyMoviesContextProvider>
              </TVShowsContextProvider>
            </ActorsContextProvider>
          </MoviesContextProvider>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
