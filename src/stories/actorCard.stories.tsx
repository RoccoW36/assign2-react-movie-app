import type { Meta, StoryObj } from "@storybook/react";
import ActorCard from "../components/actorCard";
import SampleActor from "./sampleActorData";
import { MemoryRouter } from "react-router";
import ActorsContextProvider from "../contexts/actorsContext"; 
import { action } from "@storybook/addon-actions";
import AddToFavoritesIcon from "../components/cardIcons/addToFavourites";
import React from "react";

const meta = {
  title: "Actors Page/ActorCard",
  component: ActorCard,
  decorators: [
    (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    (Story) => <ActorsContextProvider>{Story()}</ActorsContextProvider>,
  ],
} satisfies Meta<typeof ActorCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    action: (actor) => <AddToFavoritesIcon {...actor} />,
    actor: SampleActor,
  },
};
Basic.storyName = "Default";

const sampleNoImage = { ...SampleActor, profile_path: undefined };
export const Exceptional: Story = {
  args: {
    actor: sampleNoImage,
    action: (actor) => <AddToFavoritesIcon {...actor} />,
  },
};
Exceptional.storyName = "Exception";
