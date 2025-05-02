import React, { useState } from "react";
import { SigninDetails } from "../../types/interfaces";
import { TextField, Button, CircularProgress, Alert } from "@mui/material";

interface LoginFormProps {
  signinDetails: SigninDetails;
  setSigninDetails: React.Dispatch<React.SetStateAction<SigninDetails>>;
  handleLogin: (details: SigninDetails) => Promise<void>;
}

const LoginForm: React.FC<LoginFormProps> = ({ signinDetails, setSigninDetails, handleLogin }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSigninDetails({ ...signinDetails, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!signinDetails.username || !signinDetails.password) {
      setErrorMessage("Please enter both username and password.");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      await handleLogin(signinDetails);
    } catch (error: any) {
      setErrorMessage(error.message || "Login failed. Please check your credentials.");
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "400px", margin: "auto" }}>
      {errorMessage && (
        <Alert severity="error">
          {errorMessage}
        </Alert>
      )}

      <TextField
        name="username"
        value={signinDetails.username}
        placeholder="Username"
        label="Username"
        variant="outlined"
        onChange={handleChange}
        required
        disabled={loading}
      />
      <TextField
        type="password"
        name="password"
        value={signinDetails.password}
        placeholder="Password"
        label="Password"
        variant="outlined"
        onChange={handleChange}
        required
        disabled={loading}
      />
      <Button type="submit" variant="contained" color="primary" disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Log In"}
      </Button>
    </form>
  );
};

export default LoginForm;
