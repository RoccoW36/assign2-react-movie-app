import React from "react";
import HeaderActorList from "../headerActorList";
import Grid from "@mui/material/Grid";
import ActorList from "../actorList";
import { ActorListPageTemplateProps } from "../../types/interfaces";

const styles = {
  root: { 
    backgroundColor: "#bfbfbf",
  }
};

const TemplateActorListPage: React.FC<ActorListPageTemplateProps> = ({ actors, title, action }) => {
  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <HeaderActorList title={title} />
      </Grid>
      <Grid item container spacing={5}>
        <ActorList action={action} actors={actors} /> 
      </Grid>
    </Grid>
  );
};

export default TemplateActorListPage;
