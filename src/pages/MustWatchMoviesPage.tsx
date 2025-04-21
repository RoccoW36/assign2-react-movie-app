import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, { titleFilter, favouritesgenreFilter } from "../components/movieFilterUI";
import RemoveFromMustWatchIcon from "../components/cardIcons/removeFromMustWatch";
import { BaseMovieProps } from "../types/interfaces";

const titleFiltering = { name: "title", value: "", condition: titleFilter };
const genreFiltering = { name: "genre", value: "0", condition: favouritesgenreFilter };
const ratingFiltering = { name: "rating", value: "", condition: (movie: BaseMovieProps, value: string) =>
  value ? movie.vote_average >= Number(value) : true };
const productionCountryFiltering = { name: "production country", value: "", condition: (movie: BaseMovieProps, value: string) =>
  value ? movie.production_country.includes(value) : true };

const MustWatchMoviesPage: React.FC = () => {
  const { mustWatch: movieIds } = useContext(MoviesContext);

  const { filterValues, processCollection, changeFilterValues } = useFiltering([
    titleFiltering,
    genreFiltering,
    ratingFiltering,
    productionCountryFiltering,
  ]);

  const mustWatchMovieQueries = useQueries(
    movieIds
      .map((movieId) => {
        const validMovieId = Number(movieId);
        if (isNaN(validMovieId) || validMovieId <= 0) {
          console.error("Invalid movie ID detected:", movieId);
          return null;
        }
        return {
          queryKey: ["movie", validMovieId],
          queryFn: async () => {
            try {
              return await getMovie(validMovieId.toString());
            } catch (error) {
              console.error(`Failed to fetch movie with ID ${validMovieId}:`, error);
              return undefined;
            }
          },
        };
      })
      .filter((query) => query !== null)
  );

  const isLoading = mustWatchMovieQueries.some((q) => q.isLoading);
  if (isLoading) return <Spinner />;

  const allMustWatchMovies = mustWatchMovieQueries.map((q) => q.data).filter(Boolean);
  const sortOption = filterValues.find((filter) => filter.name === "sortOption")?.value || "";
  const displayedMovies = processCollection(allMustWatchMovies);

  const resetFilters = () => {
    changeFilterValues("title", "");
    changeFilterValues("genre", "0");
    changeFilterValues("rating", "");
    changeFilterValues("production country", "");
    changeFilterValues("sortOption", "");
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
        titleFilter={filterValues.find((filter) => filter.name === "title")?.value || ""}
        genreFilter={filterValues.find((filter) => filter.name === "genre")?.value || "0"}
        ratingFilter={filterValues.find((filter) => filter.name === "rating")?.value || ""}
        productionCountryFilter={filterValues.find((filter) => filter.name === "production country")?.value || ""}
        sortOption={sortOption}
      />
      <button onClick={resetFilters} style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}>
        Reset Filters
      </button>
    </>
  );
};

export default MustWatchMoviesPage;