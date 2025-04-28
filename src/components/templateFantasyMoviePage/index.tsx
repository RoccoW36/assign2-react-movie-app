import FantasyMovieHeader from "../fantasyMovieHeader";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { FantasyMovie } from "../../types/interfaces";
import { ReactNode } from "react";

interface TemplateFantasyMoviePageProps {
  movie?: FantasyMovie | null;
  children: ReactNode;
}

const TemplateFantasyMoviePage: React.FC<TemplateFantasyMoviePageProps> = ({ movie, children }) => {
  return (
    <>
      <FantasyMovieHeader movie={movie} />

      <Grid container justifyContent="center" sx={{ padding: "16px" }}>
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              padding: 3,
              backgroundColor: "#ffffff",
              borderRadius: 2,
              boxShadow: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 2,
            }}
          >
            {children}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateFantasyMoviePage;
