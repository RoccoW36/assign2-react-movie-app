import TVShowCard from "../components/TVShowCard";
import { MemoryRouter } from "react-router";
import { StoryFn, Meta } from "@storybook/react";
import { BaseTVShowProps } from "../types/interfaces";

const SampleTVShow: BaseTVShowProps = {
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
};

export default {
  title: "App Components/TV Show Card",
  component: TVShowCard,
  decorators: [
    (Story: StoryFn, context) => (
      <MemoryRouter initialEntries={["/"]}>
        <Story {...context.args} />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    tvShow: { control: "object" },
  },
} as Meta;

export const Basic: StoryFn = (args) => <TVShowCard tvShow={SampleTVShow} action={() => <></>} {...args} />;

Basic.storyName = "Default";
