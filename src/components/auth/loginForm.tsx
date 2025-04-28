import React, { useState } from "react";
import { Button, TextField, Stack } from "@mui/material";
import { login } from "../../api/auth-api";
import { SigninDetails } from "../../types/interfaces";

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<SigninDetails>({
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
      const response = await login(formData);
      console.log("Login successful:", response);
      localStorage.setItem("token", response.token);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="Username"
          name="username"
          type="username"
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
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </Stack>
    </form>
  );
};

export default LoginForm;
