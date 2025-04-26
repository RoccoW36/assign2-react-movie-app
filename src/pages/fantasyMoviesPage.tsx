import React, { useContext } from "react";
import { FantasyMoviesContext } from "../contexts/fantasyMoviesContext";
import FantasyMovieListPageTemplate from "../components/templateFantasyMovieListPage";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";

const FantasyMoviesPage: React.FC = () => {
  const { fantasy } = useContext(FantasyMoviesContext);

  return (
    <FantasyMovieListPageTemplate
      title="Fantasy Movies"
      movies={fantasy}
      action={(movie) => <AddToFavouritesIcon {...movie} />}
    />
  );
};

export default FantasyMoviesPage;
