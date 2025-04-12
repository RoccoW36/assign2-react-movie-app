import React from "react";
import ActorCard from "../actorCard";
import Grid from "@mui/material/Grid";
import { Actor as ActorType } from "../../types/interfaces";

interface ActorListProps {
  actors: ActorType[];
  action: (actor: ActorType) => React.ReactNode;
}

const ActorList = ({ actors, action }: ActorListProps) => {
  return (
    <Grid container spacing={2}>
      {actors.map((actor) => (
        <Grid key={actor.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <ActorCard actor={actor} action={action} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ActorList;
