import React from "react";
import HeaderTVShowList from "../headerTVShowList";
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

interface TVShowListPageTemplateExtendedProps extends TVShowListPageTemplateProps {
  onBack?: () => void;
  onForward?: () => void;
  page?: number;
  handlePageChange?: (event: React.ChangeEvent<unknown>, value: number) => void;
  totalPages?: number;
}

const TemplateTVShowListPage: React.FC<TVShowListPageTemplateExtendedProps> = ({
  tvShows,
  title,
  action,
  onBack,
  onForward,
  page,
  handlePageChange,
  totalPages,
}) => {
  return (
    <Grid container direction="column" sx={styles.root} spacing={2}>
      <Grid item>
        <HeaderTVShowList title={title} onBack={onBack} onForward={onForward} />
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

      <Grid item sx={{ padding: "0 20px" }}>
        <Grid container spacing={3} justifyContent="center">
          <TVShowList action={action} tvShows={tvShows} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TemplateTVShowListPage;
