import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { LoginForm, SignupForm } from "../components/auth";

const LoginPage: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 2,
      }}
    >
      <Grid container spacing={4} maxWidth="md" justifyContent="center">
        {/* Login Form */}
        <Grid item xs={12} md={6}>
          <Paper elevation={6} sx={{ padding: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
              Login
            </Typography>
            <LoginForm />
          </Paper>
        </Grid>

        {/* Signup Form */}
        <Grid item xs={12} md={6}>
          <Paper elevation={6} sx={{ padding: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
              Sign Up
            </Typography>
            <SignupForm />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginPage;
