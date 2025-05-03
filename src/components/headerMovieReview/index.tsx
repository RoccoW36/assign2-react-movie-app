import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import RateReviewIcon from "@mui/icons-material/RateReview";
import Avatar from "@mui/material/Avatar";

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    padding: 1.5,
  },
  avatar: {
    backgroundColor: "rgb(0, 123, 255)",
  },
};

interface MovieReviewHeaderProps {
  author: string;
  movieTitle?: string;
  subtitle?: string;
}

const MovieReviewHeader: React.FC<MovieReviewHeaderProps> = ({ author, movieTitle, subtitle }) => {
  const navigate = useNavigate();

  return (
    <Paper component="div" sx={styles.root}>
      <IconButton aria-label="go back" onClick={() => navigate(-1)}>
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

      <Avatar sx={styles.avatar}>
        <RateReviewIcon />
      </Avatar>

      <Typography variant="h5" component="h3" sx={{ textAlign: "center" }}>
        Review by: {author}
        {movieTitle && (
          <>
            <br />
            <span style={{ fontSize: "1rem", fontStyle: "italic" }}>
              on "{movieTitle}"
            </span>
          </>
        )}
        {subtitle && (
          <>
            <br />
            <span style={{ fontSize: "0.9rem", color: "gray" }}>{subtitle}</span>
          </>
        )}
      </Typography>

      <IconButton aria-label="go forward" onClick={() => navigate(1)}>
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default MovieReviewHeader;
