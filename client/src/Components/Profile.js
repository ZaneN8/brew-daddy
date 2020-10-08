import React, { useState, useEffect, useContext } from "react";
import User from "./User";
import { Link } from "react-router-dom";
import CoffeeShopForm from "./CoffeeShopForm";
import { AuthContext } from "../providers/AuthProvider";

const Profile = () => {
  const [shops, setShops] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [show, setShow] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {});

  const addCoffeeShop = (shop) => setShops([...shops, shop]);

  return (
    <div>
      <User />
      <p>ADD COFFEE SHOP SPOT</p>
      <p>ADD Review SHOP SPOT</p>
      <br />
      {show && <CoffeeShopForm />}
      <button onClick={() => setShow(!show)}>
        {show ? "Cancel " : "Create Coffee Shop"}
      </button>
      <br />
      <br />
      <button>Edit Your Account </button>
      <br />
      <br />
      <button> Delete your Account </button>
    </div>
  );
};

export default Profile;
