import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useFormInput } from "../../customHooks/useFormInput";
import { AuthContext } from "../../providers/AuthProvider";
import { Form, Container, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Register = (props) => {
  const email = useFormInput("", "Email");
  const password = useFormInput("", "Password");
  const lastName = useFormInput("", "Last Name");
  const firstName = useFormInput("", "First Name");
  const passwordConfirmation = useFormInput("", "Password Confirmation");

  const { handleRegister } = useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    //check valid email
    if (password.value !== passwordConfirmation.value) {
      alert("passwords don not match");
    } else {
      // register user
      handleRegister(
        {
          first_name: firstName.value,
          last_name: lastName.value,
          email: email.value,
          password: password.value,
        },
        history
      );
    }
  };
  return (
    <Container>
      <h1 className="landing">Register</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Col>
            <Form.Label>First Name</Form.Label>
            <Form.Control autoFocus {...firstName} />
          </Col>
          <Col>
            <Form.Label>Last Name</Form.Label>
            <Form.Control {...lastName} />
          </Col>
        </Form.Row>
        <Form.Label>Email</Form.Label>
        <Form.Control {...email} />
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" {...password} />
        <Form.Label>Password Confirmation</Form.Label>
        <Form.Control type="password" {...passwordConfirmation} />
        <br />
        <br />
        <StyledButton type="submit">Register</StyledButton>
      </Form>
      <br />
      <Link to="/">Back</Link>
    </Container>
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

export default Register;
