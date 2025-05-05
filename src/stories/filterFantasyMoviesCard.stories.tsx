import FilterFantasyMoviesCard from "../components/filterFantasyMoviesCard";
import { MemoryRouter } from "react-router";
import { action } from "@storybook/addon-actions";
import { QueryClientProvider, QueryClient } from "react-query";
import { StoryFn } from "@storybook/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000,
      refetchOnWindowFocus: false,
    },
  },
});

export default {
  title: "Fantasy Movies Page/FilterFantasyMoviesCard",
  component: FilterFantasyMoviesCard,
  decorators: [
    (Story: StoryFn) => (
      <MemoryRouter initialEntries={["/"]}>
        <Story />
      </MemoryRouter>
    ),
    (Story: StoryFn) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
};

export const Basic = () => {
  return (
    <FilterFantasyMoviesCard
      titleFilter=""
      genreFilter=""
      ratingFilter=""
      productionCountryFilter=""
      sortOption=""
      onUserInput={action("filter input")}
    />
  );
};
Basic.storyName = "Default";
