import React, { useState, useCallback, useEffect } from "react";
import { BaseMovieProps, Review } from "../types/interfaces";

interface MovieContextInterface {
  favourites: number[];
  addToFavourites: (movie: BaseMovieProps) => void;
  removeFromFavourites: (movie: BaseMovieProps) => void;
  addReview: (movie: BaseMovieProps, review: Review) => void;
  myReviews: Record<number, Review>;

  mustWatch: number[];
  addToMustWatch: (movie: BaseMovieProps) => void;
  removeFromMustWatch: (movie: BaseMovieProps) => void;
}

const initialContextState: MovieContextInterface = {
  favourites: [],
  addToFavourites: () => {},
  removeFromFavourites: () => {},
  addReview: () => {},
  myReviews: {},

  mustWatch: [],
  addToMustWatch: () => {},
  removeFromMustWatch: () => {},
};

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [favourites, setFavourites] = useState<number[]>(() => {
    const stored = localStorage.getItem("favoriteMovies");
    return stored ? JSON.parse(stored) : [];
  });

  const [myReviews, setMyReviews] = useState<Record<number, Review>>({});
  const [mustWatch, setMustWatch] = useState<number[]>([]);

  useEffect(() => {
    localStorage.setItem("favoriteMovies", JSON.stringify(favourites));
  }, [favourites]);

  const addToFavourites = useCallback((movie: BaseMovieProps) => {
    setFavourites((prev) => (prev.includes(movie.id) ? prev : [...prev, movie.id]));
  }, []);

  const removeFromFavourites = useCallback((movie: BaseMovieProps) => {
    setFavourites((prev) => prev.filter((id) => id !== movie.id));
  }, []);

  const addReview = useCallback((movie: BaseMovieProps, review: Review) => {
    setMyReviews((prev) => ({ ...prev, [movie.id]: review }));
  }, []);

  const addToMustWatch = useCallback((movie: BaseMovieProps) => {
    setMustWatch((prev) => (prev.includes(movie.id) ? prev : [...prev, movie.id]));
  }, []);

  const removeFromMustWatch = useCallback((movie: BaseMovieProps) => {
    setMustWatch((prev) => prev.filter((id) => id !== movie.id));
  }, []);

  return (
    <MoviesContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
        addReview,
        myReviews,
        mustWatch,
        addToMustWatch,
        removeFromMustWatch,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
