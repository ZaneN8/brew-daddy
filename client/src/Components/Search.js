import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import useLocalState from "../customHooks/useLocalState";



const Search = () => {
  const [query, setQuery] = useLocalState("coffeeShopQuery", "");
  const [coffeeShops, setCoffeeShops] = useLocalState("coffeeShops", []);
  //TODO reset these when log out, or something like that. 
  // localStorage.clear() will take everything out of localStorage
  // we can either call that on logout, or do localStorage.removeItem("<some-key>");
  // for each key want want removed
  // docs: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

  // make state for results (empty array)

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('e :>> ', e);
    const params = { name: query };
    axios.get(`/api/coffee_shops`, { params }) // <--- add query params in the options hash
      .then((res) => setCoffeeShops(res.data))
      .catch(console.log);
  };

  // next we can render the coffeeshops that are returned
  const renderCoffeeShops = () => coffeeShops.map((coffee) => (
    <p key={coffee.id}><Link as="h3" to={`/coffee_shops/${coffee.id}`}>{coffee.name}</Link></p>
  ));



  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Search</Form.Label>
          <Form.Control autoFocus 
          placeholder="Enter to search here"
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}/>
          <button type="submit">Search</button>
        </Form.Group>
      </Form> 
      <br />
      { renderCoffeeShops() }
    </div>
  )
};

export default Search;