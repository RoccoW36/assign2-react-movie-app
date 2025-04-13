import React, { useEffect, useState } from "react"; 
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavouriteIcon from "@mui/icons-material/Favorite"; 
import Avatar from "@mui/material/Avatar"; 
import { ActorDetailsProps } from "../../types/interfaces";

const styles = {
    root: { 
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        padding: 1.5,
    },
    avatar: {
        backgroundColor: "rgb(255, 0, 0)", 
    },
};

const ActorHeader: React.FC<{ actor: ActorDetailsProps }> = ({ actor }) => {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favourites = JSON.parse(localStorage.getItem('favoriteActors') || '[]');
        if (Array.isArray(favourites)) {
            setIsFavorite(favourites.some((fav: { id: number }) => fav.id === actor.id));
        }
    }, [actor.id]);

    const toggleFavorite = () => {
        const favourites = JSON.parse(localStorage.getItem('favoriteActors') || '[]');
        let updatedFavorites;
        
        if (isFavorite) {
            updatedFavorites = favourites.filter((fav: { id: number }) => fav.id !== actor.id);
        } else {
            updatedFavorites = [...favourites, { id: actor.id, name: actor.name }];
        }

        localStorage.setItem('favoriteActors', JSON.stringify(updatedFavorites));
        setIsFavorite(!isFavorite);
    };

    return (
        <Paper component="div" sx={styles.root}>
            <IconButton aria-label="go back">
                <ArrowBackIcon color="primary" fontSize="large" />
            </IconButton>

            <IconButton onClick={toggleFavorite} aria-label="toggle favorite">
                {isFavorite ? (
                    <Avatar sx={styles.avatar}>
                        <FavouriteIcon />
                    </Avatar>
                ) : (
                    <Avatar sx={{ backgroundColor: "gray" }}>
                        <FavouriteIcon />
                    </Avatar>
                )}
            </IconButton>

            <Typography variant="h4" component="h3">
                {actor.name}
                <br />
                <span>{actor.known_for_department}</span>
            </Typography>

            <IconButton aria-label="go forward">
                <ArrowForwardIcon color="primary" fontSize="large" />
            </IconButton>
        </Paper>
    );
};

export default ActorHeader;
