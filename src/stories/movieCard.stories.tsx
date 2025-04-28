import type { Meta, StoryObj } from '@storybook/react';
import MovieCard from "../components/movieCard";
import SampleMovie from "./sampleMovieData"; 
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites";

const meta = {
  title: 'Home Page/MovieCard',
  component: MovieCard,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <MoviesContextProvider>{Story()}</MoviesContextProvider>,
  ],
} satisfies Meta<typeof MovieCard>;

export default meta;

type Story = StoryObj<typeof meta>;

const sampleMovieWithProductionCountry = {
  ...SampleMovie,
  production_country: [SampleMovie.production_countries[0]],
};

export const Basic: Story = {
  args: {
    action: (movie) => <AddToFavouritesIcon {...movie} />,
    movie: sampleMovieWithProductionCountry,
  }
};
Basic.storyName = "Default";

const sampleNoPoster = { ...sampleMovieWithProductionCountry, poster_path: undefined };
export const Exceptional: Story = {
  args: {
    movie: sampleNoPoster,
    action: (movie) => <AddToFavouritesIcon {...movie} />,
  }
};
Exceptional.storyName = "Exception";

