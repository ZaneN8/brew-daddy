import React, { useState } from "react";
import useLocalState from "../../customHooks/useLocalState";
import Search from "./Search";
import { Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

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
    <StyledLargeForm>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label style={{ color: "white", width: "600px" }}>
            Search
          </Form.Label>
          <Form.Control
            className="form"
            autoFocus
            placeholder="Enter to search here"
            name="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {/* The Wireframe doesnt have the search button, so commenting this out.  */}
          {/* <button type="submit" className="form">
            Search
          </button> */}
        </Form.Group>
      </Form>
    </StyledLargeForm>
  );
};

const StyledLargeForm = styled.div`
  .form {
    border-radius: 30px;
  }
`;

export default HomeSearch;
