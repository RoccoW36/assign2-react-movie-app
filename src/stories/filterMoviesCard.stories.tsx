import FilterMoviesCard from "../components/filterMoviesCard";
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
  title: "Discover Movie Page/FilterMoviesCard",
  component: FilterMoviesCard,
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
    <FilterMoviesCard
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
