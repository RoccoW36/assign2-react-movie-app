import React from "react";
import HeaderActorList from "../headerActorList";
import Grid from "@mui/material/Grid";
import ActorList from "../actorList";
import PaginationUI from "../PaginationUI";
import { ActorListPageTemplateProps } from "../../types/interfaces";

const styles = {
  root: {
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    paddingTop: "20px",
  },
};

interface ActorListPageTemplateExtendedProps extends ActorListPageTemplateProps {
  onBack?: () => void;
  onForward?: () => void;
  page?: number;
  handlePageChange?: (event: React.ChangeEvent<unknown>, value: number) => void;
  totalPages?: number;
}

const TemplateActorListPage: React.FC<ActorListPageTemplateExtendedProps> = ({
  actors,
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
        <HeaderActorList title={title} onBack={onBack} onForward={onForward} />
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
    <ActorList action={action} actors={actors} />
  </Grid>
</Grid>
    </Grid>
  );
};

export default TemplateActorListPage;
