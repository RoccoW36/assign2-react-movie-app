import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType } from "../types/interfaces";

const TOKEN_KEY = "token";

const AuthContext = createContext({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const signin = (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
    setToken(token);
  };

  const signout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken("");
  };

  const isSignedin = !!token;

  return (
    <AuthContext.Provider value={{ token, signin, signout, isSignedin }}>
      {children}
    </AuthContext.Provider>
  );
}
