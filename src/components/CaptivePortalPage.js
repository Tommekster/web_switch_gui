import * as api from "../api/captiveImageApi";
import React, { useEffect, useReducer } from "react";
import { Stack, Spinner } from "react-bootstrap";
import ImageForm from "./ImageForm";

function stateReducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, loading: true };
    case "setImage":
      return {
        ...state,
        loading: false,
        image: action.image,
        version: state.version + 1,
      };
    default:
      throw new Error();
  }
}

function CaptivePortalPage() {
  const [state, dispatch] = useReducer(stateReducer, {
    loading: false,
    image: null,
    version: 0,
  });
  const setLoading = () => dispatch({ type: "loading" });
  const setImage = (image) => dispatch({ type: "setImage", image });

  useEffect(() => {
    if (state.image === null) {
      setLoading();
      api.getCaptiveImage().then((image) => setImage(image));
    }
  }, [state.image]);

  const onSaveChanges = (image) => {
    setLoading();
    var updated = { ...image };
    api.saveCaptiveImage(updated).then((x) => setImage(x));
  };

  return (
    <Stack gap={2} className="mt-3 mx-auto col-md-5">
      {!state.image && (
        <Spinner className="mx-auto" variant="primary" animation="grow" />
      )}
      {state.image && (
        <ImageForm
          key={state.version}
          image={state.image}
          onSave={onSaveChanges}
        />
      )}
    </Stack>
  );
}

export default CaptivePortalPage;
