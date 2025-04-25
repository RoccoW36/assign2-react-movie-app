import React, { ChangeEvent } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const styles = {
  root: {
    maxWidth: 345,
    margin: "0 auto",
  },
  formControl: {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)",
  },
};

interface FilterActorsCardProps {
  onUserInput: (type: "name" | "gender", value: string | number) => void;
  nameFilter: string;
  genderFilter: number;
}

const FilterActorsCard: React.FC<FilterActorsCardProps> = ({
  nameFilter,
  genderFilter,
  onUserInput,
}) => {
  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    onUserInput("name", e.target.value);
  };

  const handleGenderChange = (e: SelectChangeEvent) => {
    onUserInput("gender", Number(e.target.value));
  };

  return (
    <Card sx={styles.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <FilterAltIcon fontSize="large" />
          Filter the actors
        </Typography>

        <TextField
          sx={styles.formControl}
          id="filled-search"
          label="Search by Actor Name"
          type="search"
          value={nameFilter}
          variant="filled"
          onChange={handleNameChange}
        />

        <FormControl sx={styles.formControl}>
          <InputLabel id="gender-label">Gender</InputLabel>
          <Select
            labelId="gender-label"
            id="gender-select"
            value={genderFilter.toString()}
            onChange={handleGenderChange}
          >
            <MenuItem value={0}>All</MenuItem>
            <MenuItem value={1}>Female</MenuItem>
            <MenuItem value={2}>Male</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default FilterActorsCard;
