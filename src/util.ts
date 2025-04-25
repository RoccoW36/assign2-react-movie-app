import truncate from "lodash/truncate";
import { BaseMovieProps } from "./types/interfaces";

// Function to generate a movie excerpt (truncate long text)
export const excerpt = (string: string) => {
  return truncate(string, {
    length: 400, // maximum 400 characters
    separator: /,?\.* +/, // separate by spaces, including preceding commas and periods
  });
};

// Function to apply sorting based on the provided sort option
export const applySort = (
  movies: BaseMovieProps[],
  sortOption: string
): BaseMovieProps[] => {
  const sorted = [...movies]; // Copy the movies array to avoid mutation

  switch (sortOption) {
    case "ratingDesc":
      return sorted.sort((a, b) => b.vote_average - a.vote_average); // Sort by rating descending
    case "ratingAsc":
      return sorted.sort((a, b) => a.vote_average - b.vote_average); // Sort by rating ascending
    case "releaseDesc":
      return sorted.sort(
        (a, b) =>
          new Date(b.release_date).getTime() - new Date(a.release_date).getTime() // Sort by release date descending
      );
    case "releaseAsc":
      return sorted.sort(
        (a, b) =>
          new Date(a.release_date).getTime() - new Date(b.release_date).getTime() // Sort by release date ascending
      );
    case "popularityDesc":
      return sorted.sort((a, b) => b.popularity - a.popularity); // Sort by popularity descending
    case "popularityAsc":
      return sorted.sort((a, b) => a.popularity - b.popularity); // Sort by popularity ascending
    default:
      return sorted; // If no sort option, return the movies as they are
  }
};
