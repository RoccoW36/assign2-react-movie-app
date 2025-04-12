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
      queryFn: () => getActor(actorId.toString()),
    }))
  );

  if (favouriteActorQueries.some((q) => q.isLoading)) {
    return <Spinner />;
  }

  const displayedActors = favouriteActorQueries.map((q) => q.data).filter(Boolean);

  return (
    <PageTemplate
      title="Favourite Actors"
      actors={displayedActors}
      action={(actor) => <RemoveFromActorFavourites actor={actor} />}
    />
  );
};

export default FavouriteActorsPage;
