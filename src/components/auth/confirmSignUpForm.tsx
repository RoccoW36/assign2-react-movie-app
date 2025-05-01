import React, { useState } from "react";
import { ConfirmSignupDetails } from "../../types/interfaces";
import { TextField, Button, CircularProgress } from "@mui/material";

interface ConfirmSignUpFormProps {
  form: ConfirmSignupDetails;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const ConfirmSignUpForm: React.FC<ConfirmSignUpFormProps> = ({ form, handleChange, handleSubmit }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmitWithLoading = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.username || !form.code) {
      alert("Both fields are required.");
      return;
    }

    setLoading(true);
    await handleSubmit(e);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmitWithLoading} style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "400px", margin: "auto" }}>
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
        name="code"
        value={form.code}
        placeholder="Confirmation Code"
        label="Confirmation Code"
        variant="outlined"
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained" color="primary" disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Confirm"}
      </Button>
    </form>
  );
};

export default ConfirmSignUpForm;
