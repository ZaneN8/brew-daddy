import axios from "axios";
import React, { useEffect, useState } from "react";

const Answers = ({ questionProp }) => {
  const [answers, setAnswers] = useState([]);

  const getAnswers = async () => {
    try {
      let res = await axios.get(`/api/questions/${questionProp}/answers`);
      setAnswers(res.data);
    } catch (err) {
      alert("Error: in answers.js get answers failed");
    }
  };

  const deleteAnswer = async (id) => {
    try {
      let res = await axios.delete(
        `/api/questions/${questionProp}/answers/${id}`
      );
      setAnswers(answers.filter((answer) => answer.id != id));
    } catch (err) {
      alert("Error: in answers.js delete failed");
    }
  };

  useEffect(() => {
    getAnswers();
  }, []);

  const renderAnswers = () => {
    return answers.map((answer) => (
      <p>
        {answer.body}
        <button>Edit</button>
        <button onClick={() => deleteAnswer(answer.id)}>Delete</button>
      </p>
    ));
  };

  return <div>Answer:{renderAnswers()}</div>;
};

export default Answers;
