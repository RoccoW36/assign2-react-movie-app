import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import WriteReview from "../components/cardIcons/writeReview";

// Define filtering conditions
const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};

const FavouriteMoviesPage: React.FC = () => {
  // Fetch favourite movie IDs from context
  const { favourites: movieIds } = useContext(MoviesContext);
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]
  );

  // Fetch detailed movie data for all favourite movies
  const favouriteMovieQueries = useQueries(
    movieIds.map((movieId) => ({
      queryKey: ["movie", movieId],
      queryFn: () => getMovie(movieId.toString()),
    }))
  );

  // Check if any query is still loading
  const isLoading = favouriteMovieQueries.some((q) => q.isLoading);

  if (isLoading) {
    return <Spinner />;
  }

  // Combine all retrieved data into a list of favourite movies
  const allFavourites = favouriteMovieQueries
    .map((q) => q.data)
    .filter((movie) => movie !== undefined); // Remove undefined results

  console.log("All Favourites (before filtering):", allFavourites); // Debug log

  // Apply filtering logic to the favourites list
  const displayedMovies = filterFunction(allFavourites);

  console.log("Filtered Movies (after filtering):", displayedMovies); // Debug log

  // Handle filter changes dynamically
  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value };
    const updatedFilterSet =
      type === "title" ? [changedFilter, filterValues[1]] : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };

  return (
    <>
      <PageTemplate
        title="Favourite Movies"
        movies={displayedMovies}
        action={(movie) => (
          <>
            <RemoveFromFavourites {...movie} />
            <WriteReview {...movie} />
          </>
        )}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
      />
    </>
  );
};

export default FavouriteMoviesPage;
