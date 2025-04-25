import React, { useState } from "react";

export const FantasyMoviesContext = React.createContext<any>(null);

const FantasyMoviesContextProvider = (props) => {
  const [fantasy, setFantasy] = useState<any[]>([])

  const addToFantasyMovies = (newFantasy) => {
    fantasy.push(newFantasy)
  };

  const removeFromFantasyMovies = (fantasy) => {
    setFantasy(fantasy.filter(
      (fId) => fId !== fantasy.id
    ))
  };


  return (
    <FantasyMoviesContext.Provider
      value={{
        fantasy,
        addToFantasyMovies,
        removeFromFantasyMovies
      }}
    >
      {props.children}
    </FantasyMoviesContext.Provider>
  );
};

export default FantasyMoviesContextProvider;