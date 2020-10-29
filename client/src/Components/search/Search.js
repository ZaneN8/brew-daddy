import React from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";
import CoffeeShopListItem from "./CoffeeShopListItem";

const Search = ({ handleSubmit, coffeeShops, query, setQuery, nextPage }) => {
  // next we can render the coffeeshops that are returned

  // We will need to change the handleSubmit to redirect it into search page below only.
  const renderCoffeeShops = () =>
    coffeeShops.map((coffee) => (
      <CoffeeShopListItem key={coffee.id} coffee={coffee} />
    ));

  return (
    <StyledPage>
      <Form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <StyledGroup>
          <Input
            autoFocus
            placeholder="E.g. ‘Coffee Roasters’, ‘Red Moose Coffee’"
            name="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <StyledButton type="submit">Search</StyledButton>
        </StyledGroup>
      </Form>
      <br />
      {renderCoffeeShops()}
      <StyledButton
        onClick={nextPage}
        style={{
          marginTop: "2rem",
          marginBottom: "3rem",
          fontSize: "20px",
        }}
      >
        load more
      </StyledButton>
    </StyledPage>
  );
};

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const StyledResultCard = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border: 1px solid;
  border-radius: 30px;
  padding-bottom: 1em;
  width: 85%;
`;

const StyledGroup = styled(Form.Group)`
  width: 85%;
  display: flex;
  margin: auto;
  padding-top: 30px;
`;

const Input = styled(Form.Control)`
  border-radius: 30px;
  box-shadow: 0px 2px 7.5px 2px rgba(0, 0, 0, 0.25);
  color: black;
  flex-grow: 1;
  width: 100%;
  padding: 1.5em;

  &:hover {
    background: #e5e5e5;
    box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.35);
  }
`;

const StyledButton = styled.button`
  background-color: #2d2721;
  margin: 0 0em 0em 2em;
  color: white;
  border-radius: 30px;
  border: none;
  padding: 0.9em 1.2em;
`;

export default Search;
