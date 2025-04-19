import React from "react";
import TVShowHeader from "../headerTVShow";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { getTVShowImages } from "../../api/tmdb-api";
import { TVShowImage, TVShowDetailsProps } from "../../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../spinner";

const styles = {
  gridListRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  gridListTile: {
    width: 450,
    height: "auto",
  },
};

interface TemplateTVShowPageProps {
  tvShow: TVShowDetailsProps;
  children: React.ReactElement;
}

const TemplateTVShowPage: React.FC<TemplateTVShowPageProps> = ({ tvShow, children }) => {
  const { data, error, isLoading, isError } = useQuery<TVShowImage[], Error>(
    ["images", tvShow.id],
    () => getTVShowImages(tvShow.id)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }

  const images = data as TVShowImage[];

  return (
    <>
      <TVShowHeader tvShow={tvShow} />
      
      <Grid container spacing={5} sx={{ padding: "15px" }}>
        <Grid item xs={12} sm={4} md={3}>
          <ImageList cols={1} sx={styles.gridListRoot}>
            {images.map((image: TVShowImage) => (
              <ImageListItem key={image.file_path} sx={styles.gridListTile}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${image.file_path}`}
                  alt={"Image alternative"}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>

        <Grid item xs={12} sm={8} md={9}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateTVShowPage;
