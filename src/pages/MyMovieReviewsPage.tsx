import React, { useEffect, useState } from "react";
import { useMovieReviews } from "../contexts/moviereviewsContext";
import MovieReviewListPageTemplate from "../components/templateMovieReviewsListPage";
import ReviewFilterUI from "../components/movieReviewsFilterUI";

const MyMovieReviewsPage: React.FC = () => {
  const { reviews, isLoading, error, setFilters, filters } = useMovieReviews();
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const handleFilterValuesChange = (name: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    setTotalPages(Math.ceil(reviews.length / 10));
  }, [reviews]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <ReviewFilterUI
        onFilterValuesChange={handleFilterValuesChange}
        movieIdFilter={filters.movieId || ""}
        reviewerIdFilter={filters.reviewerId || ""}
        contentFilter={filters.content || ""}
        dateFilter={filters.reviewDate || ""}
        sortOption={filters.sortOption || ""}
      />
      <MovieReviewListPageTemplate
        title="My Movie Reviews"
        subtitle="Your personal collection of reviews"
        reviews={reviews.slice((page - 1) * 10, page * 10)}
        page={page}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
        sortOption={filters.sortOption || ""}
      />
    </div>
  );
};

export default MyMovieReviewsPage;
