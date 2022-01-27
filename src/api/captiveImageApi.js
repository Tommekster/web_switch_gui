import { handleResponse, handleError, API_URL } from "./apiUtils";
const baseUrl = API_URL + "/captiveImage/";

export function getCaptiveImage(token) {
  return fetch(baseUrl, {
    headers: {
      authorization: "Bearer " + token,
    },
  })
    .then(handleResponse)
    .catch(handleError);
}

export function saveCaptiveImage(token, image) {
  return fetch(baseUrl, {
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
