import React from "react";
import PageTemplate from "../components/templateTVShowListPage";  
import { getTVShows } from "../api/tmdb-api";  
import useFiltering from "../hooks/useFiltering";  
import TVShowFilterUI, { titleFilter, genreFilter } from "../components/TVShowFilterUI"; 
import { DiscoverTVShows, BaseTVShowProps } from "../types/interfaces";  
import { useQuery } from "react-query";  
import Spinner from "../components/spinner";  
import AddToTVShowFavourites from "../components/cardIcons/addToTVShowFavourites"; 
import AddToMustWatchTVShows from "../components/cardIcons/addToMustWatchTVShows";

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
  const { data, error, isLoading, isError } = useQuery<DiscoverTVShows, Error>("discoverTVShows", getTVShows);

  const { filterValues, setFilterValues, filterFunction } = useFiltering([titleFiltering, genreFiltering]);

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error?.message}</h1>;

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const tvShows = data ? data.results : [];
  const displayedTVShows = filterFunction(tvShows);

  return (
    <>
<PageTemplate
  title="Discover TV Shows"
  tvShows={displayedTVShows}
  action={(tvShow: BaseTVShowProps) => (
    <>
      <AddToTVShowFavourites {...tvShow} /> 
      <AddToMustWatchTVShows {...tvShow} />
    </>
  )}
/>
      <TVShowFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};

export default TVShowsPage;
