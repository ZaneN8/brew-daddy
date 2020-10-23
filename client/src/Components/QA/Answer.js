import React, { useState } from "react";
import AnswerForm from "./AnswerForm";
import { Modal } from "react-bootstrap";

const Answer = ({ answer, deleteAnswer, editAnswer }) => {
  const [showEditAnswer, setShowEditAnswer] = useState(false);

  const handleClose = () => setShowEditAnswer(false);
  const handleShow = () => setShowEditAnswer(true);

  return (
    <p key={answer.id}>
      <h6>Answer:</h6>
      {answer.body}
      <button onClick={handleShow}>Edit Answer</button>
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
      <button onClick={() => deleteAnswer(answer.id)}>Delete</button>
    </p>
  );
};

export default Answer;
