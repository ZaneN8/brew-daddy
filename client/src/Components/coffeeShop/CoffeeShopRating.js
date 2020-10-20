import React, { useState, useEffect } from "react";
import axios from "axios";

const CoffeeShopRating = ({ match }) => {
  const [ratingsData, setRatingsData] = useState({});

  useEffect(() => {
    axios
      .get(`/api/coffee_shops/${match.params.id}/average_stats`)
      .then((res) => setRatingsData(res.data))
      .catch((err) => {
        console.log("ERROR Setting Rating Data");
      });
  }, []);

  const renderAllRating = () => {
    return (
      <div>
        <b>Overall Rating: {ratingsData.total_rating} </b>
        <br />
        Food Quality: {ratingsData.total_food} <br />
        Coffee Quality: {ratingsData.total_coffee} <br />
        Noise Level: {ratingsData.total_noise_level} <br />
        Work Friendly: {ratingsData.total_work_friendly} <br />
      </div>
    );
  };

  return <>{renderAllRating}</>;
};

export default CoffeeShopRating;
