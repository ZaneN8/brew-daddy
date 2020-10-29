import React, { useState, useContext } from "react";
import { Form, Col } from "react-bootstrap";
import { AuthContext } from "../../providers/AuthProvider";
import styled from "styled-components";

const EditProfileForm = ({ hide }) => {
  const { user, handleUpdate } = useContext(AuthContext);
  const [userState, setUserState] = useState(user);

  const handleSubmit = (e) => {
    e.preventDefault();
    //handleUpdate is in Auth Provider
    handleUpdate(userState);
    hide();
  };

  const handleChange = (e) => {
    setUserState({ ...userState, [e.target.name]: e.target.value });
  };

  return (
    <Form
      onSubmit={(e) => {
        handleSubmit();
      }}
    >
      <Form.Row>
        <Col>
          <Form.Group>
            <Form.Label> First Name</Form.Label>
            <Form.Control
              type="text"
              name="first_name"
              value={userState.first_name}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label> Last Name</Form.Label>
            <Form.Control
              type="text"
              name="last_name"
              value={userState.last_name}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Form.Row>
      <Form.Group>
        <Form.Label> Email:</Form.Label>
        <Form.Control
          type="text"
          name="email"
          value={userState.email}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label> About Me:</Form.Label>
        <Form.Control
          type="text"
          name="about_me"
          value={userState.about_me}
          onChange={handleChange}
        />
      </Form.Group>
      <StyledButton onClick={handleSubmit}>Submit</StyledButton>
      <StyledButton onClick={hide}>Cancel</StyledButton>
    </Form>
  );
};

const StyledButton = styled.button`
  display: incline-block;
  box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.1);
  border: 0.16em solid #dbd4cc;
  border-radius: 15px;
  background-color: #dbd4cc;
  color: black;
  text-align: center;
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
  transition: all 0.5s;
  &:hover {
    box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.25);
  }
`;

export default EditProfileForm;
