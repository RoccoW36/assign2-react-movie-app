import React, { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { TVShowsContext } from "../../contexts/tvShowsContext";
import { BaseTVShowProps } from "../../types/interfaces";

const RemoveFromMustWatchTVShows: React.FC<BaseTVShowProps> = (tvShow) => {
  const context = useContext(TVShowsContext);

  const onUserRequest = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Removing from Must-Watch:", tvShow);
    context.removeFromMustWatch(tvShow);
  };

  return (
    <IconButton aria-label="remove from must-watch" onClick={onUserRequest}>
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromMustWatchTVShows;
