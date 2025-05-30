import React, { useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import FantasyMovieHeader from "../fantasyMovieHeader";
import MovieFilterUI from "../movieFilterUI";
import FantasyMovieList from "../fantasyMovieList";
import Grid from "@mui/material/Grid";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import { FantasyMovie } from "../../types/interfaces";

const styles = {
  root: {
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    padding: "20px",
  },
  floatingButton: {
    position: "fixed",
    bottom: "2rem",
    right: "2rem",
    zIndex: 1050,
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.1)",
      boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.4)",
    },
    "@media (max-width: 768px)": {
      bottom: "1rem",
    },
    "@media (max-width: 480px)": {
      bottom: "0.8rem",
      right: "0.8rem",
    },
  },
};

export interface FantasyMovieListPageTemplateProps {
  movies: FantasyMovie[];
  title: string;
  action?: (m: FantasyMovie) => React.ReactNode;
}

const TemplateFantasyMovieListPage: React.FC<FantasyMovieListPageTemplateProps> = ({ movies }) => {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [ratingFilter, setRatingFilter] = useState("");
  const [productionCountryFilter, setProductionCountryFilter] = useState("");
  const [sortOption, setSortOption] = useState("");

  const { isSignedin } = useAuth();
  const navigate = useNavigate();

  const handleNewFantasyMovieClick = () => {
    if (isSignedin) {
      navigate("/movies/fantasy/new");
    } else {
      navigate("/login");
    }
  };

  const handleFilterChange = (name: string, value: string) => {
    switch (name) {
      case "title":
        setNameFilter(value);
        break;
      case "genre":
        setGenreFilter(value);
        break;
      case "rating":
        setRatingFilter(value);
        break;
      case "production country":
        setProductionCountryFilter(value);
        break;
      case "sortOption":
        setSortOption(value);
        break;
    }
  };

  const genreId = isNaN(Number(genreFilter)) ? 0 : parseInt(genreFilter, 10);
  const displayedMovies = movies
    .filter((m) => m.title.toLowerCase().includes(nameFilter.toLowerCase()))
    .filter((m) => genreId > 0 ? m.genres?.some((e) => Number(e.id) === genreId) : true);

  return (
    <Box sx={styles.root}>
      <FantasyMovieHeader />

      <MovieFilterUI
        onFilterValuesChange={handleFilterChange}
        titleFilter={nameFilter}
        genreFilter={genreFilter}
        ratingFilter={ratingFilter}
        productionCountryFilter={productionCountryFilter}
        sortOption={sortOption}
      />

      <Grid container spacing={5}>
        <Grid item xs={12}>
          <FantasyMovieList movies={displayedMovies} />
        </Grid>
      </Grid>

      <Fab color="secondary" variant="extended" sx={styles.floatingButton} onClick={handleNewFantasyMovieClick}>
        <AddIcon sx={{ mr: 1 }} />
        {isSignedin ? "Create Fantasy Movie" : "Sign in to Create Fantasy Movie"}
      </Fab>
    </Box>
  );
};

export default TemplateFantasyMovieListPage;
