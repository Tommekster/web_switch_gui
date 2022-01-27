import { useState } from "react";
import { UnauthorizedError } from "../api/apiUtils";

export default function useUser() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const isLoggedIn = token && user;
  const handleUnauthorized = (error) => {
    if (error instanceof UnauthorizedError) {
      logout();
    }
  };

  return {
    isLoggedIn,
    token,
    user,
    handleUnauthorized,
    setUser,
    setToken,
  };
}
