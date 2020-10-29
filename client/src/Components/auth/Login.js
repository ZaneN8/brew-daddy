import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useFormInput } from "../../customHooks/useFormInput";
import { AuthContext } from "../../providers/AuthProvider";
import { Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Login = (props) => {
  const history = useHistory();
  const { handleLogin } = useContext(AuthContext);
  const email = useFormInput("", "Email");
  const password = useFormInput("", "Password");

  const handleSubmit = (e) => {
    e.preventDefault();

    handleLogin({ email: email.value, password: password.value }, history);
  };
  return (
    <Container>
      <h1 className="landing">Login</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control autoFocus {...email} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" {...password} />
        </Form.Group>
        <StyledButton>Login</StyledButton>
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

export default Login;
