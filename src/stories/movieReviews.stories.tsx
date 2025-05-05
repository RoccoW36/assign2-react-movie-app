import { StoryFn, Meta } from "@storybook/react";
import MovieReviews from "../components/movieReviews";
import { MemoryRouter } from "react-router";
import SampleMovie from "./sampleMovieData";
import MoviesContextProvider from "../contexts/moviesContext";
import { MovieDetailsProps } from "../types/interfaces";

export default {
  title: "Movie Details Page/MovieReviews",
  component: MovieReviews,
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

export const Basic: StoryFn<MovieDetailsProps> = (args: MovieDetailsProps) => <MovieReviews {...args} />;

Basic.args = {
  ...SampleMovie,
};

Basic.storyName = "Default";
