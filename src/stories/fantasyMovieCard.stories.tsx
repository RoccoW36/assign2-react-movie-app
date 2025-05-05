import FantasyMovieCard from "../components/fantasyMovieCard";
import { MemoryRouter } from "react-router";
import { FantasyMoviesContextProvider } from "../contexts/fantasyMoviesContext";
import { StoryFn, Meta } from "@storybook/react";
import { FantasyMovie } from "../types/interfaces";

const fantasyMovie: FantasyMovie = {
  id: 1,
  title: "Epic Fantasy Film",
  budget: 150000000,
  imdb_id: "tt1234567",
  overview: "An amazing fantasy story set in a mystical world.",
  release_date: "2025-12-15",
  vote_average: 8.5,
  popularity: 95.3,
  tagline: "An adventure beyond imagination!",
  runtime: 130,
  revenue: 500000000,
  vote_count: 9876,
  production_country: [{ iso_3166_1: "US", name: "United States" }],
  genres: [{ id: "101", name: "Fantasy" }],
  company: "Fantasy Studios",
  actors: [
    { id: 201, name: "John Doe" },
    { id: 202, name: "Jane Smith" },
  ],
  directors: [
    { id: 301, name: "Alice Director" },
  ],
};

export default {
  title: "Fantasy Movie Card/FantasyMovieCard",
  component: FantasyMovieCard,
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
    movie: { control: "object" },
  },
} as Meta;

export const Basic: StoryFn = (args) => <FantasyMovieCard movie={fantasyMovie} {...args} />;

Basic.storyName = "Default";
