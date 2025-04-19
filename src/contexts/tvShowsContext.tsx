import React, { useState, useCallback, useEffect } from "react";
import { BaseTVShowProps, Review } from "../types/interfaces";

interface TVShowContextInterface {
  favourites: number[];
  addToFavourites: (tvShow: BaseTVShowProps) => void;
  removeFromFavourites: (tvShow: BaseTVShowProps) => void;
  addReview: (tvShow: BaseTVShowProps, review: Review) => void;
  myReviews: Record<number, Review>;
}

const initialContextState: TVShowContextInterface = {
  favourites: [],
  addToFavourites: () => {},
  removeFromFavourites: () => {},
  addReview: () => {},
  myReviews: {},
};

export const TVShowsContext = React.createContext<TVShowContextInterface>(initialContextState);

const TVShowsContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [favourites, setFavourites] = useState<number[]>(() => {
    const stored = localStorage.getItem("tvFavourites");
    return stored ? JSON.parse(stored) : [];
  });

  const [myReviews, setMyReviews] = useState<Record<number, Review>>({});

  useEffect(() => {
    localStorage.setItem("tvFavourites", JSON.stringify(favourites));
  }, [favourites]);

  const addToFavourites = useCallback((tvShow: BaseTVShowProps) => {
    setFavourites((prevFavourites) => {
      if (!prevFavourites.includes(tvShow.id)) {
        return [...prevFavourites, tvShow.id];
      }
      return prevFavourites;
    });
  }, []);

  const removeFromFavourites = useCallback((tvShow: BaseTVShowProps) => {
    setFavourites((prevFavourites) =>
      prevFavourites.filter((tvShowId) => tvShowId !== tvShow.id)
    );
  }, []);

  const addReview = useCallback((tvShow: BaseTVShowProps, review: Review) => {
    setMyReviews((prevReviews) => ({ ...prevReviews, [tvShow.id]: review }));
  }, []);

  return (
    <TVShowsContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
        addReview,
        myReviews,
      }}
    >
      {children}
    </TVShowsContext.Provider>
  );
};

export default TVShowsContextProvider;
