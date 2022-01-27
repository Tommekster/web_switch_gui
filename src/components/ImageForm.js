import React, { useState, useEffect } from "react";
import { Stack, Form, Figure, Spinner } from "react-bootstrap";
import useForm from "../hooks/useForm";

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
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { formData, resetForm, handleChange } = useForm({ file: null });
  useEffect(() => setImage(props.image), [props.image]);
  const previewImage = (file) => {
    setLoadingPreview(true);
    getBase64(file)
      .then((data) => {
        const newImage = {
          filename: file.name,
          mime: file.type,
          data: data.split(",")[1],
        };
        setImage(newImage);
      })
      .finally(() => setLoadingPreview(false));
  };
  const onFileSelected = (e) => {
    handleChange(e);
    if (e.target.files.length > 0 && e.target.files[0].type === "image/jpeg") {
      const file = e.target.files[0];
      previewImage(file);
    } else {
      setImage(props.image);
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      await props.onSave(image);
    } finally {
      setUploading(false);
      resetForm();
      setImage(props.image);
    }
  };
  const imageUrl = `data:image/jpeg;base64,${image.data}`;
  const isInvalid = image === props.image;
  return (
    <Form onSubmit={onSubmit} onReset={() => setImage(props.image)}>
      <Stack gap={2}>
        <Figure className="mx-auto">
          {loadingPreview && <Spinner animation="grow" className="mx-auto" />}
          {!loadingPreview && <Figure.Image src={imageUrl} rounded />}
          <Figure.Caption>{image.filename}</Figure.Caption>
        </Figure>
        <Form.Control
          type="file"
          value={formData.file}
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
