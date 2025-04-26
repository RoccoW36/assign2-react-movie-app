import React, { createContext, useState, useEffect } from "react";
import { FantasyMovie } from "../types/interfaces";

interface FantasyMoviesContextProps {
  children: React.ReactNode;
}

export const FantasyMoviesContext = createContext<{
  fantasy: FantasyMovie[];
  addToFantasy: (movie: FantasyMovie) => void;
  removeFromFantasy: (id: number) => void;
}>({
  fantasy: [],
  addToFantasy: () => {},
  removeFromFantasy: () => {},
});

export const FantasyMoviesContextProvider: React.FC<FantasyMoviesContextProps> = ({ children }) => {
  const [fantasy, setFantasy] = useState<FantasyMovie[]>(() => {
    const savedFantasyMovies = localStorage.getItem("fantasyMovies");
    return savedFantasyMovies ? JSON.parse(savedFantasyMovies) : [];
  });

  useEffect(() => {
    localStorage.setItem("fantasyMovies", JSON.stringify(fantasy));
  }, [fantasy]);

  const addToFantasy = (newFantasy: FantasyMovie) => {
    setFantasy((prevFantasy) => {
      const updatedFantasy = [...prevFantasy, newFantasy];
      localStorage.setItem("fantasyMovies", JSON.stringify(updatedFantasy)); 
      return updatedFantasy;
    });
  };

  const removeFromFantasy = (fId: number) => {
    setFantasy((prevFantasy) => {
      const updatedFantasy = prevFantasy.filter((movie) => movie.id !== fId);
      localStorage.setItem("fantasyMovies", JSON.stringify(updatedFantasy)); 
      return updatedFantasy;
    });
  };

  return (
    <FantasyMoviesContext.Provider value={{ fantasy, addToFantasy, removeFromFantasy }}>
      {children}
    </FantasyMoviesContext.Provider>
  );
};
