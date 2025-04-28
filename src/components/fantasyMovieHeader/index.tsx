import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { FantasyMovie } from "../../types/interfaces";

const styles = {
  root: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    padding: 1.5,
    margin: 0,
  },
};

interface FantasyMovieHeaderProps {
  movie?: FantasyMovie | null;
}

const FantasyMovieHeader: React.FC<FantasyMovieHeaderProps> = ({ movie }) => {
  const navigate = useNavigate();

  return (
    <Paper component="div" sx={styles.root}>
      <IconButton aria-label="go back" onClick={() => navigate(-1)}>
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

      <Typography variant="h4" component="h3" align="center">
        {movie?.title || "Fantasy Movies"}
      </Typography>

      <IconButton aria-label="go forward" onClick={() => navigate(+1)}>
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default FantasyMovieHeader;
