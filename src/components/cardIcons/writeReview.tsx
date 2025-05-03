import React from "react";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { useNavigate } from "react-router-dom";

export interface WriteReviewIconProps {
  movieId?: number;
  tvShowId?: number;
}

const WriteReviewIcon: React.FC<WriteReviewIconProps> = ({ movieId, tvShowId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (movieId) {
      sessionStorage.setItem("movieId", movieId.toString());
    }
    navigate("/reviews/form", movieId ? { state: { movieId, tvShowId } } : undefined);
  };

  return (
    <RateReviewIcon 
      color="primary" 
      fontSize="large" 
      style={{ cursor: "pointer" }} 
      onClick={handleClick}
    />
  );
};

export default WriteReviewIcon;
