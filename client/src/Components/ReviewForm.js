import React, { useState } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";

const ReviewForm = ({ addReview, shopId }) => {
  const [reviewState, setReviewState] = useState({
    title: "",
    body: "",
    image: "",
    rate: 0,
    coffeeRate: 0,
    work: 0,
    food: 0,
    noise: 0,
  });

  const handleChange = (e) => {
    setReviewState({ ...reviewState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    debugger;
    // this needs a updated api call
    axios
      .post(`/api/coffee_shops/${shopId}/reviews`, reviewState)
      .then((res) => {
        addReview.add(res.data);
      });
  };

  return (
    <div>
      <h4>Write a Review</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            value={reviewState.title}
            required
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Body</Form.Label>
          <Form.Control
            name="body"
            required
            value={reviewState.body}
            type="text area"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.File
            name="image"
            label="Upload Review Image"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Shop Rating</Form.Label>
          <Form.Control
            name="rate"
            required
            value={reviewState.rate}
            type="number"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Coffee Rating</Form.Label>
          <Form.Control
            name="coffeeRate"
            required
            value={reviewState.coffeeRate}
            type="number"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Work Friendly</Form.Label>
          <Form.Control
            name="work"
            value={reviewState.work}
            required
            type="number"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Food</Form.Label>
          <Form.Control
            name="food"
            required
            value={reviewState.food}
            type="number"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Noise Level</Form.Label>
          <Form.Control
            name="noise"
            required
            type="number"
            value={reviewState.noise}
            onChange={handleChange}
          />
        </Form.Group>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </Form>
      <br />
    </div>
  );
};

export default ReviewForm;

// review.rating = rand(max)
// review.coffee_rating = rand(max)
// review.work_friendly = rand(max)
// review.food = rand(max)
// review.noise_level = rand(max)
