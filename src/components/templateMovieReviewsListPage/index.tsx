import React from "react";
import Grid from "@mui/material/Grid";
import MovieReviewList from "../movieReviewList";
import PaginationUI from "../PaginationUI";
import HeaderMovieReviewsList from "../headerMovieReviewsList";
import { MovieReview } from "../../types/interfaces";

const styles = {
  root: {
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    paddingTop: "20px",
  },
};

interface MovieReviewListPageTemplateProps {
  reviews: MovieReview[];
  title: string;
  subtitle?: string;
  action?: (r: MovieReview) => React.ReactNode;
  onBack?: () => void;
  onForward?: () => void;
  page?: number;
  handlePageChange?: (event: React.ChangeEvent<unknown>, value: number) => void;
  totalPages?: number;
  sortOption: string;
}

const MovieReviewListPageTemplate: React.FC<MovieReviewListPageTemplateProps> = ({
  reviews,
  title,
  subtitle,
  action,
  onBack,
  onForward,
  page,
  handlePageChange,
  totalPages,
  sortOption,
}) => {

  const sortedReviews = reviews.sort((a, b) => {
    if (sortOption === "dateAsc") {
      const dateA = new Date(a.reviewDate).getTime();
      const dateB = new Date(b.reviewDate).getTime();
      return dateA - dateB;
    }
    if (sortOption === "dateDesc") {
      const dateA = new Date(a.reviewDate).getTime();
      const dateB = new Date(b.reviewDate).getTime();
      return dateB - dateA; 
    }
    if (sortOption === "movieId") {
      return Number(a.movieId) - Number(b.movieId);
    }
    if (sortOption === "reviewerId") {
      return Number(a.reviewerId) - Number(b.reviewerId);
    }
    return 0;
  });

  return (
    <Grid container direction="column" sx={styles.root} spacing={2}>
      <Grid item>
        <HeaderMovieReviewsList
          title={title}
          subtitle={subtitle}
          onBack={onBack}
          onForward={onForward}
        />
      </Grid>

      {page !== undefined && handlePageChange && totalPages !== undefined && (
        <Grid item sx={{ padding: "0 20px" }}>
          <PaginationUI
            page={page}
            handlePageChange={handlePageChange}
            totalPages={totalPages}
          />
        </Grid>
      )}

      <Grid item sx={{ padding: "0 20px" }}>
        <Grid container spacing={3} justifyContent="center">
          <MovieReviewList reviews={sortedReviews} action={action} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MovieReviewListPageTemplate;
