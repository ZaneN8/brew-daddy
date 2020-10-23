import React, { useState, useContext } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";

const ReviewForm = ({ afterUpdate, afterCreate, shopId, review, hide }) => {
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
          rating: 1,
          coffee_rating: 1,
          work_friendly: 1,
          food: 1,
          noise_level: 1,
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
      if (typeof afterCreate === "function") afterCreate(res.data);
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
      if (typeof afterUpdate === "function") afterUpdate(res.data);
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
    hide();
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
            type="range"
            min="1"
            max="5"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Coffee Rating</Form.Label>
          <Form.Control
            name="coffee_rating"
            required
            value={reviewState.coffee_rating}
            type="range"
            min="1"
            max="5"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Work Friendly</Form.Label>
          <Form.Control
            name="work_friendly"
            value={reviewState.work_friendly}
            required
            type="range"
            min="1"
            max="5"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Food</Form.Label>
          <Form.Control
            name="food"
            required
            value={reviewState.food}
            type="range"
            min="1"
            max="5"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Noise Level</Form.Label>
          <Form.Control
            name="noise_level"
            required
            type="range"
            min="1"
            max="5"
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
