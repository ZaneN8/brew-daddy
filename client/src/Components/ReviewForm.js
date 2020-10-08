import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const ReviewForm = () => {
  const [title, setTitle] = useState([]);
  const [body, setBody] = useState([]);
  const [image, setImage] = useState([]);
  const [rate, setRate] = useState([]);
  const [coffeeRate, setCoffeeRate] = useState([]);
  const [work, setWork] = useState([]);
  const [food, setFood] = useState([]);
  const [noise, setNoise] = useState([]);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // this needs a updated api call
  //   axios.post("/api/coffeeShop/reviews") /
  //     then((res) => {
  //       prop.add(res.data);
  //     });
  // };

  return (
    <div>
      <h4>Write a Review</h4>
      <Form>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Body</Form.Label>
          <Form.Control
            name="body"
            required
            value={body}
            type="text area"
            onChange={(e) => setBody(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.File
            name="image"
            label="Upload Review Image"
            onChange={(e) => setImage(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Shop Rating</Form.Label>
          <Form.Control
            name="rate"
            required
            value={rating}
            type="number"
            onChange={(e) => setRate(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Coffee Rating</Form.Label>
          <Form.Control
            name="coffeeRate"
            required
            value={coffee_rating}
            type="number"
            onChange={(e) => setCoffeeRate(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Work Friendly</Form.Label>
          <Form.Control
            name="work"
            value={work_friendly}
            required
            type="text"
            onChange={(e) => setWork(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Food</Form.Label>
          <Form.Control
            name="food"
            required
            value={food}
            type="text"
            onChange={(e) => setFood(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Noise Level</Form.Label>
          <Form.Control
            name="noise"
            required
            type="text"
            value={noise_level}
            onChange={(e) => setNoise(e.target.value)}
          />
        </Form.Group>
        <button type="submit">Submit</button>
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
