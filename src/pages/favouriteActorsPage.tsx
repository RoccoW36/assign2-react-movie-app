import React, { useContext } from "react";
import PageTemplate from "../components/templateActorListPage";
import { ActorsContext } from "../contexts/actorsContext";
import { useQueries } from "react-query";
import { getActor } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromActorFavourites from "../components/cardIcons/removeFromActorFavourites";

const FavouriteActorsPage: React.FC = () => {
  const { favourites: actorIds } = useContext(ActorsContext);

  const favouriteActorQueries = useQueries(
    actorIds.map((actorId: number) => ({
      queryKey: ["actor", actorId],
      queryFn: () => actorId ? getActor(actorId.toString()) : Promise.resolve(null),
    }))
  );

  if (favouriteActorQueries.some((q) => q.isLoading)) {
    return <Spinner />;
  }

  if (favouriteActorQueries.some((q) => q.isError)) {
    return <h1>Failed to load favourite actors.</h1>;
  }

  const displayedActors = favouriteActorQueries.map((q) => q.data).filter(Boolean);

  if (displayedActors.length === 0) {
    return <h1>No favourite actors found.</h1>;
  }

  return (
    <PageTemplate
      title="Favourite Actors"
      actors={displayedActors}
      action={(actor) => <RemoveFromActorFavourites actor={actor} />}
    />
  );
};

export default FavouriteActorsPage;
