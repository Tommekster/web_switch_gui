import { useState } from "react";

export default function useUser() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState();
  const isLoggedIn = token && user;
  return { isLoggedIn, token, user, setUser, setToken };
}
