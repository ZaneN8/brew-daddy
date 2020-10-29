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
          <StyledButton onClick={handleSubmit}>Save Image</StyledButton>
          <StyledButton onClick={handleClose}>Close</StyledButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const StyledButton = styled.button`
  display: incline-block;
  box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.1);
  border: 0.16em solid #dbd4cc;
  border-radius: 15px;
  background-color: #dbd4cc;
  color: black;
  text-align: center;
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
  transition: all 0.5s;
  &:hover {
    box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.25);
  }
`;

const PlusButton = styled.button`
  width: 50px;
  height: 50px;
  border: 0.16em solid #dbd4cc;
  border-radius: 15px;
  background-color: #dbd4cc;
  color: white;
  font-size: 25px;
  transition: all 0.5s;
  &:hover {
    box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.25);
  }
`;

export default ReviewImageUpload;
