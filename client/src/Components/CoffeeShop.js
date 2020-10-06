import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import { AuthContext } from "../providers/AuthProvider";

const CoffeeShop = ({ match, history }) => {
  const auth = useContext(AuthContext);
  const [shops, setShops] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    Axios.get(`/api/coffee_shops/${match.params.id}`)
      .then((res) => {
        setShops(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        // console.log()
        alert("Error: could not get shop info");
      });

    Axios.get(`/api/coffee_shops/${match.params.id}/reviews`)
      // Axios.get(`/api/reviews/all`)
      .then((res) => {
        setReviews(res.data);
        console.log("Review");
        console.log(res.data);
      })
      .catch((err) => {
        alert("ERROR: No reviews");
      });
  }, []);

  const renderReviews = () => {
    return reviews.map((review) => (
      <>
        <h2>{review.title}</h2>
        <h5>{review.body}</h5>
        <p>Total rating:{review.rating}</p>
        <p>Coffee rating:{review.coffee_rating}</p>
        <p>Work friendly:{review.work_friendly}</p>
        <p>Food:{review.food}</p>
        <p>Noise:{review.noise_level}</p>
      </>
    ));
  };

  const renderShopInfo = () => (
    <>
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
    </>
  );

  return (
    <div>
      <p>{renderShopInfo()}</p>
      <p>{renderReviews()}</p>
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
