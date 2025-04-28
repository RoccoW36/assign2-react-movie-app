import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import FavouriteIcon from "@mui/icons-material/Favorite";
import Avatar from "@mui/material/Avatar";
import { MovieDetailsProps } from "../../types/interfaces";
import { MoviesContext } from "../../contexts/moviesContext";

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 1.5,
  },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
};

const MovieHeader: React.FC<{ movie: MovieDetailsProps }> = ({ movie }) => {
  const { favourites, addToFavourites, removeFromFavourites } = useContext(MoviesContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsFavorite(favourites.includes(movie.id));
  }, [favourites, movie.id]);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavourites(movie);
    } else {
      addToFavourites(movie);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <Paper component="div" sx={styles.root}>
      <IconButton aria-label="go back" onClick={() => navigate(-1)}>
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

      <IconButton onClick={toggleFavorite} aria-label="toggle favorite">
        <Avatar sx={isFavorite ? styles.avatar : { backgroundColor: "gray" }}>
          <FavouriteIcon />
        </Avatar>
      </IconButton>

      <Typography variant="h4" component="h3">
        {movie.title}{" "}
        {movie.homepage && (
          <a href={movie.homepage}>
            <HomeIcon color="primary" fontSize="large" />
          </a>
        )}
        <br />
        <span>{movie.tagline || "No tagline available"}</span>
      </Typography>

      <IconButton aria-label="go forward" onClick={() => navigate(1)}>
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default MovieHeader;
