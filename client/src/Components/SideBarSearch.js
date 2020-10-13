import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";

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
      <StyledSmallForm>
        <Form>
          <Form.Group>
            <Form.Control
              size="sm"
              className="form"
              autoFocus
              placeholder="City"
              name="query"
              value={cityQuery}
              onChange={(e) => setCityQuery(e.target.value)}
            />

            <Form.Control
              size="sm"
              className="form"
              autoFocus
              placeholder="State"
              name="query"
              value={stateQuery}
              onChange={(e) => setStateQuery(e.target.value)}
            />

            <Form.Control
              size="sm"
              className="form"
              autoFocus
              placeholder="Zip Code"
              name="query"
              value={zipQuery}
              onChange={(e) => setZipQuery(e.target.value)}
            />
          </Form.Group>
        </Form>
      </StyledSmallForm>
    </div>
  );
};

const StyledSmallForm = styled.div`
  .form {
    border-radius: 30px;
    border: 1px solid;
    color: black;
  }
`;

export default SideBarSearch;
