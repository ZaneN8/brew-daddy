import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const Search = ({ handleSubmit, coffeeShops, query, setQuery, nextPage }) => {
  // next we can render the coffeeshops that are returned

  // We will need to change the handleSubmit to redirect it into search page below only.
  const renderCoffeeShops = () =>
    coffeeShops.map((coffee) => (
      <p key={coffee.id}>
        <img src={coffee.image} />
        <Link as="h3" to={`/coffee_shops/${coffee.id}`}>
          {coffee.name}
        </Link>
        {coffee.description}
      </p>
    ));

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
      <button onClick={nextPage}>load more</button>
    </div>
  );
};

export default Search;
