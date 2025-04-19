import React, { useState } from "react";
import FilterCard from "../filterMoviesCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { BaseMovieProps, MovieDetailsProps } from "../../types/interfaces";

export const titleFilter = (movie: BaseMovieProps, value: string): boolean => {
    return movie.title.toLowerCase().search(value.toLowerCase()) !== -1;
};

export const genreFilter = (movie: BaseMovieProps, value: string): boolean => {
    const genreId = Number(value);
    const genreIds = movie.genre_ids;
    return genreId > 0 && genreIds ? genreIds.includes(genreId) : true;
};

export const favouritesgenreFilter = (movie: MovieDetailsProps, value: string): boolean => {
    const genreId = Number(value);
    const genres = movie.genres;
    return genreId > 0 && genres ? genres.some((genre) => genre.id === genreId) : true;
};

const styles = {
    fab: {
      position: "fixed",
      top: "90px", 
      right: "20px",
      zIndex: 1300,
    },
  };

interface MovieFilterUIProps {
    onFilterValuesChange: (f: string, s: string) => void;
    titleFilter: string;
    genreFilter: string;
}

const MovieFilterUI: React.FC<MovieFilterUIProps> = ({ onFilterValuesChange, titleFilter, genreFilter }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const getFabLabel = () => {
        return titleFilter || genreFilter !== "0" ? "Filters Applied" : "Filter Movies";
    };

    const handleResetFilters = () => {
        onFilterValuesChange("title", "");
        onFilterValuesChange("genre", "0");
        setDrawerOpen(false);
    };

    return (
        <>
            <Fab
                color="secondary"
                variant="extended"
                onClick={() => setDrawerOpen(true)}
                sx={styles.fab}
            >
                {getFabLabel()}
            </Fab>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                sx={{ width: "75%", maxWidth: 400, backgroundColor: "#fff" }}
            >
                <FilterCard
                    onUserInput={onFilterValuesChange}
                    titleFilter={titleFilter}
                    genreFilter={genreFilter}
                />
                <button onClick={handleResetFilters}>Reset Filters</button>
            </Drawer>
        </>
    );
};

export default MovieFilterUI;
