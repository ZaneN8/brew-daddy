import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

const QuestionForm = ({ questionsShopId, questionProp, hide }) => {
  const [question, setQuestion] = useState(
    questionProp ? { body: questionProp.body } : { body: "" }
  );

  const addQuestion = async () => {
    try {
      let res = await axios.post(
        `/api/coffee_shops/${questionsShopId}/questions`,
        question
      );
      setQuestion(res.data);
      // setQuestion(question.push(question))
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
      setQuestion(res.data);
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
      <h5>{questionProp ? "Edit Question" : "Create Question"}</h5>
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
        <button type="submit">Submit</button>
      </Form>
    </>
  );
};

export default QuestionForm;
