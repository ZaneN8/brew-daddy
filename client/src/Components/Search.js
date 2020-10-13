import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import useLocalState from "../customHooks/useLocalState";
import SearchScreen from "./SearchScreen";

const Search = ({ handleSubmit, renderCoffeeShops }) => {
  // next we can render the coffeeshops that are returned
  const [query, setQuery] = useLocalState("coffeeShopQuery", "");

  // We will need to change the handleSubmit to redirect it into search page below only.
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Search</Form.Label>
          <Form.Control
            autoFocus
            placeholder="Enter to search here"
            name="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </Form.Group>
      </Form>
      <br />
      {renderCoffeeShops()}
    </div>
  );
};

export default Search;
