import React, { useState, useContext } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";

const ReviewForm = ({ add, shopId, review }) => {
  const auth = useContext(AuthContext);
  const [reviewState, setReviewState] = useState(
    review
      ? {
          title: review.title,
          body: review.body,
          rating: review.rating,
          coffee_rating: review.coffee_rating,
          work_friendly: review.work_friendly,
          food: review.food,
          noise_level: review.noise_level,
        }
      : {
          title: "",
          body: "",
          image: "",
          rating: 0,
          coffee_rating: 0,
          work_friendly: 0,
          food: 0,
          noise_level: 0,
          user_id: auth.user.id,
        }
  );

  const handleChange = (e) => {
    setReviewState({ ...reviewState, [e.target.name]: e.target.value });
  };

  const addReview = async () => {
    try {
      let res = await axios.post(
        `/api/coffee_shops/${shopId}/reviews`,
        reviewState
      );
      setReviewState(res.data);
    } catch (err) {
      alert("ERROR: ReviewForm, add review failed");
    }
  };

  const editReview = async () => {
    try {
      let res = await axios.put(
        `/api/coffee_shops/${shopId}/reviews/${review.id}`,
        reviewState
      );
      setReviewState(res.data);
    } catch (err) {
      alert("ERROR: ReviewForm, updating review issue");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (review) {
      editReview();
    } else {
      addReview();
    }
  };

  return (
    <div>
      <h4>{review ? "Edit Review" : "Create a Review"}</h4>
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
          <Form.Label>Shop Rating</Form.Label>
          <Form.Control
            name="rating"
            required
            value={reviewState.rating}
            type="number"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Coffee Rating</Form.Label>
          <Form.Control
            name="coffee_rating"
            required
            value={reviewState.coffee_rating}
            type="number"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Work Friendly</Form.Label>
          <Form.Control
            name="work_friendly"
            value={reviewState.work_friendly}
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
            name="noise_level"
            required
            type="number"
            value={reviewState.noise_level}
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
