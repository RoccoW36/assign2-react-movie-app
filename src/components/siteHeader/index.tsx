import React, { useState, ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import { useAuth } from "../../contexts/authContext";
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
  Avatar,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
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
  const [authMenuAnchorEl, setAuthMenuAnchorEl] = useState<null | HTMLElement>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const { isSignedin, signout, username } = useAuth();

  const handleAuthMenuOpen = (event: MouseEvent<HTMLElement>) => {
    setAuthMenuAnchorEl(event.currentTarget);
  };

  const handleAuthMenuClose = () => {
    setAuthMenuAnchorEl(null);
  };

  const handleSignOut = () => {
    signout();
    navigate("/");
    handleAuthMenuClose();
  };

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

  const homeOption = { label: "Home", path: "/" };

  const moviesMenu = [
    { label: "Discover Movies", path: "/movies" },
    { label: "Upcoming Movies", path: "/movies/upcoming" },
    { label: "Now Playing", path: "/movies/nowplaying" },
    { label: "Top Rated Movies", path: "/movies/toprated" },
    { label: "Favourite Movies", path: "/movies/favourites" },
    { label: "Must Watch Movies", path: "/movies/mustwatch" },
    { label: "Fantasy Movies", path: "/movies/fantasy" },
  ];

  const tvShowsMenu = [
    { label: "Discover TV Shows", path: "/tv" },
    { label: "Airing Today", path: "/tv/airingtoday" },
    { label: "Top Rated TV", path: "/tv/toprated" },
    { label: "Favourite TV", path: "/tv/favourites" },
    { label: "Must Watch TV", path: "/tv/mustwatch" },
  ];

  const actorsMenu = [
    { label: "Popular Actors", path: "/actors" },
    { label: "Favourite Actors", path: "/actors/favourites" },
  ];

  const renderAuthMenu = () => (
    <Menu anchorEl={authMenuAnchorEl} open={Boolean(authMenuAnchorEl)} onClose={handleAuthMenuClose}>
      {isSignedin ? (
        <>
          <MenuItem onClick={() => { navigate("/profile"); handleAuthMenuClose(); }}>Profile</MenuItem>
          <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
        </>
      ) : (
        <>
          <MenuItem onClick={() => { navigate("/login"); handleAuthMenuClose(); }}>Login</MenuItem>
          <MenuItem onClick={() => { navigate("/signup"); handleAuthMenuClose(); }}>Signup</MenuItem>
        </>
      )}
    </Menu>
  );

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
          <Typography variant="h5" sx={{ flexGrow: 1, cursor: "pointer" }} onClick={() => navigate("/")}>
            TMDB Client
          </Typography>

          <Box sx={{ position: "relative", borderRadius: 1, backgroundColor: alpha("#ffffff", 0.15), marginRight: 2, marginLeft: 2, maxWidth: 300, flexGrow: 1 }}>
            <InputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              sx={{ color: "inherit", padding: "8px 8px 8px 40px", width: "100%" }}
            />
          </Box>

          <Switch checked={darkMode} onChange={toggleDarkMode} />

          {!isMobile ? (
            <>
              <Button color={location.pathname === homeOption.path ? "secondary" : "inherit"} onClick={() => handleMenuSelect(homeOption.path)}>
                Home
              </Button>

              {/* 🔥 My Movie Reviews Button */}
              <Button color={location.pathname === "/reviews" ? "secondary" : "inherit"} onClick={() => navigate("/reviews")}>
                My Movie Reviews
              </Button>

              <Button color="inherit" startIcon={<MovieIcon />} onClick={(e) => setMoviesMenuAnchorEl(e.currentTarget)}>
                Movies
              </Button>
              <Menu anchorEl={moviesMenuAnchorEl} open={Boolean(moviesMenuAnchorEl)} onClose={() => setMoviesMenuAnchorEl(null)}>
                {moviesMenu.map((opt) => (
                  <MenuItem key={opt.label} onClick={() => handleMenuSelect(opt.path)}>{opt.label}</MenuItem>
                ))}
              </Menu>

              <Button color="inherit" startIcon={<TvIcon />} onClick={(e) => setTVShowsMenuAnchorEl(e.currentTarget)}>
                TV Shows
              </Button>
              <Menu anchorEl={tvShowsMenuAnchorEl} open={Boolean(tvShowsMenuAnchorEl)} onClose={() => setTVShowsMenuAnchorEl(null)}>
                {tvShowsMenu.map((opt) => (
                  <MenuItem key={opt.label} onClick={() => handleMenuSelect(opt.path)}>{opt.label}</MenuItem>
                ))}
              </Menu>

              <Button color="inherit" startIcon={<PersonIcon />} onClick={(e) => setActorsMenuAnchorEl(e.currentTarget)}>
                Actors
              </Button>
              <Menu anchorEl={actorsMenuAnchorEl} open={Boolean(actorsMenuAnchorEl)} onClose={() => setActorsMenuAnchorEl(null)}>
                {actorsMenu.map((opt) => (
                  <MenuItem key={opt.label} onClick={() => handleMenuSelect(opt.path)}>{opt.label}</MenuItem>
                ))}
              </Menu>

              <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                <Tooltip title={isSignedin ? `Welcome, ${username}` : "Account"}>
                  <IconButton onClick={handleAuthMenuOpen} color="inherit" size="large">
                    {isSignedin ? <Avatar>{username?.charAt(0).toUpperCase()}</Avatar> : <AccountCircleIcon />}
                  </IconButton>
                </Tooltip>
              </Box>
              {renderAuthMenu()}
            </>
          ) : (
            <IconButton aria-label="menu" color="inherit" size="large">
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </ThemeProvider>
  );
};

export default SiteHeader;
