import React, { useState, useContext } from "react";
import { Form, Col } from "react-bootstrap";
import { AuthContext } from "../../providers/AuthProvider";

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
      <button onClick={handleSubmit}>Submit</button>
    </Form>
  );
};

export default EditProfileForm;
