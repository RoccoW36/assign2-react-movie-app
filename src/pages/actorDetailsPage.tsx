import React from "react";
import { useParams } from "react-router-dom";
import ActorDetails from "../components/actorDetails";
import PageTemplate from "../components/templateActorPage";
import { getActor } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { ActorDetailsProps } from "../types/interfaces";

const ActorDetailsPage: React.FC = () => {
  const { id } = useParams();

  console.log("Route matched, ActorDetailsPage rendered");
  console.log("Extracted Actor ID:", id);

  if (!id) {
    return <h1>Invalid Actor ID</h1>;
  }

  const { data: actor, error, isLoading, isError } = useQuery<ActorDetailsProps, Error>(
    ["actor", id], 
    () => getActor(id),
    { enabled: !!id }
  );

  console.log("Fetched Actor Data:", actor);

  if (isLoading || actor === undefined) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>Error loading actor details: {error.message}</h1>;
  }

  if (!actor || Object.keys(actor).length === 0) {
    return <h1>Actor details not found.</h1>;
  }

  return (
    <>
      <PageTemplate actor={actor}>
        <ActorDetails actor={actor} />
      </PageTemplate>
    </>
  );
};

export default ActorDetailsPage;
