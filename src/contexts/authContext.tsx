import { createContext, useContext, useState, useEffect } from "react";
import { AuthContextType } from "../types/interfaces";

const TOKEN_KEY = "token";
const USERNAME_KEY = "username";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | undefined>(undefined);
  const [username, setUsername] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedUsername = localStorage.getItem(USERNAME_KEY);
    setToken(storedToken ?? undefined);
    setUsername(storedUsername ?? undefined);
    setLoading(false);
  }, []);

  const signin = (newToken: string, newUsername: string) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    localStorage.setItem(USERNAME_KEY, newUsername);
    setToken(newToken);
    setUsername(newUsername);
  };

  const signout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USERNAME_KEY);
    setToken(undefined);
    setUsername(undefined);
  };

  const isSignedin = !!token;

  return (
    <AuthContext.Provider value={{ token, username, signin, signout, isSignedin, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
