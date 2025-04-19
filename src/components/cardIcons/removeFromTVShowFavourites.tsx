import React, { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { TVShowsContext } from "../../contexts/tvShowsContext";
import { BaseTVShowProps } from "../../types/interfaces";

interface RemoveFromFavouritesTVShowProps {
  tvShow: BaseTVShowProps;
}

const RemoveFromFavouritesTVShow: React.FC<RemoveFromFavouritesTVShowProps> = ({ tvShow }) => {
  const context = useContext(TVShowsContext);

  const onUserRequest = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Removing from Favourites:", tvShow);
    context.removeFromFavourites(tvShow);
  };

  return (
    <IconButton aria-label="remove from favourites" onClick={onUserRequest}>
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromFavouritesTVShow;
