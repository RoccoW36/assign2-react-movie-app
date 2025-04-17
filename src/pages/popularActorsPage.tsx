import React, { useState, useEffect } from "react";
import { getPopularActors } from "../api/tmdb-api";
import PageTemplate from "../components/templateActorListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToActorFavouritesIcon from "../components/cardIcons/addToActorFavourites";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import FilterActorsCard from "../components/filterActorsCard";
import useFiltering from "../hooks/useFiltering";
import { DiscoverActors, BaseActorProps } from "../types/interfaces";
import Alert from "@mui/material/Alert";

const styles = {
  paginationContainer: {
    marginTop: 2,
    display: "flex",
    justifyContent: "center",
  },
};

const nameFiltering = {
  name: "name",
  value: "",
  condition: (actor: BaseActorProps, value: string) =>
    actor.name.toLowerCase().includes(value.toLowerCase()),
};

const genderFiltering = {
  name: "gender",
  value: "0",
  condition: (actor: BaseActorProps, value: string) =>
    value === "0" || actor.gender?.toString() === value,
};

const PopularActorsPage: React.FC = () => {
  const [page, setPage] = useState(1);

  const { data, error, isLoading, isError } = useQuery<DiscoverActors, Error>(
    ["popularActors", page], 
    () => getPopularActors(page)
  );

  const actors = data?.results || []; 

  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [nameFiltering, genderFiltering]
  );

  useEffect(() => {
    const favourites = actors.filter((actor: BaseActorProps) => actor.favourite);
    localStorage.setItem("favourites", JSON.stringify(favourites)); 
  }, [actors]);

  if (isLoading) return <Spinner />;
  if (isError) return <Alert severity="error">Failed to load actors: {error.message}</Alert>;

  const changeFilterValues = (type: "name" | "gender", value: string | number) => {
    const changedFilter = { name: type, value: value.toString() };
    setFilterValues(type === "name" ? [changedFilter, filterValues[1]] : [filterValues[0], changedFilter]);
  };

  const displayedActors = filterFunction(actors);

  return (
    <>
      <PageTemplate
        title="Discover Actors"
        actors={displayedActors}
        action={(actor: BaseActorProps) => <AddToActorFavouritesIcon actor={actor} />}
      />
      <FilterActorsCard
        onUserInput={changeFilterValues}
        nameFilter={filterValues[0].value} 
        genderFilter={Number(filterValues[1].value)}
      />
      <Grid container sx={styles.paginationContainer}>
      <Pagination
        count={data?.total_pages || 1}
        page={page}
        onChange={(_, value) => setPage(value)}
        color="primary"
      />
      </Grid>
    </>
  );
};

export default PopularActorsPage;
