import { handleResponse, handleError, API_URL } from "./apiUtils";
const baseUrl = API_URL + "/switches/";

export function getSwitches() {
  return fetch(baseUrl).then(handleResponse).catch(handleError);
}

export function saveSwitch(item) {
  return fetch(baseUrl + item.id, {
    method: "PUT", // POST for create, PUT to update when id already exists.
    headers: { "content-type": "application/json" },
    body: JSON.stringify(item),
  })
    .then(handleResponse)
    .catch(handleError);
}
