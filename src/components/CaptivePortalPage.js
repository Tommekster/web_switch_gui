import React, { useEffect, useState } from "react";
import { Stack, Spinner, Alert } from "react-bootstrap";
import useCaptiveImage from "../hooks/useCaptiveImage";
import ImageForm from "./ImageForm";

function CaptivePortalPage() {
  const [image, setImage] = useState();
  const api = useCaptiveImage();
  const { error } = api;

  useEffect(() => {
    if (!error && !image) {
      api.getCaptiveImage().then((image) => setImage(image));
    }
  }, [api, error, image]);

  const onSaveChanges = async (image) => {
    const newImage = await api.saveCaptiveImage(image);
    if (newImage) {
      setImage(newImage);
    }
  };

  return (
    <Stack gap={2} className="mt-3 mx-auto col-md-5">
      {error && <Alert variant="danger">{error}</Alert>}
      {!error && !image && (
        <Spinner className="mx-auto" variant="primary" animation="grow" />
      )}
      {image && <ImageForm image={image} onSave={onSaveChanges} />}
    </Stack>
  );
}

export default CaptivePortalPage;
