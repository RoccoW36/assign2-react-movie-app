import React from "react";
import { Grid, Box } from "@mui/material";
import MovieReviewHeader from "../headerMovieReview";

interface TemplateReviewPageProps {
  children: React.ReactNode;
  author: string;
  movieTitle?: string;
  subtitle?: string;
}

const TemplateReviewPage: React.FC<TemplateReviewPageProps> = ({
  children,
  author,
  movieTitle,
  subtitle,
}) => {
  return (
    <Box sx={{ padding: 3 }}>
      <MovieReviewHeader author={author} movieTitle={movieTitle} subtitle={subtitle} />
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={1} />
        <Grid item xs={10}>
          {children}
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </Box>
  );
};

export default TemplateReviewPage;
