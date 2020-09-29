import React from 'react';
import { Link, } from "react-router-dom";
import { Button,Container } from 'react-bootstrap';


const NoMatch = () => (
  <Container>
    <h1 >You have been Taken to the wrong place</h1>
    <h3>If you are looking for ransom, I can tell you I don't have money. 
      But what I do have are a very particular set of skills; 
      skills I have acquired in a short amount of time.</h3>
    <br/>
    <br/>
    <br/>
    <h5>You can leave now.</h5>
    <Link to="/home">
    <Button variant="outline-danger">Danger</Button>
    </Link>
  </Container>
)

export default NoMatch;