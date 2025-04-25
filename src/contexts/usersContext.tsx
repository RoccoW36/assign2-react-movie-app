import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType } from "../types/interfaces"; 

const AuthContext = createContext({} as AuthContextType);

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    setToken(token);
  }, []);

  const signin = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const signout = () => {
    localStorage.clear();
    setToken("");
    window.location.reload();
  };

  const isSignedin = !!token;

  return (
    <AuthContext.Provider value={{ token, signin, signout, isSignedin }}>
      {children}
    </AuthContext.Provider>
  );
}