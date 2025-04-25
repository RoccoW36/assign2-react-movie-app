import React, { ChangeEvent } from "react";
import { useQuery } from "react-query";
import { getGenres, getCountries } from "../../api/tmdb-api";
import { FilterOption, GenreData } from "../../types/interfaces";
import {
  Card,
  CardContent,
  Typography,
  InputLabel,
  MenuItem,
  TextField,
  FormControl,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import Spinner from "../spinner";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import SortIcon from "@mui/icons-material/Sort";

const styles = {
  root: {
    maxWidth: 345,
  },
  formControl: {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)",
  },
};

interface FilterMoviesCardProps {
  onUserInput: (f: FilterOption, s: string) => void;
  titleFilter: string;
  genreFilter: string;
  ratingFilter: string;
  productionCountryFilter: string;
  sortOption: string;
}

const FilterMoviesCard: React.FC<FilterMoviesCardProps> = ({
  titleFilter,
  genreFilter,
  ratingFilter,
  productionCountryFilter,
  sortOption,
  onUserInput,
}) => {
  const { data: genresData, isLoading: genresLoading, isError: genresError } = useQuery<GenreData, Error>(
    "genres",
    getGenres
  );

  const {
    data: countriesData,
    isLoading: countriesLoading,
    isError: countriesError,
  } = useQuery<Array<{ iso_3166_1: string; english_name: string }>, Error>("countries", getCountries);

  if (genresLoading || countriesLoading) return <Spinner />;
  if (genresError || countriesError) return <h1>Error loading data</h1>;

  const genres = genresData?.genres || [];
  if (!genres.some((g) => g.name === "All")) genres.unshift({ id: "0", name: "All" });

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    onUserInput("title", e.target.value);
  };

  const handleSelectChange = (e: SelectChangeEvent, type: FilterOption) => {
    console.log(`Filter updated: Type: ${type}, Value: ${e.target.value}`);
    onUserInput(type, e.target.value);
  };

  return (
    <>
      <Card sx={styles.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h1">
            <FilterAltIcon fontSize="large" />
            Filter the movies.
          </Typography>
          <TextField
            sx={styles.formControl}
            id="filled-search"
            label="Search by Movie Name"
            type="search"
            variant="filled"
            value={titleFilter}
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
              {countriesData?.map((country) => (
                <MenuItem key={country.iso_3166_1} value={country.iso_3166_1}>
                  {country.english_name}
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
            Sort the movies.
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
              <MenuItem value="release_date.desc">Release Date (Newest → Oldest)</MenuItem>
              <MenuItem value="release_date.asc">Release Date (Oldest → Newest)</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
      </Card>
    </>
  );
};

export default FilterMoviesCard;
