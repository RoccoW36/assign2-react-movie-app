import React, { useState } from "react";
import FilterCard from "../filterTVShowsCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { BaseTVShowProps, TVShowDetailsProps } from "../../types/interfaces";

export const titleFilter = (tvShow: BaseTVShowProps, value: string): boolean => {
  return tvShow.name.toLowerCase().search(value.toLowerCase()) !== -1;
};

export const genreFilter = (tvShow: BaseTVShowProps, value: string): boolean => {
  const genreId = Number(value);
  const genreIds = tvShow.genre_ids;
  return genreId > 0 && genreIds ? genreIds.includes(genreId) : true;
};

export const favouritesGenreFilter = (tvShow: TVShowDetailsProps, value: string): boolean => {
  const genreId = Number(value);
  const genres = tvShow.genres;
  return genreId > 0 && genres ? genres.some((genre) => genre.id === genreId) : true;
};

const styles = {
  root: {
    backgroundColor: "#bfbfbf",
  },
  fab: {
    marginTop: 8,
    position: "fixed",
    top: 20,
    right: 2,
  },
};

interface TVShowFilterUIProps {
  onFilterValuesChange: (f: string, s: string) => void;
  titleFilter: string;
  genreFilter: string;
}

const TVShowFilterUI: React.FC<TVShowFilterUIProps> = ({ onFilterValuesChange, titleFilter, genreFilter }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const getFabLabel = () => {
    return titleFilter || genreFilter !== "0" ? "Filters Applied" : "Filter TV Shows";
  };

  const handleResetFilters = () => {
    onFilterValuesChange("title", "");
    onFilterValuesChange("genre", "0");
    setDrawerOpen(false); 
  };

  return (
    <>
      <Fab
        color="secondary"
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        sx={styles.fab}
      >
        {getFabLabel()}
      </Fab>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{ width: "75%", maxWidth: 400, backgroundColor: "#fff" }} 
      >
        <FilterCard
          onUserInput={onFilterValuesChange}
          titleFilter={titleFilter}
          genreFilter={genreFilter}
        />
        <button onClick={handleResetFilters}>Reset Filters</button> 
      </Drawer>
    </>
  );
};

export default TVShowFilterUI;
