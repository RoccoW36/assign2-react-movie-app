import { Meta, StoryObj } from '@storybook/react';
import ActorHeader from '../components/headerActor';
import { ActorDetailsProps } from '../types/interfaces';

const meta: Meta<typeof ActorHeader> = {
  component: ActorHeader,
  title: 'Components/ActorHeader',
};

export default meta;

type Story = StoryObj<typeof ActorHeader>;

const sampleActor: ActorDetailsProps = {
  id: 1,
  name: 'John Doe',
  profile_path: '/sample-path.jpg',
  popularity: 8.5, 
  known_for_department: 'Acting',
  gender: 1,
  biography: 'Sample biography for John Doe.',
  birthday: '1980-01-01', 
  deathday: '', 
  place_of_birth: 'New York, USA', 
  known_for: [
    { id: 101, title: 'Sample Movie', name: 'Sample Movie', media_type: 'movie' },
    { id: 102, title: 'Another Movie', name: 'Another Movie', media_type: 'movie' }
  ]
};

export const Default: Story = {
  args: {
    actor: sampleActor,
  },
};
