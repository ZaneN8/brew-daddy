import React, { useState, useContext } from "react";
import AnswerForm from "./AnswerForm";
import { Modal } from "react-bootstrap";
import { AuthContext } from "../../providers/AuthProvider";

const Answer = ({ answer, deleteAnswer, editAnswer }) => {
  const [showEditAnswer, setShowEditAnswer] = useState(false);

  const handleClose = () => setShowEditAnswer(false);
  const handleShow = () => setShowEditAnswer(true);
  const { user } = useContext(AuthContext);
  const answerOwnedByUser = user && answer && user.id === answer.user_id;

  return (
    <p key={answer.id}>
      <h6>Answer:</h6>
      {answer.body}
      {answerOwnedByUser && (
      <button onClick={handleShow}>Edit Answer</button>
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
      <button onClick={() => deleteAnswer(answer.id)}>Delete</button>
      )}
    </p>
  );
};

export default Answer;
