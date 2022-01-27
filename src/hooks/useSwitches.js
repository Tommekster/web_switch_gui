import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import * as api from "../api/switchesApi";

export default function useSwitches() {
  const { token, handleUnauthorized } = useContext(UserContext);
  const [error, setError] = useState(null);

  const handleError = (error) => {
    handleUnauthorized(error);
    setError(error.message);
  };

  const getSwitches = () => api.getSwitches(token).catch(handleError);

  const saveSwitch = (item) => api.saveSwitch(token, item).catch(handleError);

  return {
    getSwitches,
    saveSwitch,
    error,
  };
}
