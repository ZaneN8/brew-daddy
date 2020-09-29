import React from 'react';
import {Button, Container} from 'react-bootstrap';


const Lander = () => (
  <div>
  <Container>
  <h1 className="landing">Welcome to (Project-Name)</h1>
  <br />
  <br />
  <Button  href="/login"variant="info" block>Login</Button>

  <Button href="/register" variant="success" block>Sign Up</Button>
  </Container>
  </div>
)

export default Lander;
