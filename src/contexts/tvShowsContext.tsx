import React, { useState, useCallback, useEffect } from "react";
import { BaseTVShowProps, Review } from "../types/interfaces";

interface TVShowContextInterface {
  favourites: number[]; 
  mustWatch: number[];  
  addToFavourites: (tvShow: BaseTVShowProps) => void;
  removeFromFavourites: (tvShow: BaseTVShowProps) => void;
  addToMustWatch: (tvShow: BaseTVShowProps) => void;  
  removeFromMustWatch: (tvShow: BaseTVShowProps) => void; 
  addReview: (tvShow: BaseTVShowProps, review: Review) => void;
  myReviews: Record<number, Review>;
}

const initialContextState: TVShowContextInterface = {
  favourites: [],
  mustWatch: [],
  addToFavourites: () => {},
  removeFromFavourites: () => {},
  addToMustWatch: () => {},
  removeFromMustWatch: () => {},
  addReview: () => {},
  myReviews: {},
};

export const TVShowsContext = React.createContext<TVShowContextInterface>(initialContextState);

const TVShowsContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [favourites, setFavourites] = useState<number[]>(() => {
    const stored = localStorage.getItem("favoriteTVShows");
    return stored ? JSON.parse(stored) : [];
  });

  const [mustWatch, setMustWatch] = useState<number[]>(() => {
    const stored = localStorage.getItem("mustWatchTVShows");
    return stored ? JSON.parse(stored) : [];
  });

  const [myReviews, setMyReviews] = useState<Record<number, Review>>({});

  useEffect(() => {
    localStorage.setItem("favoriteTVShows", JSON.stringify(favourites));
  }, [favourites]);

  useEffect(() => {
    localStorage.setItem("mustWatchTVShows", JSON.stringify(mustWatch));
  }, [mustWatch]);

  const addToFavourites = useCallback((tvShow: BaseTVShowProps) => {
    setFavourites((prev) => (prev.includes(tvShow.id) ? prev : [...prev, tvShow.id]));
  }, []);

  const removeFromFavourites = useCallback((tvShow: BaseTVShowProps) => {
    setFavourites((prev) => prev.filter((id) => id !== tvShow.id));
  }, []);

  const addToMustWatch = useCallback((tvShow: BaseTVShowProps) => {
    setMustWatch((prev) => (prev.includes(tvShow.id) ? prev : [...prev, tvShow.id]));
  }, []);

  const removeFromMustWatch = useCallback((tvShow: BaseTVShowProps) => {
    setMustWatch((prev) => prev.filter((id) => id !== tvShow.id));
  }, []);

  const addReview = useCallback((tvShow: BaseTVShowProps, review: Review) => {
    setMyReviews((prev) => ({ ...prev, [tvShow.id]: review }));
  }, []);

  return (
    <TVShowsContext.Provider
      value={{
        favourites,
        mustWatch,
        addToFavourites,
        removeFromFavourites,
        addToMustWatch,
        removeFromMustWatch,
        addReview,
        myReviews,
      }}
    >
      {children}
    </TVShowsContext.Provider>
  );
};

export default TVShowsContextProvider;
