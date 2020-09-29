import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useFormInput } from "../customHooks/useFormInput";
import { AuthContext } from "../providers/AuthProvider";
import {Form,Button} from 'react-bootstrap';

const Login = (props) => {
  const history = useHistory();
  const { handleLogin } = useContext(AuthContext);
  const email = useFormInput("", "Email");
  const password = useFormInput("", "Email");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email.value);
    console.log(password.value);

    //api call here pass {email, password}
    handleLogin({ email: email.value, password: password.value }, history);
  };
  return (
    <div>
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
        <Button variant="info"type="submit">Login</Button>
      </Form>
      <br />
      <Button variant="success" href="/">Back</Button>
    </div>
  );
};

export default Login;