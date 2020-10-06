import React from "react";
import { Form } from "react-bootstrap";
import {Link} from 'react-router-dom'

const ReviewForm = () => {
  
  const handleSubmit = (e) => {
    e.preventDefault();
  

  };
  
  
  
  
  
  return(
    <div>
    <h4>Write a Review</h4>
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control autoFocus />
      </Form.Group>
      <Form.Group>
        <Form.Label>Body</Form.Label>
        <Form.Control type="text area" />
      </Form.Group>
      <Form.Group>
      <Form.File id="exampleFormControlFile1" label="Example file input" />
      </Form.Group>
      <button type="submit">
        Login
      </button>
    </Form>
    <br />
    <Link to="/home"> 
      Back
    </Link>
  </div>
  )
};

export default ReviewForm;