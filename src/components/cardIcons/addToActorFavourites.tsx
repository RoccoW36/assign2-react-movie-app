import React, { MouseEvent, useContext } from "react";
import { ActorsContext } from "../../contexts/actorsContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Actor } from "../../types/interfaces";

const AddToActorFavouritesIcon: React.FC<{ actor: Actor }> = ({ actor }) => {
  const context = useContext(ActorsContext);

  const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    context.addToFavourites(actor);
  };

  return (
    <IconButton aria-label="add to actor favorites" onClick={onUserSelect}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToActorFavouritesIcon;
