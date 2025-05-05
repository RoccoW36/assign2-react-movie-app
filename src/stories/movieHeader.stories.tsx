import { Meta, StoryObj, StoryFn } from "@storybook/react";
import MovieHeader from "../components/headerMovie";
import SampleMovie from "./sampleMovieData";
import { MemoryRouter } from "react-router";
import { MovieDetailsProps } from "../types/interfaces";

const meta: Meta<typeof MovieHeader> = {
  title: "Movie Details Page/MovieHeader",
  component: MovieHeader,
  decorators: [
    (Story: StoryFn) => (
      <MemoryRouter initialEntries={["/"]}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;

export const Basic: StoryObj<MovieDetailsProps> = {
  args: {
    ...SampleMovie,
  },
};

Basic.storyName = "Default";
