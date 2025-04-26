import FantasyMovieCard from "../fantasyMovieCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { FantasyMovie } from "../../types/interfaces";

export interface FantasyMovieListProps {
  movies: FantasyMovie[];
  action?: (m: FantasyMovie) => React.ReactNode;
}

const FantasyMovieList: React.FC<FantasyMovieListProps> = ({ movies, action }) => {
  return (
    <Box sx={{ padding: "16px", backgroundColor: "#f9f9f9", borderRadius: 2 }}>
      <Grid container spacing={2}>
        {movies.map((m) => (
          <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <FantasyMovieCard movie={m} action={action} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FantasyMovieList;
