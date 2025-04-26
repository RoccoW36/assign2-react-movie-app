import React, { useState } from "react";
import FilterActorsCard from "../filterActorsCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";

const styles = {
    fab: {
      position: "fixed",
      top: "90px",
      right: "20px",
      zIndex: 1300, // Ensures visibility above other elements
      backgroundColor: "#6200ea", // More visually distinct color
      color: "#fff",
      boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)", // Stronger shadow effect
      transition: "all 0.3s ease-in-out",
      "&:hover": {
        transform: "scale(1.1)", // Slightly enlarges on hover for interaction feedback
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.4)", // Adds more depth on hover
      },
      "@media (max-width: 768px)": {
        top: "70px", // Adjusts position for tablets
        right: "15px",
      },
      "@media (max-width: 480px)": {
        top: "60px", // Optimized placement for mobile users
        right: "10px",
        fontSize: "14px", // Adjusted text size for smaller screens
      },
    },
  };

interface ActorFilterUIProps {
    onFilterValuesChange: (type: "name" | "gender", value: string | number) => void;
    nameFilter: string;
    genderFilter: number;
}

const ActorFilterUI: React.FC<ActorFilterUIProps> = ({ onFilterValuesChange, nameFilter, genderFilter }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleResetFilters = () => {
        onFilterValuesChange("name", "");
        onFilterValuesChange("gender", 0);
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
                {nameFilter || genderFilter !== 0 ? "Filters Applied" : "Filter Actors"}
            </Fab>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                sx={{ width: "75%", maxWidth: 400, backgroundColor: "#fff" }}
            >
                <FilterActorsCard
                    onUserInput={onFilterValuesChange}
                    nameFilter={nameFilter}
                    genderFilter={genderFilter}
                />
                <button onClick={handleResetFilters}>Reset Filters</button>
            </Drawer>
        </>
    );
};

export default ActorFilterUI;
