import React, { useState } from "react";
import { Box, Paper, Typography, Snackbar, Alert, CircularProgress, Container } from "@mui/material";
import { LoginForm } from "../components/auth";
import { authenticateUser } from "../api/backend-api";
import { SigninDetails } from "../types/interfaces";

const LoginPage: React.FC = () => {
  const [signinDetails, setSigninDetails] = useState<SigninDetails>({
    username: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleLogin = async (details: SigninDetails) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authenticateUser(details);
      console.log("Login successful", response);
      setOpenSnackbar(true);
    } catch (error) {
      setError("Login failed. Please check your credentials and try again.");
      setOpenSnackbar(true);
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f5f5f5", padding: 2 }}>
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
        </Paper>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={error ? "error" : "success"} sx={{ width: "100%" }}>
          {error || "Login successful!"}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LoginPage;
