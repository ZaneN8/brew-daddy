// import React, {useState} from "react";
// import {Form} from "react-bootstrap"

// const QA = ({shopId}) => {

//   const question, setQuestion = useState([])
//   const answer, setAnswer = useState([])

//   const getQuestions = async () => {
//     try {
//       let res = await axios.get(`/api/???`);
//       setQuestion(res.data);
//     } catch (err) {
//       alert("Error: QA get question failed");
//     }
//   };

//   const getAnswers = async () => {
//     try {
//       let res = await axios.get(`/api/???`);
//       setAnswer(res.data);
//     } catch (err) {
//       alert("Error: QA, get answer failed");
//     }
//   };

//   const addQuestion = async () => {
//     try {
//       let res = await axios.put(`/api/???`);
//       setQuestion(res.data);
//     } catch (err) {
//       alert("Error: QA, add question failed");
//     }
//   };

//   const addAnswer = async () => {
//     try {
//       let res = await axios.put(`/api/???`);
//       setQuestion(res.data);
//     } catch (err) {
//       alert("Error: QA, add answer failed");
//     }
//   };



//   return(
//     <>
//   <h1> QA</h1>
//     <p>Render Questions</p>
//     <p>Render Answers</p>

//     <button>Add Question</button>
//     <button>Add Answer</button>
//   </>
//   )
// };

// export default QA;