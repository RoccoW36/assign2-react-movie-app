import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";

const root = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: 1.5,
  margin: 0,
};
const chip = { margin: 0.5 };

const FantasyMovieDetails = ({ movie }) => {

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {movie.overview}
      </Typography>

      <Paper
        component="ul"
        sx={root}
      >
        <li>
          <Chip label="Genres" sx={chip} color="primary" />
        </li>
        {movie?.genres?.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={chip} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={root}>

        <Chip
          icon={<CalendarIcon fontSize="small" />}
          label={`Released: ${movie.release_date}`} />
      </Paper>
      <Paper
        component="ul"
        sx={root}
      >
        <li>
          <Chip label="Cast" sx={chip} color="primary" />
        </li>
        {movie?.actors?.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={chip} />
          </li>
        ))}

      </Paper>
      <Paper
        component="ul"
        sx={root}
      >
        <li>
          <Chip label="Production Company" sx={chip} color="primary" />
        </li>
        <Chip label={movie.company} sx={chip} />

      </Paper>
    </>
  );
};
export default FantasyMovieDetails;