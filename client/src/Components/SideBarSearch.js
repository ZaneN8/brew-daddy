import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";

const SideBarSearch = ({
  setCityQuery,
  setStateQuery,
  setZipQuery,
  cityQuery,
  stateQuery,
  zipQuery,
}) => {
  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Label>City</Form.Label>
          <Form.Control
            autoFocus
            placeholder="Enter to search a city here"
            name="query"
            value={cityQuery}
            onChange={(e) => setCityQuery(e.target.value)}
          />
          <Form.Label>State</Form.Label>
          <Form.Control
            autoFocus
            placeholder="Enter to search a State here"
            name="query"
            value={stateQuery}
            onChange={(e) => setStateQuery(e.target.value)}
          />
          <Form.Label>Zip</Form.Label>
          <Form.Control
            autoFocus
            placeholder="Enter to search a zip code here"
            name="query"
            value={zipQuery}
            onChange={(e) => setZipQuery(e.target.value)}
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default SideBarSearch;
