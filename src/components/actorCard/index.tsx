import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import WcIcon from "@mui/icons-material/Wc";
import Divider from "@mui/material/Divider";
import { Link } from "react-router-dom";
import img from "../../images/film-poster-placeholder.png";
import { ActorsContext } from "../../contexts/actorsContext";
import { BaseActorProps } from "../../types/interfaces";

const styles = {
  card: {
    maxWidth: 300, 
    height: "auto", 
    margin: "20px auto", 
  },
  media: {
    height: 300, 
    objectFit: "cover", 
  },
  avatarFav: {
    backgroundColor: "rgb(255, 0, 0)", 
  },
};

interface ActorCardProps {
  actor: BaseActorProps;
  action: (a: BaseActorProps) => React.ReactNode;
}

const ActorCard: React.FC<ActorCardProps> = ({ actor, action }) => {
  const { favourites } = useContext(ActorsContext);
  const isFavourite = favourites.includes(actor.id);
  const gender =
    actor.gender === 1 ? "Female" : actor.gender === 2 ? "Male" : "Unknown";

  return (
    <Card sx={styles.card}>
      <CardHeader
        avatar={
          isFavourite ? (
            <Avatar sx={styles.avatarFav}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p">{actor.name}</Typography>
        }
      />
      <CardMedia
        sx={styles.media}
        image={actor.profile_path ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}` : img}
      />
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <WcIcon fontSize="small" /> {gender}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              Popularity: {actor.popularity}
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ margin: "10px 0" }} />
        <Typography variant="h6" component="p" sx={{ fontWeight: "bold" }}>
          Known for:
        </Typography>
        {actor.known_for?.map((media) => (
          <Link to={`/movies/${media.id}`} key={media.id}>
            <Typography variant="body1" component="p">
              {media.title || media.name}
            </Typography>
            <Divider />
          </Link>
        ))}
      </CardContent>
      <CardActions disableSpacing>
        {action(actor)}
        <Link to={`/actors/${actor.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ActorCard;
