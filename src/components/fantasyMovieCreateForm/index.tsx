import React, { useState, useContext, useRef } from "react";
import {
  Box, Button, TextField, MenuItem, Typography, Snackbar, Alert, Chip
} from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

import { FantasyMoviesContext } from "../../contexts/fantasyMoviesContext";
import { getGenres, searchPeople, } from "../../api/tmdb-api";
import Spinner from "../spinner";
import styles from "./styles";
import { FantasyMovie, Genre, Actor, FormValues, PersonResult } from "../../types/interfaces";

const FantasyMovieForm: React.FC = () => {
  const {
    control, handleSubmit, formState: { errors }, reset, setValue,
  } = useForm<FormValues>({
    defaultValues: {
      id: 0, title: "", overview: "", release_date: "", genres: [], actors: [], directors: [], image: null, company: ""
    },
  });

  const navigate = useNavigate();
  const context = useContext(FantasyMoviesContext);

  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [selectedActors, setSelectedActors] = useState<Actor[]>([]);
  const [selectedDirectors, setSelectedDirectors] = useState<Actor[]>([]);
  const [image, setImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  const [actorSearchQuery, setActorSearchQuery] = useState<string>("");
  const [directorSearchQuery, setDirectorSearchQuery] = useState<string>("");

  const actorImageInputRef = useRef<HTMLInputElement>(null);

  const { data: genreData, isLoading, isError, error } = useQuery("genres", getGenres);
  const { data: actorData, refetch: refetchActors } = useQuery(
    ["searchActors", actorSearchQuery],
    () => searchPeople(actorSearchQuery),
    { enabled: false }
  );
  const { data: directorData, refetch: refetchDirectors } = useQuery(
    ["searchDirectors", directorSearchQuery],
    () => searchPeople(directorSearchQuery),
    { enabled: false }
  );

  const genres = genreData?.genres || [];

  const handleSnackClose = () => {
    setOpen(false);
    navigate("/movies/fantasy");
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setImageName(file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = (fantasyFormData) => {
    const newId = context.fantasy.length 
        ? Math.max(...context.fantasy.map((m: FantasyMovie) => m.id)) + 1 
        : 0;

        const formattedFantasyMovie: FantasyMovie = {
          ...fantasyFormData,
          id: newId,
          genres: selectedGenres.map(g => ({ id: g.id, name: g.name })),
          actors: selectedActors.map(a => ({ id: a.id, name: a.name })),
          directors: selectedDirectors.map(d => ({ id: d.id, name: d.name })),
          image: image ?? "",
          production_country: fantasyFormData.productionCountries ?? [],
          budget: 0,
          imdb_id: "",
          vote_average: 0,
          popularity: 0,
          tagline: "",
          runtime: 0,
          revenue: 0,
          vote_count: 0,
          favourite: false,
      };
      
    context.addToFantasy(formattedFantasyMovie);
    setOpen(true);
};


  if (isLoading) return <Spinner />;
  if (isError) return <Typography color="error">{(error as Error).message}</Typography>;

  return (
    <Box component="div" sx={styles.root}>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleSnackClose}>
        <Alert severity="success" onClose={handleSnackClose}>
          <Typography variant="h6">Fantasy movie submitted!</Typography>
        </Alert>
      </Snackbar>

      <form style={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller name="title" control={control} rules={{ required: "Title is required" }}
          render={({ field }) => (
            <TextField {...field} label="Movie Title" variant="outlined" fullWidth margin="normal" error={!!errors.title} helperText={errors.title?.message} />
          )}
        />
        <Controller name="overview" control={control} rules={{ required: "Overview is required", minLength: { value: 10, message: "Minimum 10 characters" } }}
          render={({ field }) => (
            <TextField {...field} label="Overview" variant="outlined" fullWidth margin="normal" multiline rows={6} error={!!errors.overview} helperText={errors.overview?.message} />
          )}
        />
        <Controller name="release_date" control={control} rules={{ required: "Release date is required" }}
          render={({ field }) => (
            <TextField {...field} label="Release Date (YYYY-MM-DD)" variant="outlined" fullWidth margin="normal" error={!!errors.release_date} helperText={errors.release_date?.message} />
          )}
        />
        <Controller name="company" control={control} rules={{ required: "Production company is required" }}
          render={({ field }) => (
            <TextField {...field} label="Production Company" variant="outlined" fullWidth margin="normal" error={!!errors.company} helperText={errors.company?.message} />
          )}
        />

        <Box>
          <TextField select label="Select Genre" value="" onChange={(e) => {
         const selectedGenreId = Number(e.target.value);
         const genre = genres.find((g: Genre) => Number(g.id) === selectedGenreId);     
            if (genre && !selectedGenres.some(g => g.id === genre.id)) {
              const updatedGenres = [...selectedGenres, genre];
              setSelectedGenres(updatedGenres);
              setValue("genres", updatedGenres);
            }
          }} fullWidth margin="normal">
            {genres.map((genre: Genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </TextField>

          <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 1 }}>
            {selectedGenres.map((genre) => (
              <Chip
                key={genre.id}
                label={genre.name}
                onDelete={() => {
                  const updatedGenres = selectedGenres.filter(g => g.id !== genre.id);
                  setSelectedGenres(updatedGenres);
                  setValue("genres", updatedGenres);
                }}
                color="secondary"
                sx={{ m: 0.5 }}
              />
            ))}
          </Box>
        </Box>

        <Typography variant="h6" mt={3}>Add Actors</Typography>
        <TextField
          label="Search for People"
          variant="outlined"
          fullWidth
          margin="normal"
          value={actorSearchQuery}
          onChange={(e) => setActorSearchQuery(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); refetchActors(); }}}
        />
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {actorData?.results.map((person: PersonResult) => (
            <Button
              key={person.id}
              variant="outlined"
              size="small"
              onClick={() => {
                if (!selectedActors.some(a => a.id === person.id)) {
                  const updated = [...selectedActors, { id: person.id, name: person.name }];
                  setSelectedActors(updated);
                  setValue("actors", updated);
                }
              }}
              sx={{ m: 0.5 }}
            >
              {person.name}
            </Button>
          ))}
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 1 }}>
          {selectedActors.map((actor) => (
            <Chip
              key={actor.id}
              label={actor.name}
              onDelete={() => {
                const updated = selectedActors.filter(a => a.id !== actor.id);
                setSelectedActors(updated);
                setValue("actors", updated);
              }}
              color="primary"
              deleteIcon={<CancelIcon />}
              sx={{ m: 0.5 }}
            />
          ))}
        </Box>

        <Typography variant="h6" mt={3}>Add Director</Typography>
        <TextField
          label="Search for People"
          variant="outlined"
          fullWidth
          margin="normal"
          value={directorSearchQuery}
          onChange={(e) => setDirectorSearchQuery(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); refetchDirectors(); }}}
        />
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
          {directorData?.results.map((person: PersonResult) => (
            <Button
              key={person.id}
              variant="outlined"
              size="small"
              onClick={() => {
                if (!selectedDirectors.some(d => d.id === person.id)) {
                  const updated = [...selectedDirectors, { id: person.id, name: person.name }];
                  setSelectedDirectors(updated);
                  setValue("directors", updated);
                }
              }}
              sx={{ m: 0.5 }}
            >
              {person.name}
            </Button>
          ))}
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', mt: 1 }}>
          {selectedDirectors.map((director) => (
            <Chip
              key={director.id}
              label={director.name}
              onDelete={() => {
                const updated = selectedDirectors.filter(d => d.id !== director.id);
                setSelectedDirectors(updated);
                setValue("directors", updated);
              }}
              color="primary"
              deleteIcon={<CancelIcon />}
              sx={{ m: 0.5 }}
            />
          ))}
        </Box>

        <Box mt={3}>
          <input
            type="file"
            accept="image/*"
            ref={actorImageInputRef}
            style={{ display: "none" }}
            onChange={handleImageSelect}
          />
          <Button variant="contained" color="primary" onClick={() => actorImageInputRef.current?.click()}>
            Upload Poster
          </Button>
          <Typography mt={1}>{imageName}</Typography>
        </Box>

        <Box mt={4} display="flex" gap={2}>
          <Button type="submit" variant="contained" color="primary">Submit</Button>
          <Button type="reset" variant="outlined" color="secondary" onClick={() => reset()}>Reset</Button>
        </Box>
      </form>
    </Box>
  );
};

export default FantasyMovieForm;
