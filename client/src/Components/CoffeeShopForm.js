import React, { useContext, useEffect, useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";

const CoffeeShopForm = ({ match, add, shopProp, hide }) => {
  const auth = useContext(AuthContext);
  const shopDefault = {
    name: "",
    description: "",
    city: "",
    state: "",
    image: "",
    zip: "",
    contact_info: "",
    cost: 0,
    open: false,
    delivery: false,
    pickup: false,
    order_online: false,
    user_id: auth.user.id,
  };

  const [coffeeShopState, setCoffeeShopState] = useState(
    !shopProp
      ? shopDefault
      : {
          name: shopProp.name,
          description: shopProp.description,
          city: shopProp.city,
          state: shopProp.state,
          zip: shopProp.zip,
          contact_info: shopProp.contact_info,
          cost: shopProp.cost,
          open: shopProp.open,
          delivery: shopProp.delivery,
          pickup: shopProp.pickup,
          order_online: shopProp.order_online,
        }
  );

  const [fileState, setFileState] = useState({
    url: null,
    blob: null,
    file: null,
  });

  const handleBoo = (e) => {
    const name = e.target.name;
    setCoffeeShopState({
      ...coffeeShopState,
      [name]: !coffeeShopState[name],
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const blob = new Blob([file], { type: "image/png" });
    const url = URL.createObjectURL(blob);
    setFileState({ file, blob, url });
  };

  const handleChange = (e) => {
    setCoffeeShopState({ ...coffeeShopState, [e.target.name]: e.target.value });
  };

  const editCoffeeShop = async () => {
    try {
      const formData = new FormData();
      if (fileState.file) {
        formData.append("file", fileState.file);
      }
      Object.keys(coffeeShopState).forEach((key) => {
        formData.append(key, coffeeShopState[key]);
      });
      let res = await axios.put(`/api/coffee_shops/${shopProp.id}`, formData);
      setCoffeeShopState(res.data);
    } catch (err) {
      alert("ERROR: CoffeeShopForm, updating shop");
    }
  };

  const addCoffeeShop = async () => {
    try {
      const formData = new FormData();
      if (fileState.file) {
        formData.append("file", fileState.file);
      }
      Object.keys(coffeeShopState).forEach((key) => {
        formData.append(key, coffeeShopState[key]);
      });

      let res = await axios.post(`/api/coffee_shops`, formData);
      setCoffeeShopState(res.data);
    } catch (err) {
      console.log(err);
      alert("Error: CoffeeShopForm, adding shop");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (shopProp) {
      editCoffeeShop();
      // hide()
    } else {
      addCoffeeShop();
    }
    hide();
  };

  return (
    <div>
      <h1>{shopProp ? "Edit Shop" : "Create a CoffeeShop"}</h1>
      <Form onSubmit={handleSubmit}>
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
            name="description"
            value={coffeeShopState.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.File
            label="Upload Coffee Shop Image"
            name="image"
            type="file"
            // value={""}
            onChange={handleImageUpload}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>City</Form.Label>
          <Form.Control
            name="city"
            required
            value={coffeeShopState.city}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>State</Form.Label>
          <Form.Control
            name="state"
            required
            onChange={handleChange}
            value={coffeeShopState.state}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Zip</Form.Label>
          <Form.Control
            name="zip"
            required
            value={coffeeShopState.zip}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Contact Number</Form.Label>
          <Form.Control
            // TODO edit does not fill the current info out
            name="contact_info"
            type="number"
            onChange={handleChange}
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
              onChange={handleChange}
              value={coffeeShopState.cost}
            />
            <Form.Check
              type="radio"
              label="$$"
              name="cost"
              onChange={handleChange}
              value={coffeeShopState.cost}
            />
            <Form.Check
              type="radio"
              label="$$$"
              name="cost"
              onChange={handleChange}
              value={coffeeShopState.cost}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label as="legend" column sm={2}>
            Open
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="checkbox"
              label="Yes"
              name="open"
              onChange={handleBoo}
              //customer onchange function to make true
              value={coffeeShopState.open}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label as="legend" column sm={2}>
            Delivery
          </Form.Label>
          <Col sm={10}>
            <Form.Check
              type="checkbox"
              label="Yes"
              name="delivery"
              onChange={handleBoo}
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
              type="checkbox"
              label="Yes"
              name="pickup"
              onChange={handleBoo}
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
              type="checkbox"
              label="Yes"
              name="order_online"
              value={coffeeShopState.order_online}
              onChange={handleBoo}
            />
          </Col>
        </Form.Group>
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};

export default CoffeeShopForm;
