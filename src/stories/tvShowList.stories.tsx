import TVShowList from "../components/TVShowList";
import { MemoryRouter } from "react-router";
import AddToTVShowFavouritesIcon from "../components/cardIcons/addToTVShowFavourites";
import Grid from "@mui/material/Grid";
import TVShowsContextProvider from "../contexts/tvShowsContext";
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
  title: "Discover TV Page/TVList",
  component: TVShowList,
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
    tvShows: { control: "object" },
  },
} as Meta;

export const Basic: StoryFn = (args) => {
  const tvShows: BaseTVShowProps[] = [
    { ...SampleTVShow, id: 1 },
    { ...SampleTVShow, id: 2 },
    { ...SampleTVShow, id: 3 },
    { ...SampleTVShow, id: 4 },
    { ...SampleTVShow, id: 5 },
  ];

  return (
    <Grid container spacing={5}>
      <TVShowList tvShows={tvShows} action={(tvShow) => <AddToTVShowFavouritesIcon id={tvShow.id} name={""} overview={""} first_air_date={""} vote_average={0} popularity={0} production_country={[]} />}
 {...args} />
    </Grid>
  );
};

Basic.storyName = "Default";
