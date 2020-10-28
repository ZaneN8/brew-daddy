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
  const [page, setPage] = useState(1);
  const [noMoreUserReviews, setNoMoreUserReviews] = useState(false);

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
    const params = { params: { page } };
    try {
      let res = await axios.get(
        `/api/users/${match.params.id}/reviews`,
        params
      );
      setReviews(res.data);
    } catch (err) {
      console.log(err.response);
      alert("Error: failed to get users reviews");
    }
  };

  const moreUserReviews = () => {
    const params = {
      params: {
        page: page + 1,
      },
    };
    axios
      .get(`/api/users/${match.params.id}/reviews`, params)
      .then((res) => {
        if (res.data.length === 0) {
          setNoMoreUserReviews(true);
        }
        setReviews(reviews.concat(res.data));
        setPage(page + 1);
      })
      .catch((err) => {
        alert("ERROR: could not retrive more reviews, User.js");
      });
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
        {/* <h1>User Page</h1> */}
        <StyledUserImage src={user.image ? user.image : userDefaultPhoto} />
        <br />
        <StyledUserName>
          {user.first_name} {user.last_name}
        </StyledUserName>
        <UserRating userId={match.params.id} />
      </Box>
      <BigBox>
        <StyledHeaderText>About Me</StyledHeaderText>
        <hr />
        <StyledAboutText>{user.about_me}</StyledAboutText>
        <StyledHeaderText>Recent Reviews</StyledHeaderText>
        <div> {renderUserReview()}</div>
        {!noMoreUserReviews ? (
          <button onClick={moreUserReviews}>See more reviews</button>
        ) : (
          <p>That's all the reviews for this profile</p>
        )}
        <hr />
        <hr />
      </BigBox>
      <Box>
        <StyledHeaderText>Coffee Shops</StyledHeaderText>
        <br />
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
`;

const StyledUserName = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 20px;
  padding-left: 20px;
  padding-bottom: 15px;
`;

const StyledAboutText = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
`;

const StyledLayout = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 100%;
`;

const StyledButton = styled.button`
  display: incline-block;
  box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.35);
  // margin: 0 0.1em 0.1em 0;
  border: 0.16em solid #dbd4cc;
  border-radius: 15px;
  background-color: #dbd4cc;
  color: black;
  text-align: center;
  font-size: 12px;
  transition: all 0.2s;
  &:hover {
     border-color: #371e0a;
  }
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
