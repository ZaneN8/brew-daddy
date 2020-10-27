import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";

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
        //Need to normalize Rating data and do calcuate
      })
      .catch((err) => {
        console.log("ERROR Setting Rating Data");
      });
  }, []);

  return (
    <StyledResultCard key={coffee.id}>
      <Row>
        <Column1>
          <img src={coffee.image} />
        </Column1>
        <Column2>
          <Title><Link to={`/coffee_shops/${coffee.id}`}>
            {coffee.name}
          </Link></Title>
          <Rater
              total={5}
              interactive={false}
              rating={`${ratingsData.total_rating}`}
            /> {coffee.cost && shopCost()}
          <br />
          <Contact>
          <b> Address: </b> {coffee.address} {coffee.city}, {coffee.state} {coffee.zip}<br />
          <b> Contact: </b> {coffee.contact_info} <br />
         
          {/* Rating: {ratingsData.total_rating} */}
          <br />
          {coffee.description} </Contact>
        </Column2>
      </Row>
    </StyledResultCard>
  );
};

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
`;

const Row = styled.div`
  display: flex;
`;

const Column1 = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
`;

const Column2 = styled.div`
  // flex: 7;
  padding: 1em;
`;

const Contact = styled.h5`
  font-size: 12px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
`

export default CoffeeShopListItem;
