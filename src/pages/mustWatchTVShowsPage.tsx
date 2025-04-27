import React, { useContext } from "react";
import PageTemplate from "../components/templateTVShowListPage";
import { TVShowsContext } from "../contexts/tvShowsContext";
import { useQueries } from "react-query";
import { getTVShow } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import TVShowFilterUI, { titleFilter, favouritesGenreFilter } from "../components/TVShowFilterUI";
import RemoveFromMustWatchTVShowIcon from "../components/cardIcons/removeFromMustWatchTVShows";
import { BaseTVShowProps } from "../types/interfaces";

const titleFiltering = { name: "title", value: "", condition: titleFilter };
const genreFiltering = { name: "genre", value: "0", condition: favouritesGenreFilter };
const ratingFiltering = { name: "rating", value: "", condition: (tvShow: BaseTVShowProps, value: string) =>
  value ? tvShow.vote_average >= Number(value) : true };
const productionCountryFiltering = { name: "production country", value: "", condition: (tvShow: BaseTVShowProps, value: string) =>
  value ? tvShow.production_country.some(country => country.name === value) : true,
};

const MustWatchTVShowsPage: React.FC = () => {
  const { mustWatch: tvShowIds } = useContext(TVShowsContext);

  const { filterValues, processCollection, changeFilterValues } = useFiltering([
    titleFiltering,
    genreFiltering,
    ratingFiltering,
    productionCountryFiltering,
  ]);

  const mustWatchTVShowQueries = useQueries(
    tvShowIds.map((id) => ({
      queryKey: ["tvShow", id],
      queryFn: () => getTVShow(id.toString()),
    }))
  );

  const isLoading = mustWatchTVShowQueries.some((q) => q.isLoading);
  if (isLoading) return <Spinner />;

  const allMustWatchTVShows = mustWatchTVShowQueries.map((q) => q.data).filter((tvShow) => tvShow !== undefined);
  const displayedTVShows = processCollection(allMustWatchTVShows);

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
        title="Must-Watch TV Shows"
        tvShows={displayedTVShows}
        action={(tvShow) => <RemoveFromMustWatchTVShowIcon {...tvShow} />}
      />
      <TVShowFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues.find((filter) => filter.name === "title")?.value || ""}
        genreFilter={filterValues.find((filter) => filter.name === "genre")?.value || "0"}
        ratingFilter={filterValues.find((filter) => filter.name === "rating")?.value || ""}
        productionCountryFilter={filterValues.find((filter) => filter.name === "production country")?.value || ""}
        sortOption={filterValues.find((filter) => filter.name === "sortOption")?.value || ""}
      />
      <button onClick={resetFilters} style={{ marginTop: "20px", padding: "10px 20px", cursor: "pointer" }}>
        Reset Filters
      </button>
    </>
  );
};

export default MustWatchTVShowsPage;
