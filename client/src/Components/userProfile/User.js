import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import UserRating from "./UserRating";
import userDefaultPhoto from "../../image/userDefault.svg";
import CoffeeShopReview from "../review/CoffeeShopReview";

const User = ({ match }) => {
  const [user, setUser] = useState({});
  const [reviews, setReviews] = useState([]);
  const [coffeeShops, setCoffeeShops] = useState([]);

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

  const getCoffeeShops = async () => {
    try {
      let res = await axios.get(`/api/users/${match.params.id}/coffee_shops`);
      setCoffeeShops(res.data);
    } catch (err) {
      console.log(err.response);
      alert("Error: failed to get users coffee shops");
    }
  };

  useEffect(() => {
    getUser();
    getReviews();
    getCoffeeShops();
  }, []);

  const renderUserReview = () => {
    return reviews.map((review) => (
      <CoffeeShopReview displayShop review={review} />
    ));
  };

  const renderUserCoffeeShop = () => {
    {
      return coffeeShops.map((coffeeShop) => (
        <div className="coffeeShopRender" key={coffeeShop.id}>
          <img src={coffeeShop.image} />
          <a href={`/coffee_shops/${coffeeShop.id}`}>{coffeeShop.name}</a>
          <p>
            {coffeeShop.state},{coffeeShop.city},{coffeeShop.zip}
          </p>
        </div>
      ));
    }
  };

  return (
    <StyledLayout>
      <Box>
        <h1>User Page</h1>
        <StyledImage src={user.image ? user.image : userDefaultPhoto} />

        <div>{user.first_name}</div>
        <p> {user.last_name} </p>
        <p>{user.email}</p>

        <UserRating userId={match.params.id} />
      </Box>
      <BigBox>
        <h4>About Me</h4>
        <p>{user.about_me}</p>
        <div> {renderUserReview()}</div>
        <hr />
      </BigBox>
      <Box>
        <h1> USERS COFFEE SHOPS </h1>
        <div>{renderUserCoffeeShop()}</div>
      </Box>
    </StyledLayout>
  );
};

const StyledLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100%;
`;

const Box = styled.div`
  flex: 3;
  display: flex;
  width: 175px;
  min-height: 300px;
  flex-direction: column;
  padding: 5%;
  height: 100%;
`;

const BigBox = styled.div`
  flex: 6;
  display: flex;
  width: 600px;
  min-height: 300px;
  flex-direction: column;
  padding: 5%;
  height: 100%;
`;

const StyledImage = styled.img`
  border-radius: 50%;
  height: 200px;
  width: 200px;
`;

export default User;
