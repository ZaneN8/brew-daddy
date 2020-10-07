import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const User = () => {
  const auth = useContext(AuthContext);

  return (
    <>
      <h1>User Info</h1>
      <p>Avatar</p>
      <p>First Name</p>
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
