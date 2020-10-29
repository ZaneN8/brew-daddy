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
        backdrop="static"
        keyboard={false}
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
          onClick={() => deleteAnswer(answer.id)}
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
    </p>
  );
};

export default Answer;
