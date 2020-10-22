import React, { useEffect, useState } from "react";
import axios from "axios";
import QuestionForm from "./QuestionForm";
import Question from "./Question";
import { Modal } from "react-bootstrap";
import styled from "styled-components";

const CoffeeShopQuestions = ({ questionsShopId }) => {
  const [questions, setQuestions] = useState([]);
  const [showCQuestions, setShowCQuestions] = useState(false);
  const [page, setPage] = useState(false);
  const [noMoreQuestions, setNoMoreQuestions] = useState(false);

  const handleClose = () => setShowCQuestions(false);
  const handleShow = () => setShowCQuestions(true);

  const getQuestions = async () => {
    try {
      const params = { params: { page } };
      let res = await axios.get(
        `/api/coffee_shops/${questionsShopId}/questions`,
        params
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
        questionsShopId={questionsShopId}
        key={question.id}
        question={question}
        deleteQuestion={deleteQuestion}
      />
    ));
  };

  return (
    <StyledLayout>
      <StyledResultCard>
        <h1> Questions & Answers</h1>
        <br />

        <button variant="primary" onClick={handleShow}>
          Write A Question
        </button>

        <Modal show={showCQuestions} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Question</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <QuestionForm
              questionsShopId={questionsShopId}
              hide={handleClose}
            />
          </Modal.Body>
          <Modal.Footer>
            <button onClick={handleClose}>Cancel</button>
          </Modal.Footer>
        </Modal>

        {showCQuestions && <QuestionForm questionsShopId={questionsShopId} />}
        <button onClick={() => setShowCQuestions(!showCQuestions)}>
          {showCQuestions ? "Cancel Question" : "Add Question"}
        </button>
        {renderQuestion()}
        {!noMoreQuestions ? (
          <Button onClick={nextPage}>More questions</Button>
        ) : (
          <p>No more questions</p>
        )}
      </StyledResultCard>
    </StyledLayout>
  );
};

const StyledLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100%;
`;

const StyledResultCard = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border: 1px solid;
  border-radius: 30px;
  padding: 1em;
`;

const Button = styled.button`
  display: inline-block;
  font-size: 1em;
  padding: 0.25em 1em;
  border: 2px solid;
  border-radius: 20px;
  display: block;
`;

export default CoffeeShopQuestions;
