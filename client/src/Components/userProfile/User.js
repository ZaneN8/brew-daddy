import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const User = ({ match }) => {
  const [user, setUser] = useState([]);
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
    {
      return reviews.map((review) => (
        <div className="reviewRender" key={review.id}>
          <h2>{review.title}</h2>
          <h5>{review.body}</h5>
          <p>Total rating:{review.rating}</p>
          <p>Coffee rating:{review.coffee_rating}</p>
          <p>Work friendly:{review.work_friendly}</p>
          <p>Food:{review.food}</p>
          <p>Noise:{review.noise_level}</p>
        </div>
      ));
    }
  };

  const renderUserCoffeeShop = () => {
    {
      return coffeeShops.map((coffeeShop) => (
        <div className="coffeeShopRender" key={coffeeShop.id}>
          <img src={coffeeShop.image} />
          <p>{coffeeShop.name}</p>
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
        <StyledImage src={user.image} />

        <div>{user.first_name}</div>
        <p> {user.last_name} </p>
        <p>{user.email}</p>
      </Box>
      <BigBox>
        <h1>USERS REVIEWS </h1>
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
  display: flex;
  width: 175px;
  min-height: 300px;
  flex-direction: column;
  padding: 5%;
  height: 100%;
`;

const BigBox = styled.div`
  display: flex;
  width: 600px;
  min-height: 300px;
  flex-direction: column;
  padding: 5%;
  height: 100%;
`;

const StyledImage = styled.img`
  border-radius: 50%;
`;

export default User;
