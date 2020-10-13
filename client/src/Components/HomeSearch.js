import React, { useState } from "react";
import useLocalState from "../customHooks/useLocalState";
import Search from "./Search";
import { Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
// Need to use Link?

// We will need to change the handleSubmit to redirect it into search page below only.
// This will popualte a search bar outside of the search screen.
// When submitting, it should redirect the user to
// SearchScreen with variable passing through.

// Find the command to redirect to search page when submitting.
const HomeSearch = () => {
  const [query, setQuery] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search?name=${query}`);
  };

  return (
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
  );
};

export default HomeSearch;
