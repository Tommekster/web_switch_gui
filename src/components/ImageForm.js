import React, { useState } from "react";
import { Stack, Form, Figure } from "react-bootstrap";

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
  const [uploading, setUploading] = useState(false);
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
    setUploading(true);
    props.onSave(image);
  };
  const isInvalid = image === props.image;
  return (
    <Form onSubmit={onSubmit} onReset={() => setImage(props.image)}>
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
          value={uploading ? "Uploading..." : "Upload image"}
          disabled={isInvalid || uploading}
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

export default ImageForm;
