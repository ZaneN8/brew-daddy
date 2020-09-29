import React, { Fragment, } from 'react';
import { Route, Switch, } from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import NoMatch from './Components/NoMatch';
import NavBar from './Components/NavBar';
import Register from "./Components/Register";
import Login from "./Components/Login";
import FetchUser from "./Components/FetchUser";
import ProtectedRoute from './Components/ProtectedRoute';
import Lander from './Components/Lander';


import './App.css';
import { Container } from 'react-bootstrap';

const App = () => (
  <Fragment>
  
    <NavBar />
    <FetchUser>
    <br />
    <Container>
      <Switch>
        <ProtectedRoute exact path="/home" component={Home} />
        <ProtectedRoute path="/about" component={About} />
        <Route exact path="/" component={Lander} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route component={NoMatch} />
      </Switch>
    </Container>
    </FetchUser>
  </Fragment>
);

export default App;
