import React, { useState, useEffect } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import styled from "styled-components";

const CoffeeShopRating = ({ ratingsData }) => (
  <div>
    Total Reviews: {ratingsData.total_reviews_count}
    <h4>
      <b>Measures</b>
    </h4>
    <b>Overall Rating: {ratingsData.total_rating}</b>
    <StyledProgress now={ratingsData.total_rating} max={5} />
    Food Quality: {ratingsData.total_food}
    <StyledProgress now={ratingsData.total_food} max={5} />
    Coffee Quality: {ratingsData.total_coffee}
    <StyledProgress now={ratingsData.total_coffee} max={5} />
    Noise Level: {ratingsData.total_noise_level}
    <StyledProgress now={ratingsData.total_noise_level} max={5} />
    Work Friendly: {ratingsData.total_work_friendly}
    <StyledProgress now={ratingsData.total_work_friendly} max={5} />
  </div>
);

const StyledProgress = styled(ProgressBar)`
  margin-bottom: 1rem;

  .progress-bar {
    background-color: #2d2721 !important;
  }
`;

export default CoffeeShopRating;
