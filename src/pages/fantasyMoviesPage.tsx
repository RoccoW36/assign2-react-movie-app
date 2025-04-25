import React, { useContext } from "react";
import PageTemplate from "../components/templateFantasyMovieListPage";
import { FantasyMoviesContext } from "../contexts/fantasyMoviesContext";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, { titleFilter, favouritesgenreFilter } from "../components/movieFilterUI";
import { BaseMovieProps } from "../types/interfaces";
import { applySort } from "../util";

const titleFiltering = { name: "title", value: "", condition: titleFilter };
const genreFiltering = { name: "genre", value: "0", condition: favouritesgenreFilter };
const ratingFiltering = { name: "rating", value: "", condition: (movie: BaseMovieProps, value: string) =>
  value ? movie.vote_average >= Number(value) : true };
const productionCountryFiltering = { name: "production country", value: "", condition: (movie: BaseMovieProps, value: string) =>
  value ? movie.production_country.includes(value) : true };
const sortOptionFiltering = {
  name: "sortOption",
  value: "",
  condition: () => true,
};

const FantasyMoviesPage: React.FC = () => {
  const context = useContext(FantasyMoviesContext);
  const movies = context.fantasy;

  const { filterValues, processCollection, changeFilterValues } = useFiltering([
    titleFiltering,
    genreFiltering,
    ratingFiltering,
    productionCountryFiltering,
    sortOptionFiltering,
  ]);

  const sortOption = filterValues.find((filter) => filter.name === "sortOption")?.value || "";
  const sortedMovies = applySort(processCollection(movies), sortOption);

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
        title="Fantasy Movies"
        movies={sortedMovies}
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

export default FantasyMoviesPage;
