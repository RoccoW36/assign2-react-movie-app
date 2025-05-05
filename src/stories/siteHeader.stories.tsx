import React from "react";
import SiteHeader from "../components/siteHeader";
import { MemoryRouter } from "react-router";
import AuthProvider from "../contexts/authContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkModeTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
    background: {
      default: "#121212",
    },
  },
});

const lightModeTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#6c5ce7",
    },
    background: {
      default: "#fff",
    },
  },
});

export default {
  title: "App Header",
  component: SiteHeader,
  decorators: [
    (Story: React.FC) => (
      <MemoryRouter initialEntries={["/"]}>
        <AuthProvider>
          <Story />
        </AuthProvider>
      </MemoryRouter>
    ),
  ],
};

export const Basic = () => <SiteHeader />;
Basic.storyName = "Default";

export const LightMode = () => (
  <ThemeProvider theme={lightModeTheme}>
    <SiteHeader />
  </ThemeProvider>
);

export const DarkMode = () => (
  <ThemeProvider theme={darkModeTheme}>
    <SiteHeader />
  </ThemeProvider>
);
