import { useContext } from "react";
import { useParams } from 'react-router-dom';
import FantasyMovieDetails from "../components/fantasyMovieDetails";
import PageTemplate from "../components/templateFantasyMoviePage";
import { FantasyMoviesContext } from "../contexts/fantasyMoviesContext";
import Typography from "@mui/material/Typography";

const FantasyMovieDetailsPage: React.FC = () => {
  const { id } = useParams();
  const context = useContext(FantasyMoviesContext);

  const movie = id ? context.fantasy.find((m) => m.id === Number(id)) : null;

  if (!movie) {
    return <Typography color="error">Movie not found.</Typography>;
  }

  return (
    <PageTemplate movie={movie}>
      <FantasyMovieDetails movie={movie} />
    </PageTemplate>
  );
};

export default FantasyMovieDetailsPage;
