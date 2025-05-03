import React from "react";
import MovieReviewCard from "../movieReviewCard";
import Grid from "@mui/material/Grid";
import { MovieReview } from "../../types/interfaces";

interface MovieReviewListProps {
  reviews: MovieReview[];
  action?: (review: MovieReview) => React.ReactNode;
}

const MovieReviewList: React.FC<MovieReviewListProps> = ({ reviews, action }) => {
  return (
    <Grid 
      container 
      spacing={3} 
      justifyContent="flex-start" 
      sx={{ paddingLeft: 2, paddingTop: 2 }}
    >
      {reviews.map((review) => (
        <Grid key={review.reviewId} item xs={12} sm={6} md={6} lg={4}>
          <MovieReviewCard review={review}>
            {action && action(review)}
          </MovieReviewCard>
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieReviewList;
