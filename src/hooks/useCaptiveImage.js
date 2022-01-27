import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import * as api from "../api/captiveImageApi";

export default function useCaptiveImage() {
  const { token, handleUnauthorized } = useContext(UserContext);
  const [error, setError] = useState(null);

  const handleError = (error) => {
    handleUnauthorized(error);
    setError(error.message);
  };

  const getCaptiveImage = () => api.getCaptiveImage(token).catch(handleError);

  const saveCaptiveImage = (image) =>
    api.saveCaptiveImage(token, image).catch(handleError);

  return {
    getCaptiveImage,
    saveCaptiveImage,
    error,
  };
}
