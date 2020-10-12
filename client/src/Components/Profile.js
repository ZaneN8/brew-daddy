import React, { useState, useEffect, useContext } from "react";
import User from "./User";
import { Link } from "react-router-dom";
import CoffeeShopForm from "./CoffeeShopForm";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";

const Profile = () => {
  const [shops, setShops] = useState([]);
  const [profileReviews, setProfileReviews] = useState([]);
  const [show, setShow] = useState(false);
  const { user } = useContext(AuthContext);

  const getProfileReviews = async () => {
    try {
      let res = await axios.get(`/api/users/${user.id}/reviews`);
      setProfileReviews(res.data);
    } catch (err) {
      debugger;
      alert("Error: failed to get this profiles reviews");
    }
  };

  useEffect(() => {
    getProfileReviews();
  }, []);

  const addCoffeeShop = (shop) => setShops([...shops, shop]);

  // const renderProfileReviews = () => {

  //   return (profileReviews.map())
  // }

  return (
    <div>
      {/* <User /> */}
      <h1>PROFILE PAGE</h1>
      <img src={user.image} />
      <div>
        {user.first_name} {user.last_name}
      </div>
      <p>{user.email}</p>
      <p></p>
      <p>ADD Review SHOP SPOT</p>
      <p>{profileReviews.title}</p>
      <br />
      {show && <CoffeeShopForm hide={setShow} add={addCoffeeShop} />}
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
