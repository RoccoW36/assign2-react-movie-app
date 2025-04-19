import React, { useContext } from "react";
import PageTemplate from "../components/templateTVShowListPage";
import { TVShowsContext } from "../contexts/tvShowsContext";
import { useQueries } from "react-query";
import { getTVShow } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import TVShowFilterUI, { titleFilter, genreFilter } from "../components/TVShowFilterUI";
import RemoveFromFavouritesTVShow from "../components/cardIcons/removeFromTVShowFavourites";
import WriteReview from "../components/cardIcons/writeReview";

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

  const allFavourites = favouriteTVShowQueries
    .map((q) => q.data)
    .filter((tvShow) => tvShow !== undefined);

  const displayedTVShows = filterFunction(allFavourites);

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const resetFilters = () => {
    changeFilterValues("title", "");
    changeFilterValues("genre", "0");
  };

  return (
    <>
      <PageTemplate
        title="Favourite TV Shows"
        tvShows={displayedTVShows}
        action={(tvShow) => (
          <>
            <RemoveFromFavouritesTVShow tvShow={tvShow} />
            <WriteReview tvShowId={tvShow.id} />
          </>
        )}
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
      {/* Optional Reset Button */}
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
