import React from "react";
import Header from "../headerTVShowList";
import Grid from "@mui/material/Grid";
import TVShowList from "../TVShowList";
import PaginationUI from "../PaginationUI";
import { TVShowListPageTemplateProps } from "../../types/interfaces";

// Extend the props interface for pagination
interface TVShowListPageTemplateExtendedProps extends TVShowListPageTemplateProps {
  page?: number;
  totalPages?: number;
  handlePageChange?: (event: React.ChangeEvent<unknown>, value: number) => void;
  onBack?: () => void;
  onForward?: () => void;
}

const styles = {
  root: {
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    paddingTop: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // Ensures everything is aligned in the center vertically
    justifyContent: "center", // Ensures everything is centered horizontally
  },
};

const TVShowListPageTemplate: React.FC<TVShowListPageTemplateExtendedProps> = ({
  tvShows,
  title,
  action,
  page,
  totalPages,
  handlePageChange,
  onBack,
  onForward,
}) => {
  // Default handlers for back and forward navigation
  const handleBack = onBack || (() => {
    if (page && page > 1 && handlePageChange) {
      handlePageChange({} as React.ChangeEvent<unknown>, page - 1);
    }
  });

  const handleForward = onForward || (() => {
    if (page && totalPages && page < totalPages && handlePageChange) {
      handlePageChange({} as React.ChangeEvent<unknown>, page + 1);
    }
  });

  return (
    <Grid container direction="column" sx={styles.root} spacing={2}>
      {/* Header with optional navigation */}
      <Grid item>
        <Header
          title={title}
          onBack={handleBack}
          onForward={handleForward}
        />
      </Grid>

      {/* TV Shows List */}
      <Grid item sx={{ width: "100%", padding: "0 20px" }}>
        <Grid container spacing={3} justifyContent="center">
          <TVShowList action={action} tvShows={tvShows} />
        </Grid>
      </Grid>

      {/* Pagination UI */}
      {page !== undefined && handlePageChange && totalPages !== undefined && (
        <Grid item sx={{ width: "100%", padding: "0 20px" }}>
          <PaginationUI
            page={page}
            handlePageChange={handlePageChange}
            totalPages={totalPages}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default TVShowListPageTemplate;
