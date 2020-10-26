import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { AuthContext } from "../../providers/AuthProvider";

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
