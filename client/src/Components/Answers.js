import React, { useState } from "react";

const Answers = () => {
  const [answers, setAnswers] = useState([]);

  const renderAnswers = () => {
    return Answers((answer) => (
      <p>
        {answer.body}
        <button>Edit</button>
        <button>Delete</button>
      </p>
    ));
  };

  return <div>Answer:{renderAnswers}</div>;
};

export default Answers;
