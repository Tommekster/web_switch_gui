import { handleResponse, handleError, API_URL } from "./apiUtils";
const baseUrl = API_URL + "/captiveImages/";

export function getCaptiveImage() {
  return fetch(baseUrl + "0")
    .then(handleResponse)
    .catch(handleError);
}

export function saveCaptiveImage(image) {
  return fetch(baseUrl + "0", {
    method: "PUT", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(image),
  })
    .then(handleResponse)
    .catch(handleError);
}
