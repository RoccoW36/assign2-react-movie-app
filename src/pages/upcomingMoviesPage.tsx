import React, { useEffect } from "react";
import { useQuery } from "react-query";
import PageTemplate from "../components/templateMovieListPage"; 
import { getUpcomingMovies } from "../api/tmdb-api"; 
import Spinner from "../components/spinner";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatch";
import MovieFilterUI, { titleFilter, genreFilter } from "../components/movieFilterUI";
import PaginationUI from "../components/PaginationUI";
import { DiscoverMovies, BaseMovieProps } from "../types/interfaces";
import { usePagination } from "../hooks/usePagination";
import useFiltering from "../hooks/useFiltering";
import { applySort } from "../util";

const titleFiltering = { name: "title", value: "", condition: titleFilter };
const genreFiltering = { name: "genre", value: "0", condition: genreFilter };
const ratingFiltering = { name: "rating", value: "", condition: (movie: BaseMovieProps, value: string) =>
  value ? movie.vote_average >= Number(value) : true };
const productionCountryFiltering = { name: "production country", value: "", condition: (movie: BaseMovieProps, value: string) =>
  value ? movie.production_country.some(country => country.name === value) : true, 
};
const sortOptionFiltering = {
  name: "sortOption",
  value: "",
  condition: () => true,
};

const UpcomingMoviesPage: React.FC = () => {
  const { page, handlePageChange, totalPages, updateTotalPages } = usePagination({});

  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
    ["upcomingMovies", page],
    () => getUpcomingMovies(page),
    {
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    updateTotalPages(Math.min(data?.total_pages || 1, 500));
  }, [data?.total_pages, updateTotalPages]);

  const movies = data ? data.results : [];

  const uniqueMovies = Array.from(new Set(movies.map((movie) => movie.id))).map(
    (id) => movies.find((movie) => movie.id === id)
  ) as BaseMovieProps[];

  const { filterValues, processCollection, changeFilterValues } = useFiltering([
    titleFiltering,
    genreFiltering,
    ratingFiltering,
    productionCountryFiltering,
    sortOptionFiltering,
  ]);

  const sortOption = filterValues.find((f) => f.name === "sortOption")?.value || "";

  const displayedMovies = applySort(processCollection(uniqueMovies), sortOption);

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
        title="Upcoming Movies"
        movies={displayedMovies}
        action={(movie: BaseMovieProps) => <AddToMustWatchIcon {...movie} />}
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

export default UpcomingMoviesPage;
