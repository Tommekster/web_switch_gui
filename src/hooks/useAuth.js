import { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import * as api from "../api/usersApi";

export default function useAuth() {
  const { setUser, setToken } = useContext(UserContext);
  const [error, setError] = useState(null);

  //set user in context and push them home
  const handleResponse = (data) => {
    const { accessToken, user } = data;
    setError("");
    setUser(user);
    setToken(accessToken);
  };

  const handleError = (error) => setError(error.message);

  const callApi = (callFunc) =>
    callFunc(api).then(handleResponse).catch(handleError);

  //register user
  const registerUser = (email, password, username) => {
    return callApi((x) => x.signUp(email, password, username));
  };

  //login user
  const loginUser = (username, password) => {
    return callApi((x) => x.login(username, password));
  };

  return {
    registerUser,
    loginUser,
    error,
  };
}
