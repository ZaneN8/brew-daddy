import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import useLocalState from "../customHooks/useLocalState";
import SearchScreen from "./SearchScreen";

const SideBarSearch = ({
  handleSubmit,
  setCityQuery,
  setStateQuery,
  setZipQuery,
  setCoffeeshops,
}) => {
  // next we can render the coffeeshops that are returned
  const renderCoffeeShops = () =>
    coffeeShops.map((coffee) => (
      <p key={coffee.id}>
        <Link as="h3" to={`/coffee_shops/${coffee.id}`}>
          {coffee.name}
        </Link>
      </p>
    ));

  // We will need to change the handleSubmit to redirect it into search page below only.
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>City</Form.Label>
          <Form.Control
            autoFocus
            placeholder="Enter to search a city here"
            name="query"
            value={cityQuery}
            onChange={(e) => setCityQuery(e.target.value)}
          />
          <Form.Label>State</Form.Label>
          <Form.Control
            autoFocus
            placeholder="Enter to search a State here"
            name="query"
            value={stateQuery}
            onChange={(e) => setStateQuery(e.target.value)}
          />
          <Form.Label>Zip</Form.Label>
          <Form.Control
            autoFocus
            placeholder="Enter to search a city here"
            name="query"
            value={zipQuery}
            onChange={(e) => setZipQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </Form.Group>
      </Form>
      <br />
      {renderCoffeeShops()}
    </div>
  );
};

export default SideBarSearch;
