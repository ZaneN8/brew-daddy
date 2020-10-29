import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import QuestionForm from "./QuestionForm";
import Question from "./Question";
import { Modal } from "react-bootstrap";
import styled from "styled-components";
import { AuthContext } from "../../providers/AuthProvider";

const CoffeeShopQuestions = ({ questionsShopId }) => {
  const { user } = useContext(AuthContext);
  const [questions, setQuestions] = useState([]);
  const [showCQuestions, setShowCQuestions] = useState(false);
  const [page, setPage] = useState(1);
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

  const editQuestion = (newQuestion) => {
    const newQuestions = questions.map((question) => {
      if (newQuestion.id === question.id) return newQuestion;
      else return question;
    });
    setQuestions(newQuestions);
  };

  const renderQuestion = () => {
    return questions.map((question) => (
      <Question
        questionsShopId={questionsShopId}
        key={question.id}
        question={question}
        deleteQuestion={deleteQuestion}
        editQuestion={editQuestion}
      />
    ));
  };

  const addQuestion = (question) => {
    setQuestions([question, ...questions]);
  };

  return (
    <StyledLayout>
      <div>
        <StyledTitle> Questions & Answers</StyledTitle>
        {user && (
          <StyledButton onClick={handleShow}>Ask a Question</StyledButton>
        )}
        <Modal show={showCQuestions} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Question</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <QuestionForm
              questionsShopId={questionsShopId}
              hide={handleClose}
              afterAdd={addQuestion}
            />
          </Modal.Body>
          <Modal.Footer>
            <StyledButton onClick={handleClose}>Cancel</StyledButton>
          </Modal.Footer>
        </Modal>

        {renderQuestion()}
        {!noMoreQuestions ? (
          <StyledLoadMoreButton onClick={nextPage}>
            See more questions
          </StyledLoadMoreButton>
        ) : (
          <p>No more questions</p>
        )}
      </div>
    </StyledLayout>
  );
};

const StyledTitle = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 20px;
  padding-bottom: 30px;
`;

const StyledLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 60%;
  // justify-content: center;
  max-width: 100%;
`;

const StyledButton = styled.button`
  display: incline-block;
  box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.1);
  // margin: 0 0.1em 0.1em 0;
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
  margin-bottom: 10px;
  transition: all 0.5s;
  &:hover {
    box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.25);
  }
`;

const StyledResultCard = styled.div`
  // box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  // transition: 0.3s;
  // border: 1px solid;
  // border-radius: 30px;
  padding: 1em;
`;

const StyledLoadMoreButton = styled.button`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
`;

export default CoffeeShopQuestions;
