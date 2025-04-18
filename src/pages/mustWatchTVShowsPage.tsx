import React, { useContext } from "react";
import PageTemplate from "../components/templateTVShowListPage";
import { TVShowsContext } from "../contexts/tvShowsContext";
import { useQueries } from "react-query";
import { getTVShow } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import TVShowFilterUI, { titleFilter, genreFilter } from "../components/TVShowFilterUI";
import RemoveFromMustWatchTVShows from "../components/cardIcons/removeFromMustWatchTVShows";

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

const MustWatchTVShowsPage: React.FC = () => {
  const { mustWatch: tvShowIds } = useContext(TVShowsContext);

  const { filterValues, setFilterValues, filterFunction } = useFiltering([titleFiltering, genreFiltering]);

  const mustWatchTVShowQueries = useQueries(
    tvShowIds.map((tvShowId) => ({
      queryKey: ["tvShow", tvShowId],
      queryFn: () => getTVShow(tvShowId.toString()),
    }))
  );

  const isLoading = mustWatchTVShowQueries.some((q) => q.isLoading);

  if (isLoading) {
    return <Spinner />;
  }

  const allMustWatchTVShows = mustWatchTVShowQueries
    .map((q) => q.data)
    .filter(Boolean);

  const displayedTVShows = filterFunction(allMustWatchTVShows);

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
        title="Must-Watch TV Shows"
        tvShows={displayedTVShows}
        action={(tvShow) => <RemoveFromMustWatchTVShows {...tvShow} />}
      />
      <TVShowFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues.find((f) => f.name === "title")?.value || ""}
        genreFilter={filterValues.find((f) => f.name === "genre")?.value || "0"}
      />
      <button
        onClick={resetFilters}
        style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}
      >
        Reset Filters
      </button>
    </>
  );
};

export default MustWatchTVShowsPage;
