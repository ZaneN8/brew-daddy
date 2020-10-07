import axios from "axios";
import React, { useEffect, useState } from "react";

const UserCoffeeShops = ({ match }) => {
  const [deleteReview, setDeleteReview] = useState([]);
  const [editReview, setEditReview] = useState([]);
  const [deleteShop, setDeleteShop] = useState([]);
  const [editShop, setEditShop] = useState([]);
  const [shops, setShops] = useState([]);
  // const [reviews, setReviews] = useState([]);

  // const getReviews = async () => {
  //   try {
  //     let res = await axios.get(`/api/users/${match.params.id}/reviews`);
  //     setReviews(res.data);
  //   } catch (err) {
  //     console.log(err.response);
  //     alert("Error: Importing user reviews did not work");
  //   }
  // };

  // const editReview = async () => {
  //   try {
  //     let res = await axios.put(`/api/users/${match.params.id}/reviews/${review.id}`);
  //   } catch (err) {
  //     console.log(err.response);
  //     alert("Error: Editing review failed")
  //   }
  // };

  // const deleteReview

  // const getShops = async () => {
  //   try {
  //     let res = await axios.get(`/api/${match.params.id}/my_coffee_shops`);
  //     setShops(res.data);
  //   } catch (err) {
  //     console.log(err.response);
  //     alert("Error: Importing SHOPS API");
  //   }
  // };

  // const deleteShop = async () => {
  //   try {
  //     let res = await axios.delete(
  //       `/api/${match.params.id}/my_coffee_shops/${id}`
  //     );
  //     setDeleteShop(res.data);
  //   } catch (err) {
  //     alert("Error: Did not delete coffee shop");
  //   }
  // };

  // const editShop = async () => {
  //   try {
  //     let res = await axios.put(
  //       `/api/${match.params.id}/my_coffee_shops/${id}`
  //     );
  //     setEditShop(res.data);
  //   } catch (err) {
  //     console.log(err.response);
  //     alert("Error: Could not update coffee shop");
  //   }
  // };

  // useEffect(() => {
  //   getShops();
  // }, []);

  return (
    <div>
      <p>My Coffee Shops and Reviews</p>
    </div>
  );
};

export default UserCoffeeShops;

// deleteCoffeeShopReview(e)
//   e.preventDefault();
//   Axios.delete('TODOrails_route_goes_here')
//   .then(res) => {
// {renderCoffeeShopReviews};
//    .catch((error) => {
//       alert('error in deleting Coffee Shop Review');
// });
