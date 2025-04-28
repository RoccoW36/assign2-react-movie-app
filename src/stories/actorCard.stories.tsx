import { Meta, StoryObj } from '@storybook/react';
import ActorCard from '../components/actorCard';
import { BaseActorProps } from '../types/interfaces';

const meta: Meta<typeof ActorCard> = {
  component: ActorCard,
  title: 'Components/ActorCard',
};

export default meta;

type Story = StoryObj<typeof ActorCard>;

const sampleActor: BaseActorProps = {
  id: 1,
  name: 'John Doe',
  profile_path: '/sample-path.jpg',
  gender: 2,
  popularity: 8.5,
  known_for_department: 'Acting',
  known_for: [
    { id: 101, title: 'Sample Movie', name: 'Sample Movie' },
    { id: 102, title: 'Another Movie', name: 'Another Movie' },
  ],
};

export const Default: Story = {
  args: {
    actor: sampleActor,
    action: () => <button>Sample Action</button>,
  },
};
