import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface HeaderProps {
  title: string;
  onBack?: () => void;   
  onForward?: () => void; 
}

const Header: React.FC<HeaderProps> = ({ title, onBack, onForward }) => {
  return (
    <Paper
      component="div"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 2,
        marginBottom: 2,
      }}
      elevation={3}
    >
      {onBack && (
        <IconButton aria-label="go back" size="large" onClick={onBack}>
          <ArrowBackIcon color="primary" fontSize="large" />
        </IconButton>
      )}

      <Box sx={{ flexGrow: 1, textAlign: "center" }}>
        <Typography variant="h5" component="h3" noWrap>
          {title}
        </Typography>
      </Box>

      {onForward && (
        <IconButton aria-label="go forward" size="large" onClick={onForward}>
          <ArrowForwardIcon color="primary" fontSize="large" />
        </IconButton>
      )}
    </Paper>
  );
};

export default Header;
