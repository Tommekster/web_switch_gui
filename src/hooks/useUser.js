import { useState, useEffect } from "react";
import { UnauthorizedError } from "../api/apiUtils";

export default function useUser() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const { user, token } = JSON.parse(localStorage.getItem("user"));
    setUser(user);
    setToken(token);
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify({ token, user }));
  }, [token, user]);

  const isLoggedIn = token && user;
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("user");
  };
  const handleUnauthorized = (error) => {
    if (error instanceof UnauthorizedError) {
      logout();
    }
  };

  return {
    isLoggedIn,
    token,
    user,
    logout,
    handleUnauthorized,
    setUser,
    setToken,
  };
}
