import React, { useState } from "react";
import { Box, Paper, Typography, Snackbar, Alert, CircularProgress, Container, Button } from "@mui/material";
import { LoginForm } from "../components/auth";
import { authenticateUser } from "../api/backend-api";
import { SigninDetails } from "../types/interfaces";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const LoginPage: React.FC = () => {
  const [signinDetails, setSigninDetails] = useState<SigninDetails>({
    username: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [loginSuccess, setLoginSuccess] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { signin } = useAuth();

  const handleLogin = async (details: SigninDetails) => {
    setLoading(true);
    setError(null);
    setLoginSuccess(false);

    try {
      const response = await authenticateUser(details);
      console.log("Login response:", response);

      if (response?.token) {
        signin(response.token, details.username);

        setSnackbarMessage("Login successful!");
        setOpenSnackbar(true);
        setLoginSuccess(true);
      } else {
        throw new Error(response.message || "Login failed. Please check your credentials and try again.");
      }
    } catch (error: any) {
      setError(error.message || "Unexpected error occurred.");
      setSnackbarMessage(error.message || "Login failed.");
      setOpenSnackbar(true);
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
    if (loginSuccess) {
      const redirectTo = location.state?.from || "/movies/fantasy";
      
      const movieId = sessionStorage.getItem("movieId");

      if (redirectTo === "/reviews/form" && movieId) {
        navigate(redirectTo, { state: { movieId } });
      } else {
        navigate(redirectTo);
      }

      if (movieId) sessionStorage.removeItem("movieId");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        padding: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ padding: 4, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <LoginForm
            signinDetails={signinDetails}
            setSigninDetails={setSigninDetails}
            handleLogin={handleLogin}
          />

          {loading && <CircularProgress sx={{ mt: 2 }} />}

          {/* Link to sign up page */}
          {!loginSuccess && (
            <Button
              variant="text"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => navigate("/signup")}
            >
              Don't have an account? Sign up
            </Button>
          )}
        </Paper>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={error ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginPage;
