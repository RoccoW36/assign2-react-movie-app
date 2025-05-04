import { createContext, useContext, useState, useEffect } from "react";
import { AuthContextType } from "../types/interfaces";

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
    const storedUsername = localStorage.getItem(USERNAME_KEY);

    // Retrieve token from cookies
    const storedToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    setToken(storedToken ?? undefined);
    setUsername(storedUsername ?? undefined);
    setLoading(false);
  }, []);

  const signin = (newToken: string, newUsername: string) => {
    // Store token in a cookie
    document.cookie = `token=${newToken}; Path=/; Secure; SameSite=None; Max-Age=3600`;
    localStorage.setItem(USERNAME_KEY, newUsername);
    setToken(newToken);
    setUsername(newUsername);
  };

  const signout = () => {
    // Clear the cookie by setting its max age to 0
    document.cookie = `token=; Path=/; Secure; SameSite=None; Max-Age=0`;
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
