import React, { useState, useEffect, useReducer } from "react";
import { Stack, Form, Figure, Spinner } from "react-bootstrap";
import * as api from "../api/captiveImageApi";

function stateReducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, loading: true };
    case "setImage":
      return { ...state, loading: false, image: action.image };
    default:
      throw new Error();
  }
}

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

function ImageForm(props) {
  const [image, setImage] = useState(props.image);
  const imageUrl = `data:image/jpeg;base64,${image.data}`;
  const loadImage = (file) => {
    getBase64(file).then((data) => {
      const newImage = {
        filename: file.name,
        mime: file.type,
        data: data.split(",")[1],
      };
      setImage(newImage);
    });
  };
  const onFileSelected = (e) => {
    if (e.target.files.length > 0 && e.target.files[0].type === "image/jpeg") {
      const file = e.target.files[0];
      loadImage(file);
    } else {
      setImage(props.image);
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
  };
  const isInvalid = image === props.image;
  return (
    <Form onSubmit={onSubmit}>
      <Stack gap={2}>
        <Figure className="mx-auto">
          <Figure.Image src={imageUrl} rounded />
          <Figure.Caption>{image.filename}</Figure.Caption>
        </Figure>
        <Form.Control
          type="file"
          onChange={onFileSelected}
          isInvalid={isInvalid}
          accept="image/jpeg"
        />
        <Form.Control
          type="submit"
          className="btn btn-primary"
          value="Upload image"
          disabled={isInvalid}
        />
        <Form.Control
          type="reset"
          className="btn btn-outline-secondary"
          value="Cancel"
        />
      </Stack>
    </Form>
  );
}

function CaptivePortalPage() {
  const [state, dispatch] = useReducer(stateReducer, {
    loading: false,
    image: null,
  });
  const setLoading = () => dispatch({ type: "loading" });
  const setImage = (image) => dispatch({ type: "setImage", image });

  useEffect(() => {
    if (state.image === null) {
      setLoading();
      api.getCaptiveImage().then((image) => setImage(image));
    }
  }, [state.image]);

  return (
    <Stack gap={2} className="col-md-5 mx-auto">
      {state.image === null && (
        <Spinner className="mx-auto" variant="primary" animation="grow" />
      )}
      {state.image !== null && <ImageForm image={state.image} />}
    </Stack>
  );
}

export default CaptivePortalPage;
