import React, { MouseEvent, useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { BaseMovieProps } from "../../types/interfaces";

const AddToMustWatchIcon: React.FC<BaseMovieProps> = (movie) => {
  const context = useContext(MoviesContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Adding to Must-Watch:", movie);
    context.addToMustWatch(movie);
  };

  return (
    <IconButton aria-label="add to must-watch" onClick={onUserSelect}>
      <PlaylistAddIcon fontSize="large" />
    </IconButton>
  );
};

export default AddToMustWatchIcon;
