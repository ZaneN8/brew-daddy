import React, { useState } from "react";
import AnswerForm from "./AnswerForm";

const Answer = ({ answer, deleteAnswer }) => {
  const [showEditAnswer, setShowEditAnswer] = useState(false);

  return (
    <p key={answer.id}>
      {answer.body}
      {showEditAnswer && <AnswerForm answerProp={answer} />}
      <button onClick={() => setShowEditAnswer(!showEditAnswer)}>
        {showEditAnswer ? "Cancel Answer" : "Edit Answer"}
      </button>
      <button onClick={() => deleteAnswer(answer.id)}>Delete</button>
    </p>
  );
};

export default Answer;
