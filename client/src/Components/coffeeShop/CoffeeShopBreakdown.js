import React, { useState, useEffect } from "react";
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";
import styled from "styled-components";

const CoffeeShopBreakdown = ({ match }) => {
  const [breakdownRating, setBreakdownRating] = useState([]);
  const [ratingsData, setRatingsData] = useState({});

  useEffect(() => {
    axios
      .get(`/api/coffee_shops/${match.params.id}/average_stats`)
      .then((res) => setRatingsData(res.data))
      .catch((err) => {
        console.log("ERROR Setting Rating Data");
      });
  }, []);

  useEffect(() => {
    axios
      .get(`/api/coffee_shops/${match.params.id}/count_reviews`)
      .then((res) => {
        setBreakdownRating(res.data);
      })
      .catch((err) => {
        console.log("Error with Breakdown Rating");
      });
  }, []);

  const renderBreakdown = () => {
    return breakdownRating.map((rating) => (
      <div>
        {rating.rating} Stars{" "}
        <StyledProgress
          now={rating.review_count}
          max={ratingsData.total_rating}
        />
      </div>
    ));
  };

  return (
    <>
      <br />
      Breakdown:
      {renderBreakdown()}
    </>
  );
};

const StyledProgress = styled(ProgressBar)`
  margin-bottom: 1rem;
  box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.35);

  .progress-bar {
    background-color: #2d2721 !important;
  }
`;

export default CoffeeShopBreakdown;
