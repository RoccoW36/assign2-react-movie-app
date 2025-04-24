import React from "react";
import { useLocation } from "react-router-dom";
import PageTemplate from "../components/templateTVShowPage";
import MovieReview from "../components/movieReview";

const TVShowReviewPage: React.FC = () => {
  const { state } = useLocation();
  const { tvShow, review } = state || {};

  if (!tvShow || !review) {
    return <p>Error: TV Show or Review data is missing.</p>;
  }

  return (
    <PageTemplate tvShow={tvShow}>
      <MovieReview {...review} />
    </PageTemplate>
  );
};

export default TVShowReviewPage;
