import { handleResponse, handleError, API_URL } from "./apiUtils";
const baseUrl = API_URL + "/switches/";

export function getSwitches(token) {
  return fetch(baseUrl, {
    headers: { authorization: "Bearer " + token },
  })
    .then(handleResponse)
    .catch(handleError);
}

export function saveSwitch(token, item) {
  return fetch(baseUrl + item.id, {
    method: "PUT", // POST for create, PUT to update when id already exists.
    headers: {
      authorization: "Bearer " + token,
      "content-type": "application/json",
    },
    body: JSON.stringify(item),
  })
    .then(handleResponse)
    .catch(handleError);
}
