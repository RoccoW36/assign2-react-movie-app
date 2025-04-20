import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import MovieFilterUI from "../components/movieFilterUI";
import RemoveFromMustWatchIcon from "../components/cardIcons/removeFromMustWatch";

const MustWatchMoviesPage: React.FC = () => {
  const { mustWatch: movieIds } = useContext(MoviesContext);

  const [filters, setFilters] = React.useState({
    title: "",
    genre: "0",
    runtime: "",
    productionCountry: "",
    releaseDateFrom: "",
    releaseDateTo: "",
    rating: "",
    language: "",
  });

  const mustWatchMovieQueries = useQueries(
    movieIds.map((movieId) => ({
      queryKey: ["movie", movieId],
      queryFn: () => getMovie(movieId.toString()),
    }))
  );

  const isLoading = mustWatchMovieQueries.some((m) => m.isLoading);

  if (isLoading) {
    return <Spinner />;
  }

  const allMustWatchMovies = mustWatchMovieQueries
    .map((q) => q.data)
    .filter(Boolean);

  const applyFilters = (movies: any[]) => {
    return movies.filter((movie) => {
      const matchesTitle =
        filters.title === "" || movie.title.toLowerCase().includes(filters.title.toLowerCase());
      const matchesGenre =
        filters.genre === "0" ||
        movie.genres.some((genre: any) => genre.id.toString() === filters.genre);
      const matchesRuntime =
        !filters.runtime ||
        (movie.runtime && (
          filters.runtime === "short" ? movie.runtime < 90 :
          filters.runtime === "medium" ? movie.runtime >= 90 && movie.runtime <= 120 :
          filters.runtime === "long" ? movie.runtime > 120 : true
        ));
      const matchesProductionCountry =
        !filters.productionCountry ||
        (movie.production_countries?.length &&
          movie.production_countries.some((country: any) => country.iso_3166_1 === filters.productionCountry));
      const matchesReleaseDate =
        (!filters.releaseDateFrom || !filters.releaseDateTo) ||
        (new Date(movie.release_date) >= new Date(filters.releaseDateFrom) &&
          new Date(movie.release_date) <= new Date(filters.releaseDateTo));
      const matchesRating =
        !filters.rating || (movie.vote_average && movie.vote_average >= Number(filters.rating));
      const matchesLanguage =
        filters.language === "" || movie.original_language === filters.language;

      return (
        matchesTitle &&
        matchesGenre &&
        matchesRuntime &&
        matchesProductionCountry &&
        matchesReleaseDate &&
        matchesRating &&
        matchesLanguage
      );
    });
  };

  const displayedMovies = applyFilters(allMustWatchMovies);

  const handleFilterChange = (type: string, value: string | null) => {
    setFilters({ ...filters, [type]: value });
  };

  const resetFilters = () => {
    setFilters({
      title: "",
      genre: "0",
      runtime: "",
      productionCountry: "",
      releaseDateFrom: "",
      releaseDateTo: "",
      rating: "",
      language: "",
    });
  };

  return (
    <>
      <PageTemplate
        title="Must-Watch Movies"
        movies={displayedMovies}
        action={(movie) => <RemoveFromMustWatchIcon {...movie} />}
      />
      {displayedMovies.length === 0 ? (
        <h1>No must-watch movies found</h1>
      ) : (
        <MovieFilterUI
          onFilterValuesChange={handleFilterChange}
          titleFilter={filters.title}
          genreFilter={filters.genre}
          runtimeFilter={filters.runtime}
          productionCountryFilter={filters.productionCountry}
          releaseDateFromFilter={filters.releaseDateFrom}
          releaseDateToFilter={filters.releaseDateTo}
          ratingFilter={filters.rating}
          languageFilter={filters.language}
        />
      )}
      <button
        onClick={resetFilters}
        style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}
      >
        Reset Filters
      </button>
    </>
  );
};

export default MustWatchMoviesPage;
