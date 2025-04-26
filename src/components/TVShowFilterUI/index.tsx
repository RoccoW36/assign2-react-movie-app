import React, { useState } from "react";
import FilterCard from "../filterTVShowsCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { BaseTVShowProps, TVShowDetailsProps } from "../../types/interfaces";

export const titleFilter = (tvShow: BaseTVShowProps, value: string): boolean => {
  return tvShow.name.toLowerCase().includes(value.toLowerCase());
};

export const genreFilter = (tvShow: BaseTVShowProps, value: string): boolean => {
  const genreId = Number(value);
  const genreIds = tvShow.genre_ids;
  return genreId > 0 && genreIds ? genreIds.includes(genreId) : true;
};

export const favouritesGenreFilter = (tvShow: TVShowDetailsProps, value: string): boolean => {
  const genreId = Number(value);
  const genres = tvShow.genres;
  return genreId > 0 && genres ? genres.some((genre) => Number(genre.id) === genreId) : true;
};

export const ratingFilter = (tvShow: BaseTVShowProps, value: string): boolean => {
  return value ? tvShow.vote_average >= Number(value) : true;
};

export const productionCountryFilter = (tvShow: BaseTVShowProps, value: string): boolean => {
  return value ? tvShow.production_country.includes(value) : true;
};

const styles = {
  fab: {
    position: "fixed",
    top: "90px",
    right: "20px",
    zIndex: 1300, // Ensures visibility above other elements
    backgroundColor: "#6200ea", // More visually distinct color
    color: "#fff",
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)", // Stronger shadow effect
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.1)", // Slightly enlarges on hover for interaction feedback
      boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.4)", // Adds more depth on hover
    },
    "@media (max-width: 768px)": {
      top: "70px", // Adjusts position for tablets
      right: "15px",
    },
    "@media (max-width: 480px)": {
      top: "60px", // Optimized placement for mobile users
      right: "10px",
      fontSize: "14px", // Adjusted text size for smaller screens
    },
  },
};

interface TVShowFilterUIProps {
  onFilterValuesChange: (f: string, s: string) => void;
  titleFilter: string;
  genreFilter: string;
  ratingFilter: string;
  productionCountryFilter: string;
  sortOption: string;
}

const TVShowFilterUI: React.FC<TVShowFilterUIProps> = ({
  onFilterValuesChange,
  titleFilter,
  genreFilter,
  ratingFilter,
  productionCountryFilter,
  sortOption,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const getFabLabel = () =>
    titleFilter !== "" ||
    genreFilter !== "0" ||
    ratingFilter !== "" ||
    productionCountryFilter !== "" ||
    sortOption !== ""
      ? "Filters Applied"
      : "Filter TV Shows";

  const handleResetFilters = () => {
    console.log("Resetting filters...");
    onFilterValuesChange("title", "");
    onFilterValuesChange("genre", "0");
    onFilterValuesChange("rating", "");
    onFilterValuesChange("production country", "");
    onFilterValuesChange("sortOption", "");
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
        PaperProps={{ sx: { backgroundColor: "#fff" } }}
      >
        <FilterCard
          onUserInput={onFilterValuesChange}
          titleFilter={titleFilter}
          genreFilter={genreFilter}
          ratingFilter={ratingFilter}
          productionCountryFilter={productionCountryFilter}
          sortOption={sortOption}
        />
        <button onClick={handleResetFilters}>Reset Filters</button>
      </Drawer>
    </>
  );
};

export default TVShowFilterUI;
