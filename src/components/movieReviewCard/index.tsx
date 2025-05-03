import React, { ReactNode } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { MovieReview } from "../../types/interfaces";

interface MovieReviewCardProps {
  review: MovieReview;
  children?: ReactNode;
}

const MovieReviewCard: React.FC<MovieReviewCardProps> = ({ review, children }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography variant="h6" component="h2">
          Review for Movie ID: {review.movieId}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Reviewer ID: {review.reviewerId}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {review.reviewDate}
        </Typography>
        <Typography variant="body1" component="p" sx={{ mt: 2 }}>
          {review.content}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
};

export default MovieReviewCard;
