import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Search = ({ handleSubmit, coffeeShops, query, setQuery, nextPage }) => {
  // next we can render the coffeeshops that are returned

  // We will need to change the handleSubmit to redirect it into search page below only.
  const renderCoffeeShops = () =>
    coffeeShops.map((coffee) => (
      <p key={coffee.id}>
        <img src={coffee.image} />
        <Link as="h1" to={`/coffee_shops/${coffee.id}`}>
          <h3>{coffee.name}</h3>
        </Link>
        <br />
        <b> Location: </b> {coffee.city}, {coffee.state} <br />
        <b> Phone Number: </b> {coffee.contact_info} <br />
        {coffee.description}
      </p>
    ));

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <StyledGroup>
          <Input
            autoFocus
            placeholder="Enter to search here"
            name="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <StyledButton type="submit">Search</StyledButton>
        </StyledGroup>
      </Form>
      <br />
      {renderCoffeeShops()}
      <StyledButton onClick={nextPage}>load more</StyledButton>
    </div>
  );
};

const StyledGroup = styled(Form.Group)`
  width: 100%;
  display: flex;
`;

const Input = styled(Form.Control)`
  border-radius: 30px;
  border: 1px solid;
  box-shadow: 0px 4px 10px 2px;
  color: black;
  &:hover {
    background: #e5e5e5;
    box-shadow: 10px;
  }
`;

const StyledButton = styled.button`
  background-color: #4d4d4d;
  color: white;
  border-radius: 30px;
  border: none;
  width: 100px;
  hieght: 50px;
  margin: 1em;
  padding: 0.25em 1em;
`;

const StyledCard = styled.div``;

export default Search;
