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
        <StyledCoffeeShop className="coffeeShopRender" key={coffeeShop.id}>
          <CoffeeShopImage src={coffeeShop.image} />
          <CoffeeShopNameText>
            <a href={`/coffee_shops/${coffeeShop.id}`}>{coffeeShop.name}</a>
          </CoffeeShopNameText>
          <CoffeeShopLocationText>
            {coffeeShop.state}, {coffeeShop.city}, {coffeeShop.zip}
          </CoffeeShopLocationText>
        </StyledCoffeeShop>
      ));
    }
  };

  return (
    <StyledLayout>
      <Box>
        <StyledUserImage src={user.image ? user.image : userDefaultPhoto} />
        <StyledUserName>
          {user.first_name} {user.last_name}
        </StyledUserName>
        <UserRating userId={match.params.id} />
      </Box>
      <BigBox>
        <StyledHeaderText>About Me</StyledHeaderText>
        <StyledAboutText>{user.about_me}</StyledAboutText>
        <StyledReviewText>Recent Reviews</StyledReviewText>
        <div>{renderUserReview()}</div>
      </BigBox>
      <Box>
        <StyledHeaderText>Coffee Shops</StyledHeaderText>
        <Row>
          <div>{renderUserCoffeeShop()}</div>
        </Row>
      </Box>
    </StyledLayout>
  );
};

const StyledPage = styled.div`
  padding: 1em 4em 1em;
`;

const StyledCoffeeShop = styled.div`
  display: flex;
  flex-direction: column;
  transition: 0.3s;
  box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.35);
  border-radius: 30px;
  width: 200px;
  height: 200px;
  margin-bottom: 2rem;
`;

const CoffeeShopImage = styled.img`
  width: 200px;
  height: 135px;
  flex-shrink: 0;
  border-radius: 30px 30px 0 0;
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const CoffeeShopNameText = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-top: 10px;
  padding-left: 15px;
  padding-right: 20px;
`;

const CoffeeShopLocationText = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-left: 15px;
  padding-right: 20px;
`;

const StyledHeaderText = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 20px;
  padding-bottom: 30px;
`;

const StyledAboutText = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  padding-bottom: 60px;
`;

const StyledReviewText = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 20px;
  padding-bottom: 30px;
`;

const StyledUserName = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 20px;
  padding-left: 20px;
  padding-top: 25px;
  padding-bottom: 15px;
`;

const StyledLoadMoreButton = styled.button`
  color: black;
  text-align: center;
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  background: none;
  border: none;
  margin: 0;
  padding: 0;
  cursor: pointer;
`;

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
  flex: 7;
  display: flex;
  width: 600px;
  min-height: 300px;
  flex-direction: column;
  padding: 5%;
  height: 100%;
`;

const StyledUserImage = styled.img`
  border-radius: 50%;
  height: 200px;
  width: 200px;
  box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.35);
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;
export default User;
