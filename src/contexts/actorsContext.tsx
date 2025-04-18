import React, { useState, useCallback } from "react";
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

const ActorsContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [favourites, setFavourites] = useState<number[]>([]);

  const addToFavourites = useCallback((actor: Actor) => {
    setFavourites((prevFavourites) => {
      if (!prevFavourites.includes(actor.id)) {
        return [...prevFavourites, actor.id];
      }
      return prevFavourites;
    });
  }, []);

  const removeFromFavourites = useCallback((actor: Actor) => {
    setFavourites((prevFavourites) =>
      prevFavourites.filter((actorId) => actorId !== actor.id)
    );
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
