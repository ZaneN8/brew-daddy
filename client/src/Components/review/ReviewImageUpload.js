import axios from "axios";
import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import styled from "styled-components";
import FontAwesome from "react-fontawesome";

const ReviewImageUpload = ({ reviewProp, afterCreate }) => {
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
    handleClose();
  };

  const addPictures = async () => {
    try {
      const formData = new FormData();
      formData.append("file", fileState.file);
      let res = await axios.post(
        `/api/reviews/${reviewProp.id}/review_pics`,
        formData
      );
      if (typeof afterCreate === "function") afterCreate(res.data);
    } catch (err) {
      alert("Error: failed to upload an image");
    }
  };

  return (
    <>
      {/* <PlusButton onClick={handleShow}>+</PlusButton> */}
      <PlusButton onClick={handleShow}>
        <span>
          <FontAwesome
            style={{
              border: "none",
              background: "none",
              color: "#black",
            }}
            name="plus-circle"
          />
        </span>
      </PlusButton>
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
          <button onClick={handleSubmit}>Save Changes / SUBMIT</button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const PlusButton = styled.button`
  width: 50px;
  height: 50px;
  padding-bottom: 10px;
  border: 0.16em solid #dbd4cc;
  border-radius: 15px;
  background-color: #dbd4cc;
  color: white;
  font-size: 30px;
  transition: all 0.5s;
  &:hover {
     border-color: #2d2721;
  }
`;

export default ReviewImageUpload;
