import { handleResponse, handleError, API_URL } from "./apiUtils";

export function signUp(email, password, username) {
  return fetch(API_URL + "/users/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password, username }),
  })
    .then(handleResponse)
    .catch(handleError);
}

export function login(email, password) {
  return fetch(API_URL + "/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then(handleResponse)
    .catch(handleError);
}
