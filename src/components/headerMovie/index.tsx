import React, { useEffect, useState } from "react"; // Exercise:Added useState and useEffect
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { MovieDetailsProps } from "../../types/interfaces";
import FavouriteIcon from "@mui/icons-material/Favorite"; // Exercise:Added FavouriteIcon import
import Avatar from "@mui/material/Avatar"; // Exercise: Added Import Avatar

const styles = {
    root: { 
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 1.5,
  },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)", // Exercise: Added Red background for heart
  },
};

const MovieHeader: React.FC<MovieDetailsProps> = (movie) => {
  // Exercise:Added state to track if the movie is a favorite
  const [isFavorite, setIsFavorite] = useState(false);

  // Exercise:Added useEffect to check if the movie is in favorites when component mounts
  useEffect(() => {
    const favourites = JSON.parse(localStorage.getItem('favourites') || '[]');
    // Exercise:Check if the movie ID exists in the stored favorite objects
    setIsFavorite(favourites.some((fav: { id: number }) => fav.id === movie.id));
  }, [movie.id]);

  return (
    <Paper component="div" sx={styles.root}>
      <IconButton aria-label="go back">
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

        {/* Exercise:Added Favorite icon with Avatar */}
        {isFavorite && (
          <Avatar sx={styles.avatar}>
            <FavouriteIcon />
          </Avatar>
        )}

      <Typography variant="h4" component="h3">
        {movie.title}{"   "}
        <a href={movie.homepage}>
          <HomeIcon color="primary"  fontSize="large"/>
        </a>
        <br />
        <span>{`${movie.tagline}`} </span>
      </Typography>
      <IconButton aria-label="go forward">
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default MovieHeader;
