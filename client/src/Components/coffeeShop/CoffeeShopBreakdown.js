import React, { useState, useEffect } from "react";
import axios from "axios";

const CoffeeShopBreakdown = ({ match }) => {
  const [breakdownRating, setBreakdownRating] = useState([]);

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
        {rating.rating} Stars, {rating.review_count} Reviews
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
