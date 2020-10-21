import axios from "axios";
import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";

const ReviewImageUpload = ({ reviewProp }) => {
  const [show, setShow] = useState(false);
  const [fileState, setFileState] = useState({
    url: null,
    blob: null,
    file: null,
  });
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    const file = e.target.files[0];
    const blob = new Blob([file], { type: "image/png" });
    const url = URL.createObjectURL(blob);
    setFileState({ file, blob, url });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addPictures();
  };

  const addPictures = async () => {
    try {
      const formData = new FormData();
      formData.append("file", fileState.file);
      let res = await axios.post(
        `/api/reviews/${reviewProp.id}/review_pics`,
        formData
      );
      console.log(res);
    } catch (err) {
      alert("Error: failed to upload an image");
    }
  };

  return (
    <>
      <button onClick={handleShow}>Add Image</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.File
            label="Upload Coffee Shop Image for your Review"
            name="image"
            type="file"
            onChange={handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Close</button>
          <button onClick={handleClose && handleSubmit}>
            Save Changes / SUBMIT
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReviewImageUpload;
