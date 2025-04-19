import React from "react";
import ActorCard from "../actorCard/";
import Grid from "@mui/material/Grid";
import { BaseActorListProps } from "../../types/interfaces";

const ActorList: React.FC<BaseActorListProps> = ({ actors, action }) => {
  let actorCards = actors.map((actor) => (
    <Grid key={actor.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <ActorCard key={actor.id} actor={actor} action={action} />
    </Grid>
  ));
  return actorCards;
};

export default ActorList;
