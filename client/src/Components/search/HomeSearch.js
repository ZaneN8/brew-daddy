import React, { useState } from "react";
import useLocalState from "../../customHooks/useLocalState";
import Search from "./Search";
import { Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
          <Form.Label style={{ color: "white", width: "100%" }}>
            <StyledSearchText>
              Find The Coffee You Deserve
              <StyledLink to="/search">all coffee shops</StyledLink>
            </StyledSearchText>
          </Form.Label>
          <MainInput
            className="form"
            autoFocus
            placeholder="E.g. ‘Coffee Roasters’, ‘Red Moose Coffee’"
            name="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Form.Group>
      </Form>
    </StyledLargeForm>
  );
};

const StyledLink = styled(Link)`
  color: white;
  link: white;
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 28px;
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    color: white;
    background-color: rgba(0, 0, 0, 0.25);
    text-decoration: none;
  }
`;

// color: black;
//   text-align: left;
//   font-family: Open Sans;
//   font-style: normal;
//   font-weight: bold;
//   font-size: 12px;
//   background: none;
//   border: none;
//   margin: 0;
//   padding: 0;
//   cursor: pointer;

const StyledLargeForm = styled.div`
  width: 50%;

  .form {
    border-radius: 30px;
  }
`;

const StyledSearchText = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 44px;
  margin-bottom: 1rem;
  padding: 0 0.5rem;
`;

const MainInput = styled(Form.Control)`
  padding: 1.5rem;
`;

export default HomeSearch;
