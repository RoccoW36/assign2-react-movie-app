import React from "react";
import { SignupDetails } from "../../types/interfaces";
import { TextField, Button, CircularProgress } from "@mui/material";

interface SignUpFormProps {
  form: SignupDetails;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean; // The loading prop is now passed from parent
}

const SignUpForm: React.FC<SignUpFormProps> = ({ form, handleChange, handleSubmit, loading }) => {
  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "400px", margin: "auto" }}>
      <TextField
        name="email"
        value={form.email}
        placeholder="Email"
        label="Email"
        variant="outlined"
        onChange={handleChange}
        required
      />
      <TextField
        name="username"
        value={form.username}
        placeholder="Username"
        label="Username"
        variant="outlined"
        onChange={handleChange}
        required
      />
      <TextField
        type="password"
        name="password"
        value={form.password}
        placeholder="Password"
        label="Password"
        variant="outlined"
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained" color="primary" disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Sign Up"}
      </Button>
    </form>
  );
};

export default SignUpForm;
