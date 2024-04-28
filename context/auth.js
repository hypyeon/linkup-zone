import { createContext, useContext, useState, useEffect } from "react";

export const Auth = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsAuthenticated(false);
    }, 1000);
  }, []);

  const login = async (email, password) => {
    try {

    } catch (e) {
      console.error(e);
    }
  }
  const logout = async () => {
    try {

    } catch (e) {
      console.error(e);
    }
  }
  const register = async (email, password, username, timezone) => {
    try {

    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Auth.Provider value={{ user, isAuthenticated, login, logout, register }}>
      {children}
    </Auth.Provider>
  )
}

export const useAuth = () => {
  const value = useContext(Auth);

  if (!value) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return value;
}