import React, {useState} from "react";
import {Form} from "react-bootstrap"

const QA = ({shopId}) => {

  const question, setQuestion = useState([])
  const answer, answerQuestion = useState([])

  const questionAPI = () => {
    try {

    } catch (err) => {
      
    }
  }


  const questionForm = () => {

    return(
      <>
      <Form.Group>
      <Form.Label> Question</Form.Label>
      <Form.Control 
      type="text"
      name="Question"
      value={userState.first_name}
      onChange = {handleChange}
      />

    </>
    

    )
  }

  const answerForm = ()=> {
    
    return(
      <>
      </>

    )

  }

  



  return(
    <>
  <h1> QA</h1>
  <Form>
    {questionForm ()}
    {answerForm ()}

  </Form>
  </>
  )
};

export default QA;