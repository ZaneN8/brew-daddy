import React, { useState, useEffect } from "react";
import axios from "axios";
import ProgressBar from 'react-bootstrap/ProgressBar'

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
        Total Reviews: {ratingsData.total_reviews_count}
        <br />
        <br />
        <b>Overall Rating: {ratingsData.total_rating} </b>
        <ProgressBar now={ratingsData.total_rating} max={5}/>
        <br />
        Food Quality: {ratingsData.total_food} <br />
        <ProgressBar now={ratingsData.total_food} max={5} />
        Coffee Quality: {ratingsData.total_coffee} <br />
        <ProgressBar now={ratingsData.total_coffee} max={5} />
        Noise Level: {ratingsData.total_noise_level} <br />
        <ProgressBar now={ratingsData.total_noise_level} max={5} />
        Work Friendly: {ratingsData.total_work_friendly} <br />
        <ProgressBar now={ratingsData.total_work_friendly} max={5} />
      </div>
    );
  };

  return (
    <>
      Rating:
      {renderAllRating()}
    </>
  );
};

export default CoffeeShopRating;
