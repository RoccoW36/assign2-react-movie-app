import { StoryFn, Meta } from "@storybook/react";
import MovieDetails from "../components/movieDetails";
import SampleMovie from "./sampleMovieData";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";
import { MovieDetailsProps } from "../types/interfaces";

export default {
  title: "Movie Details Page/MovieDetails",
  component: MovieDetails,
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

export const Basic: StoryFn<MovieDetailsProps> = (args: MovieDetailsProps) => <MovieDetails {...args} />;

Basic.args = {
  ...SampleMovie,
};

Basic.storyName = "Default";
