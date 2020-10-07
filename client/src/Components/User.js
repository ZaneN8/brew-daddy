import Axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const User = () => {
  const [users, setUsers] = useState([]);

  const getUser = async () => {
    try {
      let res = await Axios.get(`/api/users/`);
      setUsers(res.data);
    } catch (err) {
      console.log(err.response);
      alert("Error: Importing user API");
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const renderUser = () => {
    return users.map((user) => <p key={user.id}>{user.first_name}</p>);
  };

  return (
    <>
      <h1>Title</h1>
      <p>Avatar</p>
      <div>{renderUser()}</div>
      <p> Last Name </p>
      <p>Email</p>
      <Link to="/user/coffee_create">Create a CoffeeShop</Link>
    </>
  );
};

export default User;

//useEffect here
// renderCoffeeShops
// Axios
//   .get("TODOroute to get coffee shops by current user")
//   .then((res) => {
//     setCoffeeShops(res.data);
//   })
//   .catch((error) => {
//     alert('Could not render coffee shops')
//   });

// deleteCoffeeShop(e)
//   e.preventDefault();
//   Axios.delete('TODOrails_route_goes_here')
//   .then(res) => {
// {renderCoffeeShops};
//    .catch((error) => {
//       alert('error in deleting Coffee Shops');
// });

// updateCoffeeShop(e)
//   e.preventDefault();
//   Axios
//   .put('TODO rails_route_goes_here')
//   .then((res) => {
//     setCoffeeShop(res.data);
//   })
//   .catch((error) => {
//     alert("error in updating Coffee Shop");
//   });

// deleteCoffeeShopReview(e)
//   e.preventDefault();
//   Axios.delete('TODOrails_route_goes_here')
//   .then(res) => {
// {renderCoffeeShopReviews};
//    .catch((error) => {
//       alert('error in deleting Coffee Shop Review');
// });

// updateCoffeeShopReview(e)
//   e.preventDefault();
//   Axios
//   .put('TODO rails_route_goes_here')
//   .then((res) => {
//     setCoffeeShopReviews(res.data);
//   })
//   .catch((error) => {
//     alert("error in updating Coffee Shop Review");
//   });
