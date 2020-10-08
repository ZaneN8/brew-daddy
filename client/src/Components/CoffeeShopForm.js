import React, { useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const CoffeeShopForm = ({ match }) => {
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   axios.post(`/api/users/${match.props.id}/coffee_shops`).then((res) => {
  //     props.add(res.data).catch((err) => {
  //       alert("ERROR CAN NOT ADD");
  //     });
  //   });
  // };

  return (
    <div>
      <h1>Create a CoffeeShop</h1>
      <Form>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control autoFocus />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" />
        </Form.Group>
        <Form.Group>
          <Form.File id="exampleFormControlFile1" label="Example file input" />
        </Form.Group>
        <Form.Group>
          <Form.Label>City</Form.Label>
          <Form.Control />
        </Form.Group>
        <Form.Group>
          <Form.Label>State</Form.Label>
          <Form.Control />
        </Form.Group>
        <Form.Group>
          <Form.Label>Zip</Form.Label>
          <Form.Control />
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label as="legend" column sm={2}>
            Open
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="radio"
              label="Yes"
              name="openHorizontalRadios"
              id="openHorizontalRadios1"
            />
            <Form.Check
              type="radio"
              label="No"
              name="openHorizontalRadios"
              id="openHorizontalRadios2"
            />
          </Col>
        </Form.Group>
        <Form.Group>
          <Form.Label>Contact Number</Form.Label>
          <Form.Control />
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label as="legend" column sm={2}>
            Cost
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="radio"
              label="$"
              name="costHorizontalRadios"
              id="costHorizontalRadios1"
            />
            <Form.Check
              type="radio"
              label="$$"
              name="costHorizontalRadios"
              id="costHorizontalRadios2"
            />
            <Form.Check
              type="radio"
              label="$$$"
              name="costHorizontalRadios"
              id="costHorizontalRadios3"
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
              name="deliveryHorizontalRadios"
              id="deliveryHorizontalRadios1"
            />
            <Form.Check
              type="radio"
              label="No"
              name="deliveryHorizontalRadios"
              id="deliveryHorizontalRadios2"
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
              name="pickUpHorizontalRadios"
              id="pickUpHorizontalRadios1"
            />
            <Form.Check
              type="radio"
              label="No"
              name="pickUpHorizontalRadios"
              id="pickUpHorizontalRadios2"
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
              name="orderHorizontalRadios"
              id="orderHorizontalRadios1"
            />
            <Form.Check
              type="radio"
              label="No"
              name="orderHorizontalRadios"
              id="orderHorizontalRadios2"
            />
          </Col>
        </Form.Group>
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};

export default CoffeeShopForm;
