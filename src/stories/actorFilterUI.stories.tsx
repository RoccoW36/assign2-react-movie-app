import { Meta, StoryObj } from '@storybook/react';
import ActorFilterUI from '../components/actorFilterUI';

const meta: Meta<typeof ActorFilterUI> = {
  component: ActorFilterUI,
  title: 'Components/ActorFilterUI',
};

export default meta;

type Story = StoryObj<typeof ActorFilterUI>;

export const Default: Story = {
  args: {
    onFilterValuesChange: (type, value) => console.log(`Filter changed: ${type} = ${value}`),
    nameFilter: '',
    genderFilter: 0,
  },
};