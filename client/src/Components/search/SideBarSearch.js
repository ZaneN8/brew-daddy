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
    <Container>
      <StyledForm onSubmit={handleSubmit}>
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
      </StyledForm>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  background: #ffffff;
  padding: 15px 0;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  width: 100%;
`;

const StyledForm = styled(Form)`
  display: flex;
  width: 85%;
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
`;

export default SideBarSearch;
