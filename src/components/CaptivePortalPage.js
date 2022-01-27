import * as api from "../api/captiveImageApi";
import React, { useEffect, useState } from "react";
import { Stack, Spinner } from "react-bootstrap";
import ImageForm from "./ImageForm";

function CaptivePortalPage() {
  const [image, setImage] = useState();

  useEffect(() => {
    if (!image) {
      api.getCaptiveImage().then((image) => setImage(image));
    }
  }, [api, image]);

  const onSaveChanges = async (image) => {
    const newImage = await api.saveCaptiveImage(image);
    setImage(newImage);
  };

  return (
    <Stack gap={2} className="mt-3 mx-auto col-md-5">
      {!image && (
        <Spinner className="mx-auto" variant="primary" animation="grow" />
      )}
      {image && <ImageForm image={image} onSave={onSaveChanges} />}
    </Stack>
  );
}

export default CaptivePortalPage;
