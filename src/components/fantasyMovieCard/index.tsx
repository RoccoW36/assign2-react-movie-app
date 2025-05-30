import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Card, CardActions, CardContent, CardMedia, CardHeader,
  Typography, Grid, IconButton, Button, Chip, Box
} from "@mui/material";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import DeleteIcon from "@mui/icons-material/Delete";

import { FantasyMoviesContext } from "../../contexts/fantasyMoviesContext";
import img from '../../images/fantasyMovieCard.png';
import { FantasyMovie } from "../../types/interfaces"; 

const styles = {
  card: {
    maxWidth: 345,
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
    },
    borderRadius: "12px",
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
  },
  media: {
    height: 500,
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
    objectFit: "cover",
  },
  chipContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: 0.5,
    justifyContent: "center",
    mt: 1,
    maxWidth: "90%",
  },
  moreInfoButton: {
    borderRadius: "8px",
    fontWeight: "bold",
  }
};

interface FantasyMovieCardProps {
  movie: FantasyMovie;
  action?: (m: FantasyMovie) => React.ReactNode;
}

const FantasyMovieCard: React.FC<FantasyMovieCardProps> = ({ movie, action }) => {
  const { removeFromFantasy } = useContext(FantasyMoviesContext);

  const handleRemove = () => {
    removeFromFantasy(movie.id);
  };

  return (
    <Card sx={styles.card}>
      <CardHeader
        title={
          <Typography variant="h6" component="p" noWrap>
            {movie.title}
          </Typography>
        }
      />
      <CardMedia
        component="img"
        sx={styles.media}
        image={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : img}
        alt={movie.title}
      />
      
      <Box sx={styles.chipContainer}>
        {movie.genres?.slice(0, 2).map((g, idx) =>
          typeof g === "object" && g.name ? (
            <Chip key={idx} label={g.name} color="primary" size="small" />
          ) : null
        )}
      </Box>

      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="subtitle2" component="p">
              <CalendarIcon fontSize="small" /> {movie.release_date}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions disableSpacing sx={{ display: "flex", justifyContent: "space-between" }}>
        <Link to={`/movies/fantasy/${movie.id}`} style={{ textDecoration: 'none' }}>
          <Button variant="outlined" size="medium" color="primary" sx={styles.moreInfoButton}>
            More Info
          </Button>
        </Link>
        {action ? action(movie) : (
          <IconButton aria-label="remove" onClick={handleRemove}>
            <DeleteIcon color="error" />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default FantasyMovieCard;
