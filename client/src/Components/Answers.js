import React, { useState } from "react";

const Answers = () => {
  const [answers, setAnswers] = useState([]);

  const renderAnswers = () => {
    return Answers((answer) => <p>{answer.body} </p>);
  };

  return <div>Answer:{renderAnswers}</div>;
};

export default Answers;
