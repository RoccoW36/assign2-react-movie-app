import { useContext } from "react";
import { useParams } from 'react-router-dom';
import FantasyMovieDetails from "../components/fantasyMovieDetails";
import PageTemplate from "../components/templateFantasyMoviePage";
import { FantasyMoviesContext } from "../contexts/fantasyMoviesContext";


const FantasyMovieDetailsPage: React.FC = () => {
  const { id } = useParams();
  const context = useContext(FantasyMoviesContext);

  const movie = id !== undefined ? context.fantasy[id] : null;


  return (
    <PageTemplate movie={movie}>
      <FantasyMovieDetails movie={movie} />
    </PageTemplate>
  );
};

export default FantasyMovieDetailsPage;