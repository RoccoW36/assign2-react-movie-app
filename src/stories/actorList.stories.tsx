import ActorList from "../components/actorList";
import SampleActor from "./sampleActorData";
import { MemoryRouter } from "react-router";
import AddToActorFavouritesIcon from "../components/cardIcons/addToActorFavourites";
import Grid from "@mui/material/Grid";
import ActorContextProvider from "../contexts/actorsContext";
import { StoryFn, Meta } from "@storybook/react";

export default {
  title: "Actor List/ActorList",
  component: ActorList,
  decorators: [
    (Story: StoryFn, context) => (
      <MemoryRouter initialEntries={["/"]}>
        <Story {...context.args} />
      </MemoryRouter>
    ),
    (Story: StoryFn, context) => (
      <ActorContextProvider>
        <Story {...context.args} />
      </ActorContextProvider>
    ),
  ],
  argTypes: {
    actors: { control: "object" },
  },
} as Meta;

export const Basic: StoryFn = (args) => {
  const actors = [
    { ...SampleActor, id: 1 },
    { ...SampleActor, id: 2 },
    { ...SampleActor, id: 3 },
    { ...SampleActor, id: 4 },
    { ...SampleActor, id: 5 },
  ];

  return (
    <Grid container spacing={5}>
      <ActorList
        actors={actors}
        action={(actor) => <AddToActorFavouritesIcon actor={actor} />}
        {...args}
      />
    </Grid>
  );
};

Basic.storyName = "Default";
