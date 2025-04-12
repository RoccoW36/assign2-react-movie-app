import React from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import EventIcon from '@mui/icons-material/Event';
import TodayIcon from '@mui/icons-material/Today';
import HomeIcon from '@mui/icons-material/Home';
import WcIcon from '@mui/icons-material/Wc';
import { ActorDetailsProps } from "../../types/interfaces";

const styles = {
    chipSet: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        listStyle: "none",
        padding: 1.5,
        margin: 0,
    },
    chipLabel: {
        margin: 0.5,
    },
};

const ActorDetails: React.FC<{ actor: ActorDetailsProps }> = ({ actor }) => {
    const gender = actor.gender === 1 ? "Female" : actor.gender === 2 ? "Male" : "Unknown";
    const isDead = actor.deathday ? <Chip icon={<EventIcon />} label={`Died: ${actor.deathday}`} /> : null;

    return (
        <>
            <Typography variant="h5" component="h3">
                Biography
            </Typography>

            <Typography variant="h6" component="p">
                {actor.biography || "No biography available."}
            </Typography>
            <Paper component="ul" sx={styles.chipSet}>
                <Chip icon={<TodayIcon />} label={`Born: ${actor.birthday || "Unknown"}`} />
                {isDead}
                <Chip icon={<HomeIcon />} label={actor.place_of_birth || "Unknown"} />
            </Paper>
            <Paper component="ul" sx={styles.chipSet}>
                <Chip icon={<WcIcon />} label={gender} />
            </Paper>
        </>
    );
};

export default ActorDetails;
