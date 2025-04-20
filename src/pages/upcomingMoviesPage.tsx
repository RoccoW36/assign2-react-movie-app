import React from "react";
import { useQuery } from "react-query";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import MovieFilterUI from "../components/movieFilterUI";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";

const UpcomingMoviesPage: React.FC = () => {
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

  const { data: movies, error, isLoading, isError } = useQuery("upcomingMovies", getUpcomingMovies);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError && error instanceof Error) {
    return <h1>{error.message}</h1>;
  }

  const applyFilters = (movies: any[]) => {
    return movies.filter((movie) => {
      const matchesTitle =
        filters.title === "" || movie.title.toLowerCase().includes(filters.title.toLowerCase());
      const matchesGenre =
        filters.genre === "0" ||
        (movie.genres && movie.genres.some((genre: any) => genre.id.toString() === filters.genre));
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

  const displayedMovies = movies ? applyFilters(movies) : [];

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
        title="Upcoming Movies"
        movies={displayedMovies}
        action={(movie: any) => <AddToMustWatchIcon {...movie} />}
      />
      {displayedMovies.length === 0 ? (
        <h1>No upcoming movies found</h1>
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

export default UpcomingMoviesPage;
