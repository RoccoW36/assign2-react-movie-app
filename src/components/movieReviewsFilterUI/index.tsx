import React, { useState } from "react";
import FilterReviewsCard from "../filterMovieReviewsCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import FilterListIcon from "@mui/icons-material/FilterList";

const styles = {
  fab: {
    position: "fixed",
    top: "90px",
    right: "20px",
    zIndex: 1300,
    backgroundColor: "#6200ea", 
    color: "#fff",
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.3)",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.1)",
      boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.4)",
    },
    "@media (max-width: 768px)": {
      top: "70px",
      right: "15px",
    },
    "@media (max-width: 480px)": {
      top: "60px",
      right: "10px",
      fontSize: "14px",
    },
  },
};


interface ReviewFilterUIProps {
  onFilterValuesChange: (name: string, value: string) => void;
  movieIdFilter: string;
  reviewerIdFilter: string;
  contentFilter: string;
  dateFilter: string;
  sortOption: string; 
}

const ReviewFilterUI: React.FC<ReviewFilterUIProps> = ({
  onFilterValuesChange,
  movieIdFilter,
  reviewerIdFilter,
  contentFilter,
  dateFilter,
  sortOption,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleResetFilters = () => {
    onFilterValuesChange("movieId", "");
    onFilterValuesChange("reviewerId", "");
    onFilterValuesChange("content", "");
    onFilterValuesChange("reviewDate", "");
    onFilterValuesChange("sortOption", "");
    setDrawerOpen(false);
  };

  const isFilterActive = () =>
    movieIdFilter || reviewerIdFilter || contentFilter || dateFilter || sortOption;

  return (
    <>
      <Fab
        sx={styles.fab}
        variant="extended"
        onClick={() => setDrawerOpen(true)}
        color="primary"
      >
        <FilterListIcon sx={{ mr: 1 }} />
        {isFilterActive() ? "Filters Applied" : "Filter Reviews"}
      </Fab>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { backgroundColor: "#fff", padding: 2, width: 320 } }}
      >
        <FilterReviewsCard
          onUserInput={onFilterValuesChange}
          movieIdFilter={movieIdFilter}
          reviewerIdFilter={reviewerIdFilter}
          contentFilter={contentFilter}
          dateFilter={dateFilter}
          sortOption={sortOption}
        />
        <button onClick={handleResetFilters} style={{ marginTop: "1rem" }}>
          Reset Filters
        </button>
      </Drawer>
    </>
  );
};

export default ReviewFilterUI;
