import React, { useState, useEffect } from "react";
import Answer from "./Answer";
import AnswerForm from "./AnswerForm";
import QuestionForm from "./QuestionForm";
import axios from "axios";

const Question = ({ question, deleteQuestion }) => {
  const [showCAnswers, setShowCAnswers] = useState(false);
  const [showEditQuestion, setShowEditQuestion] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [page, setPage] = useState(1);
  const [noMoreAnswers, setNoMoreAnswers] = useState(false);

  // const getAnswers = async () => {
  //   try {
  //     let res = await axios.get(`/api/questions/${question.id}/answers`);
  //     setAnswers(res.data);
  //   } catch (err) {
  //     alert("Error: in answers.js get answers failed");
  //   }
  // };

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
    const params = { params: { page } };

    axios
      .get(`/api/questions/${question.id}/answers`, params)
      .then((res) => {
        if (res.data.length === 0) {
          setNoMoreAnswers(true);
        }
        setAnswers(res.data);
      })
      .catch((err) => {
        alert("ERROR: No answers");
      });
    // getAnswers();
  }, []);

  const nextPage = () => {
    const params = {
      params: {
        page: page + 1,
      },
    };
    axios
      .get(`/api/questions/${question.id}/answers`, params)
      .then((res) => {
        if (res.data.length === 0) {
          setNoMoreAnswers(true);
        }
        setAnswers(answers.concat(res.data));
        setPage(page + 1);
      })
      .catch((err) => {
        alert("ERROR: No answers");
      });
  };

  return (
    <div key={question.id}>
      <h2>Question:{question.body}</h2>
      {renderAnswers()}
      {!noMoreAnswers ? (
        <button onClick={nextPage}>Show Answers</button>
      ) : (
        <p>No More Answers</p>
      )}
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
