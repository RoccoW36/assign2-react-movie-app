import FantasyMovieHeader from "../fantasyMovieHeader";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";


const TemplateMoviePage = ({ movie, children }) => {
  const navigate = useNavigate();

  return (
    <>
      <FantasyMovieHeader movie={movie} />

      <Grid container sx={{ padding: "15px" }}>
        <Grid item xs={1}>
          <div sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}>
          </div>
        </Grid>

        <Grid item xs={10}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateMoviePage;