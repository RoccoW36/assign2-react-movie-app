import React, { MouseEvent, useContext } from "react";
import { TVShowsContext } from "../../contexts/tvShowsContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { BaseTVShowProps } from "../../types/interfaces";

const AddToMustWatchTVShows: React.FC<BaseTVShowProps> = ({
  id,
  name,
  overview,
  first_air_date,
  vote_average,
  popularity,
  poster_path,
}) => {
  const context = useContext(TVShowsContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("Adding to Must-Watch:", { id, name, overview, first_air_date, vote_average, popularity, poster_path });
    context.addToMustWatch({ id, name, overview, first_air_date, vote_average, popularity, poster_path });
  };

  return (
    <IconButton aria-label="add to must-watch" onClick={onUserSelect}>
      <PlaylistAddIcon fontSize="large" />
    </IconButton>
  );
};

export default AddToMustWatchTVShows;
