import React, { useState, useEffect } from "react";
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";

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
    // console.log(breakdownRating)
    return breakdownRating.map((rating) => (
      <div>
        {rating.rating} Stars{" "}
        <ProgressBar now={rating.review_count} max={ratingsData.total_rating} />
      </div>
    ));
    // return (
    //     <div>test</div>
    // )
  };

  return (
    <>
      <br />
      Breakdown:
      {renderBreakdown()}
    </>
  );
};

export default CoffeeShopBreakdown;
