import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Avatar from "@mui/material/Avatar";
import { TVShowDetailsProps } from "../../types/interfaces";  
import { TVShowsContext } from "../../contexts/tvShowsContext";

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-around", 
    alignItems: "center", 
    flexWrap: "wrap", 
    padding: 1.5,
  },
};

const TVShowHeader: React.FC<{ tvShow: TVShowDetailsProps }> = ({ tvShow }) => {
  const { favourites, addToFavourites, removeFromFavourites } = useContext(TVShowsContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsFavorite(favourites.includes(tvShow.id));
  }, [favourites, tvShow.id]);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavourites(tvShow);
    } else {
      addToFavourites(tvShow);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <Paper component="div" sx={styles.root}>
      <IconButton aria-label="go back" onClick={() => navigate(-1)}>
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

      <Avatar
        onClick={toggleFavorite}
        sx={{
          backgroundColor: isFavorite ? "rgb(255, 0, 0)" : "gray",
          cursor: "pointer",
        }}
      >
        <FavoriteIcon />
      </Avatar>

      <Typography variant="h4" component="h3">
        {tvShow.name} 
        {tvShow.homepage && (
          <a href={tvShow.homepage} target="_blank" rel="noopener noreferrer">
            <HomeIcon color="primary" fontSize="large" />
          </a>
        )}
        <br />
        <span>{tvShow.tagline || "No tagline available"}</span>
      </Typography>

      <IconButton aria-label="go forward" onClick={() => navigate(1)}>
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default TVShowHeader;
