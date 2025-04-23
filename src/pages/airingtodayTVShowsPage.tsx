import React from "react";
import { useQuery } from "react-query";
import { getAiringTodayTVShows } from "../api/tmdb-api"; 
import PageTemplate from "../components/templateTVShowListPage"; 
import Spinner from "../components/spinner"; 
import Alert from "@mui/material/Alert"; 
import TVShowFilterUI, { titleFilter, genreFilter } from "../components/TVShowFilterUI"; 
import AddToMustWatchTVShowIcon from "../components/cardIcons/addToMustWatchTVShows";
import PaginationUI from "../components/PaginationUI"; 
import { DiscoverTVShows, BaseTVShowProps } from "../types/interfaces"; 
import { usePagination } from "../hooks/usePagination"; 
import useFiltering from "../hooks/useFiltering"; 

const titleFiltering = { name: "title", value: "", condition: titleFilter };
const genreFiltering = { name: "genre", value: "0", condition: genreFilter };

const AiringTodayTVShowsPage: React.FC = () => {
const { page, handlePageChange, totalPages, updateTotalPages } = usePagination({});

  const { data, error, isLoading, isError } = useQuery<DiscoverTVShows, Error>(
    ["airingTodayTVShows", page],
    () => getAiringTodayTVShows(page),
    {
      keepPreviousData: true,
      onSuccess: (data) => {
        updateTotalPages(Math.min(data.total_pages, 500));
      },
    }
  );

  const tvShows = data?.results ?? [];

  console.log("Fetched airing today TV shows:", tvShows);

  const uniqueTVShows = Array.from(new Set(tvShows.map((tvShow: BaseTVShowProps) => tvShow.id))).map(
    (id) => tvShows.find((tvShow: BaseTVShowProps) => tvShow.id === id)
  );

  console.log("Unique airing today TV shows:", uniqueTVShows);

  const { filterValues, setFilterValues, filterFunction } = useFiltering([titleFiltering, genreFiltering]);

  console.log("Filter values:", filterValues);

  const displayedTVShows = filterFunction(uniqueTVShows);

  console.log("Displayed airing today TV shows after filtering and sorting:", displayedTVShows);

  if (isLoading) return <Spinner />;
  if (isError) return <Alert severity="error">Failed to load TV shows: {error.message}</Alert>;

  const onBack = () => {
    if (page > 1) handlePageChange({} as React.ChangeEvent<unknown>, page - 1);
  };

  const onForward = () => {
    if (page < totalPages) handlePageChange({} as React.ChangeEvent<unknown>, page + 1);
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
        title="Airing Today TV Shows"
        tvShows={displayedTVShows}
        action={(tvShow: BaseTVShowProps) => (
          <AddToMustWatchTVShowIcon {...tvShow} />
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

export default AiringTodayTVShowsPage;
