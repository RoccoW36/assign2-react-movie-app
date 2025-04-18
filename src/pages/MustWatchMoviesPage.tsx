import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, { titleFilter, favouritesgenreFilter } from "../components/movieFilterUI";
import RemoveFromMustWatchIcon from "../components/cardIcons/removeFromMustWatch";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};

const genreFiltering = {
  name: "genre",
  value: "0",
  condition: favouritesgenreFilter,
};

const MustWatchMoviesPage: React.FC = () => {
  const { mustWatch: movieIds } = useContext(MoviesContext);

  const { filterValues, setFilterValues, filterFunction } = useFiltering([
    titleFiltering,
    genreFiltering,
  ]);

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

  const displayedMovies = filterFunction(allMustWatchMovies);

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const resetFilters = () => {
    changeFilterValues("title", "");
    changeFilterValues("genre", "0");
  };

  return (
    <>
      <PageTemplate
        title="Must-Watch Movies"
        movies={displayedMovies}
        action={(movie) => <RemoveFromMustWatchIcon {...movie} />}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues.find((f) => f.name === "title")?.value || ""}
        genreFilter={filterValues.find((f) => f.name === "genre")?.value || "0"}
      />
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
