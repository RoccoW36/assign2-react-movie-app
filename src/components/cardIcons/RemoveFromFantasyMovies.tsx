import React, { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { FantasyMoviesContext } from "../../contexts/fantasyMoviesContext";
import { BaseMovieProps } from "../../types/interfaces";

const RemoveFromFantasyMoviesIcon: React.FC<BaseMovieProps> = (movie) => {
  const context = useContext(FantasyMoviesContext);

  const onUserRequest = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Removing from Fantasy Movies:", movie);
    context.removeFromFantasy(movie.id)
  };

  return (
    <IconButton aria-label="remove from fantasy movies" onClick={onUserRequest}>
      <DeleteIcon color="error" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromFantasyMoviesIcon;
