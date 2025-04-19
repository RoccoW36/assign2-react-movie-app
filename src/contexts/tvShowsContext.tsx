import React, { useState, useCallback } from "react";
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
  // State for favourites
  const [favourites, setFavourites] = useState<number[]>([]);

  // State for reviews
  const [myReviews, setMyReviews] = useState<Record<number, Review>>({});

  // Add to favourites logic
  const addToFavourites = useCallback((tvShow: BaseTVShowProps) => {
    setFavourites((prev) => {
      const updated = prev.includes(tvShow.id) ? prev : [...prev, tvShow.id];
      console.log("Prev Favourites:", prev); // Debugging previous state
      console.log("Updated Favourites Array:", updated); // Debugging updated state
      return updated;
    });
  }, []);

  // Remove from favourites logic
  const removeFromFavourites = useCallback((tvShow: BaseTVShowProps) => {
    setFavourites((prev) => {
      const updated = prev.filter((id) => id !== tvShow.id);
      console.log("Updated Favourites After Removal:", updated); // Debugging
      return updated;
    });
  }, []);

  // Add review logic
  const addReview = useCallback((tvShow: BaseTVShowProps, review: Review) => {
    setMyReviews((prev) => {
      const updatedReviews = { ...prev, [tvShow.id]: review };
      console.log("Added Review:", updatedReviews); // Debugging
      return updatedReviews;
    });
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
