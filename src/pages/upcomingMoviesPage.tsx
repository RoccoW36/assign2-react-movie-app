import React from "react";
import { useQuery } from "react-query";
import PageTemplate from "../components/templateMovieListPage"; 
import { getUpcomingMovies } from "../api/tmdb-api"; 
import Spinner from "../components/spinner";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";
import MovieFilterUI, { titleFilter, genreFilter } from "../components/movieFilterUI";
import useFiltering from "../hooks/useFiltering";
import { BaseMovieProps } from "../types/interfaces";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const UpcomingMoviesPage: React.FC = () => {
  const { data: movies, error, isLoading, isError } = useQuery<BaseMovieProps[], Error>(
    "upcomingMovies",
    getUpcomingMovies
  );

  const { filterValues, setFilterValues, filterFunction } = useFiltering([titleFiltering, genreFiltering]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error?.message}</h1>;
  }

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const displayedMovies = movies ? filterFunction(movies) : [];

  return (
    <>
      <PageTemplate
        title="Upcoming Movies"
        movies={displayedMovies}
        action={(movie: BaseMovieProps) => (
          <AddToMustWatchIcon {...movie} />
        )}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues.find((filter) => filter.name === "title")?.value || ""}
        genreFilter={filterValues.find((filter) => filter.name === "genre")?.value || "0"}
        ratingFilter={filterValues.find((filter) => filter.name === "rating")?.value || ""}
        productionCountryFilter={filterValues.find((filter) => filter.name === "production country")?.value || ""}
        sortOption="" //placeholder
      />
    </>
  );
};

export default UpcomingMoviesPage;
