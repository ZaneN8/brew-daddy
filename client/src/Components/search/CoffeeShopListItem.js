import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Rater from "react-rater";
import 'react-rater/lib/react-rater.css';

const CoffeeShopListItem = ({ coffee }) => {
  const [ratingsData, setRatingsData] = useState({});

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
      <p key={coffee.id}>
        <img src={coffee.image} />
        <Link as="h1" to={`/coffee_shops/${coffee.id}`}>
          {coffee.name}
        </Link>
        <br />
        <b> Address: </b> {coffee.address} <br />
        {coffee.city}, {coffee.state} <br />
        <br />
        <b> Phone Number: </b> {coffee.contact_info} <br />
        {/* Rating: {ratingsData.total_rating} */}
        <h1><Rater total={5} interactive={false} rating={`${ratingsData.total_rating}`} /></h1>
        <br />
        {coffee.description}
      </p>
    </StyledResultCard>
  );
};

const StyledResultCard = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border: 1px solid;
  border-radius: 30px;
  padding: 1em;
`;

export default CoffeeShopListItem;
