import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { sendReview } from "../../api/backend-api";
import { Review } from "../../types/interfaces";

import styles from "./styles";

interface ReviewFormProps {
  id: number;
  closeForm: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ id, closeForm }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Review>({ shouldFocusError: true });

  const navigate = useNavigate();
  const location = useLocation();

  const movieId = id || location.state?.movieId || sessionStorage.getItem("movieId");

  if (!movieId) {
    console.error("No movieId found—handling gracefully.");
    return <Typography variant="h6">Error: No movie found for review</Typography>;
  }

  const [open, setOpen] = useState<boolean>(false);

  const handleSnackClose = () => {
    setOpen(false);
    navigate("/movies/favourites");
  };

  const onSubmit: SubmitHandler<Review> = async (review) => {
    const reviewPayload = {
      movieId,
      reviewerId: review.reviewerId,
      reviewDate: new Date().toISOString().split("T")[0],
      content: review.content,
    };

    try {
      await sendReview(reviewPayload);
      setOpen(true);
      reset();
      if (closeForm) closeForm();
    } catch (error) {
      console.error("Error sending review:", error);
      setOpen(true);
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
          rules={{
            required: "Email address is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address",
            },
          }}
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
              type="email"
              error={!!errors.reviewerId}
              helperText={errors.reviewerId?.message}
            />
          )}
        />

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
              label="Review content text"
              multiline
              minRows={10}
              error={!!errors.content}
              helperText={errors.content?.message}
            />
          )}
        />

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
