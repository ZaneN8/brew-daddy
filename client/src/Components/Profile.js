import React, { useState, useEffect, useContext } from "react";
import User from "./User";
import { Link } from "react-router-dom";
import CoffeeShopForm from "./CoffeeShopForm";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import EditProfileForm from "./EditProfileForm";

const Profile = () => {
  const [shops, setShops] = useState([]);
  const [profileReviews, setProfileReviews] = useState([]);
  const [profileCoffeeShops, setProfileCoffeeShops] = useState([]);
  const [show, setShow] = useState(false);
  const { user } = useContext(AuthContext);
  const [edit, setEdit]= useState(false)

  const getProfileReviews = async () => {
    try {
      let res = await axios.get(`/api/users/${user.id}/reviews`);
      setProfileReviews(res.data);
    } catch (err) {
      alert("Error: failed to get this profiles reviews");
    }
  };

  const getProfileCoffeeShops = async () => {
    try {
      let res = await axios.get(`/api/users/${user.id}/coffee_shops`);
      setProfileCoffeeShops(res.data);
    } catch (err) {
      console.log(err.response);
      alert("Error: failed to get users coffee shops");
    }
  };

  const addCoffeeShop = (shop) => setShops([...shops, shop]);

  const renderProfileReviews = () => {
    return profileReviews.map((review) => (
      <div className="profileReviewRender" key={review.id}>
        <h2>{review.title}</h2>
        <h5>{review.body}</h5>
        <p>Total rating:{review.rating}</p>
        <p>Coffee rating:{review.coffee_rating}</p>
        <p>Work friendly:{review.work_friendly}</p>
        <p>Food:{review.food}</p>
        <p>Noise:{review.noise_level}</p>
      </div>
    ));
  };

  const renderProfileCoffeeShop = () => {
    {
      return profileCoffeeShops.map((coffeeShop) => (
        <div className="coffeeShopRender" key={coffeeShop.id}>
          <img src={coffeeShop.image} />
          <p>{coffeeShop.name}</p>
          <p>
            {coffeeShop.state}, {coffeeShop.city}, {coffeeShop.zip}
          </p>
        </div>
      ));
    }
  };

  useEffect(() => {
    getProfileReviews();
    getProfileCoffeeShops();
  }, []);



  const editRow = (id) => {
    setEdit(true)
    // setUser({id:user.id,
    //    first_name:user.first_name,last_name: user.last_name,email:user.email})
  }

  return (
    <div>
      <div className="userinfo">
        {/* <User /> */}
        <h1>PROFILE PAGE</h1>
        <img src={user.image} />
        <div>
          {user.first_name} {user.last_name}
        </div>
        <p>{user.email}</p>

        {edit && <EditProfileForm  editProp={user} editRow={editRow()}/>}
        <button onClick={()=> editRow(user.id)}> 
        {show ? "Cancel" : "Edit"}
        </button>



        {/* <button onClick={editProfile(user.id)}>Edit</button> */}
        {/* <button>Edit Your Account </button>
      <br />
      <br />
      <button> Delete your Account </button> */}
      </div>
      <div className="About Me">
        <h1>About Me</h1>
        <p>About me info HERE</p>
        <h1>Profiles Reviews</h1>
        <div>{renderProfileReviews()}</div>
        <hr />
        <h1>Profile Coffee Shops </h1>
        <div>{renderProfileCoffeeShop()}</div>
      </div>
      <hr />
      <div className="CoffeeShop Right">
        {show && <CoffeeShopForm hide={setShow} add={addCoffeeShop} />}
        <button onClick={() => setShow(!show)}>
          {show ? "Cancel " : "Create Coffee Shop"}
        </button>
      </div>
      <br />
      <br />
    </div>
  );
};

export default Profile;
