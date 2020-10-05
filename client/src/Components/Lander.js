import React from "react";
import {Link} from "react-router-dom"

const Lander = () => (
  <div>
    <h1 className="landing">Welcome to BrewDaddy</h1>
    <br />
    <br />
    <Link to="/login" >
      Login
    </Link>
    <br />
    <br />
    <Link to="/register">Sign Up</Link>
  </div>
);

export default Lander;
