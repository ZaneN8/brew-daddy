import React from "react";
import {Link} from "react-router-dom"

const User = () => (
  <>
  <h1>
    User Info
  </h1>

  <p>Avatar</p>
  <p> First Name</p>
  <p> Last Name</p>
  <p>Email</p>
  <Link to="/user/coffee_create">Create a CoffeeShop</Link>

  </>
);

export default User;