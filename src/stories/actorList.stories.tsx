import React from 'react';

import { Meta, StoryObj } from '@storybook/react';

import ActorList from '../components/actorList';

import { BaseActorProps } from '../types/interfaces';

 

const meta: Meta<typeof ActorList> = {

  component: ActorList,

  title: 'Components/ActorList',

};

 

export default meta;

 

type Story = StoryObj<typeof ActorList>;

 

const sampleActors: BaseActorProps[] = [

  {

    id: 1,

    name: 'John Doe',

    profile_path: '/sample-path-1.jpg',

    gender: 2,

    popularity: 8.5,

    known_for: [],

  },

  {

    id: 2,

    name: 'Jane Smith',

    profile_path: '/sample-path-2.jpg',

    gender: 1,

    popularity: 7.8,

    known_for: [],

  },

];

 

export const Default: Story = {

  args: {

    actors: sampleActors,

    action: () => <button>Sample Action</button>,

  },

};