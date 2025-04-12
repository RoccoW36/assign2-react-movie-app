import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

const styles = {
    root: {
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        marginBottom: 1.5,
        padding: 2,
        backgroundColor: "#1E1E1E",
        color: "white",
    },
};

interface HeaderActorListProps {
    title: string;
    subtitle?: string;
    onBack?: () => void;
    onForward?: () => void;
}

const HeaderActorList: React.FC<HeaderActorListProps> = ({ title, subtitle, onBack, onForward }) => {
    return (
        <Paper component="div" sx={styles.root}>
            <IconButton aria-label="Go back" onClick={onBack}>
                <ArrowBackIcon color="primary" fontSize="large" />
            </IconButton>

            <div>
                <Typography variant="h4" component="h3">
                    {title}
                </Typography>
                {subtitle && (
                    <Typography variant="subtitle1" component="p">
                        {subtitle}
                    </Typography>
                )}
            </div>

            <IconButton aria-label="Go forward" onClick={onForward}>
                <ArrowForwardIcon color="primary" fontSize="large" />
            </IconButton>
        </Paper>
    );
};

export default HeaderActorList;
