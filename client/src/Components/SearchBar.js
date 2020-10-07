import React, {useState} from "react";
import { Form } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";


const SearchBar = () => {
    const [query, setQuery] = useState()

  const handleSubmit = (e) => {
    e.preventDefault();
    propTypes.query(query)
  };


  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Search</Form.Label>
          <Form.Control autoFocus 
          placeholder="Enter to search here"
          name="query"
          onChange={(e) => setQuery(e.target.value)}/><button type="submit">Search</button>
        </Form.Group>
        </Form> 
        <br />
        </div>
  )
};

export default SearchBar;