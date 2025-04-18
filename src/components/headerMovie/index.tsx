import React, { useEffect, useState } from "react"; 
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import FavouriteIcon from "@mui/icons-material/Favorite"; 
import Avatar from "@mui/material/Avatar"; 
import { MovieDetailsProps } from "../../types/interfaces";

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
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Retrieve favorite movies from localStorage
    const favourites = JSON.parse(localStorage.getItem("favoriteMovies") || "[]");
    if (Array.isArray(favourites)) {
      setIsFavorite(favourites.some((fav: { id: number }) => fav.id === movie.id));
    }
  }, [movie.id]);

  const toggleFavorite = () => {
    const favourites = JSON.parse(localStorage.getItem("favoriteMovies") || "[]");
    let updatedFavorites;

    if (isFavorite) {
      // Remove movie from favorites
      updatedFavorites = favourites.filter((fav: { id: number }) => fav.id !== movie.id);
    } else {
      // Add movie to favorites
      updatedFavorites = [...favourites, { id: movie.id, title: movie.title }];
    }

    localStorage.setItem("favoriteMovies", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite); // Toggle state
  };

  return (
    <Paper component="div" sx={styles.root}>
      <IconButton aria-label="go back">
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

      {/* Favorite Toggle */}
      <IconButton onClick={toggleFavorite} aria-label={isFavorite ? "Remove from Favorites" : "Add to Favorites"}>
        {isFavorite ? (
          <Avatar sx={styles.avatar}>
            <FavouriteIcon />
          </Avatar>
        ) : (
          <Avatar sx={{ backgroundColor: "gray" }}>
            <FavouriteIcon />
          </Avatar>
        )}
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

      <IconButton aria-label="go forward">
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default MovieHeader;
