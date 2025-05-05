import ActorHeader from "../components/headerActor";
import Sampleactor from "./sampleActorData";
import { MemoryRouter } from "react-router";
import ActorContextProvider from "../contexts/actorsContext";
import { StoryFn, Meta } from "@storybook/react";

const actorWithBiography = {
  ...Sampleactor,
  biography: Sampleactor.biography || "Biography not available",
  deathday: Sampleactor.deathday || undefined,
};

export default {
  title: "Actor Details Page/ActorHeader",
  component: ActorHeader,
  decorators: [
    (Story: StoryFn, context) => <MemoryRouter initialEntries={["/"]}>{Story({}, context)}</MemoryRouter>,
    (Story: StoryFn, context) => <ActorContextProvider>{Story({}, context)}</ActorContextProvider>,
  ],  
  argTypes: {
    actor: { control: "object" },
  },
} as Meta;

export const Basic = (args: any) => <ActorHeader actor={actorWithBiography} {...args} />;

Basic.storyName = "Default";
