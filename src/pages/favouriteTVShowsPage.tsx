import React, { useContext, useState } from "react";
import PageTemplate from "../components/templateTVShowListPage";
import { TVShowsContext } from "../contexts/tvShowsContext";
import { useQueries } from "react-query";
import { getTVShow } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import TVShowFilterUI, { titleFilter, genreFilter } from "../components/TVShowFilterUI";
import RemoveFromFavouritesTVShow from "../components/cardIcons/removeFromTVShowFavourites";
import WriteReview from "../components/cardIcons/writeReview";
import { BaseTVShowProps } from "../types/interfaces";

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

const FavouriteTVShowsPage: React.FC = () => {
  const { favourites: tvShowIds } = useContext(TVShowsContext);

  const { filterValues, setFilterValues, filterFunction } = useFiltering([titleFiltering, genreFiltering]);

  const favouriteTVShowQueries = useQueries(
    tvShowIds.map((id) => ({
      queryKey: ["tvShow", id],
      queryFn: () => getTVShow(id.toString()),
    }))
  );

  const isLoading = favouriteTVShowQueries.some((q) => q.isLoading);

  if (isLoading) {
    return <Spinner />;
  }

  const allFavourites: BaseTVShowProps[] = favouriteTVShowQueries
    .map((q) => q.data)
    .filter((tvShow): tvShow is BaseTVShowProps => tvShow !== undefined);

  const displayedTVShows = filterFunction(allFavourites);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(displayedTVShows.length / itemsPerPage);

  const paginateTVShows = displayedTVShows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const changeFilterValues = (type: string, value: string) => {
    const updatedFilters =
      type === "title"
        ? [{ name: "title", value }, filterValues[1]]
        : [filterValues[0], { name: "genre", value }];
    setFilterValues(updatedFilters);
  };

  const resetFilters = () => {
    changeFilterValues("title", "");
    changeFilterValues("genre", "0");
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    if (value >= 1 && value <= totalPages) {
      setCurrentPage(value);
    }
  };

  return (
    <>
      <PageTemplate
        title="Favourite TV Shows"
        tvShows={paginateTVShows}
        action={(tvShow) => (
          <>
            <RemoveFromFavouritesTVShow tvShow={tvShow} />
            <WriteReview tvShowId={tvShow.id} />
          </>
        )}
        page={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange} 
      />
      {displayedTVShows.length === 0 ? (
        <h1>No favourite TV shows selected</h1>
      ) : (
        <TVShowFilterUI
          onFilterValuesChange={changeFilterValues}
          titleFilter={filterValues[0].value}
          genreFilter={filterValues[1].value}
        />
      )}
      <button
        onClick={resetFilters}
        style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}
      >
        Reset Filters
      </button>
    </>
  );
};

export default FavouriteTVShowsPage;
