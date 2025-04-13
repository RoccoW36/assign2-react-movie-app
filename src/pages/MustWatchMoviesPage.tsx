import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI from "../components/movieFilterUI";
import RemoveFromMustWatchIcon from "../components/cardIcons/removeFromMustWatch";

const MustWatchMoviesPage: React.FC = () => {
  const { mustWatch: movieIds } = useContext(MoviesContext);

  const { filterValues, setFilterValues, filterFunction } = useFiltering([
    { name: "title", value: "", condition: (movie, value) => movie?.title?.toLowerCase().includes(value.toLowerCase()) },
    { name: "genre", value: "0", condition: (movie, value) => value === "0" || (movie.genre_ids && movie.genre_ids.includes(Number(value))) },
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

  const allMustWatchMovies = mustWatchMovieQueries.map((q) => q.data).filter(Boolean);

  console.log("Movies BEFORE filtering:", allMustWatchMovies);
  console.log("Filter values:", filterValues);

  const displayedMovies = allMustWatchMovies.length > 0 ? filterFunction(allMustWatchMovies) : allMustWatchMovies;

  console.log("Movies AFTER filtering:", displayedMovies); 

  const changeFilterValues = (type: string, value: string) => {
    setFilterValues(prevFilters =>
      prevFilters.map(filter => (filter.name === type ? { ...filter, value } : filter))
    );
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
        titleFilter={filterValues.find(f => f.name === "title")?.value || ""}
        genreFilter={filterValues.find(f => f.name === "genre")?.value || "0"}
      />
    </>
  );
};

export default MustWatchMoviesPage;
