import FantasyMovieCard from "../fantasyMovieCard";
import Grid from "@mui/material/Grid";
import { BaseMovieListProps } from "../../types/interfaces";


const FantasyMovie: React.FC<BaseMovieListProps> = ({movies, action}) => {
  let fantasymovieCards = movies.map((m) => (
    <Grid key={m.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FantasyMovieCard key={m.id} movie={m} action={action}/>
    </Grid>
  ));
  return fantasymovieCards;
}

  export default FantasyMovie;