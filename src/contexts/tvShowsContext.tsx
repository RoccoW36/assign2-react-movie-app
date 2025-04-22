import React, { useState, useCallback, useEffect } from "react";
import { BaseTVShowProps, Review } from "../types/interfaces";

interface TVShowContextInterface {
  favourites: number[];
  mustWatch: number[];
  myReviews: Record<number, Review>;
  addToFavourites: (tvShow: BaseTVShowProps) => void;
  removeFromFavourites: (tvShow: BaseTVShowProps) => void;
  addToMustWatch: (tvShow: BaseTVShowProps) => void;
  removeFromMustWatch: (tvShow: BaseTVShowProps) => void;
  addReview: (tvShow: BaseTVShowProps, review: Review) => void;
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

export const TVShowsContext = React.createContext<TVShowContextInterface>({
  favourites: [],
  mustWatch: [],
  myReviews: {},
  addToFavourites: () => {},
  removeFromFavourites: () => {},
  addToMustWatch: () => {},
  removeFromMustWatch: () => {},
  addReview: () => {},
});

const TVShowsContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [favourites, setFavourites] = useState<number[]>(() => loadFromLocalStorage("tvFavourites"));
  const [mustWatch, setMustWatch] = useState<number[]>(() => loadFromLocalStorage("tvMustWatch"));
  const [myReviews, setMyReviews] = useState<Record<number, Review>>({});

  useEffect(() => {
    localStorage.setItem("tvFavourites", JSON.stringify(favourites));
  }, [favourites]);

  useEffect(() => {
    localStorage.setItem("tvMustWatch", JSON.stringify(mustWatch));
  }, [mustWatch]);

  const addToFavourites = useCallback((tvShow: BaseTVShowProps) => {
    setFavourites((prev) => {
      if (!prev.includes(tvShow.id)) return [...prev, tvShow.id];
      return prev;
    });
  }, []);

  const removeFromFavourites = useCallback((tvShow: BaseTVShowProps) => {
    setFavourites((prev) => prev.filter((id) => id !== tvShow.id));
  }, []);

  const addReview = useCallback((tvShow: BaseTVShowProps, review: Review) => {
    setMyReviews((prev) => ({ ...prev, [tvShow.id]: review }));
  }, []);

  const addToMustWatch = useCallback((tvShow: BaseTVShowProps) => {
    setMustWatch((prev) => {
      if (!prev.includes(tvShow.id)) return [...prev, tvShow.id];
      return prev;
    });
  }, []);

  const removeFromMustWatch = useCallback((tvShow: BaseTVShowProps) => {
    setMustWatch((prev) => prev.filter((id) => id !== tvShow.id));
  }, []);

  return (
    <TVShowsContext.Provider
      value={{
        favourites,
        mustWatch,
        myReviews,
        addToFavourites,
        removeFromFavourites,
        addToMustWatch,
        removeFromMustWatch,
        addReview,
      }}
    >
      {children}
    </TVShowsContext.Provider>
  );
};

export default TVShowsContextProvider;
