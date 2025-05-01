import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType } from "../types/interfaces";

const TOKEN_KEY = "token";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    setToken(storedToken ?? undefined);
  }, []);

  const signin = (newToken: string) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    setToken(newToken);
  };

  const signout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(undefined); 
  };

  const isSignedin = Boolean(token); 

  return (
    <AuthContext.Provider value={{ token, signin, signout, isSignedin }}>
      {children}
    </AuthContext.Provider>
  );
}
