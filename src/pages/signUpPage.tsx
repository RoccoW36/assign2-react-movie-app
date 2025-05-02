import React, { useState } from "react";
import { Box, Paper, Typography, Snackbar, Alert, CircularProgress, Container, Button } from "@mui/material";
import { SignUpForm, ConfirmSignUpForm } from "../components/auth";
import { signupUser, confirmSignup } from "../api/backend-api";
import { SignupDetails, ConfirmSignupDetails } from "../types/interfaces";
import { useNavigate } from 'react-router-dom';

const SignUpPage: React.FC = () => {
  const [signupDetails, setSignupDetails] = useState<SignupDetails>({
    email: "",
    username: "",
    password: "",
  });

  const [confirmSignupDetails, setConfirmSignupDetails] = useState<ConfirmSignupDetails>({
    username: "",
    code: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loadingSignup, setLoadingSignup] = useState(false);
  const [loadingConfirm, setLoadingConfirm] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isSignUpPhase, setIsSignUpPhase] = useState(true); // Toggle phase
  const [snackBarMessage, setSnackBarMessage] = useState<string>(''); // Message for Snackbar
  const navigate = useNavigate();

  const handleSignUpSubmit = async (details: SignupDetails) => {
    setLoadingSignup(true);
    setError(null);

    try {
      const response = await signupUser(details);
      console.log("Signup successful", response);
      setSnackBarMessage('Signup successful! Please confirm your email.');
      setOpenSnackbar(true);
      setIsSignUpPhase(false); // Switch to confirmation phase
    } catch (error) {
      setError("Signup failed. Please try again.");
      setSnackBarMessage('Signup failed, please try again.');
      setOpenSnackbar(true);
    } finally {
      setLoadingSignup(false);
    }
  };

  const handleConfirmSignUpSubmit = async (details: ConfirmSignupDetails) => {
    setLoadingConfirm(true);
    setError(null);

    try {
      const response = await confirmSignup(details);
      console.log("Confirm Signup successful", response);
      setSnackBarMessage('Confirmation successful! Redirecting to login...');
      setOpenSnackbar(true);
      navigate("/login"); // Navigate to login after confirmation
    } catch (error) {
      setError("Confirmation failed. Please try again.");
      setSnackBarMessage('Confirmation failed, please try again.');
      setOpenSnackbar(true);
    } finally {
      setLoadingConfirm(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f5f5f5", padding: 2 }}>
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ padding: 4, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            {isSignUpPhase ? "Sign Up" : "Confirm Sign Up"}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {isSignUpPhase ? (
            <>
              <SignUpForm
                form={signupDetails}
                handleChange={(e) => setSignupDetails({ ...signupDetails, [e.target.name]: e.target.value })}
                handleSubmit={(e) => {
                  e.preventDefault();
                  handleSignUpSubmit(signupDetails);
                }}
                loading={loadingSignup} // Pass loading state here
              />
              {loadingSignup && <CircularProgress sx={{ mt: 2 }} />}
            </>
          ) : (
            <>
              <Typography variant="h6" sx={{ mt: 3 }} gutterBottom>
                Please confirm your account
              </Typography>

              <ConfirmSignUpForm
                form={confirmSignupDetails}
                handleChange={(e) => setConfirmSignupDetails({ ...confirmSignupDetails, [e.target.name]: e.target.value })}
                handleSubmit={(e) => {
                  e.preventDefault();
                  handleConfirmSignUpSubmit(confirmSignupDetails);
                }}
              />
              {loadingConfirm && <CircularProgress sx={{ mt: 2 }} />}
            </>
          )}

          {isSignUpPhase && (
            <Button
              variant="text"
              color="primary"
              sx={{ mt: 2 }}
              onClick={() => navigate("/login")}
            >
              Already have an account? Log in
            </Button>
          )}
        </Paper>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={error ? "error" : "success"} sx={{ width: "100%" }}>
          {snackBarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SignUpPage;
