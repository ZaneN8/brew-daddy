import React, { useEffect, useState } from "react";
import axios from "axios";
import QuestionForm from "./QuestionForm";
import Question from "./Question";

const CoffeeShopQuestions = ({ questionsShopId }) => {
  const [questions, setQuestions] = useState([]);
  const [showCQuestions, setShowCQuestions] = useState(false);

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
      <Question
        key={question.id}
        question={question}
        deleteQuestion={deleteQuestion}
      />
    ));
  };

  return (
    <div>
      <br />
      {showCQuestions && <QuestionForm questionsShopId={questionsShopId} />}
      <button onClick={() => setShowCQuestions(!showCQuestions)}>
        {showCQuestions ? "Cancel Question" : "Add Question"}
      </button>
      {renderQuestion()}
    </div>
  );
};

export default CoffeeShopQuestions;
