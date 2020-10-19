import React, { useState } from "react";
import { Form } from "react-bootstrap";

const AnswerForm = () => {
  const [answers, setAnswers] = useState([]);

  const handleSubmit = (e) => {
    debugger;
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>Answer</Form.Label>
        <Form.Control autoFocus />
      </Form.Group>
      <button type="submit">Submit</button>
    </Form>
  );
};

export default AnswerForm;
