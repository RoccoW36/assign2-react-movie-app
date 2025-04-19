import React from "react";
import { useQuery } from "react-query";
import { getMovies } from "../api/tmdb-api"; 
import PageTemplate from "../components/templateMovieListPage"; 
import Spinner from "../components/spinner"; 
import Alert from "@mui/material/Alert"; 
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

  const uniqueMovies = Array.from(new Set(movies.map((movie) => movie.id))).map(
    (id) => movies.find((movie) => movie.id === id)
  );

  const { filterValues, setFilterValues, filterFunction } = useFiltering([titleFiltering, genreFiltering]);

  if (isLoading) return <Spinner />;
  if (isError) return <Alert severity="error">Failed to load movies: {error.message}</Alert>;

  const displayedMovies = filterFunction(uniqueMovies);

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

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  return (
    <>
      <PaginationUI
        page={page}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
      />
      <PageTemplate
        title="Discover Movies"
        movies={displayedMovies}
        action={(movie: BaseMovieProps) => <AddToFavouritesIcon {...movie} />}
        onBack={onBack}
        onForward={onForward}
      />

      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};

export default HomePage;
