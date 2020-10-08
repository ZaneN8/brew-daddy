import React, { useContext, useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";

const CoffeeShopForm = ({ match }) => {
  const auth = useContext(AuthContext);
  const [coffeeShopState, setCoffeeShopState] = useState({
    name: "",
    description: "",
    image: "",
    city: "",
    state: "",
    zip: 0,
    open: false,
    contact_info: "",
    cost: 0,
    delivery: false,
    pickup: false,
    order_online: false,
    user_id: auth.user.id,
  });

  const handleChange = (e) => {};

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h1>Create a CoffeeShop</h1>
      <Form inSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            autoFocus
            name="name"
            value={coffeeShopState.name}
            required
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            required
            value={coffeeShopState.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.File
            label="Upload Coffee Shop Image"
            name="image"
            value={coffeeShopState.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>City</Form.Label>
          <Form.Control
            name="City"
            required
            value={coffeeShopState.city}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>State</Form.Label>
          <Form.Control name="state" required value={coffeeShopState.state} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Zip</Form.Label>
          <Form.Control
            name="zip"
            required
            value={coffeeShopState.zip}
            type="number"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label as="legend" column sm={2}>
            Open
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="radio"
              label="Yes"
              name="open"
              //customer onchange function to make true
              value={coffeeShopState.open}
            />
            <Form.Check
              type="radio"
              label="No"
              name="open"
              value={coffeeShopState.open}
            />
          </Col>
        </Form.Group>
        <Form.Group>
          <Form.Label>Contact Number</Form.Label>
          <Form.Control
            name="contact"
            required
            type=""
            value={coffeeShopState.contact_info}
          />
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label as="legend" column sm={2}>
            Cost
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="radio"
              label="$"
              name="cost"
              value={coffeeShopState.cost}
            />
            <Form.Check
              type="radio"
              label="$$"
              name="cost"
              value={coffeeShopState.cost}
            />
            <Form.Check
              type="radio"
              label="$$$"
              name="cost"
              value={coffeeShopState.cost}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label as="legend" column sm={2}>
            Delivery
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="radio"
              label="Yes"
              name="delivery"
              value={coffeeShopState.delivery}
            />
            <Form.Check
              type="radio"
              label="No"
              name="delivery"
              value={coffeeShopState.delivery}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label as="legend" column sm={2}>
            Pick Up
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="radio"
              label="Yes"
              name="pickup"
              value={coffeeShopState.pickup}
            />
            <Form.Check
              type="radio"
              label="No"
              name="pickup"
              value={coffeeShopState.pickup}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label as="legend" column sm={2}>
            Online Order
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="radio"
              label="Yes"
              name="order_online"
              value={coffeeShopState.order_online}
            />
            <Form.Check
              type="radio"
              label="No"
              name="order_online"
              value={coffeeShopState.order_online}
            />
          </Col>
        </Form.Group>
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};

export default CoffeeShopForm;
