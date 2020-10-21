import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import About from "./Components/home/About";
import NoMatch from "./Components/auth/NoMatch";
import NavBar from "./Components/layoutUI/NavBar";
import Register from "./Components/auth/Register";
import Login from "./Components/auth/Login";
import FetchUser from "./Components/auth/FetchUser";
import ProtectedRoute from "./Components/auth/ProtectedRoute";
import Lander from "./Components/home/Lander";
import User from "./Components/userProfile/User";
import CoffeeShop from "./Components/coffeeShop/CoffeeShop";
import CoffeeShopForm from "./Components/coffeeShop/CoffeeShopForm";
import Profile from "./Components/userProfile/Profile";
import SearchScreen from "./Components/search/SearchScreen";
import "./App.css";

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
