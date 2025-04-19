import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import MovieList from "../movieList";
import PaginationUI from "../PaginationUI";
import { MovieListPageTemplateProps } from "../../types/interfaces";

const styles = {
  root: { 
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    paddingTop: "20px",
  },
};

interface MovieListPageTemplateExtendedProps extends MovieListPageTemplateProps {
  onBack?: () => void;
  onForward?: () => void;
  page?: number;
  handlePageChange?: (event: React.ChangeEvent<unknown>, value: number) => void;
  totalPages?: number;
}

const MovieListPageTemplate: React.FC<MovieListPageTemplateExtendedProps> = ({
  movies,
  title,
  action,
  onBack,
  onForward,
  page,
  handlePageChange,
  totalPages,
}) => {
  return (
    <Grid container direction="column" sx={styles.root} spacing={2}>
    
      <Grid item>
        <Header title={title} onBack={onBack} onForward={onForward} />
      </Grid>

      <Grid item sx={{ padding: "0 20px" }}>
        <Grid container spacing={3} justifyContent="center">
          <MovieList action={action} movies={movies} />
        </Grid>
      </Grid>

      {page !== undefined && handlePageChange && totalPages !== undefined && (
        <Grid item sx={{ padding: "0 20px" }}>
          <PaginationUI
            page={page}
            handlePageChange={handlePageChange}
            totalPages={totalPages}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default MovieListPageTemplate;
