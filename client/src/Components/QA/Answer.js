import React, { useState, useContext } from "react";
import AnswerForm from "./AnswerForm";
import { Modal } from "react-bootstrap";
import { AuthContext } from "../../providers/AuthProvider";
import styled from "styled-components";
import FontAwesome from "react-fontawesome";

const Answer = ({ answer, deleteAnswer, editAnswer }) => {
  const [showEditAnswer, setShowEditAnswer] = useState(false);
  const handleClose = () => setShowEditAnswer(false);
  const handleShow = () => setShowEditAnswer(true);
  const { user } = useContext(AuthContext);
  const answerOwnedByUser = user && answer && user.id === answer.user_id;
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  return (
    <p key={answer.id}>
      <b>Answer:</b>

      {answer.body}
      {answerOwnedByUser && (
        <button
          style={{
            border: "none",
            background: "none",
          }}
          onClick={handleShow}
        >
          <span>
            <FontAwesome
              style={{
                border: "none",
                background: "none",
                color: "#DADADA",
              }}
              name="wrench"
            />
          </span>
        </button>
      )}
      <Modal
        show={showEditAnswer}
        onHide={handleClose}
        // backdrop="static"
        // keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Answer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AnswerForm
            answerProp={answer}
            hide={handleClose}
            afterUpdate={editAnswer}
          />
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Cancel</button>
        </Modal.Footer>
      </Modal>
      {answerOwnedByUser && (
        <button
          style={{
            border: "none",
            background: "none",
          }}
          // onClick={() => deleteAnswer(answer.id)}
          onClick={handleShowDelete}
        >
          <span>
            <FontAwesome
              style={{
                border: "none",
                background: "none",
                color: "#DADADA",
              }}
              name="trash"
            />
          </span>
        </button>
      )}
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <button onClick={() => deleteAnswer(answer.id)}>Yes, Delete</button>
          {"  "}
          <button onClick={handleCloseDelete}>No, Keep</button>
        </Modal.Body>
      </Modal>
    </p>
  );
};

export default Answer;
