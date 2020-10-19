import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import NoMatch from "./Components/NoMatch";
import NavBar from "./Components/NavBar";
import Register from "./Components/Register";
import Login from "./Components/Login";
import FetchUser from "./Components/FetchUser";
import ProtectedRoute from "./Components/ProtectedRoute";
import Lander from "./Components/Lander";
import User from "./Components/User";
import CoffeeShop from "./Components/CoffeeShop";
import CoffeeShopForm from "./Components/CoffeeShopForm";
import Profile from "./Components/Profile";
import SearchScreen from "./Components/SearchScreen";
import "./App.css";
import { Container } from "react-bootstrap";

const App = () => (
  <Fragment>
    <NavBar />
    <FetchUser>
      <Switch>
        <Route exact path="/" component={Lander} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/search" component={SearchScreen} />
        <Route exact path="/about" component={About} />
        <ProtectedRoute exact path="/profile" component={Profile} />
        <Route exact path="/users/:id" component={User} />
        <ProtectedRoute
          exact
          path="/user/coffee_create"
          component={CoffeeShopForm}
        />
        <Route exact path="/coffee_shops/:id" component={CoffeeShop} />
        <Route component={NoMatch} />
      </Switch>
    </FetchUser>
  </Fragment>
);

export default App;
