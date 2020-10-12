import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserCoffeeShops from "./UserCoffeeShops";

const User = ({ match }) => {
  const [user, setUser] = useState([]);
  const [reviews, setReviews] = useState([]);

  const getUser = async () => {
    try {
      let res = await axios.get(`/api/users/${match.params.id}`);
      setUser(res.data);
    } catch (err) {
      console.log(err.response);
      alert("Error: Importing user API");
    }
  };

  const getReviews = async () => {
    try {
      let res = await axios.get(`/api/users/${match.params.id}/reviews`);
      setReviews(res.data);
    } catch (err) {
      console.log(err.response);
      alert("Error: failed to get users reviews");
    }
  };

  useEffect(() => {
    getUser();
    getReviews();
  }, []);

  return (
    <>
      <h1>Title</h1>
      <img src={user.image} />
      <div>{user.first_name}</div>
      <p> {user.last_name} </p>
      <p>{user.email}</p>
      {/* <UserCoffeeShops /> */}
    </>
  );
};

export default User;
