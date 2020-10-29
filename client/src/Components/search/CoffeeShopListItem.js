import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import CoffeeDesc from "./CoffeeDesc";

const CoffeeShopListItem = ({ coffee }) => {
  const [ratingsData, setRatingsData] = useState({});

  const shopCost = () => {
    const dollars = [];
    for (let i = 0; i < coffee.cost; i++) {
      dollars.push(<span>$</span>);
    }
    return dollars;
  };

  useEffect(() => {
    axios
      .get(`/api/coffee_shops/${coffee.id}/average_stats`)
      .then((res) => {
        setRatingsData(res.data);
        //Need to normalize Rating data and do calculate
      })
      .catch((err) => {
        console.log("ERROR Setting Rating Data");
      });
  }, []);

  return (
    <StyledResultCard key={coffee.id}>
      <Row>
        <Column1>
          <CoffeeShopImage url={coffee.image} />
        </Column1>
        <Column2>
          <Title>
            <Link to={`/coffee_shops/${coffee.id}`}>{coffee.name}</Link>
          </Title>
          <StyledMoney>
            <StyledRater
              total={5}
              interactive={false}
              rating={`${ratingsData.total_rating}`}
            />{" "}
            {coffee.cost && shopCost()}
          </StyledMoney>
          <Contact>
            <b> Address: </b> {coffee.address} {coffee.city}, {coffee.state}{" "}
            {coffee.zip}
            <br />
            <b> Contact: </b> {coffee.contact_info} <br />
            {/* Rating: {ratingsData.total_rating} */}
            <br />
            <StyledDesc>{coffee.description}</StyledDesc>{" "}
            {/* <CoffeeDesc coffee={coffee} />{" "} */}
            {/* <Link to={`/coffee_shops/${coffee.id}`}>Read More...</Link> */}
          </Contact>
        </Column2>
      </Row>
    </StyledResultCard>
  );
};

const CoffeeShopImage = styled.div`
  width: 212.25px;
  height: 100%;
  flex-shrink: 0;
  border-radius: 30px 0px 0px 30px;
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const StyledResultCard = styled.div`
  display: flex;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
  transition: 0.3s;
  border: 0px solid;
  border-radius: 30px;
  padding: 0em;
  margin: 2em;
  overflow: hidden;
  text-overflow: ellipsis;
  text-overflow: "…";
  height: 200px;
`;

const StyledDesc = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 20px;
  text-overflow: ellipsis;
  text-overflow: "…";
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`;

const Row = styled.div`
  display: flex;
`;

const Column1 = styled.div`
  flex: 3;
  display: centered;
  flex-direction: column;
`;

const Column2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  // flex: 7;
  // padding: 1.5em;
  padding: 0 2em;
`;

const StyledMoney = styled.div`
  color: #86945e;
  letter-spacing: 0.1em;
`;

const StyledRater = styled(Rater)`
  display: flex;
  .react-rater-star.is-disabled.is-active {
    color: #f0af6d !important;
    background: none;
  }

  .react-rater-star.is-disabled.is-active-half::before {
    color: #f0af6d !important;
    background: none;
  }
`;

const Contact = styled.h5`
  font-size: 12px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

export default CoffeeShopListItem;
