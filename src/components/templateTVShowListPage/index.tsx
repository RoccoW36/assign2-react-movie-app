import React from "react";
import Header from "../headerTVShowList";
import Grid from "@mui/material/Grid";
import TVShowList from "../TVShowList";
import PaginationUI from "../PaginationUI";
import { TVShowListPageTemplateProps } from "../../types/interfaces";

const styles = {
  root: {
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    paddingTop: "20px",
  },
};

const TVShowListPageTemplate: React.FC<TVShowListPageTemplateProps> = ({
  tvShows,
  title,
  action,
  page,
  totalPages,
  handlePageChange,
}) => {
  const handleBack = () => {
    if (page > 1) {
      handlePageChange({} as React.ChangeEvent<unknown>, page - 1);
    }
  };

  const handleForward = () => {
    if (page < totalPages) {
      handlePageChange({} as React.ChangeEvent<unknown>, page + 1);
    }
  };

  return (
    <Grid container direction="column" sx={styles.root} spacing={2}>
      <Grid item>
        <Header
          title={title}
          onBack={handleBack}
          onForward={handleForward}
        />
      </Grid>

      <Grid item sx={{ padding: "0 20px" }}>
        <Grid container spacing={3} justifyContent="center">
          <TVShowList action={action} tvShows={tvShows} />
        </Grid>
      </Grid>

      {page !== undefined && handlePageChange && totalPages !== undefined && (
        <Grid item sx={{ padding: "0 20px" }}>
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
