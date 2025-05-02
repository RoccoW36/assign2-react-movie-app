import React, { useState, ChangeEvent } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { sendReview } from "../../api/backend-api";
import { MovieProps, Review } from "../../types/interfaces";
import { useAuth } from "../../contexts/authContext";

import styles from "./styles";
import ratings from "./ratingCategories";

const ReviewForm: React.FC<MovieProps> = ({ id, closeForm }) => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm<Review>();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [rating, setRating] = useState<number>(3);
  const [open, setOpen] = useState<boolean>(false);

  const handleRatingChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(event.target.value));
  };

  const handleSnackClose = () => {
    setOpen(false);
    navigate("/movies/favourites");
  };

  const onSubmit: SubmitHandler<Review> = async (review) => {
    if (!token) {
      console.error("No token found. Please sign in.");
      return;
    }

    review.movieId = id;
    review.rating = rating;
    review.reviewDate = new Date().toISOString();

    try {
      await sendReview(review, token);
      setOpen(true);
      if (closeForm) closeForm();
      reset();
    } catch (error) {
      console.error("Error sending review:", error);
    }
  };

  return (
    <Box component="div" sx={styles.root}>
      <Typography component="h2" variant="h3">Write a review</Typography>

      <Snackbar
        sx={styles.snack}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        onClose={handleSnackClose}
      >
        <Alert severity="success" variant="filled" onClose={handleSnackClose}>
          <Typography variant="h4">Thank you for submitting a review</Typography>
        </Alert>
      </Snackbar>

      <form style={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="reviewerId"
          control={control}
          rules={{ required: "Email address is required" }}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ width: "40ch" }}
              variant="outlined"
              margin="normal"
              required
              label="Reviewer's email"
              autoFocus
            />
          )}
        />
        {errors.reviewerId && (
          <Typography variant="h6">{errors.reviewerId.message}</Typography>
        )}

        <Controller
          name="content"
          control={control}
          rules={{
            required: "Review cannot be empty.",
            minLength: { value: 10, message: "Review is too short" },
          }}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Review text"
              multiline
              minRows={10}
            />
          )}
        />
        {errors.content && (
          <Typography variant="h6">{errors.content.message}</Typography>
        )}

        <TextField
          id="select-rating"
          select
          variant="outlined"
          label="Rating Select"
          value={rating}
          onChange={handleRatingChange}
          helperText="Don't forget your rating"
        >
          {ratings.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <Box>
          <Button type="submit" variant="contained" color="primary" sx={styles.submit}>
            Submit
          </Button>
          <Button
            type="reset"
            variant="contained"
            color="secondary"
            sx={styles.submit}
            onClick={() => reset()}
          >
            Reset
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default ReviewForm;
