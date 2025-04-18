import React from "react";
import Header from "../headerTVShowList";
import Grid from "@mui/material/Grid";
import TVShowList from "../TVShowList"; 
import { TVShowListPageTemplateProps } from "../../types/interfaces"; 

const styles = {
  root: { 
    backgroundColor: "#f5f5f5",
  }
};

const TVShowListPageTemplate: React.FC<TVShowListPageTemplateProps> = ({ tvShows, title, action }) => {
  console.log("TV Shows passed to PageTemplate:", tvShows);

  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
        <TVShowList action={action} tvShows={tvShows} /> 
      </Grid>
    </Grid>
  );
};

export default TVShowListPageTemplate;
