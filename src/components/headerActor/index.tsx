import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavouriteIcon from "@mui/icons-material/Favorite";
import Avatar from "@mui/material/Avatar";
import { ActorDetailsProps } from "../../types/interfaces";
import { ActorsContext } from "../../contexts/actorsContext";

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

const ActorHeader: React.FC<{ actor: ActorDetailsProps }> = ({ actor }) => {
  const { favourites, addToFavourites, removeFromFavourites } = useContext(ActorsContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsFavorite(favourites.includes(actor.id));
  }, [favourites, actor.id]);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFromFavourites(actor);
    } else {
      addToFavourites(actor);
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
        {actor.name}
        <br />
        <span>{actor.known_for_department}</span>
      </Typography>

      <IconButton aria-label="go forward" onClick={() => navigate(1)}>
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default ActorHeader;
