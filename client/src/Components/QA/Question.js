import React, { useState, useEffect, useContext } from "react";
import Answer from "./Answer";
import AnswerForm from "./AnswerForm";
import QuestionForm from "./QuestionForm";
import axios from "axios";
import { Modal } from "react-bootstrap";
import { AuthContext } from "../../providers/AuthProvider";
import styled from "styled-components";
import FontAwesome from "react-fontawesome";

const Question = ({
  question,
  deleteQuestion,
  questionsShopId,
  editQuestion,
}) => {
  const { user } = useContext(AuthContext);
  const [showCAnswers, setShowCAnswers] = useState(false);
  const [showEditQuestion, setShowEditQuestion] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [noMoreAnswers, setNoMoreAnswers] = useState(false);
  const handleClose = () => setShowEditQuestion(false);
  const handleShow = () => setShowEditQuestion(true);
  const handleAnswerClose = () => setShowCAnswers(false);
  const handleAnswerShow = () => setShowCAnswers(true);
  const questionOwnedByUser = user && question && user.id === question.user_id;
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const getAnswers = async () => {
    try {
      const params = { params: { limit: 1 } };
      let res = await axios.get(
        `/api/questions/${question.id}/answers`,
        params
      );
      setAnswers(res.data);
    } catch (err) {
      alert("Error: in answers.js get answers failed");
    }
  };

  useEffect(() => {
    getAnswers();
  }, []);

  const deleteAnswer = async (id) => {
    try {
      let res = await axios.delete(
        `/api/questions/${question.id}/answers/${id}`
      );
      setAnswers(answers.filter((answer) => answer.id != id));
    } catch (err) {
      alert("Error: in answers.js delete failed");
    }
  };

  const editAnswer = (newAnswer) => {
    const newAnswers = answers.map((answer) => {
      if (newAnswer.id === answer.id) return newAnswer;
      else return answer;
    });
    setAnswers(newAnswers);
  };

  const renderAnswers = () => {
    return answers.map((answer) => (
      <Answer
        key={answer.id}
        answer={answer}
        deleteAnswer={deleteAnswer}
        editAnswer={editAnswer}
      />
    ));
  };

  const nextPage = () => {
    const params = {
      params: {
        offset: 1,
      },
    };

    axios
      .get(`/api/questions/${question.id}/answers`, params)
      .then((res) => {
        setAnswers(answers.concat(res.data));
        setNoMoreAnswers(true);
      })
      .catch((err) => {
        alert("ERROR: No answers");
      });
  };

  const addAnswer = (answer) => {
    setAnswers([answer, ...answers]);
  };

  return (
    <div key={question.id}>
      <p>
        <b>Question: {question.body}</b>

        {questionOwnedByUser && (
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
        {questionOwnedByUser && (
          <button
            style={{
              border: "none",
              background: "none",
            }}
            // onClick={() => deleteQuestion(question.id)}
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
            <StyledYesButton onClick={() => deleteQuestion(question.id)}>
              Yes, Delete
            </StyledYesButton>
            {"  "}
            <StyledNoButton onClick={handleCloseDelete}>
              No, Keep
            </StyledNoButton>
          </Modal.Body>
        </Modal>
      </p>
      {renderAnswers()}

      {!noMoreAnswers && (
        <StyledLoadMoreAButton onClick={nextPage}>
          see more answers
        </StyledLoadMoreAButton>
      )}
      <br />
      {user && (
        <button
          style={{ border: "none", background: "none", marginTop: "5px" }}
          onClick={handleAnswerShow}
        >
          <FontAwesome
            style={{
              border: "none",
              background: "none",
              color: "#DADADA",
            }}
            name="plus"
          />
        </button>
      )}
      <Modal show={showCAnswers}>
        <Modal.Header>
          <Modal.Title>Create Answer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AnswerForm
            question={question}
            hide={handleAnswerClose}
            afterCreate={addAnswer}
          />
        </Modal.Body>
        <Modal.Footer>
          <StyledButton onClick={handleAnswerClose}>cancel</StyledButton>
        </Modal.Footer>
      </Modal>

      <Modal show={showEditQuestion} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <QuestionForm
            questionProp={question}
            questionsShopId={questionsShopId}
            hide={handleClose}
            afterEdit={editQuestion}
          />
        </Modal.Body>
        <Modal.Footer>
          <StyledButton onClick={handleClose}>Cancel</StyledButton>
        </Modal.Footer>
      </Modal>
    </div>
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

const StyledLoadMoreAButton = styled.button`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  color: #7b7b7b;
  line-height: 20px;
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
`;

const StyledYesButton = styled.button`
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
const StyledNoButton = styled.button`
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

export default Question;
