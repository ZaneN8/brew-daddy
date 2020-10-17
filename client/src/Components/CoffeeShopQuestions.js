import React, { useEffect, useState } from "react";
import axios from "axios";
import Answers from "./Answers";
import QuestionForm from "./QuestionForm";
import AnswerForm from "./AnswerForm";

const CoffeeShopQuestions = ({ questionsShopId }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [showCQuestions, setShowCQuestions] = useState(false);
  const [showCAnswers, setShowCAnswers] = useState(false);
  const [showEditQuestion, setShowEditQuestion] = useState(false);

  const getQuestions = async () => {
    try {
      let res = await axios.get(
        `/api/coffee_shops/${questionsShopId}/questions`
      );
      setQuestions(res.data);
    } catch (err) {
      alert("Error: CoffeeShopQuestions, get questions failed");
    }
  };

  const deleteQuestion = async (id) => {
    try {
      let res = await axios.delete(
        `/api/coffee_shops/${questionsShopId}/questions/${id}`,
        setQuestions
      );
      setQuestions(questions.filter((question) => question.id !== id));
    } catch (err) {
      alert("Error: CoffeeShopQuestions, deleting a question");
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const renderQuestion = () => {
    return questions.map((question) => (
      <div key={question.id}>
        <h2>Question:{question.body}</h2>

        <Answers />
        <button>Show more Pagination</button>
        {showCAnswers && <AnswerForm />}
        <button onClick={() => setShowCAnswers(!showCAnswers)}>
          {showCAnswers ? "Cancel Answer" : "Add Answer"}
        </button>

        {showEditQuestion && <QuestionForm />}
        <button onClick={() => setShowEditQuestion(!showEditQuestion)}>
          {showEditQuestion ? "Cancel Edit" : "Edit Question"}
        </button>
        <button onClick={() => deleteQuestion(question.id)}>
          {" "}
          Delete Question
        </button>
      </div>
    ));
  };

  return (
    <div>
      <br />
      {showCQuestions && (
        <QuestionForm
          questionProp={questions.id}
          questionsShopId={questionsShopId}
        />
      )}
      <button onClick={() => setShowCQuestions(!showCQuestions)}>
        {showCQuestions ? "Cancel Question" : "Add Question"}
      </button>
      {renderQuestion()}
    </div>
  );
};

export default CoffeeShopQuestions;
