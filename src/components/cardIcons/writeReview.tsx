import React from "react";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { Link } from "react-router-dom";

export interface WriteReviewIconProps {
  movieId?: number;
  tvShowId?: number;
}

const WriteReviewIcon: React.FC<WriteReviewIconProps> = ({ movieId, tvShowId }) => {
  return (
    <Link
      to={'/reviews/form'}
      state={{
        movieId: movieId,
        tvShowId: tvShowId
      }}
    >
      <RateReviewIcon color="primary" fontSize="large" />
    </Link>
  );
};

export default WriteReviewIcon;
