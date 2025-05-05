import { StoryFn, Meta } from "@storybook/react";
import MoviesHeader from "../components/headerMovieList";
import { MemoryRouter } from "react-router";
import MoviesContextProvider from "../contexts/moviesContext";

export default {
  title: "Home Page/MoviePageHeader",
  component: MoviesHeader,
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

export const Basic: StoryFn = (args) => <MoviesHeader title="Discover Movies" {...args} />;

Basic.storyName = "Default";
