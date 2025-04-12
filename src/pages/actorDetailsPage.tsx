import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ActorDetails from "../components/actorDetails";
import PageTemplate from "../components/templateActorPage";
import { getActor } from "../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import { ActorDetailsProps } from "../types/interfaces";

const ActorDetailPage: React.FC = () => {
  const { id } = useParams();
  console.log("Extracted Actor ID:", id);

  if (!id) {
    return <h1>Invalid Actor ID</h1>;
  }

  const { data: actor, error, isLoading, isError } = useQuery<ActorDetailsProps, Error>(
    ["actor", id],
    () => getActor(id),
    { enabled: !!id }
  );

  useEffect(() => {
    console.log("Fetching actor details for ID:", id);
    getActor(id).then((data) => console.log("Actor API Response:", data));
  }, [id]);
  

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  if (!actor || Object.keys(actor).length === 0) {
    return <h1>Actor details not found.</h1>;
  }

  return (
    <PageTemplate actor={actor}> 
      <ActorDetails actor={actor} />
    </PageTemplate>
  );
};

export default ActorDetailPage;
