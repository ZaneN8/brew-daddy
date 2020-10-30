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
      <b>Answer: </b>

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
          <StyledButton onClick={handleClose}>Cancel</StyledButton>
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
          <StyledYesButton onClick={() => deleteAnswer(answer.id)}>
            Yes, Delete
          </StyledYesButton>
          {"  "}
          <StyledNoButton onClick={handleCloseDelete}>No, Keep</StyledNoButton>
        </Modal.Body>
      </Modal>
    </p>
  );
};

const StyledYesButton = styled.button`
  display: incline-block;
  box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.1);
  border: 0.16em solid #ff6961;
  border-radius: 15px;
  background-color: #ff6961;
  opacity: 0.9;
  color: white;
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
const StyledNoButton = styled.button`
  display: incline-block;
  box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.1);
  border: 0.16em solid #86945e;
  border-radius: 15px;
  background-color: #86945e;
  opacity: 0.9;
  color: white;
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

export default Answer;
