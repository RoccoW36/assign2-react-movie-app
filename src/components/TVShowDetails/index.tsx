import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import { TVShowDetailsProps } from "../../types/interfaces";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import TVShowReviews from '../TVShowReviews';

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
    fab: {
        position: "fixed",
        top: 50,
        right: 2,
    },
};

const TVShowDetails: React.FC<TVShowDetailsProps> = (tvShow) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <Typography variant="h5" component="h3">
                Overview
            </Typography>

            <Typography variant="h6" component="p">
                {tvShow.overview}
            </Typography>

            <Paper component="ul" sx={styles.chipSet}>
                <li>
                    <Chip label="Genres" sx={styles.chipLabel} color="primary" />
                </li>
                {tvShow.genres.map((g) => (
                    <li key={g.id}>
                        <Chip label={g.name} />
                    </li>
                ))}
            </Paper>

            <Paper component="ul" sx={styles.chipSet}>
                <Chip icon={<AccessTimeIcon />} label={`${tvShow.number_of_episodes} episodes`} />
                <Chip icon={<MonetizationIcon />} label={`${tvShow.vote_average} / 10`} />
                <Chip icon={<StarRate />} label={`${tvShow.vote_average} (${tvShow.number_of_seasons} seasons)`} />
                <Chip label={`First Aired: ${tvShow.first_air_date}`} />
            </Paper>

            <Paper component="ul" sx={styles.chipSet}>
                <li>
                    <Chip label="Origin Countries" sx={styles.chipLabel} color="primary" />
                </li>
                {tvShow.origin_country.map((country, index) => (
                    <li key={index}>
                        <Chip label={country} />
                    </li>
                ))}
            </Paper>

            <Fab
                color="secondary"
                variant="extended"
                onClick={() => setDrawerOpen(true)}
                sx={styles.fab}
            >
                <NavigationIcon />
                Reviews
            </Fab>

            <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <TVShowReviews {...tvShow} />
            </Drawer>
        </>
    );
};

export default TVShowDetails;
