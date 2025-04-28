import { Meta, StoryObj } from '@storybook/react';
import ActorDetails from '../components/actorDetails';
import { ActorDetailsProps } from '../types/interfaces';

const meta: Meta<typeof ActorDetails> = {
  component: ActorDetails,
  title: 'Components/ActorDetails',
};

export default meta;

type Story = StoryObj<typeof ActorDetails>;

const sampleActor: ActorDetailsProps = {
  id: 1,
  name: 'John Doe',
  biography: 'This is a sample biography for John Doe.',
  birthday: '1980-01-01',
  place_of_birth: 'New York, USA',
  gender: 2,
  known_for_department: 'Acting',
  known_for: [
    { id: 101, title: 'Action Movie', name: 'Action Movie', media_type: 'movie' },
  ],
  popularity: 8.5,
};

export const Default: Story = {
  args: {
    actor: sampleActor,
  },
};
