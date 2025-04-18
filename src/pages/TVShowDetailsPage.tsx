import React from "react";
import { useParams } from "react-router-dom";
import TVShowDetails from "../components/TVShowDetails"; 
import PageTemplate from "../components/templateTVShowPage"; 
import { getTVShow } from '../api/tmdb-api';
import { useQuery } from "react-query";
import Spinner from '../components/spinner'; 
import { TVShowDetailsProps } from "../types/interfaces"; 

const TVShowDetailsPage: React.FC = () => {
  const { id } = useParams(); 
  const { data: tvShow, error, isLoading, isError } = useQuery<TVShowDetailsProps, Error>(
    ["tvShow", id], 
    () => getTVShow(id || "") 
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }

  return (
    <>
      {tvShow ? (
        <PageTemplate tvShow={tvShow}>
          <div>
            <TVShowDetails {...tvShow} />
          </div>
        </PageTemplate>
      ) : (
        <p>Waiting for TV Show details</p>
      )}
    </>
  );
};

export default TVShowDetailsPage;
