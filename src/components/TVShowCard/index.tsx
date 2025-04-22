import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaylistPlayIcon from "@mui/icons-material/PlaylistPlay";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import { TVShowsContext } from "../../contexts/tvShowsContext";
import { BaseTVShowProps } from "../../types/interfaces";
import img from '../../images/film-poster-placeholder.png';

const styles = {
  card: { maxWidth: 345 },
  media: { height: 500 },

  avatarFav: {
    backgroundColor: "rgb(255, 0, 0)",
  },
  avatarMustWatch: {
    backgroundColor: "rgb(0, 128, 0)",
  },
};

interface TVShowCardProps {
  tvShow: BaseTVShowProps;
  action: (tvShow: BaseTVShowProps) => React.ReactNode;
}

const TVShowCard: React.FC<TVShowCardProps> = ({ tvShow, action }) => {
  const { favourites, mustWatch } = useContext(TVShowsContext);
  console.log("Favourites in TVShowsPage:", favourites);
  console.log("Rendering TVShowCard for ID:", tvShow.id);

  const isFavourite = favourites.includes(tvShow.id);
  const isMustWatch = mustWatch.includes(tvShow.id);

  console.log("TVShowCard Debug:", { tvShowId: tvShow.id, isFavourite, favourites });

  return (
    <Card sx={styles.card}>
      <CardHeader
        avatar={
          isFavourite ? (
            <Avatar sx={styles.avatarFav}>
              <FavoriteIcon />
            </Avatar>
          ) : isMustWatch ? (
            <Avatar sx={styles.avatarMustWatch}>
              <PlaylistPlayIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p">
            {tvShow.name}
          </Typography>
        }
      />
      <CardMedia
        sx={styles.media}
        image={
          tvShow.poster_path
            ? `https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`
            : img
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" /> {tvShow.first_air_date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" /> {tvShow.vote_average}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        {action(tvShow)}
        <Link to={`/tv/${tvShow.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default TVShowCard;
