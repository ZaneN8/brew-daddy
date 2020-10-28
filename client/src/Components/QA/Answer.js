import React, { useState, useContext } from "react";
import AnswerForm from "./AnswerForm";
import { Modal } from "react-bootstrap";
import { AuthContext } from "../../providers/AuthProvider";
import styled from "styled-components";

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
      {answerOwnedByUser && <button onClick={handleShow}>Edit Answer</button>}
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
        <StyledButton onClick={() => deleteAnswer(answer.id)}>
          Delete
        </StyledButton>
      )}
    </p>
  );
};

const StyledButton = styled.button`
  display: incline-block;
  box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.35);
  // margin: 0 0.1em 0.1em 0;
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
  transition: all 0.2s;
  &:hover {
     border-color: #371e0a;
  }
`;

export default Answer;
