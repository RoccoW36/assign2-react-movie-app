import React from "react";
import { TextField, MenuItem, FormControl, InputLabel, Select, Typography, Box, Divider } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

interface FilterReviewsCardProps {
  onUserInput: (name: string, value: string) => void;
  movieIdFilter: string;
  reviewerIdFilter: string;
  contentFilter: string;
  dateFilter: string;
  sortOption: string;
}

const FilterReviewsCard: React.FC<FilterReviewsCardProps> = ({
  onUserInput,
  movieIdFilter,
  reviewerIdFilter,
  contentFilter,
  dateFilter,
  sortOption,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    onUserInput(e.target.name as string, e.target.value as string);
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    onUserInput(e.target.name as string, e.target.value);
  };

  return (
    <Box sx={{ width: 300, padding: 2 }}>
      <Typography variant="h6" gutterBottom>
        Filter Reviews
      </Typography>

      <TextField
        label="Movie ID"
        variant="outlined"
        name="movieId"
        value={movieIdFilter}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Reviewer ID"
        variant="outlined"
        name="reviewerId"
        value={reviewerIdFilter}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Review Text"
        variant="outlined"
        name="content"
        value={contentFilter}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Review Date"
        variant="outlined"
        name="reviewDate"
        value={dateFilter}
        type="date"
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />

      <Divider sx={{ marginY: 2 }} />

      <FormControl fullWidth>
        <InputLabel id="sort-label">Sort By</InputLabel>
        <Select
          labelId="sort-label"
          name="sortOption"
          value={sortOption}
          label="Sort By"
          onChange={handleSelectChange}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="dateAsc">Review Date (Oldest First)</MenuItem>
          <MenuItem value="dateDesc">Review Date (Newest First)</MenuItem>
          <MenuItem value="movieId">Movie ID</MenuItem>
          <MenuItem value="reviewerId">Reviewer ID</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterReviewsCard;
