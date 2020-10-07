import React, {useState} from "react";
import { Form } from "react-bootstrap";



const SearchBar = () => {
    const [query, setQuery] = useState()

  const handleSubmit = (e) => {
    e.preventDefault();
    
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