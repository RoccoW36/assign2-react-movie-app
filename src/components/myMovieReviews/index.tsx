import React from "react";
import { MovieReview } from "../../types/interfaces";
import MovieReviewCard from "../movieReviewCard"; 

interface MovieReviewsProps {
  reviews: MovieReview[];
}

const MovieReviews: React.FC<MovieReviewsProps> = ({ reviews }) => {
  return (
    <div>
      {reviews.map((review) => (
        <MovieReviewCard key={review.reviewId} review={review} />
      ))}
    </div>
  );
};

export default MovieReviews;
