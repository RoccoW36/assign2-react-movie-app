import React from "react";
import ActorHeader from "../headerActor";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Box from "@mui/material/Box";
import { getActorImages } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from "../spinner";
import { ActorImage, ActorDetailsProps } from "../../types/interfaces";

interface TemplateActorPageProps {
  actor: ActorDetailsProps;
  children: React.ReactElement;
}

const TemplateActorPage: React.FC<TemplateActorPageProps> = ({ actor, children }) => {
  const { data, error, isLoading, isError } = useQuery<ActorImage[], Error>(
    ["actorImages", actor.id], 
    () => getActorImages(actor.id) 
  );

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  const images = data || [];

  return (
    <>
      <ActorHeader actor={actor} />

      <Grid container spacing={5} sx={{ padding: "15px" }}>
        <Grid item xs={3}>
          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
            <ImageList cols={1}>
              {images.map((image) => (
                <ImageListItem key={image.file_path} cols={1}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                    alt="Actor image"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        </Grid>

        <Grid item xs={9}>{children}</Grid>
      </Grid>
    </>
  );
};

export default TemplateActorPage;
