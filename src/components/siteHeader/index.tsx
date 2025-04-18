import React, { useState, ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Switch,
  InputBase,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import PersonIcon from "@mui/icons-material/Person";
import { styled, alpha } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme, createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [moviesMenuAnchorEl, setMoviesMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [tvShowsMenuAnchorEl, setTVShowsMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [actorsMenuAnchorEl, setActorsMenuAnchorEl] = useState<null | HTMLElement>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const homeOption = { label: "Home", path: "/" };

  const moviesMenu = [
    { label: "Discover Movies", path: "/movies" },
    { label: "Upcoming Movies", path: "/movies/upcoming" },
    { label: "Favorite Movies", path: "/movies/favourites" },
    { label: "Must Watch Movies", path: "/movies/mustwatch" },
  ];

  const tvShowsMenu = [
    { label: "Discover TV Shows", path: "/tv" },
    { label: "Favorite TV Shows", path: "/tv/favourites" },
    { label: "Must Watch TV Shows", path: "/tv/mustwatch" }, 
  ];

  const actorsMenu = [
    { label: "Popular Actors", path: "/actors" },
    { label: "Favorite Actors", path: "/actors/favourites" },
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleMenuSelect = (path: string) => {
    navigate(path);
    setMoviesMenuAnchorEl(null);
    setTVShowsMenuAnchorEl(null);
    setActorsMenuAnchorEl(null);
  };

  const handleMoviesMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setMoviesMenuAnchorEl(event.currentTarget);
  };

  const handleTVShowsMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setTVShowsMenuAnchorEl(event.currentTarget);
  };

  const handleActorsMenuOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setActorsMenuAnchorEl(event.currentTarget);
  };

  const customTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: darkMode ? "#1976d2" : "#6c5ce7",
      },
      background: {
        default: darkMode ? "#121212" : "#fff",
      },
    },
  });

  return (
    <ThemeProvider theme={customTheme}>
      <AppBar position="sticky" elevation={2}>
        <Toolbar>
          <Typography
            variant="h5"
            sx={{ flexGrow: 1, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            TMDB Client
          </Typography>

          {/* Search Box */}
          <Box
            sx={{
              position: "relative",
              borderRadius: 1,
              backgroundColor: alpha("#ffffff", 0.15),
              marginRight: 2,
              marginLeft: 2,
              maxWidth: 300,
              flexGrow: 1,
            }}
          >
            <InputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              sx={{
                color: "inherit",
                padding: "8px 8px 8px 40px",
                width: "100%",
              }}
            />
          </Box>

          {/* Dark Mode Switch */}
          <Switch checked={darkMode} onChange={toggleDarkMode} />

          {!isMobile ? (
            <>
              {/* Home Button */}
              <Button
                color={location.pathname === homeOption.path ? "secondary" : "inherit"}
                onClick={() => handleMenuSelect(homeOption.path)}
              >
                Home
              </Button>

              {/* Movies Button */}
              <Button
                color="inherit"
                startIcon={<MovieIcon />}
                onClick={handleMoviesMenuOpen}
              >
                Movies
              </Button>
              <Menu
                anchorEl={moviesMenuAnchorEl}
                open={Boolean(moviesMenuAnchorEl)}
                onClose={() => setMoviesMenuAnchorEl(null)}
              >
                {moviesMenu.map((opt) => (
                  <MenuItem key={opt.label} onClick={() => handleMenuSelect(opt.path)}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>

              {/* TV Shows Button */}
              <Button
                color="inherit"
                startIcon={<TvIcon />}
                onClick={handleTVShowsMenuOpen}
              >
                TV Shows
              </Button>
              <Menu
                anchorEl={tvShowsMenuAnchorEl}
                open={Boolean(tvShowsMenuAnchorEl)}
                onClose={() => setTVShowsMenuAnchorEl(null)}
              >
                {tvShowsMenu.map((opt) => (
                  <MenuItem key={opt.label} onClick={() => handleMenuSelect(opt.path)}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>

              {/* Actors Button */}
              <Button
                color="inherit"
                startIcon={<PersonIcon />}
                onClick={handleActorsMenuOpen}
              >
                Actors
              </Button>
              <Menu
                anchorEl={actorsMenuAnchorEl}
                open={Boolean(actorsMenuAnchorEl)}
                onClose={() => setActorsMenuAnchorEl(null)}
              >
                {actorsMenu.map((opt) => (
                  <MenuItem key={opt.label} onClick={() => handleMenuSelect(opt.path)}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <>
              {/* Mobile Menu */}
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMoviesMenuOpen}
                color="inherit"
                size="large"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={moviesMenuAnchorEl}
                open={Boolean(moviesMenuAnchorEl)}
                onClose={() => setMoviesMenuAnchorEl(null)}
              >
                <MenuItem onClick={() => handleMenuSelect(homeOption.path)}>Home</MenuItem>
                {moviesMenu.map((opt) => (
                  <MenuItem key={opt.label} onClick={() => handleMenuSelect(opt.path)}>
                    {opt.label}
                  </MenuItem>
                ))}
                {tvShowsMenu.map((opt) => (
                  <MenuItem key={opt.label} onClick={() => handleMenuSelect(opt.path)}>
                    {opt.label}
                  </MenuItem>
                ))}
                {actorsMenu.map((opt) => (
                  <MenuItem key={opt.label} onClick={() => handleMenuSelect(opt.path)}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </ThemeProvider>
  );
};

export default SiteHeader;
