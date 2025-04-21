import React from "react";
import { useQuery } from "react-query";
import { getTVShows } from "../api/tmdb-api"; 
import PageTemplate from "../components/templateTVShowListPage"; 
import Spinner from "../components/spinner"; 
import Alert from "@mui/material/Alert"; 
import TVShowFilterUI, { titleFilter, genreFilter } from "../components/TVShowFilterUI"; 
import AddToTVShowFavouritesIcon from "../components/cardIcons/addToTVShowFavourites";
import PaginationUI from "../components/PaginationUI"; 
import { DiscoverTVShows, BaseTVShowProps } from "../types/interfaces"; 
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

const TVShowsPage: React.FC = () => {
  
  const { page, handlePageChange, totalPages, updateTotalPages } = usePagination({
    initialPage: 1,
    initialTotalPages: 1,
  });

  const { data, error, isLoading, isError } = useQuery<DiscoverTVShows, Error>(
    ["discoverTVShows", page],
    () => getTVShows(page),
    {
      keepPreviousData: true,
      onSuccess: (data) => {
        updateTotalPages(Math.min(data.total_pages, 500));
      },
    }
  );

  const tvShows = data ? data.results : [];

  const uniqueTVShows = Array.from(new Set(tvShows.map((tvShow) => tvShow.id))).map(
    (id) => tvShows.find((tvShow) => tvShow.id === id)
  );

  const { filterValues, setFilterValues, filterFunction } = useFiltering([titleFiltering, genreFiltering]);

  if (isLoading) return <Spinner />;
  if (isError) return <Alert severity="error">Failed to load TV shows: {error.message}</Alert>;

  const displayedTVShows = filterFunction(uniqueTVShows);

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
      <PageTemplate
        title="Discover TV Shows"
        tvShows={displayedTVShows}
        action={(tvShow: BaseTVShowProps) => (
          <AddToTVShowFavouritesIcon {...tvShow} />
        )}
        onBack={onBack} 
        onForward={onForward} 
      />
      <PaginationUI
        page={page}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
      />
      <TVShowFilterUI
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

export default TVShowsPage;
