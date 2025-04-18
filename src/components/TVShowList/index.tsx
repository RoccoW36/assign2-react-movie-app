import React from "react";
import TVShowCard from "../TVShowCard"; 
import Grid from "@mui/material/Grid";
import { BaseTVShowListProps } from "../../types/interfaces"; 

const TVShowList: React.FC<BaseTVShowListProps> = ({ tvShows, action }) => {
  let tvShowCards = tvShows.map((tvShow) => (
    <Grid key={tvShow.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <TVShowCard key={tvShow.id} tvShow={tvShow} action={action} />
    </Grid>
  ));

  return (
    <Grid container spacing={3}>
      {tvShowCards}
    </Grid>
  );
};

export default TVShowList;
