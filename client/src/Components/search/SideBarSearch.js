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
  handleSubmit,
}) => {
  return (
    <div>
      <StyledForm onSubmit={handleSubmit}>
        <StyledGroup>
          <Input
            autoFocus
            placeholder="City"
            name="query"
            value={cityQuery}
            onChange={(e) => setCityQuery(e.target.value)}
          />
          <Input
            autoFocus
            placeholder="State"
            name="query"
            value={stateQuery}
            onChange={(e) => setStateQuery(e.target.value)}
          />
          <Input
            autoFocus
            placeholder="Zip Code"
            name="query"
            value={zipQuery}
            onChange={(e) => setZipQuery(e.target.value)}
          />
          <InvisibleButton type="submit" />
        </StyledGroup>
      </StyledForm>
    </div>
  );
};

const StyledForm = styled(Form)`
  margin: auto;
  display: flex;
  background: #ffffff;
  padding: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const StyledGroup = styled(Form.Group)`
  display: flex;
  margin: auto;
  backgroud-color: #cccccc;
`;

const Input = styled(Form.Control)`
  border-radius: 30px;
  font-size: 10px;
  border: 0px solid;
  color: black;
  margin-right: 1rem;
  max-width: 12.5rem;
  background: #e5e5e5;
  &:hover {
    background: #e5e5e5;
    box-shadow: 10px;
  }
`;

const InvisibleButton = styled.button`
  display: none;
`

export default SideBarSearch;
