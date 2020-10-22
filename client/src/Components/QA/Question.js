import React, { useState, useEffect } from "react";
import Answer from "./Answer";
import AnswerForm from "./AnswerForm";
import QuestionForm from "./QuestionForm";
import axios from "axios";
import { Modal } from "react-bootstrap";

const Question = ({ question, deleteQuestion, questionsShopId }) => {
  const [showCAnswers, setShowCAnswers] = useState(false);
  const [showEditQuestion, setShowEditQuestion] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [noMoreAnswers, setNoMoreAnswers] = useState(false);

  const handleClose = () => setShowEditQuestion(false);
  const handleShow = () => setShowEditQuestion(true);

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

  const renderAnswers = () => {
    return answers.map((answer) => (
      <Answer key={answer.id} answer={answer} deleteAnswer={deleteAnswer} />
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

  return (
    <div key={question.id}>
      <h2>Question:{question.body}</h2>
      {renderAnswers()}
      {!noMoreAnswers && <button onClick={nextPage}>Show Answers</button>}
      {showCAnswers && <AnswerForm question={question} />}
      <button onClick={() => setShowCAnswers(!showCAnswers)}>
        {showCAnswers ? "Cancel Answer" : "Add Answer"}
      </button>

      <button variant="primary" onClick={handleShow}>
        Edit Question
      </button>

      <Modal show={showEditQuestion} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Question</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <QuestionForm
            questionProp={question}
            questionsShopId={questionsShopId}
            hide={handleClose}
          />
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Cancel</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Question;
