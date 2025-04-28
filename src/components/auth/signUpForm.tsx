import React, { useState } from "react";
import { Button, TextField, Stack } from "@mui/material";
import { signup } from "../../api/auth-api";
import { SignupDetails } from "../../types/interfaces";

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState<SignupDetails>({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await signup(formData);
      console.log("Signup successful:", response);
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          label="Username"
          name="username"
          type="text"
          fullWidth
          value={formData.username}
          onChange={handleChange}
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" color="secondary" fullWidth>
          Sign Up
        </Button>
      </Stack>
    </form>
  );
};

export default SignupForm;
