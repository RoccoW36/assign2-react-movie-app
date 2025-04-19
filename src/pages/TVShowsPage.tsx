import React from "react";
import { useQuery } from "react-query";
import { getTVShows } from "../api/tmdb-api";
import PageTemplate from "../components/templateTVShowListPage";
import Spinner from "../components/spinner";
import Alert from "@mui/material/Alert";
import TVShowCard from "../components/TVShowCard";
import AddToTVShowFavouritesIcon from "../components/cardIcons/addToTVShowFavourites";
import AddToMustWatchTVShowsIcon from "../components/cardIcons/addToMustWatchTVShows";
import Grid from "@mui/material/Grid";
import useFiltering from "../hooks/useFiltering";
import TVShowFilterUI, { titleFilter, genreFilter } from "../components/TVShowFilterUI";
import { DiscoverTVShows, BaseTVShowProps } from "../types/interfaces";
import { usePagination } from "../hooks/usePagination";
import PaginationUI from "../components/PaginationUI";

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
        updateTotalPages(Math.min(data.total_pages, 500)); // Limit to a max of 500 pages
      },
    }
  );

  const tvShows = data ? data.results : [];
  const { filterValues, setFilterValues, filterFunction } = useFiltering([titleFiltering, genreFiltering]);

  if (isLoading) return <Spinner />;
  if (isError) return <Alert severity="error">Failed to load TV Shows: {error.message}</Alert>;

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  const displayedTVShows = filterFunction(tvShows);

  return (
    <>
      <TVShowFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />

      {/* Pagination bar in sticky header */}
      <div style={{ position: "sticky", top: "70px", background: "#fff", zIndex: 1000 }}>
        <PaginationUI
          page={page}
          handlePageChange={handlePageChange}
          totalPages={totalPages}
        />
      </div>

      {/* PageTemplate now passes pagination props */}
      <PageTemplate
        title="Discover TV Shows"
        tvShows={displayedTVShows}
        action={(tvShow: BaseTVShowProps) => (
        <>
        <AddToTVShowFavouritesIcon {...tvShow} />
        <AddToMustWatchTVShowsIcon {...tvShow} />
    </>
  )}
  page={page}
  totalPages={totalPages}
  handlePageChange={handlePageChange}
/>

      <Grid container spacing={4} sx={{ marginTop: 5, padding: "0 20px" }}>
        {displayedTVShows.map((tvShow: BaseTVShowProps) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={tvShow.id}>
            <TVShowCard
              tvShow={tvShow}
              action={(tv: BaseTVShowProps) => (
                <>
                  <AddToTVShowFavouritesIcon {...tv} />
                  <AddToMustWatchTVShowsIcon {...tv} />
                </>
              )}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default TVShowsPage;
