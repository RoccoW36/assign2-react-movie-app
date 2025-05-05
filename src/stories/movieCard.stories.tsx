import { StoryFn, Meta } from "@storybook/react";
import MovieCard from "../components/movieCard";
import SampleMovie from "./sampleMovieData";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";
import { MovieCardProps } from "../components/movieCard";

export default {
  title: "Home Page/MovieCard",
  component: MovieCard,
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
} as Meta<typeof MovieCard>;

export const Basic: StoryFn<MovieCardProps> = (args) => (
  <MovieCard {...args} />
);

Basic.args = {
  movie: SampleMovie,
  action: (movie) => <AddToFavouritesIcon {...movie} />,
};

export const Exceptional: StoryFn<MovieCardProps> = (args) => (
  <MovieCard {...args} />
);

Exceptional.args = {
  movie: {
    ...SampleMovie,
    poster_path: undefined,
  },
  action: (movie) => <AddToFavouritesIcon {...movie} />,
};

Exceptional.storyName = "Exception";
