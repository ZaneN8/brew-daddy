import React, { useEffect, useState } from "react";
import axios from "axios";
import QuestionForm from "./QuestionForm";
import Question from "./Question";

const CoffeeShopQuestions = ({ questionsShopId }) => {
  const [questions, setQuestions] = useState([]);
  const [showCQuestions, setShowCQuestions] = useState(false);
  const [page, setPage] = useState(false);
  const [noMoreQuestions, setNoMoreQuestions] = useState(false);

  // const getQuestions = async () => {
  //   try {
  //     let res = await axios.get(
  //       `/api/coffee_shops/${questionsShopId}/questions`
  //     );
  //     setQuestions(res.data);
  //   } catch (err) {
  //     alert("Error: CoffeeShopQuestions, get questions failed");
  //   }
  // };

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
    const params = { params: { page } };
    axios
      .get(`/api/coffee_shops/${questionsShopId}/questions`, params)
      .then((res) => {
        if (res.data.length < 3) {
          setNoMoreQuestions(true);
        }
        setQuestions(res.data);
      })
      .catch((err) => {
        alert("ERROR: No questions");
      });
    // getQuestions();
  }, []);

  const nextPage = () => {
    const params = {
      params: {
        page: page + 1,
      },
    };
    axios
      .get(`/api/coffee_shops/${questionsShopId}/questions`, params)
      .then((res) => {
        if (res.data.length < 3) {
          setNoMoreQuestions(true);
        }
        setQuestions(questions.concat(res.data));
        setPage(page + 1);
      })
      .catch((err) => {
        alert("ERROR: No questions");
      });
  };

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
      {!noMoreQuestions ? (
        <button onClick={nextPage}>More questions</button>
      ) : (
        <p>No more questions</p>
      )}
    </div>
  );
};

export default CoffeeShopQuestions;
