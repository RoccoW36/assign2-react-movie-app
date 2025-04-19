import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

interface HeaderTVShowListProps {
  title: string;
  onBack?: () => void;
  onForward?: () => void;
}

const HeaderTVShowList: React.FC<HeaderTVShowListProps> = ({ title, onBack, onForward }) => {
  return (
    <Paper
      component="div"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        padding: 2,
        mb: 2,
      }}
      elevation={3}
    >
      <IconButton aria-label="go back" onClick={onBack} disabled={!onBack}>
        <ArrowBackIcon color="primary" fontSize="large" />
      </IconButton>

      <Typography variant="h4" component="h3" sx={{ mx: 2, flexGrow: 1, textAlign: "center" }}>
        {title}
      </Typography>

      <IconButton aria-label="go forward" onClick={onForward} disabled={!onForward}>
        <ArrowForwardIcon color="primary" fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default HeaderTVShowList;
