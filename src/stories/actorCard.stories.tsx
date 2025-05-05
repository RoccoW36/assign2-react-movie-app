import type { Meta, StoryFn } from "@storybook/react";
import ActorCard from "../components/actorCard";
import SampleActor from "./sampleActorData";
import { MemoryRouter } from "react-router";
import ActorContextProvider from "../contexts/actorsContext";
import AddToActorFavouritesIcon from "../components/cardIcons/addToActorFavourites";
import type { BaseActorProps } from "../types/interfaces";

const meta: Meta<typeof ActorCard> = {
  title: "Actor List/ActorCard",
  component: ActorCard,
  decorators: [
    (Story: StoryFn) => <MemoryRouter initialEntries={["/"]}>{<Story />}</MemoryRouter>,
    (Story: StoryFn) => <ActorContextProvider>{<Story />}</ActorContextProvider>,
  ],
};

export default meta;

export const Basic: StoryFn = () => (
  <ActorCard
    actor={SampleActor}
    action={(actor: BaseActorProps) => <AddToActorFavouritesIcon actor={actor} />}
  />
);
Basic.storyName = "Default";

export const Exceptional: StoryFn = () => {
  const sampleNoProfile = { ...SampleActor, profile_path: undefined };
  return (
    <ActorCard
      actor={sampleNoProfile}
      action={(actor: BaseActorProps) => <AddToActorFavouritesIcon actor={actor} />}
    />
  );
};
Exceptional.storyName = "exception";
