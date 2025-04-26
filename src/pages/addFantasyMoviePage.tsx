import PageTemplate from "../components/templateFantasyMoviePage";
import FantasyMovieForm from "../components/fantasyMovieCreateForm";

const AddFantasyMoviePage: React.FC = () => {
  return (
    <PageTemplate movie={null}>
      <FantasyMovieForm />
    </PageTemplate>
  );
};

export default AddFantasyMoviePage;