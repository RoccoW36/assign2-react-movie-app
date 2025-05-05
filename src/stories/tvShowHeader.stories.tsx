import TVShowHeader from "../components/headerTVShow";
import { MemoryRouter } from "react-router";
import TVShowsContextProvider from "../contexts/tvShowsContext";
import { StoryFn, Meta } from "@storybook/react";
import { TVShowDetailsProps } from "../types/interfaces";

const SampleTVShow: TVShowDetailsProps = {
  id: 1,
  name: "Epic TV Show",
  overview: "An engaging story set in a futuristic world.",
  first_air_date: "2025-12-15",
  vote_average: 8.2,
  popularity: 90.5,
  poster_path: "/tv-show.jpg",
  tagline: "A tale beyond imagination!",
  favourite: false,
  genre_ids: [101, 102],
  isFavourite: true,
  production_country: [{ iso_3166_1: "US", name: "United States" }],
  genres: [{ id: "101", name: "Sci-Fi" }],
  origin_country: ["US"],
  number_of_episodes: 20,
  number_of_seasons: 2,
  homepage: "https://example.com/tvshow",
};

export default {
  title: "App Components/TV Show Header",
  component: TVShowHeader,
  decorators: [
    (Story: StoryFn, context) => (
      <MemoryRouter initialEntries={["/"]}>
        <Story {...context.args} />
      </MemoryRouter>
    ),
    (Story: StoryFn, context) => (
      <TVShowsContextProvider>
        <Story {...context.args} />
      </TVShowsContextProvider>
    ),
  ],
  argTypes: {
    tvShow: { control: "object" },
  },
} as Meta;

export const Basic: StoryFn = (args) => <TVShowHeader tvShow={SampleTVShow} {...args} />;

Basic.storyName = "Default";
