import React from 'react';

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

  known_for_department: 'Acting',

  profile_path: '/sample-path.jpg',

  gender: 2,

  biography: 'Sample biography',

  birthday: '1980-01-01',

  place_of_birth: 'New York, USA',

};

 

export const Default: Story = {

  args: {

    actor: sampleActor,

  },

};