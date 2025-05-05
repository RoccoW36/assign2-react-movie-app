import type { Meta, StoryFn } from "@storybook/react";
import ActorDetails from "../components/actorDetails";
import SampleActor from "./sampleActorData";
import { MemoryRouter } from "react-router";
import ActorContextProvider from "../contexts/actorsContext";
import type { BaseActorProps } from "../types/interfaces";

const meta: Meta<typeof ActorDetails> = {
  title: "Actor Details Page/ActorDetails",
  component: ActorDetails,
  decorators: [
    (Story: StoryFn) => (
      <MemoryRouter initialEntries={["/"]}>
        <Story />
      </MemoryRouter>
    ),
    (Story: StoryFn) => (
      <ActorContextProvider>
        <Story />
      </ActorContextProvider>
    ),
  ],
};

export default meta;

export const Basic: StoryFn = () => (
  <ActorDetails
    actor={{
      ...SampleActor,
      biography: "Some biography text here",
      known_for: SampleActor.known_for || [],
    } as BaseActorProps & { biography: string; known_for: { id: number; title?: string; name?: string; media_type?: string }[] }}
  />
);
Basic.storyName = "NoDeathDay";

export const Alternate: StoryFn = () => (
  <ActorDetails
    actor={{
      ...SampleActor,
      biography: "Some biography text here", 
      deathday: "2022-12-31",
      known_for: SampleActor.known_for || [],
    } as BaseActorProps & { biography: string; deathday: string; known_for: { id: number; title?: string; name?: string; media_type?: string }[] }}
  />
);
Alternate.storyName = "WithDeathDay";
