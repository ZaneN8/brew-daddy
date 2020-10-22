import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-bootstrap";

const AnswerForm = ({ question, answerProp, hide }) => {
  const [answer, setAnswer] = useState(
    answerProp ? { body: answerProp.body } : { body: "" }
  );

  const addAnswer = async () => {
    try {
      let res = await axios.post(
        `/api/questions/${question.id}/answers`,
        answer
      );
      setAnswer(res.data);
    } catch (err) {
      alert("Oh shit add answer does not work");
    }
  };

  const editAnswer = async () => {
    try {
      let res = await axios.put(
        `/api/questions/${answerProp.question_id}/answers/${answerProp.id}`,
        answer
      );
      setAnswer(res.data);
    } catch (err) {
      alert("Error: AnswerForm, edit answer failed");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (answerProp) {
      editAnswer();
    } else {
      addAnswer();
    }
    hide();
  };

  const handleChange = (e) => {
    setAnswer({ ...answer, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h6>{answerProp ? "Edit Answer" : "Create Answer"}</h6>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Answer</Form.Label>
          <Form.Control
            autoFocus
            name="body"
            value={answer.body}
            onChange={handleChange}
          />
        </Form.Group>
        <button type="submit">Submit</button>
      </Form>
    </>
  );
};

export default AnswerForm;
