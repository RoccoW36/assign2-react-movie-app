import React from "react";
import MovieReviews from "../components/myMovieReviews";
import { useMovieReviews } from "../contexts/moviereviewsContext";

const MyMovieReviewsPage: React.FC = () => {
  const { reviews, isLoading, error } = useMovieReviews();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: "1rem" }}>
      <h1>My Movie Reviews</h1>
      {/* Pass reviews to the MovieReviews component */}
      <MovieReviews reviews={reviews} />
    </div>
  );
};

export default MyMovieReviewsPage;
