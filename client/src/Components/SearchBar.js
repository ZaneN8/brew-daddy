import React from "react";
import { Form } from "react-bootstrap";

const SearchBar = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Search</Form.Label>
          <Form.Control autoFocus />
        </Form.Group>
        </Form> <button type="submit">Search</button>
        <br />
        </div>
  )
};

export default SearchBar;