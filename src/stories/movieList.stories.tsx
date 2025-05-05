import { StoryFn, Meta } from "@storybook/react";
import MovieList from "../components/movieList";
import SampleMovie from "./sampleMovieData";
import { MemoryRouter } from "react-router";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import Grid from "@mui/material/Grid";
import MoviesContextProvider from "../contexts/moviesContext";
import { BaseMovieProps, BaseMovieListProps } from "../types/interfaces";

export default {
  title: "Home Page/MovieList",
  component: MovieList,
  decorators: [
    (Story: StoryFn) => (
      <MemoryRouter initialEntries={["/"]}>
        <Story />
      </MemoryRouter>
    ),
    (Story: StoryFn) => (
      <MoviesContextProvider>
        <Story />
      </MoviesContextProvider>
    ),
  ],
} as Meta;

export const Basic: StoryFn<BaseMovieListProps> = (args: BaseMovieListProps) => {
  return (
    <Grid container spacing={5}>
      <MovieList {...args} />
    </Grid>
  );
};

Basic.args = {
  movies: [
    { ...SampleMovie, id: 1 },
    { ...SampleMovie, id: 2 },
    { ...SampleMovie, id: 3 },
    { ...SampleMovie, id: 4 },
    { ...SampleMovie, id: 5 },
  ],
  action: (movie: BaseMovieProps) => <AddToFavouritesIcon {...movie} />,
};


Basic.storyName = "Default";
