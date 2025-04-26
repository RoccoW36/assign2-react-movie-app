import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import { FantasyMovie } from "../../types/interfaces";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";

interface FantasyMovieDetailsProps {
  movie: FantasyMovie;
}

const FantasyMovieDetails: React.FC<FantasyMovieDetailsProps> = ({ movie }) => {
  const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
  };
  const chip = { margin: 0.5 };

  return (
    <>
      <Box display="flex" justifyContent="center" mt={3}>
        <CardMedia
          component="img"
          sx={{ width: "300px", borderRadius: "8px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)" }}
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

      <Paper component="ul" sx={root}>
        <li>
          <Chip label="Genres" sx={chip} color="primary" />
        </li>
        {movie?.genres?.map((g, index) =>
          typeof g === "object" && g.name ? (
            <li key={index}>
              <Chip label={g.name} sx={chip} />
            </li>
          ) : null
        )}
      </Paper>

      <Paper component="ul" sx={root}>
        <Chip icon={<CalendarIcon fontSize="small" />} label={`Released: ${movie.release_date}`} />
      </Paper>

      <Paper component="ul" sx={root}>
        <li>
          <Chip label="Cast" sx={chip} color="primary" />
        </li>
        {movie?.actors?.map((a, index) =>
          typeof a === "object" && a.name ? (
            <li key={index}>
              <Chip label={a.name} sx={chip} />
            </li>
          ) : null
        )}
      </Paper>

      <Paper component="ul" sx={root}>
        <li>
          <Chip label="Director" sx={chip} color="primary" />
        </li>
        {movie?.directors?.map((d, index) =>
          typeof d === "object" && d.name ? (
            <li key={index}>
              <Chip label={d.name} sx={chip} />
            </li>
          ) : null
        )}
      </Paper>

      <Paper component="ul" sx={root}>
        <li>
          <Chip label="Production Company" sx={chip} color="primary" />
        </li>
        <Chip label={movie.company} sx={chip} />
      </Paper>
    </>
  );
};

export default FantasyMovieDetails;
