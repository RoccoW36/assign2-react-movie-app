import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { searchMovies, searchActors } from "../api/tmdb-api"; // Make sure these functions are available in tmdb-api
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Tabs,
  Tab,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// ⭐ Styled Card with Hover Effect
const HoverCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: theme.shadows[6],
  },
}));

const SearchPage: React.FC = () => {
  const location = useLocation();
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState(0); // 0 for Movies, 1 for Actors

  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  const fetchResults = async (type: string) => {
    if (!query) return;
    setLoading(true);
    setError(null);

    try {
      let data;
      if (type === "movie") {
        data = await searchMovies(query);
      } else if (type === "actor") {
        data = await searchActors(query);
      }

      setResults(data.results);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      fetchResults("movie"); // Default search type is movie
    }
  }, [query]);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    const type = newValue === 0 ? "movie" : "actor";
    fetchResults(type);
  };

  if (!query) {
    return <div style={{ padding: "20px" }}>Please enter a search query.</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Search results for "{query}"
      </Typography>

      <Tabs value={selectedTab} onChange={handleTabChange} aria-label="search-tabs">
        <Tab label="Movies" />
        <Tab label="Actors" />
      </Tabs>

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      {!loading && !error && results.length === 0 && (
        <Typography>No results found.</Typography>
      )}

      <Grid container spacing={3}>
        {results.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
            <Link
              to={`/${selectedTab === 0 ? "movies" : "actors"}/${item.id}`}
              style={{ textDecoration: "none" }}
            >
              <HoverCard>
                {selectedTab === 0 ? (
                  // Movie Image
                  item.poster_path ? (
                    <CardMedia
                      component="img"
                      image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt={item.title || item.name}
                      sx={{ height: 300 }}
                    />
                  ) : (
                    <div
                      style={{
                        height: 300,
                        backgroundColor: "#ccc",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="subtitle1">No Image</Typography>
                    </div>
                  )
                ) : (
                  // Actor Image
                  item.profile_path ? (
                    <CardMedia
                      component="img"
                      image={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                      alt={item.name}
                      sx={{ height: 300 }}
                    />
                  ) : (
                    <div
                      style={{
                        height: 300,
                        backgroundColor: "#ccc",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="subtitle1">No Image</Typography>
                    </div>
                  )
                )}
                <CardContent>
                  <Typography variant="h6" gutterBottom noWrap>
                    {item.title || item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.release_date || item.first_air_date || "Unknown"}
                  </Typography>
                </CardContent>
              </HoverCard>
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default SearchPage;
