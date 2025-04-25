import React from "react";
import SiteHeader from "../components/siteHeader";
import { MemoryRouter } from "react-router";
import type { Meta, StoryObj } from '@storybook/react';
import { ThemeProvider, createTheme } from "@mui/material/styles";

const meta = {
  title: "App Header",
  component: SiteHeader,
  decorators: [
    (Story: React.FC) => (
      <MemoryRouter initialEntries={["/"]}>
        <ThemeProvider theme={createTheme()}>
          <Story />
        </ThemeProvider>
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof SiteHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
Basic.storyName = "Default";

export const DarkMode: Story = {
  args: {},
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

DarkMode.storyName = "Dark Mode";

export const Mobile: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
Mobile.storyName = "Mobile View";