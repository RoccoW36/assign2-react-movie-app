import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortIcon from "@mui/icons-material/Sort";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React, { ChangeEvent } from "react";
import { FilterOption, GenreData } from "../../types/interfaces";
import { SelectChangeEvent } from "@mui/material";
import { getGenres } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../spinner";

const styles = {
  root: {
    maxWidth: 345,
  },
  media: { height: 300 },
  formControl: {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)",
  },
};

interface FilterTVShowsCardProps {
  onUserInput: (f: FilterOption, s: string) => void;
  titleFilter: string;
  genreFilter: string;
  ratingFilter: string;
  productionCountryFilter: string;
  sortOption: string;
}

const FilterTVShowsCard: React.FC<FilterTVShowsCardProps> = ({
  titleFilter,
  genreFilter,
  ratingFilter,
  productionCountryFilter,
  sortOption,
  onUserInput,
}) => {
  const { data, error, isLoading, isError } = useQuery<GenreData, Error>("genres", getGenres);

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{(error as Error).message}</h1>;

  const genres = data?.genres || [];
  if (!genres.some((g) => g.name === "All")) {
    genres.unshift({ id: "0", name: "All" });
  }

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    onUserInput("title", e.target.value);
  };

  const handleSelectChange = (e: SelectChangeEvent, type: FilterOption) => {
    onUserInput(type, e.target.value);
  };

  return (
    <>
      <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1">
            <FilterAltIcon fontSize="large" />
            Filter the TV Shows.
          </Typography>
          <TextField
            sx={styles.formControl}
            id="filled-search"
            label="Search field"
            type="search"
            value={titleFilter}
            variant="filled"
            onChange={handleTextChange}
          />
          <FormControl sx={styles.formControl}>
            <InputLabel id="genre-label">Genre</InputLabel>
            <Select
              labelId="genre-label"
              id="genre-select"
              value={genreFilter}
              onChange={(e) => handleSelectChange(e, "genre")}
            >
              {genres.map((genre) => (
                <MenuItem key={genre.id} value={genre.id.toString()}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={styles.formControl}>
            <InputLabel id="rating-label">Rating greater than...</InputLabel>
            <Select
              labelId="rating-label"
              id="rating-select"
              value={ratingFilter}
              onChange={(e) => handleSelectChange(e, "rating")}
            >
              {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map((rating) => (
                <MenuItem key={rating} value={rating.toString()}>
                  {rating}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={styles.formControl}>
            <InputLabel id="production-country-label">Production Country</InputLabel>
            <Select
              labelId="production-country-label"
              id="production-country-select"
              value={productionCountryFilter}
              onChange={(e) => handleSelectChange(e, "production country")}
            >
              <MenuItem value="">All</MenuItem>
              {["US", "GB", "CA", "FR", "JP"].map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardContent>
      </Card>
      <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1">
            <SortIcon fontSize="large" />
            Sort the TV Shows.
          </Typography>
          <FormControl sx={styles.formControl}>
            <InputLabel id="sort-label">Sort By</InputLabel>
            <Select
              labelId="sort-label"
              id="sort-select"
              value={sortOption}
              onChange={(e) => handleSelectChange(e, "sortOption")}
            >
              <MenuItem value="vote_average.desc">Rating (High → Low)</MenuItem>
              <MenuItem value="vote_average.asc">Rating (Low → High)</MenuItem>
              <MenuItem value="first_air_date.desc">Release Date (Newest → Oldest)</MenuItem>
              <MenuItem value="first_air_date.asc">Release Date (Oldest → Newest)</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
      </Card>
    </>
  );
};

export default FilterTVShowsCard;
