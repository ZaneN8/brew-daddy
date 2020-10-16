import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Search = ({ handleSubmit, coffeeShops, query, setQuery, nextPage }) => {
  // next we can render the coffeeshops that are returned

  // We will need to change the handleSubmit to redirect it into search page below only.
  const renderCoffeeShops = () =>
    coffeeShops.map((coffee) => (
      <StyledResultCard>
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
      </StyledResultCard>
    ));

  return (
    <StyledPage>
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
    </StyledPage>
  );
};

const StyledPage = styled.div`
padding: 1em 4em 1em;
`

const StyledResultCard = styled.div`
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
transition: 0.3s;
border: 1px solid;
border-radius: 30px;
padding: 1em; 
`

const StyledGroup = styled(Form.Group)`
  width: 90%;
  display: flex;
  margin: auto;
  padding: 10px;
  
`;

const Input = styled(Form.Control)`
  border-radius: 30px;
  box-shadow: 0px 2px 6px;
  color: black;
  &:hover {
    background: #e5e5e5;
    box-shadow: 0px 2px 6px;
  }
`;

const StyledButton = styled.button`
  background-color: #4d4d4d;
  color: white;
  border-radius: 30px;
  border: none;
  width: 100px;
  height: 38px;
`;


export default Search;
