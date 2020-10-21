import React, { useState, useEffect } from "react";
import Answer from "./Answer";
import AnswerForm from "./AnswerForm";
import QuestionForm from "./QuestionForm";
import axios from "axios";

const Question = ({ question, deleteQuestion }) => {
  const [showCAnswers, setShowCAnswers] = useState(false);
  const [showEditQuestion, setShowEditQuestion] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [noMoreAnswers, setNoMoreAnswers] = useState(false);

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

      {showEditQuestion && <QuestionForm questionProp={question} />}
      <button onClick={() => setShowEditQuestion(!showEditQuestion)}>
        {showEditQuestion ? "Cancel Edit" : "Edit Question"}
      </button>
      <button onClick={() => deleteQuestion(question.id)}>
        Delete Question
      </button>
    </div>
  );
};

export default Question;
