import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import Review from "./Review";
import { Link } from "react-router-dom";
import CoffeeShopReview from "./CoffeeShopReview";

const CoffeeShop = ({ match, history }) => {
  const [shops, setShops] = useState([]);
  const [reviews, setReviews] = useState([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    Axios.get(`/api/coffee_shops/${match.params.id}`)
      .then((res) => {
        setShops(res.data);
      })
      .catch((err) => {
        alert("Error: could not get shop info");
      });

    Axios.get(`/api/coffee_shops/${match.params.id}/reviews`)
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => {
        alert("ERROR: No reviews");
      });
  }, []);

  const renderReviews = () => {
    return reviews.map((review) => (
      <CoffeeShopReview key={review.id} review={review} />
    ));
  };

  const renderShopInfo = () => (
    <div>
      <h1>{shops.name}</h1>
      <img src={shops.image} />

      <h5>Call us at:{shops.contact_info}</h5>
      <h5>
        {shops.state}, {shops.city} {shops.zip}
      </h5>

      <p>
        Open:{shops.open} Delivery:{shops.delivery} PickUp: {shops.pickup}{" "}
        Online:{shops.order_online}
      </p>
    </div>
  );

  return (
    <div>
      <div>{renderShopInfo()}</div>
      <div>{renderReviews()}</div>
      <Review />
      <hr />
      <button onClick={history.goBack}>BACK</button>
    </div>
  );
};

export default CoffeeShop;

// useEffect(() => {
//   Axios.get(`/api/departments/${match.params.id}`)
//     .then((res) => {
//       setDepartment(res.data);
//     })
//     .catch((err) => {
//       alert("Error: No departments loaded");
//     });

//   Axios.get(`/api/departments/${match.params.id}/items`)
//     .then((res) => {
//       setItem(res.data);
//     })
//     .catch((err) => {
//       alert("Error: Could not retrieve items");
//     });
// }, []);