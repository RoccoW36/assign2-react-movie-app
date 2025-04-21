import React from "react";
import { useQuery } from "react-query";
import PageTemplate from "../components/templateMovieListPage"; 
import { getUpcomingMovies } from "../api/tmdb-api"; 
import Spinner from "../components/spinner";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";
import MovieFilterUI, { titleFilter, genreFilter } from "../components/movieFilterUI";
import useFiltering from "../hooks/useFiltering";
import { BaseMovieProps } from "../types/interfaces";

const titleFiltering = { name: "title", value: "", condition: titleFilter };
const genreFiltering = { name: "genre", value: "0", condition: genreFilter };
const ratingFiltering = { name: "rating", value: "", condition: (movie: BaseMovieProps, value: string) =>
  value ? movie.vote_average >= Number(value) : true };
const productionCountryFiltering = { name: "production country", value: "", condition: (movie: BaseMovieProps, value: string) =>
  value ? movie.production_country === value : true };

const UpcomingMoviesPage: React.FC = () => {
  const { data, error, isLoading, isError } = useQuery<BaseMovieProps[], Error>(
    "upcomingMovies",
    getUpcomingMovies
  );

  const { filterValues, processCollection, changeFilterValues } = useFiltering([
    titleFiltering,
    genreFiltering,
    ratingFiltering,
    productionCountryFiltering,
  ]);

  if (isLoading) return <Spinner />;
  if (isError) return <h1>Failed to load movies: {error.message}</h1>;

  const displayedMovies = processCollection(data || []);

  return (
    <>
      <PageTemplate
        title="Upcoming Movies"
        movies={displayedMovies}
        action={(movie: BaseMovieProps) => <AddToMustWatchIcon {...movie} />}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues.find((filter) => filter.name === "title")?.value || ""}
        genreFilter={filterValues.find((filter) => filter.name === "genre")?.value || "0"}
        ratingFilter={filterValues.find((filter) => filter.name === "rating")?.value || ""}
        productionCountryFilter={filterValues.find((filter) => filter.name === "production country")?.value || ""}
        sortOption={filterValues.find((filter) => filter.name === "sortOption")?.value || ""}
      />
    </>
  );
};

export default UpcomingMoviesPage;
