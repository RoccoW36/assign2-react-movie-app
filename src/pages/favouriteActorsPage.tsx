import React, { useContext } from "react";
import PageTemplate from "../components/templateActorListPage";
import { ActorsContext } from "../contexts/actorsContext";
import { useQueries } from "react-query";
import { getActor, searchPeople } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromActorFavourites from "../components/cardIcons/removeFromActorFavourites";
import useFiltering from "../hooks/useFiltering";
import FloatingFilterActorsMenu from "../components/actorFilterUI";
import { BaseActorProps } from "../types/interfaces";

const nameFiltering = {
  name: "name",
  value: "",
  condition: (actor: BaseActorProps, value: string): boolean =>
    actor.name.toLowerCase().includes(value.toLowerCase()),
};

const genderFiltering = {
  name: "gender",
  value: "0",
  condition: (actor: BaseActorProps, value: string): boolean =>
    value === "0" || actor.gender?.toString() === value,
};

const FavouriteActorsPage: React.FC = () => {
  const { favourites: actorIds } = useContext(ActorsContext);

  const { filterValues, setFilterValues, filterFunction } = useFiltering([
    nameFiltering,
    genderFiltering,
  ]);

  const favouriteActorQueries = useQueries(
    actorIds.map((actorId: number) => ({
      queryKey: ["actor", actorId],
      queryFn: async () => {
        const actor = await getActor(actorId.toString());
        if (!actor.known_for || actor.known_for.length === 0) {
          const searchResults = await searchPeople(actor.name);
          const searchActor = searchResults.results.find((a: any) => a.id === actorId);
          return { ...actor, known_for: searchActor?.known_for || [] };
        }
        return actor;
      },
    }))
  );

  if (favouriteActorQueries.some((q) => q.isLoading)) {
    return <Spinner />;
  }

  if (favouriteActorQueries.some((q) => q.isError)) {
    return <h1>Failed to load favourite actors.</h1>;
  }

  const actors = favouriteActorQueries.map((q) => q.data).filter(Boolean) as BaseActorProps[];

  const displayedActors = filterFunction(actors);

  const changeFilterValues = (type: "name" | "gender", value: string | number) => {
    const changedFilter = { name: type, value: value.toString() };
    setFilterValues(
      type === "name"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter]
    );
  };

  const onBack = () => {};
  const onForward = () => {};

  return (
    <>
      <PageTemplate
        title="Favourite Actors"
        actors={displayedActors}
        action={(actor: BaseActorProps) => <RemoveFromActorFavourites actor={actor} />}
        onBack={onBack}
        onForward={onForward}
      />
      <FloatingFilterActorsMenu
        onFilterValuesChange={changeFilterValues}
        nameFilter={filterValues[0].value}
        genderFilter={Number(filterValues[1].value)}
      />
    </>
  );
};

export default FavouriteActorsPage;
