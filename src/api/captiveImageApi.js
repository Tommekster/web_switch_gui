import { handleResponse, handleError, API_URL } from "./apiUtils";
const baseUrl = API_URL + "/captiveImages/";

export function getCaptiveImage(token) {
  return fetch(baseUrl + "0", {
    headers: {
      authorization: "Bearer " + token,
    },
  })
    .then(handleResponse)
    .catch(handleError);
}

export function saveCaptiveImage(token, image) {
  return fetch(baseUrl + "0", {
    method: "PUT", // POST for create, PUT to update when id already exists.
    headers: {
      authorization: "Bearer " + token,
      "content-type": "application/json",
    },
    body: JSON.stringify(image),
  })
    .then(handleResponse)
    .catch(handleError);
}
