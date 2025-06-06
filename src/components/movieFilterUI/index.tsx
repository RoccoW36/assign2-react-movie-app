import React, { useState } from "react";
import FilterMoviesCard from "../filterMoviesCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { BaseMovieProps, MovieDetailsProps } from "../../types/interfaces";

export const titleFilter = (movie: BaseMovieProps, value: string): boolean =>
  movie.title.toLowerCase().includes(value.toLowerCase());

export const genreFilter = (movie: BaseMovieProps, value: string): boolean => {
  const genreId = Number(value);
  const genreIds = movie.genre_ids;
  return genreId > 0 && genreIds ? genreIds.includes(genreId) : true;
};

export const favouritesgenreFilter = (movie: MovieDetailsProps, value: string): boolean => {
  const genreId = Number(value);
  const genres = movie.genres;
  return genreId > 0 && genres ? genres.some((genre) => genre.id === genreId) : true;
};

export const ratingFilter = (movie: BaseMovieProps, value: string): boolean =>
  value ? movie.vote_average >= Number(value) : true;

export const productionCountryFilter = (movie: BaseMovieProps, value: string): boolean =>
  value ? Array.isArray(movie.production_country) && movie.production_country.some(country => country.name === value) : true;

const styles = {
  fab: {
    position: "fixed",
    top: "90px",
    right: "20px",
    zIndex: 1300,
    backgroundColor: "#6200ea", 
    color: "#fff",
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.1)",
      boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.4)",
    },
    "@media (max-width: 768px)": {
      top: "70px",
      right: "15px",
    },
    "@media (max-width: 480px)": {
      top: "60px",
      right: "10px",
      fontSize: "14px",
    },
  },
};


interface MovieFilterUIProps {
  onFilterValuesChange: (name: string, value: string) => void;
  titleFilter: string;
  genreFilter: string;
  ratingFilter: string;
  productionCountryFilter: string;
  sortOption: string;
}

const MovieFilterUI: React.FC<MovieFilterUIProps> = ({
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
      : "Filter Movies";

  const handleResetFilters = () => {
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
        <FilterMoviesCard
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

export default MovieFilterUI;
