import React, { useContext } from "react";
import { FantasyMoviesContext } from "../contexts/fantasyMoviesContext";
import FantasyMovieListPageTemplate from "../components/templateFantasyMovieListPage";
import RemoveFromFantasyMoviesIcon from "../components/cardIcons/RemoveFromFantasyMovies";

const FantasyMoviesPage: React.FC = () => {
  const { fantasy } = useContext(FantasyMoviesContext);

  return (
    <FantasyMovieListPageTemplate
      title="Fantasy Movies"
      movies={fantasy}
      action={(movie) => <RemoveFromFantasyMoviesIcon {...movie} />}
    />
  );
};

export default FantasyMoviesPage;
