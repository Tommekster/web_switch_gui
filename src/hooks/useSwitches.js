import { useContext } from "react";
import { UserContext } from "./UserContext";
import * as api from "../api/switchesApi";

export default function useSwitches() {
  const { token, handleUnauthorized } = useContext(UserContext);
  const getSwitches = () => api.getSwitches(token).catch(handleUnauthorized);

  const saveSwitch = (item) =>
    api.saveSwitch(token, item).catch(handleUnauthorized);

  return {
    getSwitches,
    saveSwitch,
  };
}
