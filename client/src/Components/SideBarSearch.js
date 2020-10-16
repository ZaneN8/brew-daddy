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
      <Form>
        <StyledGroup>
          <Input
            size="sm"
            autoFocus
            placeholder="City"
            name="query"
            value={cityQuery}
            onChange={(e) => setCityQuery(e.target.value)}
          />
          <Input
            size="sm"
            autoFocus
            placeholder="State"
            name="query"
            value={stateQuery}
            onChange={(e) => setStateQuery(e.target.value)}
          />
          <Input
            size="sm"
            autoFocus
            placeholder="Zip Code"
            name="query"
            value={zipQuery}
            onChange={(e) => setZipQuery(e.target.value)}
          />
        </StyledGroup>
      </Form>
    </div>
  );
};

const StyledGroup = styled(Form.Group)`
  display: flex;
  box-shadow: 5px 2px 2px;
  backgroud: #ffffff;
`;

const Input = styled(Form.Control)`
  border-radius: 30px;
  border: 1px solid;
  color: black;
  margin-right: 1rem;
  max-width: 12.5rem;
  &:hover {
    background: #e5e5e5;
    box-shadow: 10px;
  }
`;

export default SideBarSearch;
