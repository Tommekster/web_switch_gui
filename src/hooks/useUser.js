import { useState } from "react";

export default function useUser() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState();
  return { token, user, setUser, setToken };
}
