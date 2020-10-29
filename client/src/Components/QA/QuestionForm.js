import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { AuthContext } from "../../providers/AuthProvider";
import styled from "styled-components";

const QuestionForm = ({
  questionsShopId,
  questionProp,
  hide,
  afterAdd,
  afterEdit,
}) => {
  const auth = useContext(AuthContext);
  const [question, setQuestion] = useState(
    questionProp
      ? { body: questionProp.body }
      : { body: "", user_id: auth.user.id }
  );

  const addQuestion = async () => {
    try {
      let res = await axios.post(
        `/api/coffee_shops/${questionsShopId}/questions`,
        question
      );
      setQuestion(res.data);
      if (typeof afterAdd === "function") afterAdd(res.data);
    } catch (err) {
      alert("Error: QuestionForm, add question failed");
    }
  };

  const editQuestion = async () => {
    try {
      let res = await axios.put(
        `/api/coffee_shops/${questionsShopId}/questions/${questionProp.id}`,
        question
      );
      if (typeof afterEdit === "function") afterEdit(res.data);
    } catch (err) {
      alert("Error: QuestionForm, edit question failed");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (questionProp) {
      editQuestion();
    } else {
      addQuestion();
    }
    hide();
  };

  const handleChange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Question</Form.Label>
          <Form.Control
            autoFocus
            name="body"
            value={question.body}
            onChange={handleChange}
          />
        </Form.Group>
        <StyledButton type="submit">Submit</StyledButton>
      </Form>
    </>
  );
};

const StyledButton = styled.button`
  display: incline-block;
  box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.1);
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
  transition: all 0.5s;
  &:hover {
    box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.25);
  }
`;

export default QuestionForm;
