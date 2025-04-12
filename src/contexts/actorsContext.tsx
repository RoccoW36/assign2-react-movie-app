import React, { useState, useCallback, useEffect } from "react";
import { Actor } from "../types/interfaces";

interface ActorsContextInterface {
  favourites: number[];
  addToFavourites: (actor: Actor) => void;
  removeFromFavourites: (actor: Actor) => void;
}

const initialContextState: ActorsContextInterface = {
  favourites: [],
  addToFavourites: () => {},
  removeFromFavourites: () => {},
};

export const ActorsContext = React.createContext<ActorsContextInterface>(initialContextState);

const ActorsContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favourites, setFavourites] = useState<number[]>(() => {
    const storedFavorites = localStorage.getItem("favoriteActors");
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem("favoriteActors", JSON.stringify(favourites));
  }, [favourites]);

  const addToFavourites = useCallback((actor: Actor) => {
    setFavourites((prev) => (!prev.includes(actor.id) ? [...prev, actor.id] : prev));
  }, []);

  const removeFromFavourites = useCallback((actor: Actor) => {
    setFavourites((prev) => prev.filter((id) => id !== actor.id));
  }, []);

  return (
    <ActorsContext.Provider
      value={{
        favourites,
        addToFavourites,
        removeFromFavourites,
      }}
    >
      {children}
    </ActorsContext.Provider>
  );
};

export default ActorsContextProvider;
