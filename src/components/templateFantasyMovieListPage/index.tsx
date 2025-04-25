import { useState } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterFantasyMoviesCard";
import FantasyMovieList from "../fantasyMovieList";
import Grid from "@mui/material/Grid";
import AddIcon from '@mui/icons-material/Add';
import Fab from "@mui/material/Fab";
import { Link } from "react-router-dom";

const styles = {
  root: { 
    backgroundColor: "#1E1E1E",
  }
};

function FantasyMovieListPageTemplate({ movies, title }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const genreId = Number(genreFilter);

  const displayedMovies = movies
    .filter((m) => {
      return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genres.filter(e => e.id === genreId).length > 0 : true; 
    });

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else setGenreFilter(value);
  };

  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
        <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
          />
        </Grid>
        <FantasyMovieList movies={displayedMovies}></FantasyMovieList>

      </Grid>
      <Link to={`/movies/fantasy/new`}>
        <Fab
          color="secondary"
          variant="extended"
          sx={{
            position: 'fixed',
            bottom: '1em',
            right: '1em'
          }}
        >
          <AddIcon />
          New Fantasy Movie
        </Fab>
      </Link>
    </Grid>

  );
}
export default FantasyMovieListPageTemplate;