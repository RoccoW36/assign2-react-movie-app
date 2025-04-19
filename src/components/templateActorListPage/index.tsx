import React from "react";
import HeaderActorList from "../headerActorList";
import Grid from "@mui/material/Grid";
import ActorList from "../actorList";
import { ActorListPageTemplateProps } from "../../types/interfaces";

const styles = {
  root: {
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
    paddingTop: "20px",
  },
};

interface TemplateActorListPageProps extends ActorListPageTemplateProps {
  onBack: () => void;
  onForward: () => void;
}

const TemplateActorListPage: React.FC<TemplateActorListPageProps> = ({
  actors,
  title,
  action,
  onBack,
  onForward,
}) => {
  return (
    <Grid container direction="column" sx={styles.root} spacing={2}>
      <Grid item>
        <HeaderActorList title={title} onBack={onBack} onForward={onForward} />
      </Grid>

      <Grid item sx={{ padding: "0 20px" }}>
        <Grid container spacing={3} justifyContent="center">
          <ActorList action={action} actors={actors} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TemplateActorListPage;
