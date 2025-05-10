import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface HeaderActorListProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  onForward?: () => void;
}

const HeaderActorList: React.FC<HeaderActorListProps> = ({ title, subtitle, onBack, onForward }) => {
  const navigate = useNavigate();

  const handleBack = onBack || (() => navigate(-1));
  const handleForward = onForward || (() => navigate(1));

  return (
    <Paper
      component="div"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 2,
        marginBottom: 2,
      }}
      elevation={3}
    >
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        <IconButton aria-label="go back" size="large" onClick={handleBack}>
          <ArrowBackIcon color="primary" fontSize="large" />
        </IconButton>

        <Box sx={{ flexGrow: 1, textAlign: "center" }}>
          <Typography variant="h5" component="h3" noWrap>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="subtitle1" component="h4" sx={{ color: "gray", marginTop: 1 }}>
              {subtitle}
            </Typography>
          )}
        </Box>

        <IconButton aria-label="go forward" size="large" onClick={handleForward}>
          <ArrowForwardIcon color="primary" fontSize="large" />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default HeaderActorList;
