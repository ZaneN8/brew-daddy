import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserCoffeeShops from "./UserCoffeeShops";

const User = ({ match }) => {
  const [users, setUsers] = useState([]);
  const [shops, setShops] = useState([]);

  const getUser = async () => {
    try {
      let res = await axios.get(`/api/users/${match.params.id}`);
      setUsers(res.data);
    } catch (err) {
      console.log(err.response);
      alert("Error: Importing user API");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <h1>Title</h1>
      <img src={users.image} />
      <div>{users.first_name}</div>
      <p> {users.last_name} </p>
      <p>{users.email}</p>
      {/* <UserCoffeeShops /> */}
    </>
  );
};

export default User;
