import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useFormInput } from "../../customHooks/useFormInput";
import { AuthContext } from "../../providers/AuthProvider";
import { Form, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

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
        <Form.Label>First Name</Form.Label>
        <Form.Control autoFocus {...firstName} />
        <Form.Label>Last Name</Form.Label>
        <Form.Control autoFocus {...lastName} />
        <Form.Label>Email</Form.Label>
        <Form.Control autoFocus {...email} />
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" {...password} />
        <Form.Label>Password Confirmation</Form.Label>
        <Form.Control type="password" {...passwordConfirmation} />
        <br />
        <br />
        <button type="submit">Register</button>
      </Form>
      <br />
      <Link to="/">Back</Link>
    </Container>
  );
};

export default Register;
