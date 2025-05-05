import FantasyList from "../components/fantasyMovieList";
import { MemoryRouter } from "react-router";
import Grid from "@mui/material/Grid";
import { FantasyMoviesContextProvider } from "../contexts/fantasyMoviesContext";
import { StoryFn, Meta } from "@storybook/react";
import { FantasyMovie } from "../types/interfaces";

const SampleFantasy: FantasyMovie = {
  id: 1,
  title: "Epic Fantasy Film",
  budget: 150000000,
  homepage: "https://fantasystudios.com",
  imdb_id: "tt1234567",
  overview: "An amazing fantasy story set in a mystical world.",
  release_date: "2025-12-15",
  vote_average: 8.5,
  popularity: 95.3,
  poster_path: "/fantasy-movie.jpg",
  tagline: "An adventure beyond imagination!",
  runtime: 130,
  revenue: 500000000,
  vote_count: 9876,
  favourite: false,
  genre_ids: [101, 102],
  production_country: [{ iso_3166_1: "US", name: "United States" }],
  genres: [{ id: "101", name: "Fantasy" }],
  company: "Fantasy Studios",
  actors: [{ id: 201, name: "John Doe" }, { id: 202, name: "Jane Smith" }],
  directors: [{ id: 301, name: "Alice Director" }],
  image: "https://example.com/fantasy-movie.jpg",
};

export default {
  title: "Fantasy Movie List/FantasyMovieList",
  component: FantasyList,
  decorators: [
    (Story: StoryFn, context) => (
      <MemoryRouter initialEntries={["/"]}>
        <Story {...context.args} />
      </MemoryRouter>
    ),
    (Story: StoryFn, context) => (
      <FantasyMoviesContextProvider>
        <Story {...context.args} />
      </FantasyMoviesContextProvider>
    ),
  ],
  argTypes: {
    movies: { control: "object" },
  },
} as Meta;

export const Basic: StoryFn = (args) => {
  const movies: FantasyMovie[] = [
    { ...SampleFantasy, id: 1 },
    { ...SampleFantasy, id: 2 },
    { ...SampleFantasy, id: 3 },
    { ...SampleFantasy, id: 4 },
    { ...SampleFantasy, id: 5 },
  ];
  return (
    <Grid container spacing={5}>
      <FantasyList movies={movies} {...args} />
    </Grid>
  );
};

Basic.storyName = "Default";
