import React from "react";
import HeaderActorList from "../headerActorList";
import Grid from "@mui/material/Grid";
import ActorList from "../actorList";
import { ActorListPageTemplateProps } from "../../types/interfaces";

interface TemplateActorListPageProps extends ActorListPageTemplateProps {
  onBack: () => void;
  onForward: () => void;
}

const TemplateActorListPage: React.FC<TemplateActorListPageProps> = ({ actors, title, action, onBack, onForward }) => {
  return (
    <>
      <HeaderActorList title={title} onBack={onBack} onForward={onForward} />
      
      <Grid container spacing={5} sx={{ padding: "15px", backgroundColor: "#bfbfbf" }}>
        <Grid item xs={12}>
          <ActorList action={action} actors={actors} />
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateActorListPage;
