import React, { useState, useEffect } from "react";
import Answer from "./Answer";
import AnswerForm from "./AnswerForm";
import QuestionForm from "./QuestionForm";
import axios from "axios";

const Question = ({ question, deleteQuestion }) => {
  const [showCAnswers, setShowCAnswers] = useState(false);
  const [showEditQuestion, setShowEditQuestion] = useState(false);
  const [answers, setAnswers] = useState([]);

  const getAnswers = async () => {
    try {
      let res = await axios.get(`/api/questions/${question.id}/answers`);
      setAnswers(res.data);
    } catch (err) {
      alert("Error: in answers.js get answers failed");
    }
  };

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

  useEffect(() => {
    getAnswers();
  }, []);

  return (
    <div key={question.id}>
      <h2>Question:{question.body}</h2>
      {renderAnswers()}
      <button>Show more Pagination</button>
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
