import React from "react";
import { useQuery } from "react-query";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import Spinner from "../components/spinner";
import MovieFilterUI, { titleFilter, genreFilter } from "../components/movieFilterUI";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import PaginationUI from "../components/PaginationUI";
import { DiscoverMovies, BaseMovieProps } from "../types/interfaces";
import { usePagination } from "../hooks/usePagination";
import useFiltering from "../hooks/useFiltering";

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

const ratingFiltering = {
  name: "rating",
  value: "",
  condition: (movie: BaseMovieProps, value: string) =>
    value ? movie.vote_average >= Number(value) : true,
};

const productionCountryFiltering = {
  name: "production country",
  value: "",
  condition: (movie: BaseMovieProps, value: string) =>
    value ? movie.production_country === value : true,
};

const sortMovies = (movies: BaseMovieProps[], sortOption: string): BaseMovieProps[] => {
  console.log("Sort logic: Sorting movies with value:", sortOption);
  if (sortOption === "vote_average.desc") {
    return [...movies].sort((a, b) => b.vote_average - a.vote_average);
  }
  if (sortOption === "vote_average.asc") {
    return [...movies].sort((a, b) => a.vote_average - b.vote_average);
  }
  if (sortOption === "release_date.desc") {
    return [...movies].sort((a, b) => Date.parse(b.release_date) - Date.parse(a.release_date));
  }
  if (sortOption === "release_date.asc") {
    return [...movies].sort((a, b) => Date.parse(a.release_date) - Date.parse(b.release_date));
  }
  return movies;
};

const HomePage: React.FC = () => {
  const { page, handlePageChange, totalPages, updateTotalPages } = usePagination({
    initialPage: 1,
    initialTotalPages: 1,
  });

  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
    ["discover", page],
    () => getMovies(page),
    {
      keepPreviousData: true,
      onSuccess: (data) => {
        updateTotalPages(Math.min(data.total_pages, 500));
      },
    }
  );

  const movies = data ? data.results : [];

  console.log("Fetched movies:", movies);

  const uniqueMovies = Array.from(new Set(movies.map((movie) => movie.id))).map(
    (id) => movies.find((movie) => movie.id === id)
  );

  console.log("Unique movies:", uniqueMovies);

  const { filterValues, processCollection, changeFilterValues } = useFiltering([
    titleFiltering,
    genreFiltering,
    ratingFiltering,
    productionCountryFiltering,
  ]);

  console.log("Filter values:", filterValues);

  const sortOption = filterValues.find((filter) => filter.name === "sortOption")?.value || "";
  console.log("Selected sort option:", sortOption);

  const displayedMovies = sortMovies(
    processCollection(uniqueMovies),
    sortOption 
  );

  console.log("Displayed movies after filtering and sorting:", displayedMovies);

  if (isLoading) return <Spinner />;
  if (isError) return <h1>Failed to load movies: {error.message}</h1>;

  const onBack = () => {
    if (page > 1) {
      handlePageChange({} as React.ChangeEvent<unknown>, page - 1);
    }
  };

  const onForward = () => {
    if (page < totalPages) {
      handlePageChange({} as React.ChangeEvent<unknown>, page + 1);
    }
  };

  return (
    <>
      <PageTemplate
        title="Discover Movies"
        movies={displayedMovies}
        action={(movie: BaseMovieProps) => <AddToFavouritesIcon {...movie} />}
        onBack={onBack}
        onForward={onForward}
      />
      <PaginationUI
        page={page}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues.find((filter) => filter.name === "title")?.value || ""}
        genreFilter={filterValues.find((filter) => filter.name === "genre")?.value || "0"}
        ratingFilter={filterValues.find((filter) => filter.name === "rating")?.value || ""}
        productionCountryFilter={filterValues.find((filter) => filter.name === "production country")?.value || ""}
        sortOption={sortOption}
      />
    </>
  );
};

export default HomePage;
