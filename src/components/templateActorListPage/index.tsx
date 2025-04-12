import { useState } from "react";
import Header from "../headerActorList";
import FilterCard from "../filterActorsCard";
import ActorList from "../actorList";
import Grid from "@mui/material/Grid";
import { Actor as ActorType } from "../../types/interfaces"; 

const styles = {
  root: { 
    backgroundColor: "#1E1E1E",
  }
};

interface TemplateActorListPageProps {
  actors: ActorType[];
  title: string;
  action: (actor: ActorType) => React.ReactNode;
}

const TemplateActorListPage = ({ actors, title, action }: TemplateActorListPageProps) => {
  const [nameFilter, setNameFilter] = useState<string>("");
  const [genderFilter, setGenderFilter] = useState<number>(0);

  const handleChange = (type: "name" | "gender", value: string | number) => {
    if (type === "name") setNameFilter(value as string);
    else setGenderFilter(value as number);
  };

  const displayedActors = actors.filter((actor) => 
    actor.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
    (genderFilter === 0 || actor.gender === genderFilter)
  );

  return (
    <Grid container sx={styles.root}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item container spacing={5}>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FilterCard onUserInput={handleChange} titleFilter={nameFilter} />
        </Grid>
        <ActorList action={action} actors={displayedActors} />
      </Grid>
    </Grid>
  );
};

export default TemplateActorListPage;
