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
        <b>Question:{question.body}</b>

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
            onClick={() => deleteQuestion(question.id)}
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
          <button variant="secondary" onClick={handleAnswerClose}>
            cancel
          </button>
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
          <button onClick={handleClose}>Cancel</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

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

export default Question;
