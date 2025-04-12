import React, { useState } from "react";
import PageTemplate from "../components/templateActorListPage";
import { getPopularActors } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import FilterActorsCard from "../components/filterActorsCard";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToActorFavouritesIcon from "../components/cardIcons/addToActorFavourites";
import { DiscoverActors, Actor } from "../types/interfaces";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";

const styles = {
  paginationContainer: {
    marginTop: 2,
    display: "flex",
    justifyContent: "center",
  },
};

const titleFiltering = {
  name: "title",
  value: "",
  condition: (actor: Actor, value: string) => actor.name.toLowerCase().includes(value.toLowerCase()),
};

const genderFiltering = {
  name: "gender",
  value: "0", 
  condition: (actor: Actor, value: string) => value === "0" || actor.gender?.toString() === value,
};

const PopularActorsPage: React.FC = () => {
  const [page, setPage] = useState(1);


  const { data, error, isLoading, isError } = useQuery<DiscoverActors, Error>(["popularActors", page], () => 
    getPopularActors()
  );

  const { filterValues, setFilterValues, filterFunction } = useFiltering([titleFiltering, genderFiltering]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Alert severity="error">Failed to load actors: {(error as Error).message}</Alert>;
  }

  const changeFilterValues = (type: "name" | "gender", value: string | number) => {
    const changedFilter = { name: type, value: value.toString() };
    setFilterValues(type === "name" ? [changedFilter, filterValues[1]] : [filterValues[0], changedFilter]);
  };

  const actors = data ? data.results : [];
  const displayedActors = filterFunction(actors);

  return (
    <>
      <PageTemplate
        title="Discover Actors"
        actors={displayedActors}
        action={(actor: Actor) => <AddToActorFavouritesIcon actor={actor} />}
      />
      <FilterActorsCard
        onUserInput={changeFilterValues}
        titleFilter={filterValues[0].value}
        genderFilter={Number(filterValues[1].value)} 
      />
      <Grid item container sx={styles.paginationContainer}>
        <Pagination
          count={50}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
      </Grid>
    </>
  );
};

export default PopularActorsPage;
