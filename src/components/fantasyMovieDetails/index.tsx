import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import { FantasyMovie } from "../../types/interfaces";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import PersonIcon from "@mui/icons-material/Person";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import BusinessIcon from "@mui/icons-material/Business";

interface FantasyMovieDetailsProps {
  movie: FantasyMovie;
}

const styles = {
  chipSet: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
  },
  chipLabel: {
    margin: 0.5,
  },
  cardMedia: {
    width: "300px",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
  },
};

const FantasyMovieDetails: React.FC<FantasyMovieDetailsProps> = ({ movie }) => {
  return (
    <>
      <Box display="flex" justifyContent="center" mt={3}>
        <CardMedia
          component="img"
          sx={styles.cardMedia}
          image={movie.image ? movie.image : "/images/film-poster-placeholder.png"}
          alt={movie.title}
        />
      </Box>

      <Typography variant="h5" component="h3" mt={3}>
        Overview
      </Typography>
      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper component="ul" sx={styles.chipSet}>
        <li>
          <Chip label="Genres" sx={styles.chipLabel} color="primary" />
        </li>
        {movie?.genres?.map((g, index) =>
          typeof g === "object" && g.name ? (
            <li key={index}>
              <Chip label={g.name} sx={styles.chipLabel} />
            </li>
          ) : null
        )}
      </Paper>

      <Paper component="ul" sx={styles.chipSet}>
        <Chip
          icon={<CalendarIcon fontSize="small" />}
          label={`Released: ${movie.release_date}`}
          sx={styles.chipLabel}
        />
      </Paper>

      <Paper component="ul" sx={styles.chipSet}>
        <li>
          <Chip label="Cast" sx={styles.chipLabel} color="primary" />
        </li>
        {movie?.actors?.map((a, index) =>
          typeof a === "object" && a.name ? (
            <li key={index}>
              <Chip
                icon={<PersonIcon fontSize="small" />}
                label={a.name}
                sx={styles.chipLabel}
              />
            </li>
          ) : null
        )}
      </Paper>

      <Paper component="ul" sx={styles.chipSet}>
        <li>
          <Chip label="Director(s)" sx={styles.chipLabel} color="primary" />
        </li>
        {movie?.directors?.map((d, index) =>
          typeof d === "object" && d.name ? (
            <li key={index}>
              <Chip
                icon={<VideoCameraFrontIcon fontSize="small" />}
                label={d.name}
                sx={styles.chipLabel}
              />
            </li>
          ) : null
        )}
      </Paper>

      <Paper component="ul" sx={styles.chipSet}>
        <li>
          <Chip label="Production Company(s)" sx={styles.chipLabel} color="primary" />
        </li>
        {movie.company && (
          <li>
            <Chip
              icon={<BusinessIcon fontSize="small" />}
              label={movie.company}
              sx={styles.chipLabel}
            />
          </li>
        )}
      </Paper>
    </>
  );
};

export default FantasyMovieDetails;
