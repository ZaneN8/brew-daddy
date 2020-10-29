import React, { useState, useEffect } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import styled from "styled-components";

const CoffeeShopRating = ({ ratingsData }) => (
  <StyledText>
    Total Reviews: {ratingsData.total_reviews_count}
    <h4>
      <StyledB>Measures</StyledB>
    </h4>
    <b>Overall Rating: {ratingsData.total_rating}</b>
    <StyledProgress now={ratingsData.total_rating} max={5} />
    Food Quality: {ratingsData.total_food}
    <StyledProgress now={ratingsData.total_food} max={5} />
    Coffee Quality: {ratingsData.total_coffee}
    <StyledProgress now={ratingsData.total_coffee} max={5} />
    Noise Level: {ratingsData.total_noise_level}
    <StyledProgress now={ratingsData.total_noise_level} max={5} />
    Work Friendly: {ratingsData.total_work_friendly}/5
    <StyledProgress now={ratingsData.total_work_friendly} max={5} />
  </StyledText>
);

const StyledProgress = styled(ProgressBar)`
  margin-bottom: 1rem;
  box-shadow: 0px 4px 10px 2px rgba(0, 0, 0, 0.35);
  .progress-bar {
    background-color: #2d2721 !important;
  }
`;

const StyledText = styled.div`
  font-family: Open Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 20px;
`;

const StyledB = styled.b`
  font-size: 24px;
  padding-bottom: 30px;
`;

export default CoffeeShopRating;
