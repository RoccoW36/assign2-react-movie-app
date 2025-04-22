import React, { useState, useCallback, useEffect } from "react";
import { BaseMovieProps, Review } from "../types/interfaces";

interface MovieContextInterface {
  favourites: number[];
  myReviews: Record<number, Review>;
  mustWatch: number[];
  addToFavourites: (movie: BaseMovieProps) => void;
  removeFromFavourites: (movie: BaseMovieProps) => void;
  addReview: (movie: BaseMovieProps, review: Review) => void;
  addToMustWatch: (movie: BaseMovieProps) => void;
  removeFromMustWatch: (movie: BaseMovieProps) => void;
}

const loadFromLocalStorage = (key: string): number[] => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error(`Error loading ${key} from localStorage`, error);
    return [];
  }
};

export const MoviesContext = React.createContext<MovieContextInterface>({
  favourites: [],
  addToFavourites: () => {},
  removeFromFavourites: () => {},
  addReview: () => {},
  myReviews: {},
  mustWatch: [],
  addToMustWatch: () => {},
  removeFromMustWatch: () => {},
});

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [favourites, setFavourites] = useState<number[]>(() => loadFromLocalStorage("favoriteMovies"));
  const [mustWatch, setMustWatch] = useState<number[]>(() => loadFromLocalStorage("mustWatchMovies"));
  const [myReviews, setMyReviews] = useState<Record<number, Review>>({});

  useEffect(() => {
    localStorage.setItem("favoriteMovies", JSON.stringify(favourites));
  }, [favourites]);

  useEffect(() => {
    localStorage.setItem("mustWatchMovies", JSON.stringify(mustWatch));
  }, [mustWatch]);

  const addToFavourites = useCallback((movie: BaseMovieProps) => {
    setFavourites((prev) => {
      if (prev.includes(movie.id)) return prev;
      return [...prev, movie.id];
    });
  }, []);

  const removeFromFavourites = useCallback((movie: BaseMovieProps) => {
    setFavourites((prev) => prev.filter((id) => id !== movie.id));
  }, []);

  const addReview = useCallback((movie: BaseMovieProps, review: Review) => {
    setMyReviews((prev) => ({ ...prev, [movie.id]: review }));
  }, []);

  const addToMustWatch = useCallback((movie: BaseMovieProps) => {
    setMustWatch((prev) => {
      if (prev.includes(movie.id)) return prev;
      return [...prev, movie.id];
    });
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
