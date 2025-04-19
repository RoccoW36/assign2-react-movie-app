import React, { MouseEvent, useContext } from "react";
import { TVShowsContext } from "../../contexts/tvShowsContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { BaseTVShowProps } from "../../types/interfaces";

const AddToTVShowFavouritesIcon: React.FC<BaseTVShowProps> = ({ id, name, overview, first_air_date, vote_average, popularity, poster_path }) => {
  const context = useContext(TVShowsContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Adding to Favourites:", { id, name, overview, first_air_date, vote_average, popularity, poster_path });
    context.addToFavourites({ id, name, overview, first_air_date, vote_average, popularity, poster_path });
  };

  return (
    <IconButton aria-label="add to favourites" onClick={onUserSelect}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToTVShowFavouritesIcon;
