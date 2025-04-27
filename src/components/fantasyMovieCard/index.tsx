import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Card, CardActions, CardContent, CardMedia, CardHeader,
  Typography, Grid, IconButton, Button, Chip, Box
} from "@mui/material";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import DeleteIcon from "@mui/icons-material/Delete";

import { FantasyMoviesContext } from "../../contexts/fantasyMoviesContext";
import img from '../../images/fantasyMovieCard.png';
import { FantasyMovie } from "../../types/interfaces"; 

const styles = {
  card: {
    maxWidth: 345,
    transition: "transform 0.3s",
    "&:hover": {
      transform: "scale(1.03)",
    },
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
  }
};

interface FantasyMovieCardProps {
  movie: FantasyMovie;
}

const FantasyMovieCard: React.FC<FantasyMovieCardProps> = ({ movie }) => {
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
        action={
          <IconButton aria-label="remove" onClick={handleRemove}>
            <DeleteIcon color="error" />
          </IconButton>
        }
      />
      <CardMedia
        component="img"
        sx={styles.media}
        image={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : img}
        alt={movie.title}
      />
      
      {/* GENRES SECTION */}
      <Box sx={styles.chipContainer}>
        {movie.genres?.slice(0, 2).map((g, idx) =>
          typeof g === "object" && g.name ? (
            <Chip key={idx} label={g.name} color="primary" size="small" />
          ) : null
        )}
      </Box>

      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="subtitle2" component="p">
              <CalendarIcon fontSize="small" /> {movie.release_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle2" component="p">
              <StarRateIcon fontSize="small" /> {movie.vote_average}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions disableSpacing>
        <Link to={`/movies/fantasy/${movie.id}`} style={{ textDecoration: 'none' }}>
          <Button variant="outlined" size="medium" color="primary">
            More Info
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default FantasyMovieCard;
